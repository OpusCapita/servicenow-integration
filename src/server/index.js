'use strict';

const server = require('ocbesbn-web-init'); // Web server
const db = require('ocbesbn-db-init'); // Database
const config = require('ocbesbn-config');
// const bouncer = require('ocbesbn-bouncer');
const Logger = require('ocbesbn-logger'); // Logger
const log = new Logger({
    context: {
        serviceName: 'servicenow-integration'
    }
});

log.redirectConsoleOut(); // Force anyone using console outputs into Logger format.

db.init({
    mode: db.Mode.Dev,
    consul: {
        host: 'consul'
    },
    data: {
        addTestData: true
    }
})
    .then((db) => server.init({
        server: {
            port: 1234,
            mode: server.Server.Mode.Dev,
            events: {
                onStart: () => config.setProperty('servicenow-api-user', 'soap.user')
                    .then(() => config.setProperty('servicenow-api-password', 'secret!!!')
                        .then(() => log.info('Server up and running!'))
                        .catch((it) => log.error('Could not initialize api credentials' + it)))
                    .catch((it) => log.error(it))
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
