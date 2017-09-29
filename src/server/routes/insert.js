'use strict';
const helper = require('./helper');
const md5 = require('md5');
const fs = require('fs');
const soap = require('soap');
const config = require('ocbesbn-config');
const Logger = require('ocbesbn-logger'); // Logger
const log = new Logger({
    context: {
        serviceName: 'servicenow-integration'
    }
});
let cachedSoapCredentials;
module.exports = function (app, db, config) {
    app.get('/', (req, res) => res.send('I am in insert.js'));
    app.get('/api/health-checks', async (req, res) => {
        let result = getServiceInformation();
        let services = await result;  // await disarms the async call
        if (services) {
            res.status(200).send('OK ' + JSON.stringify(await processHealthChecks(services)));
        } else {
            res.status(500).send('Something bad happened :(');
        }
    });
};

/**
 * summarizes service-information regarding passed health-checks
 * @param services
 * @returns Object {service1:{total: s1T , passing: s1P}}
 */
let processHealthChecks = function (services) {
    let issuedServices = {};
    log.info(services);
    for (let i in services) {
        try {
            let currentService = services[i];
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
            let sev = 0;
            const serviceData = {
                serviceName: serviceName,
                total: totalChecks,
                passed: passingChecks,
                deploying : currentDeployments,
                raw: currentService
            };
            log.info(md5(JSON.stringify(serviceData)));
            sev = getSevState(serviceData);
            if (sev > 0) {
                createHealthIssue(serviceData, sev);
                issuedServices[serviceData.serviceName] = sev;
            }
        } catch (e) {
            log.error(e);
        }
    }
    return issuedServices;
};

let checkDeployments = function(serviceData){

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

let createHealthIssue = function (serviceData, sev) {
    log.info("creating issue for service " + serviceData.serviceName);
    let request = {
        u_short_descr: createHealthIssueSubject(serviceData),
        u_caller_id: 'TUBBEST1',    // Whos ocnet-id should be used?
        u_error_type: "\\OCSEFTP01\prod\Kundin\ssrca",	// List of error_types?
        //u_service: 'iPost Sweden',  // service needed?
        u_priority: sev,
        u_det_descr: createHealthIssueBody(serviceData),
        u_customer_id: 'OpusCapita' // TODO: what id are we using here?
    };
    createIssue(request);
};

let createHealthIssueSubject = function (service) {
    return helper.renderTemplate(`${__dirname}/templates/health_subject.njk`, service);
};

let createHealthIssueBody = function (service) {
    service['raw'] = JSON.stringify(service['raw']);
    return helper.renderTemplate(`${__dirname}/templates/health_body.njk`, service);
};

let createEscalationIssue = function (ee) {
    log.info("creating escalation issue!");
    let request = {
        u_short_descr: createEscalationIssueSubject(ee),
        u_caller_id: 'TUBBEST1',    // Whos ocnet-id should be used?
        u_error_type: "\\OCSEFTP01\prod\Kundin\ssrca",	// List of error_types?
        //u_service: 'iPost Sweden',  // service needed?
        u_priority: 1,
        u_det_descr: createEscalationIssueBody(ee),
        u_customer_id: 'OpusCapita' // TODO: what id are we using here?
    };
    createIssue(request);
};

let createEscalationIssueSubject = function (ee) {
    return helper.renderTemplate(`${__dirname}/templates/escalation_subject.njk`, ee);
};

let createEscalationIssueBody = function (ee) {
    return helper.renderTemplate(`${__dirname}/templates/escalation_body.njk`, ee);
};

/**
 * Method that calls consul-health api for information
 * @returns {Promise.<TResult>} - [[Service-1], [Service-2]]
 */
let getServiceInformation = async function () {
    return config.consul.catalog.services()
        .then((services) => Object.keys(services))
        .then((serviceNames) => Promise.all(serviceNames.map(
            (name) => config.consul.health.service({service: name}))))
        .then((it) => it)
        .catch((error) => {
            log.error(error);
            createEscalationIssue(new EscalationException('Consul down!', error));
        });
};

/**
 * Function to create service-now issues by using soap-interface
 * @param request - request-param --> requestBody.body is used as SOAP-request body.
 */
let createIssue = function (request) {
    log.info('creating issue');
    getSoapCredentials()
        .then((cred) => {
            let auth = "Basic " + new Buffer(`${cred[0]}:${cred[1]}`).toString("base64");
            soap.createClient(cred[2], {wsdl_headers: {Authorization: auth}}, function (wsdlError, client) {
                if (wsdlError) {
                    log.error(`WSDL-ERROR`);
                    log.error(wsdlError);
                } else {
                    client.setSecurity(new soap.BasicAuthSecurity(cred[0], cred[1]));
                    client.insert(request, function (soapError, soapResponse) {
                        if (soapError) {
                            log.error(`SOAP-ERROR:`);
                            log.error(soapError);
                        } else {
                            log.info(soapResponse);
                        }
                    });
                }
            });
        })
        .catch((error) => {
            // TODO: consul dead == no credentials!
            // TODO: save them in memory ?
            log.error(error);
        })
};

let getSoapCredentials = function () {
    return config.getProperty(['servicenow-api-user', 'servicenow-api-password', 'servicenow-api-uri'])
        .catch((error) => {
            log.error(error);
            if (cachedSoapCredentials) {
                log.info('taking soap credentials from memory!');
                return cachedSoapCredentials;
            }
        })
        .then((credentials) => {
            if (!cachedSoapCredentials) {
                log.info('saving soap credentials into memory');
                cachedSoapCredentials = credentials;
            }
            return credentials
        })
        .then((it) => it);
};


/////// Classes
class EscalationException {
    constructor(reason, error) {
        this.reason = reason;
        this.error = error;
    }
}