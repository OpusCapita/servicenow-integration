'use strict';
const soap = require('soap');
const config = require('ocbesbn-config');
const nunjucks = require('nunjucks');
const Logger = require('ocbesbn-logger'); // Logger
const log = new Logger({
    context: {
        serviceName: 'servicenow-integration'
    }
});
module.exports = function (app, db, config) {
    app.get('/', (req, res) => res.send('I am in insert.js'));
    app.get('/api/servicenow/services', async (req, res) => {
        let result = getServiceInformation();
        let services = await result;  // await disarms the async call
        if (services) {
            let issueNumbers = processServiceInformation(services);
            await issueNumbers;
            res.status(200).send('OK');
        } else {
            res.status(500).send('Something bad happened :(');
        }
    });
};

/**
 * summarizes service-information regarding passed health-checks
 * @param services
 * @returns {service1:{total: s1T , passing: s1P}
 */
let processServiceInformation = function (services) {
    let createdIssues = [];
    for (let i in services) {
        try {
            let currentService = services[i];
            let serviceName = currentService[0].Service.Service;
            let totalChecks = 0;
            let passingChecks = 0;
            for (let j in currentService) {
                let currentNode = currentService[j];
                const groupedChecks = groupBy(currentNode.Checks, check => check.Status);
                totalChecks += currentNode.Checks.length;
                passingChecks += groupedChecks.get('passing') === null ? 0 : groupedChecks.get('passing').length;
            }
            let sev = 0;
            const serviceData = {
                serviceName: serviceName,
                total: totalChecks,
                passed: passingChecks,
                raw: currentService
            };
            sev = getSevState(serviceData);
            if (sev > 0) {
                log.info("creating issue for service " + serviceName);
                let request = {
                    u_short_descr: createIssueSubject(serviceData),
                    u_caller_id: 'TUBBEST1',
                    u_error_type: "\\OCSEFTP01\prod\Kundin\ssrca",	// List of error_types?
                    u_service: 'iPost Sweden',
                    u_priority: sev,
                    u_det_descr: createIssueBody(serviceData),
                    u_customer_id: 'OpusCapita' // TODO: what id are we using here?
                };
                createIssue(request);
            }
        } catch (e) {
            log.error(e);
        }
    }
    return createdIssues;
};
let getSevState = function (serviceInfo) {
    // TODO: custom-rules per service
    log.info(serviceInfo);
    return 2
};

let createIssueSubject = function (service) {
    return nunjucks.render(__dirname + '/template/subject.njk', service);
};

let createIssueBody = function (service) {
    service['raw'] = JSON.stringify(service['raw']);
    return renderNunjucksTemplate(__dirname + '/template/issue.njk', service);
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
        .catch((error) => log.error(error));
};

/**
 * Function to create service-now issues by using soap-interface
 * @param request - request-param --> requestBody.body is used as SOAP-request body.
 */
let createIssue = async function (request) {
    let resp = new ResponseStatus(500, '', '');
    let wait4Me =  config.getProperty(['servicenow-api-user', 'servicenow-api-password', 'servicenow-api-uri'])
        .then((cred) => {
            let auth = "Basic " + new Buffer(`${cred[0]}:${cred[1]}`).toString("base64");
            soap.createClient(cred[2], {wsdl_headers: {Authorization: auth}}, async function (wsdlError, client) {
                if (wsdlError) {
                    log.error(`WSDL-ERROR: \n${wsdlError}`);
                    resp = new ResponseStatus(500, "WSDL", null);
                } else {
                    client.setSecurity(new soap.BasicAuthSecurity(cred[0], cred[1]));
                    client.insert(request, async function (soapError, soapResponse) {
                        if (soapError) {
                            log.error(`SOAP-ERROR: \n${soapError}`);
                            resp = new ResponseStatus(500, "SOAP", null);
                        } else {
                            log.info(soapResponse);
                            resp = new ResponseStatus(200, null, `Servicenow-Ticketnumber: ${soapResponse.display_value}`);
                        }
                    });
                }
            });
        })
        .catch((error) => {
            log.error(error);
            resp = new ResponseStatus(500, "UNKNOWN", null);
        })
        .then((it) => it);
    await wait4Me;
    return resp;
};

/////// Classes
/**
 * Class that holds status information
 */
class ResponseStatus {
    constructor(statusId, msg, additionalInfo) {
        this.statusId = statusId;
        this.msg = msg;
        this.additionalInfo = additionalInfo;
    }
}

////// Utility-Methods
/**
 *  Simple function to group listitems by the result of the keyGetter-method
 * @param list
 * @param keyGetter
 * @returns {Map}
 */
function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

function renderNunjucksTemplate(template, data) {
    nunjucks.configure({autoescape: false});
    return nunjucks.render(template, data);
}