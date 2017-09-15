const RedisEvents = require('ocbesbn-redis-events');    // what is this?
const soap = require('soap');

module.exports =  function(app, db, config){
    app.post('/api/servicenow-integration/insert', (req, res) => createIssue(req, res));

};

let createIssue = function (req, res) {
    const newIssue = buildIssue(req.body);
    const url = './u_evm_inbound.wsdl';     // TODO: try url and fallback to file?
    soap.createClient(url, function (err, client) {
        if (err) {
            handleWSDLError(err);
        } else {
            client.setSecurity(new soap.BasicAuthSecurity('user', 'pw'));   // TODO: get credentials?
            client.insert(newIssue, function (err, result) {
                if (err) {
                    handleSOAPError(err);
                } else {
                    handleResponse(result);
                }
            });
        }
    });

    function handleResponse(response) {
        switch (response.status) {
            case 'error':
                console.log(response.error_message);
                break;
            case 'ignored':
                console.log("insert was ignored");
                break;
            case 'inserted':
                console.log("new issue-id: " + response.display_value);
                break;
            default:
                console.log(response);
        }
        console.log("---");
        console.log(response);
    }

    function handleWSDLError(err) {
        console.log(err)
    }

    function handleSOAPError(err) {
        console.log(err)
    }
};