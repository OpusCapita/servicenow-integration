'use strict';
const config = require('ocbesbn-config');
const soap = require('soap');
const fs = require('fs');
const Logger = require('ocbesbn-logger'); // Logger
const log = new Logger({
    context: {
        serviceName: 'servicenow-integration'
    }
});

const helper = require('./utility/helper');
const circle_ci = require('./utility/circle_ci_api');
const servicenow_insert = require('./insert');

module.exports = function (app, db, config) {
    app.get('/', (req, res) => res.send('I am in insert.js'));
    app.get('/api/health-checks',
        (req, res) => module.exports.doHealthCheck()
            .then(result => res.send(result))
            .catch(error => res.status(500).send({error: error}))
    );
};

module.exports.doHealthCheck = function () {
    return getServiceHealth()
        .then(healthChecks => analyseHealthChecks(healthChecks))        // grouping by status and summing
        .then(healthChecks => enrichWithDeploymentInfo(healthChecks))   // check for circle ci deployment
        .then(healthChecks => enrichWithSevInfo(healthChecks))          // use enriched healthChecks to determine sev-state
        .then(healthChecks => filterBySev(healthChecks))                // filtering based on sev
        .catch(error => {
            log.error(error); // TODO: escalation?
            return [];
        })
        .then(healthChecks => {
            log.info(`data for tickets: ${JSON.stringify(healthChecks)}`);
            return Promise.all(
                healthChecks.map(
                    check => createHealthIssue(check)
                        .catch(error => `issue for service ${check.serviceName} could not be created: \n${error}`)
                )
            );
        })
};

const analyseHealthChecks = function (healthChecks) {
    let serviceDataSets = [];
    for (let currentService of healthChecks) {
        try {
            const serviceName = currentService[0].Service.Service;
            let totalChecks = 0;
            let passingChecks = 0;
            for (let currentNode of currentService) {
                const groupedChecks = helper.groupBy(currentNode.Checks, check => check.Status);
                totalChecks += currentNode.Checks.length;
                passingChecks += groupedChecks.get('passing') === null ? 0 : groupedChecks.get('passing').length;
            }
            const serviceData = {
                serviceName: serviceName,
                environment: process.env.NODE_ENV ? process.env.NODE_ENV : 'unknown env',
                total: totalChecks,
                passed: passingChecks,
                raw: currentService,
            };
            serviceDataSets.push(serviceData);
        } catch (e) {
            log.error(e);
        }
    }
    log.info(`consul-info: ${JSON.stringify(serviceDataSets)}`);
    return serviceDataSets;
};

const enrichWithDeploymentInfo = function (healthChecks) {
    const deploymentStatus = ['queued', 'scheduled', 'running'];
    return circle_ci.getRecentBuilds()
        .then(it => JSON.parse(it))
        .catch(error => {
            log.error(`Could not fetch circle-ci builds: ${JSON.stringify(error)}`); // TODO; escalation?
            return [];
        })
        .then(recentBuilds =>
            Promise.all(
                healthChecks.map(
                    check => {
                        const deployments = recentBuilds
                            .filter(build => build.reponame === check.serviceName)
                            .filter(build => deploymentStatus.includes(build.status))
                            .filter(build => circle_ci.belongsToCurrentEnv(build))
                        check['deploying'] = deployments ? deployments.length : 0;
                        return check;
                    }
                )
            )
        );
};

const enrichWithSevInfo = function (healthChecks) {
    return Promise.all(
        healthChecks.map(
            check => {
                check['status'] = getSevState(check);
                return check;
            }
        )
    )
};

const filterBySev = function (healthChecks) {
    return healthChecks.filter(it => it['status']['sev'] > 0);
};

const createHealthIssue = function (check) {
    try {
        const request = {
            u_short_descr: createHealthIssueSubject(check),
            u_caller_id: 'bnp',    // Whos ocnet-id should be used?
            u_error_type: "\\OCSEFTP01\prod\Kundin\ssrca",	// List of error_types?
            //u_service: 'iPost Sweden',  // service needed?
            u_priority: check['status']['sev'],
            u_assignment_group: 'OC CS GLOB Service Desk AM',
            u_det_descr: createHealthIssueBody(check),
            u_customer_id: 'OpusCapita'
        };
        return servicenow_insert.doInsert(request);
    } catch (error) {
        log.error(error);
        return error.message;
    }
};

const createHealthIssueSubject = function (serviceData) {
    return helper.renderTemplate(`${__dirname}/templates/health_subject.njk`, serviceData);
};

const createHealthIssueBody = function (serviceData) {
    serviceData['raw'] = JSON.stringify(serviceData['raw'], null, 3);

    serviceData['timestamp'] = helper.getFormattedDateString();
    return helper.renderTemplate(`${__dirname}/templates/health_body.njk`, serviceData);
};


const getSevState = function (serviceData) {
    let sevScript;
    if (fs.existsSync(`${__dirname}/healthrules/${serviceData.serviceName}.js`))
        sevScript = require(`${__dirname}/healthrules/${serviceData.serviceName}.js`);
    else
        sevScript = require(`${__dirname}/healthrules/default.js`);
    if (!sevScript) {
        log.error('no health-rule-script could be loaded.');
        return -1;
    }
    return sevScript.exec(serviceData);
};

const getServiceHealth = function () {
    return getServiceList()
        .then(services => Object.keys(services))
        .then(serviceNames =>
            Promise.all(
                serviceNames.map(service =>
                    config.consul.health.service({service: service})
                )
            )
        );
};

const getServiceList = function () {
    return config.consul.catalog.services()
        .catch(error => {
            log.error(error);
            let escalation = new Escalation('Could not get services from consul', error);
            createEscalationIssue(escalation);
            return {};
        })
};

const createEscalationIssue = function (escalation) {
    log.info("creating escalation issue!");
    try {
        const request = {
            u_short_descr: createEscalationIssueSubject(escalation),
            u_caller_id: 'bnp',    // Whos ocnet-id should be used?
            u_error_type: "\\OCSEFTP01\prod\Kundin\ssrca",	// List of error_types?
            //u_service: 'iPost Sweden',  // service needed?
            u_assignment_group: 'OC CS GLOB Service Desk AM',
            u_priority: 1,
            u_det_descr: createEscalationIssueBody(escalation),
            u_customer_id: 'OpusCapita'
        };
        return servicenow_insert.doInsert(request);
    } catch (error) {
        log.error(error);
        return error.message;
    }
};

const createEscalationIssueSubject = function (escalation) {
    return helper.renderTemplate(`${__dirname}/templates/escalation_subject.njk`, escalation);
};

const createEscalationIssueBody = function (escalation) {
    return helper.renderTemplate(`${__dirname}/templates/escalation_body.njk`, escalation);
};

class Escalation {
    constructor(reason, error) {
        this.reason = reason;
        this.error = error;
    }
}