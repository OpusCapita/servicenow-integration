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
    app.post('/api/servicenow/insert', (req, res) => {
        let result = createIssue(req, res);
        res.status(result.statusId).send(result);
    });
    app.get('/api/servicenow/services', (req, res) => {
        let result = checkServices();
        res.status(result.statusId).send(result);
    });
};

let checkServices = function () {
    let resp = new ResponseStatus(500, '', '');
    config.consul.catalog.services()
        .then((it) => {
            Object.keys(it)
                .forEach(function (serviceName) {
                    // without the {passing: true} param, this should return all Nodes
                    config.consul.health.service({service: serviceName})
                        .then((data) => {
                            // log.info(data);
                            for(let node in data){
                                let currentNode = data[node];
                                let totalChecks = currentNode.Checks.length;
                                let passingChecks = 0;
                                for(let check in currentNode.Checks){
                                    let currentCheck = currentNode.Checks[check];
                                    if(currentCheck.Status = 'passing')
                                        passingChecks++;
                                }
                                log.info(`${serviceName} has ${totalChecks} Nodes! \n ${passingChecks} of ${totalChecks} health-checks passed`);
                                //log.info(currentNode.Checks);
                            }
                            resp =  new ResponseStatus(200, 'SUCCESS', null);
                        })
                        .catch((error) => {
                            log.error(error);
                            resp = new ResponseStatus(500, 'CONSUL-API-ERROR', error);
                        })
                });
        })
        .catch((error) => {
            log.error(error);
            resp = new ResponseStatus(500, 'UNKNOWN', error);
        });
    return resp;
};
/**
 * Function to create service-now issues by using soap-interface
 * @param requestBody - request-param --> requestBody.body is used as SOAP-request body.
 */
let createIssue = function (requestBody) {
    config.getProperty(['servicenow-api-user', 'servicenow-api-password', 'servicenow-api-uri'])
        .then((cred) => {
            let auth = "Basic " + new Buffer(`${cred[0]}:${cred[1]}`).toString("base64");
            soap.createClient(cred[2], {wsdl_headers: {Authorization: auth}}, function (wsdlError, client) {
                if (wsdlError) {
                    log.error(`WSDL-ERROR: \n${wsdlError}`);
                    return new ResponseStatus(500, "WSDL, null");
                } else {
                    client.setSecurity(new soap.BasicAuthSecurity(cred[0], cred[1]));
                    client.insert(getRequestData(requestBody), function (soapError, soapResponse) {
                        if (soapError) {
                            log.error(`SOAP-ERROR: \n${soapError}`);
                            return new ResponseStatus(500, "SOAP", null);
                        } else {
                            log.info(soapResponse);
                            return new ResponseStatus(200, null, `Servicenow-Ticketnumber: ${soapResponse.display_value}`);
                        }
                    });
                }
            });
        })
        .catch((error) => {
            log.error(error);
            return new ResponseStatus(500, "UNKNOWN", null);
        });
};

let getRequestData = function (_req) { // TODO: replace dummy-data with request-data and data from middleware (Customer,  User, etc...)
    let inputJSON;
    if (_req.body) {
        try {
            inputJSON = JSON.parse(_req.body);
            return inputJSON;
        } catch (e) {
            log.error("input could not be parsed into JSON: " + e.message);
        }
    }
    return {
        u_short_descr: 'short desc is short',
        u_caller_id: getUserField(_req, 'email', 'Stefan.Tubben@opuscapita.com'),
        u_error_type: "\\OCSEFTP01\prod\Kundin\ssrca",	// List of error_types?
        u_service: 'iPost Sweden',
        u_priority: '3',
        u_det_descr: 'det_descr',
        u_customer_id: getUserField(_req, 'customerid', 'OpusCapita') // TODO: what id are we using here?
    }
};

let getUserField = function (_req, field, default_value) {
    let value = _req.opuscapita.userData(field);
    if (!value && default_value) {
        value = default_value;
    }
    if (!value) {
        log.warn(`Could not find value for field (${field}) - neither was a default-value given`);
        value = '';
    }
    return value
};

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
