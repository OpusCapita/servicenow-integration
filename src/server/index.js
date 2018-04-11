'use strict';

const server = require('@opuscapita/web-init'); // Web server
const db = require('@opuscapita/db-init'); // Database
const config = require('@opuscapita/config');
const Logger = require('ocbesbn-logger'); // Logger
const log = new Logger({
    context: {
        serviceName: 'servicenow-integration'
    }
});

log.redirectConsoleOut(); // Force anyone using console outputs into Logger format.

db.init({
    mode: db.Mode.Dev,
    retryTimeout: 2500,
    retryCount: 60,
    consul: {
        host: 'consul'
    },
    data: {
        addTestData: true
    }
}).then(db => server.init({
    server: {
        port: 3016,
        mode: server.Server.Mode.Dev,
        events: {
            onStart: async () => {
                await config.init({});
                await log.info('Server up and running!');
            }
        },
        enableBouncer: false
    },
    routes: {
        dbInstance: db
    }
})).catch(error => {
    server.end();
    throw error;
});
