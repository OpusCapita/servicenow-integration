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
            .then((result) => res.send('TODO!'))
    );
};

let doHealthCheck = function () {
    getServices()
        .then((services) => getServiceHealth(services))
        .then((healthChecks) => {
            return new Promise((resolve, reject) => {
                let createsIssues = [];
                for (let i in healthChecks) {
                    try {
                        let currentService = healthChecks[i];
                        let serviceName = currentService[0].Service.Service;
                        let totalChecks = 0;
                        let passingChecks = 0;
                        let currentDeployments = checkDeployments(serviceName);
                        for (let j in currentService) {
                            let currentNode = currentService[j];
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
                        serviceData['sev'] = getSevState(serviceData);
                        if (serviceData['sev'] > 0) {
                            createHealthIssue(serviceData);
                        }
                    } catch (e) {
                        log.error(e);
                    }
                }
                resolve(createsIssues);
            });
        })
    // TODO: then(
};

let createHealthIssue = function (serviceData) {
    // TODO: render template
    // TODO: create request
    // TODO: send request

};

let checkDeployments = function (serviceName) {
    return false;
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

let getServices = function () {
    return config.consul.catalog.services();
};

let getServiceHealth = function (services) {
    return services
        .then((services) => Object.keys(services))
        .then((serviceNames) =>
            Promise.all(
                serviceNames.map((service) =>
                    config.consul.health.service({service: service})
                )
            )
        );
};

let sendServiceNowRequest = function (request) {
    return config.getProperty(['servicenow-api-user', 'servicenow-api-password', 'servicenow-api-uri'])
        .then((cred) => createSoapClient(cred[0], cred[1], cred[2]))
        .then((client) => doServiceNowInsert(client, request))
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

/// Classes
class ServiceNowInsertRequest {
    constructor(short_desc, long_desc, caller, error_type, service, prio, customer_id) {
        this.u_short_descr = short_desc;
        this.u_caller_id = caller;
        this.u_error_type = error_type; // "\\OCSEFTP01\prod\Kundin\ssrca"
        this.u_service = service; //'iPost Sweden'
        this.u_priority = prio;
        this.u_det_descr = long_desc;
        this.u_customer_id = customer_id;
    }
}