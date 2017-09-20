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
    app.post('/api/servicenow-integration/insert', (req, res) => createIssue(req, res));

};

let createIssue = function (req, res) {
    const url = './u_evm_inbound.wsdl';
    soap.createClient(url, function (err, client) {
        if (err) {
            log.error(err);
        } else {
            client.setSecurity(getSoapCredentials());
            client.insert(req.body, function (err, result) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(result)
                }
            });
        }
    });
};

let getSoapCredentials = function () {
    let cred;
    config.getProperty(['servicenow-api-user', 'servicenow-api-password'])
        .then((it) => cred = new soap.BasicAuthSecurity(it))
        .catch(log.error('could not get credentials'));
    return cred;
};