'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const Promise = require('bluebird');

const SupplierAddress = require('./SupplierAddress');
const SupplierBankAccount = require('./SupplierBankAccount');
const Certification = require('./Certification');
const CertificationGroup = require('./CertificationGroup');
const Supplier = require('./Supplier');
const SupplierCertification = require('./SupplierCertification');
const SupplierContact = require('./SupplierContact');
const SupplierFinancials = require('./SupplierFinancials');
const TradingPartner = require('./TradingPartner');

module.exports.init = function(db, config)
{
  // Register Sequelize database models here.
  // Use require in order to separate models into multiple js files.
  // http://docs.sequelizejs.com/en/latest/api/model/
  //
  // db.define(...);

  db.import('SupplierAddress', SupplierAddress);
  db.import('SupplierBankAccount', SupplierBankAccount);
  db.import('Certification', Certification);
  db.import('CertificationGroup', CertificationGroup);
  db.import('Supplier', Supplier);
  db.import('SupplierCertification', SupplierCertification);
  db.import('SupplierContact', SupplierContact);
  db.import('SupplierFinancials', SupplierFinancials);
  db.import('TradingPartner', TradingPartner);

  // Always return a promise.
  return Promise.resolve();
};
