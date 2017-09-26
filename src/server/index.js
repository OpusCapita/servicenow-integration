'use strict';

const server = require('ocbesbn-web-init'); // Web server
const db = require('ocbesbn-db-init'); // Database
const config = require('ocbesbn-config');
const Logger = require('ocbesbn-logger'); // Logger
const log = new Logger({
    context: {
        serviceName: 'servicenow-integration'
    }
});

log.redirectConsoleOut(); // Force anyone using console outputs into Logger format.

db.init({
    mode: db.Mode.Dev,
    retryTimeout: 1000,
    retryCount: 10,
    consul: {
        host: 'consul'
    },
    data: {
        addTestData: true
    }
})
    .then((db) => server.init({
        server: {
            port: 3016,
            mode: server.Server.Mode.Dev,
            events: {
                onStart: () => config.init({})
                    .then(() => config.setProperty('servicenow-api-user', 'soap.event'))
                    .then(() => config.setProperty('servicenow-api-password', 'secret!!!'))
                    .then(() => config.setProperty('servicenow-api-uri', 'https://opusflowdev.service-now.com/u_evm_inbound.do?WSDL'))
                    .then(() => log.info('Server up and running!'))
                    .catch((it) => {
                        log.error(it);
                        log.error('Could not initiate service-now-credentials')
                    })
            }
        },
        routes: {
            dbInstance: db
        }
    }))
    .catch((e) => {
        server.end();
        throw e;
    });
