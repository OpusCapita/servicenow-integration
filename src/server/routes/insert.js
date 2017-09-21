const RedisEvents = require('ocbesbn-redis-events');    // what is this?
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
    app.post('/api/servicenow/insert', (req, res) => res.send(createIssue(req, res)));

};

let createIssue = function (req, res) {
    config.getProperty(['servicenow-api-user', 'servicenow-api-password', 'servicenow-api-uri'])
        .then((cred) => {
            //WSDL is password protected
            let auth = ("Basic " + new Buffer(cred[0] + ':' + cred[1]).toString("base64"));
            soap.createClient(cred[2], {wsdl_headers: {Authorization: auth}}, function (error, client) {
                if (error) {
                    throw error;
                } else {
                    let requestContent = getRequestData();
                    client.setSecurity(new soap.BasicAuthSecurity(cred[0], cred[1]));
                    client.insert(requestContent, function (error, result) {
                        if (error) {
                            throw error;
                        } else {
                            res.send(result)
                        }
                    });
                }
            });
        })
        .catch((error) => {
            log.error(error);
            return res.status('500').json({message: error.message});
        });
};
let getRequestData = function () {  // TODO: replace dummy-data with request-data and data from middleware (Customer,  User, etc...)
    return {
        u_short_descr: 'SOAP Test',
        u_caller_id: 'Stefan.Tubben@opuscapita.com',
        u_error_type: '\\OCSEFTP01\prod\Kundin\ssrca',	// List of error_types?
        u_service: 'iPost Sweden',
        u_priority: '3',
        u_det_descr: 'det_descr',
        u_customer_id: 'OpusCapita'
    }
};