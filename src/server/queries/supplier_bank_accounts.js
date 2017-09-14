'use strict';

const Promise = require('bluebird');

module.exports.init = function(db, config)
{
  this.db = db;

  return Promise.resolve(this);
};

module.exports.all = function(supplierId)
{
  return this.db.models.SupplierBankAccount.findAll({ where: { supplierId: supplierId } });
};

module.exports.find = function(supplierId, bankAccountId)
{
  return this.db.models.SupplierBankAccount.findOne({ where: { supplierId: supplierId, id: bankAccountId } });
};

module.exports.create = function(bankAccount)
{
  return this.db.models.SupplierBankAccount.create(bankAccount);
};

module.exports.update = function(supplierId, bankAccountId, bankAccount)
{
  let self = this;
  return this.db.models.SupplierBankAccount.update(bankAccount, { where: { id: bankAccountId } }).then(() => {
    return self.find(supplierId, bankAccountId);
  });
};

module.exports.delete = function(supplierId, bankAccountId)
{
  return this.db.models.SupplierBankAccount.destroy({ where: { supplierId: supplierId, id: bankAccountId } }).then(() => null);
};

module.exports.bankExists = function(supplierId, bankAccountId)
{
  return this.find(supplierId, bankAccountId).then(accounts => Boolean(accounts));
};
