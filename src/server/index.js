'use strict';

const Logger = require('ocbesbn-logger'); // Logger
const server = require('ocbesbn-web-init'); // Web server
const db = require('ocbesbn-db-init'); // Database

const bouncer = require('ocbesbn-bouncer');

const logger = new Logger({
    context: {
        serviceName: 'servicenow-integration'
    }
});

logger.redirectConsoleOut(); // Force anyone using console outputs into Logger format.

// TODO: bouncer middleware


// Basic database and web server initialization.
// See database : https://github.com/OpusCapitaBusinessNetwork/db-init
// See web server: https://github.com/OpusCapitaBusinessNetwork/web-init
// See logger: https://github.com/OpusCapita/logger
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
            mode: server.Server.Mode.Dev,
            events: {
                onStart: () => logger.info('Server ready. Allons-y!')
            },
            middlewares : [bouncer({
                host : 'consul',
                serviceName : 'servicenow-integration',
                acl : require('./acl.json'), // TODO: ??!
                aclServiceName : 'acl'
            }).Middleware]
        },
        routes: {
            dbInstance: db
        }
    }))
    .catch((e) => {
        server.end();
        throw e;
    });
