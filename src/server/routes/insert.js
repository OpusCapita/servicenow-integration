'use strict';
const config = require('ocbesbn-config');
const Logger = require('ocbesbn-logger'); // Logger
const soap = require('soap');
const log = new Logger({
    context: {
        serviceName: 'servicenow-integration'
    }
});
let cachedCredentials = [];

module.exports = function (app, db, config) {
    app.get('/',
        (req, res) => res.send('Welcome to servicenow-integration')
    );
    app.post('/api/insert',
        (req, res) => handleInsertByApi(req)
            .then(result => res.send(result))
            .catch(error => res.status(500).send(error))
    );
};

const handleInsertByApi = function (req) {
    return new Promise((resolve, reject) => {
        try {
            let request = validateCustomRequest(req.body);
            return resolve(sendServiceNowRequest(request));
        } catch (error) {
            log.error(error);
            return reject(error.message);
        }
    });
};

const validateCustomRequest = function (request) {
    const mandatoryFields = ['shortdesc', 'longdesc', 'prio', 'customer', 'service', 'assignmentgroup'];
    const assignmentGroupMapping = {
        'plattform': 'OC CS GLOB Service Desk AM',
    };
    const result = {};
    let mandatory_errors = mandatoryFields.filter(
        field => Object.keys(request).indexOf(field) === -1
            || !request[field]);

    let errors = [];
    // prio
    if (!request['prio'] || !['1', '2', '3'].includes(request['prio']))
        errors.push(`Field prio not valid: ${request['prio']}. \nPlease use value out of [1,2,3]`);
    else
        result['u_priority'] = request['prio'];

    // assignmentgroup
    if (!request['assignmentgroup'] || !assignmentGroupMapping[request['assignmentgroup']])
        errors.push(`Field assignmentgroup could not be mapped internally. \nPlease use one of those: ${JSON.stringify(assignmentGroupMapping)}`);
    else
        result['u_assignment_group'] = assignmentGroupMapping[request['assignmentgroup']];

    // mapping missing mandatory fields to error-messages
    mandatory_errors = mandatory_errors.map(error => `field ${error} is not valid: ${request[error]}`);

    let totalErrors = mandatory_errors.concat(errors);
    if (totalErrors.length > 0)
        throw new Error(JSON.stringify(totalErrors));

    result['u_short_descr'] = request['shortdesc'];
    result['u_det_descr'] = request['longdesc'];
    result['u_service'] = request['service'];
    // TODO: caller_id should be technical account
    result['u_caller_id'] = 'TUBBEST1';
    result['u_error_type'] = "\\OCSEFTP01\prod\Kundin\ssrca";   // incident

    log.info(`Translated custom-request: ${JSON.stringify(result)}`);
    return result;
};

module.exports.doInsert = function (request) {
    return sendServiceNowRequest(request);
};

const sendServiceNowRequest = function (request) {
    return getSoapCredentials()
        .then(cred => createSoapClient(cred[0], cred[1], cred[2]))
        .then(client => doServiceNowInsert(client, request));
};

const createSoapClient = function (user, password, uri) {
    let auth = "Basic " + new Buffer(`${user}:${password}`).toString("base64");
    return new Promise((resolve, reject) => {
        soap.createClient(uri, {wsdl_headers: {Authorization: auth}}, (error, client) => {
            if (error) {
                log.error(error);
                return reject(error);
            } else {
                client.setSecurity(new soap.BasicAuthSecurity(user, password));
                return resolve(client)
            }
        });
    })
};

const doServiceNowInsert = function (client, request) {
    return new Promise((resolve, reject) => {
        if (!client)
            return reject('no client for request');
        client.insert(request, (error, response) => {
            if (error) {
                log.error(error);
                return reject(error)
            } else {
                return resolve(response)
            }
        });
    });
};

const getSoapCredentials = function () {
    return config.getProperty(['servicenow-api-user', 'servicenow-api-password', 'servicenow-api-uri'])
        .catch(error => {
            log.error(error);
            if (cachedCredentials) {
                log.info('taking soap credentials from memory');
                return cachedCredentials;
            }
        })
        .then(credentials => {
            if (!cachedCredentials) {
                log.info('saving soap credentials into memory');
                cachedCredentials = credentials;
            }
            return credentials
        });
};
