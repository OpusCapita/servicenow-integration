'use strict'

const Promise = require('bluebird');

module.exports.init = function(db, config)
{
  this.db = db;

  return Promise.resolve(this);
};

module.exports.all = function(supplierId)
{
  return this.db.models.SupplierContact.findAll({ where: { supplierId: supplierId } });
};

module.exports.find = function(supplierId, contactId)
{
  return this.db.models.SupplierContact.findOne({
    where: { supplierId: supplierId, id: contactId }
  });
};

module.exports.create = function(contact)
{
  let contactId = contact.email;
  const db = this.db;

  function generateContactId(id) {
    return db.models.SupplierContact.findOne({ where: { id: id} }).then(contact => {
      if (contact) {
        return generateContactId(contactId + randomNumber());
      } else {
        return id;
      }
    });
  }

  return generateContactId(contactId).then(id => {
    contact.id = id;
    return db.models.SupplierContact.create(contact);
  });
};

module.exports.update = function(supplierId, contactId, contact)
{
  let self = this;
  return this.db.models.SupplierContact.update(contact, { where: { id: contactId } }).then(() => {
    return self.find(supplierId, contactId);
  });
};

module.exports.delete = function(supplierId, contactId)
{
  return this.db.models.SupplierContact.destroy({ where: { supplierId: supplierId, id: contactId } }).then(() => null);
};

module.exports.contactExists = function(supplierId, contactId)
{
  return this.find(supplierId, contactId).then(contact => Boolean(contact));
};

let randomNumber = function()
{
  return Math.floor((Math.random() * 1000));
};
