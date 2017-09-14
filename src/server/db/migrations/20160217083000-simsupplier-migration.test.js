'use strict';

const Promise = require('bluebird');
const pathjs = require('path');
const path = pathjs.resolve(__dirname + '/../data');

const supplierAddressData = require(path + '/supplierAddress.json');
const supplierData = require(path + '/supplier.json');
const supplierContactData = require(path + '/supplierContact.json');
const user2SupplierData = require(path + '/user2supplier.json');

/**
 * Inserts test data into existing database structures.
 * If all migrations were successul, this method will never be executed again.
 * To identify which migrations have successfully been processed, a migration's filename is used.
 *
 * @param {object} data - [Sequelize]{@link https://github.com/sequelize/sequelize} instance.
 * @param {object} config - A model property for database models and everything from [config.data]{@link https://github.com/OpusCapitaBusinessNetwork/db-init} passed when running the db-initialization.
 * @returns {Promise} [Promise]{@link http://bluebirdjs.com/docs/api-reference.html}
 * @see [Applying data migrations]{@link https://github.com/OpusCapitaBusinessNetwork/db-init#applying-data-migrations}
 */
module.exports.up = function(db, config)
{
  return db.queryInterface.bulkInsert('SIMSupplier', supplierData)
  .then(() => Promise.all([
    db.queryInterface.bulkInsert('SIMAddress', supplierAddressData),
    db.queryInterface.bulkInsert('SIMSupplierContact', supplierContactData),
    db.queryInterface.bulkInsert('CatalogUser2Supplier', user2SupplierData)
  ]));
};

/**
 * Reverts all migrations for databse tables and data.
 * If the migration process throws an error, this method is called in order to revert all changes made by the up() method.
 *
 * @param {object} data - [Sequelize]{@link https://github.com/sequelize/sequelize} instance.
 * @param {object} config - A model property for database models and everything from [config.data]{@link https://github.com/OpusCapitaBusinessNetwork/db-init} passed when running the db-initialization.
 * @returns {Promise} [Promise]{@link http://bluebirdjs.com/docs/api-reference.html}
 * @see [Applying data migrations]{@link https://github.com/OpusCapitaBusinessNetwork/db-init#applying-data-migrations}
 */
module.exports.down = function(db, config)
{
  return Promise.all([
    db.queryInterface.bulkDelete('CatalogUser2Supplier', { supplierId: { $in: user2SupplierData.map(rec => rec.supplierId) } }),
    db.queryInterface.bulkDelete('SIMSupplierContact', { contactId: { $in: supplierContactData.map(rec => rec.contactId) } })
  ]).then(() => Promise.all([
    db.queryInterface.bulkDelete('SIMSupplier', { supplierId: { $in: supplierData.map(rec => rec.supplierId) } }),
    db.queryInterface.bulkDelete('SIMAddress', { addressId: { $in: supplierAddressData.map(rec => rec.addressId) } })
  ]));
};
