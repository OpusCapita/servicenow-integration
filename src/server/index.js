const Logger = require('ocbesbn-logger'); // Logger
const server = require('ocbesbn-web-init'); // Web server
const db = require('ocbesbn-db-init'); // Database
const bouncer = require('ocbesbn-bouncer');

const logger = new Logger();
logger.redirectConsoleOut(); // Force anyone using console outputs into Logger format.

const serverConfig = (db) => ({
  server: {
    staticFilePath: __dirname + '/static',
    port : process.env.PORT || 3001,
    middlewares : [bouncer({
      host : 'consul',
      serviceName : 'supplier',
      acl : require('./acl.json'),
      aclServiceName : 'acl'
    }).Middleware]
  },
  routes: {
    dbInstance: db
  },
  serviceClient : {
    injectIntoRequest : true,
    consul : {
      host : 'consul'
    }
  }
});

if (process.env.NODE_ENV !== 'test') {
  /* launch aplication */
  db.init({ consul : { host : 'consul' }, retryCount: 50 })
    .then((db) => server.init(serverConfig(db)))
    .catch((e) => { server.end(); throw e; });
}
