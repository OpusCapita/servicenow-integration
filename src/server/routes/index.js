'use strict';

const Promise = require('bluebird');

const suppliers = require('./suppliers');
const supplierContacts = require('./supplier_contacts');
const supplierAddresses = require('./supplier_addresses');
const supplierBanks = require('./supplier_banks');
const supplierProfileStrength = require('./supplier_profile_strength');

/**
 * Initializes all routes for RESTful access.
 *
 * @param {object} app - [Express]{@link https://github.com/expressjs/express} instance.
 * @param {object} db - If passed by the web server initialization, a [Sequelize]{@link https://github.com/sequelize/sequelize} instance.
 * @param {object} config - Everything from [config.routes]{@link https://github.com/OpusCapitaBusinessNetwork/web-init} passed when running the web server initialization.
 * @returns {Promise} [Promise]{@link http://bluebirdjs.com/docs/api-reference.html}
 * @see [Minimum setup]{@link https://github.com/OpusCapitaBusinessNetwork/web-init#minimum-setup}
 */
module.exports.init = function(app, db, config) {
  suppliers(app, db, config);
  supplierContacts(app, db, config);
  supplierAddresses(app, db, config);
  supplierBanks(app, db, config);
  supplierProfileStrength(app, db, config);
  return Promise.resolve();
};
