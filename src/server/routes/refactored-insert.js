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
module.exports = function (app, db, config) {
    app.get('/', (req, res) => res.send('I am in insert.js'));
    app.get('/api/health-checks',
        (req, res) => doHealthCheck()
            .then((result) => res.send(result))
            .catch((error) => res.status(500).send(error))
    );
};

let doHealthCheck = function () {
    return getServiceHealth()
        .then(healthChecks => filterHealthChecks(healthChecks))
        .then((filteredChecks) =>
            Promise.all(
                filteredChecks.map(
                    serviceData => createHealthIssue(serviceData)
                )
            )
        )
};

let filterHealthChecks = function (healthChecks) {
    let filteredIssues = [];
    for (let currentService of healthChecks) {
        try {
            let serviceName = currentService[0].Service.Service;
            let totalChecks = 0;
            let passingChecks = 0;
            let currentDeployments = checkDeployments(serviceName);
            for (let currentNode of currentService) {
                const groupedChecks = helper.groupBy(currentNode.Checks, check => check.Status);
                totalChecks += currentNode.Checks.length;
                passingChecks += groupedChecks.get('passing') === null ? 0 : groupedChecks.get('passing').length;
            }
            let serviceData = {
                serviceName: serviceName,
                total: totalChecks,
                passed: passingChecks,
                deploying: currentDeployments,
                raw: currentService,
            };
            serviceData['sev'] = 3; //getSevState(serviceData);
            if (serviceData['sev'] > 0) {
                filteredIssues.push(serviceData);
            }
        } catch (e) {
            log.error(e);
        }
    }
    return filteredIssues;
};

let checkDeployments = function (serviceName) {
    // TODO: use circleCI API to check for current deployments
    return false;
};


let createHealthIssue = function (serviceData) {
    log.info("creating issue for service " + serviceData.serviceName);
    let request = {
        u_short_descr: createHealthIssueSubject(serviceData),
        u_caller_id: 'TUBBEST1',    // Whos ocnet-id should be used?
        u_error_type: "\\OCSEFTP01\prod\Kundin\ssrca",	// List of error_types?
        //u_service: 'iPost Sweden',  // service needed?
        u_priority: serviceData['sev'],
        u_det_descr: createHealthIssueBody(serviceData),
        u_customer_id: 'OpusCapita' // TODO: what id are we using here?
    };
    return sendServiceNowRequest(request);
};

let createHealthIssueSubject = function (serviceData) {
    return helper.renderTemplate(`${__dirname}/templates/health_subject.njk`, serviceData);
};

let createHealthIssueBody = function (serviceData) {
    serviceData['raw'] = JSON.stringify(serviceData['raw']);
    return helper.renderTemplate(`${__dirname}/templates/health_body.njk`, serviceData);
};

let sendServiceNowRequest = function (request) {
    return config.getProperty(['servicenow-api-user', 'servicenow-api-password', 'servicenow-api-uri'])
        .then(cred => createSoapClient(cred[0], cred[1], cred[2]))
        .then(client => doServiceNowInsert(client, request))
};


let getSevState = function (serviceData) {
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

let getServiceHealth = function () {
    return config.consul.catalog.services()
        .then((services) => Object.keys(services))
        .then((serviceNames) =>
            Promise.all(
                serviceNames.map((service) =>
                    config.consul.health.service({service: service})
                )
            )
        );
};

let createSoapClient = function (user, password, uri) {
    let auth = "Basic " + new Buffer(`${user}:${password}`).toString("base64");
    return new Promise((resolve, reject) => {
        soap.createClient(uri, {wsdl_headers: {Authorization: auth}}, (wsdlError, client) => {
            if (wsdlError) {
                return reject(wsdlError);
            } else {
                client.setSecurity(new soap.BasicAuthSecurity(user, password));
                return resolve(client)
            }
        });
    })
};

let doServiceNowInsert = function (client, request) {
    return new Promise((resolve, reject) => {
        client.insert(request, (soapError, soapResponse) => {
            if (soapError) {
                return reject(soapError)
            } else {
                return resolve(soapResponse)
            }
        });
    })
};
