'use strict';
const config = require('ocbesbn-config');
const Logger = require('ocbesbn-logger'); // Logger
const helper = require('./helper');
const fs = require('fs');
const soap = require('soap');
const log = new Logger({
    context: {
        serviceName: 'servicenow-integration'
    }
});
const servicenow_insert = require('./insert');

module.exports = function (app, db, config) {
    app.get('/', (req, res) => res.send('I am in insert.js'));
    app.get('/api/health-checks',
        (req, res) => doHealthCheck()
            .then(result => res.send(result))
            .catch(error => res.status(500).send(error))
    );
};

const doHealthCheck = function () {
    return getServiceHealth()
        .then(healthChecks => analyseHealthChecks(healthChecks))        // grouping by status and summing
        .then(healthChecks => enrichWithDeploymentInfo(healthChecks))   // check for circle ci deployment
        .then(healthChecks => enrichWithSevInfo(healthChecks))          // use enriched healthChecks to determine sev-state
        .then(healthChecks => filterBySev(healthChecks))                // filtering based on sev
        // TODO: check for duplicates on serviceNow
        // TODO: how to get non-EVM-Ticket-ID ??!
        // TODO: what if db is down and existing tickets cant be checked?
        // .then(healthChecks => filterByExistingIssues(healthChecks))
        .then(healthChecks =>
            Promise.all(
                healthChecks.map(
                    check => createHealthIssue(check)                   // creating issues
                )
            )
        );  // returns list of insert-responses(json)
};

const analyseHealthChecks = function (healthChecks) {
    let filteredIssues = [];
    for (let currentService of healthChecks) {
        try {
            let serviceName = currentService[0].Service.Service;
            let totalChecks = 0;
            let passingChecks = 0;
            for (let currentNode of currentService) {
                const groupedChecks = helper.groupBy(currentNode.Checks, check => check.Status);
                totalChecks += currentNode.Checks.length;
                passingChecks += groupedChecks.get('passing') === null ? 0 : groupedChecks.get('passing').length;
            }
            let serviceData = {
                serviceName: serviceName,
                total: totalChecks,
                passed: passingChecks,
                raw: currentService,
            };
            filteredIssues.push(serviceData);
        } catch (e) {
            log.error(e);
        }
    }
    return filteredIssues;
};

const enrichWithDeploymentInfo = function (healthChecks) {
    return Promise.all(
        healthChecks.map(
            check => {
                check['deploying'] = 0; // TODO: use circle ci api
                return check;
            }
        )
    )
};

const getCircleCiDeployments = function () {
    return new Promise((resolve, reject) => {
        
    });
}

const enrichWithSevInfo = function (healthChecks) {
    return Promise.all(
        healthChecks.map(
            check => {
                check['sev'] = getSevState(check);
                check['sev'] = 2;
                return check;
            }
        )
    )
};

const filterBySev = function (healthChecks) {
    return healthChecks.filter(it => it['sev'] > 0);
};

const createHealthIssue = function (check) {
    let request = {
        u_short_descr: createHealthIssueSubject(check),
        u_caller_id: 'TUBBEST1',    // Whos ocnet-id should be used?
        u_error_type: "\\OCSEFTP01\prod\Kundin\ssrca",	// List of error_types?
        //u_service: 'iPost Sweden',  // service needed?
        u_priority: check['sev'],
        u_assignment_group: 'OC CS GLOB Service Desk AM',
        u_det_descr: createHealthIssueBody(check),
        u_customer_id: 'OpusCapita' // TODO: what id are we using here?
    };
    return servicenow_insert.doInsert(request);
};

const createHealthIssueSubject = function (serviceData) {
    return helper.renderTemplate(`${__dirname}/templates/health_subject.njk`, serviceData);
};

const createHealthIssueBody = function (serviceData) {
    serviceData['raw'] = JSON.stringify(serviceData['raw']);
    return helper.renderTemplate(`${__dirname}/templates/health_body.njk`, serviceData);
};


const getSevState = function (serviceData) {
    let sevScript;
    if (fs.existsSync(`${__dirname}/${serviceData.serviceName}.js`))
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

let createEscalationIssue = function (escalation) {
    log.info("creating escalation issue!");
    let request = {
        u_short_descr: createEscalationIssueSubject(escalation),
        u_caller_id: 'TUBBEST1',    // Whos ocnet-id should be used?
        u_error_type: "\\OCSEFTP01\prod\Kundin\ssrca",	// List of error_types?
        //u_service: 'iPost Sweden',  // service needed?
        u_assignment_group: 'OC CS GLOB Service Desk AM',
        u_priority: 1,
        u_det_descr: createEscalationIssueBody(escalation),
        u_customer_id: 'OpusCapita' // TODO: what id are we using here?
    };
    servicenow_insert.doInsert(request);
};

let createEscalationIssueSubject = function (escalation) {
    return helper.renderTemplate(`${__dirname}/templates/escalation_subject.njk`, escalation);
};

let createEscalationIssueBody = function (escalation) {
    return helper.renderTemplate(`${__dirname}/templates/escalation_body.njk`, escalation);
};

class Escalation {
    constructor(reason, error) {
        this.reason = reason;
        this.error = error;
    }
}