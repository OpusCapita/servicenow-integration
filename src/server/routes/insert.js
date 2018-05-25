'use strict';
const config = require('@opuscapita/config');
const Logger = require('ocbesbn-logger'); // Logger
const soap = require('soap');
const log = new Logger({
    context: {
        serviceName: 'servicenow-integration'
    }
});
let cachedSoapCredentials;

module.exports = function (app, db, config) {
    app.get('/',
        (req, res) => res.send('Welcome to servicenow-integration')
    );
    app.post('/api/insert',
        (req, res) => handleInsertByApi(req)
            .then(result => res.status(200).json(result))
            .catch(error => {
                res.status(400).json({message: error.message});
            })
    );
};

const handleInsertByApi = function (req) {
    return new Promise((resolve, reject) => {
        let request = validateCustomRequest(req.body);
        return resolve(sendServiceNowRequest(request));
    });
};

const validateCustomRequest = function (request) {
    const mandatoryFields = ['shortdesc', 'longdesc', 'prio', 'customer', 'assignmentgroup'];
    const assignmentGroupMapping = require('./utility/groupMapping');
    const result = {};
    let missingMandatoryFields = mandatoryFields.filter(
        field => Object.keys(request).indexOf(field) === -1
            || !request[field]);

    let errors = [];
    // prio
    if (!request['prio'] || !['1', '2', '3', 1, 2, 3].includes(request['prio']))
        errors.push(`field prio not valid: ${request['prio']}. \nPlease use value out of [1,2,3]`);
    else
        result['u_priority'] = request['prio'];

    // assignmentgroup
    if (!request['assignmentgroup'] || !assignmentGroupMapping[request['assignmentgroup']])
        errors.push(`field assignmentgroup (value was '${request['assignmentgroup'] ? request['assignmentgroup'] : "-missing-"}') could not be mapped internally. \nPlease use one of those: ${JSON.stringify(assignmentGroupMapping)}`);
    else
        result['u_assignment_group'] = assignmentGroupMapping[request['assignmentgroup']];

    // mapping missing mandatory fields to error-messages
    missingMandatoryFields = missingMandatoryFields.map(error => `field ${error} is mandatory`);

    let totalErrors = missingMandatoryFields.concat(errors);
    if (totalErrors.length > 0)
        throw new Error(JSON.stringify(totalErrors));

    result['u_short_descr'] = request['shortdesc'];
    result['u_det_descr'] = request['longdesc'];
    // result['u_service'] = request['service'];
    result['u_caller_id'] = 'bnp';
    result['u_error_type'] = "\\OCSEFTP01\prod\Kundin\ssrca";   // incident

    if(request['ciid']){
        result['u_ci'] = request['ciid'];
    }

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
    //log.info(`user: ${user}, password: ${password}, uri: ${uri}`);
    let auth = "Basic " + new Buffer(`${user}:${password}`).toString("base64");
    log.info(`auth: ${auth}`);
    return new Promise((resolve, reject) => {
        soap.createClient(uri, {wsdl_headers: {Authorization: auth}}, (error, client) => {
            if (error) {
                log.error(error);
                return reject(error);
            } else {
                client.setSecurity(new soap.BasicAuthSecurity(user, password));
                return resolve(client);
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
                return reject(error);
            } else {
                return resolve(response);
            }
        });
    });
};

const getSoapCredentials = function () {
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
        .then(it => it);
};
