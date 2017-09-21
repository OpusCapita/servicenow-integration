const soap = require('soap');
const config = require('ocbesbn-config');
const Logger = require('ocbesbn-logger'); // Logger
const log = new Logger({
    context: {
        serviceName: 'servicenow-integration'
    }
});
module.exports = function (app, db, config) {
    app.get('/', (req, res) => res.send('I am in insert.js'));
    app.post('/api/servicenow/insert', (_req, _res) => createIssue(_req, _res));

};

let createIssue = function (_req, _res) {
    config.getProperty(['servicenow-api-user', 'servicenow-api-password', 'servicenow-api-uri'])
        .then((cred) => {
            let auth = "Basic " + new Buffer(`${cred[0]}:${cred[1]}`).toString("base64");
            soap.createClient(cred[2], {wsdl_headers: {Authorization: auth}}, function (wsdlError, client) {
                if (wsdlError) {
                    log.error(`WSDL-ERROR: \n${wsdlError}`);
                    _res.status('500').send(getResponseJSON(false, "WSDL", null));
                } else {
                    client.setSecurity(new soap.BasicAuthSecurity(cred[0], cred[1]));
                    client.insert(getRequestData(_req), function (soapError, soapResponse) {
                        if (soapError) {
                            log.error(`SOAP-ERROR: \n${soapError}`);
                            _res.status('500').send(getResponseJSON(false, "SOAP", null));
                        } else {
                            log.info(soapResponse);
                            _res.status('200').send(getResponseJSON(true, null, soapResponse.display_value));
                        }
                    });
                }
            });
        })
        .catch((error) => {
            log.error(error);
            _res.status('500').send(getResponseJSON(false, "UNKNOWN", null));
        });
};
let getRequestData = function (_req) {// TODO: replace dummy-data with request-data and data from middleware (Customer,  User, etc...)
    log.info(_req.body);
    return {
        u_short_descr: 'SOAP Test',
        u_caller_id: 'Stefan.Tubben@opuscapita.com',
        u_error_type: "\\OCSEFTP01\prod\Kundin\ssrca",	// List of error_types?
        u_service: 'iPost Sweden',
        u_priority: '3',
        u_det_descr: 'det_descr',
        u_customer_id: 'OpusCapita'
    }
};

let getResponseJSON = function (success, type, ticketnumber) {
    return {
        success: success,
        type: type,
        servicenow_ticketnumber: ticketnumber
    };
};