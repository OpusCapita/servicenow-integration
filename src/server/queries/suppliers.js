const Promise = require('bluebird');
const stringHelper = require('../utils/string');

module.exports.init = function(db, config)
{
  db.models.Supplier.hasMany(db.models.SupplierContact, { foreignKey: 'supplierId', sourceKey: 'supplierId' });
  db.models.Supplier.hasMany(db.models.SupplierAddress, { foreignKey: 'supplierId', sourceKey: 'supplierId' });
  db.models.Supplier.hasMany(db.models.SupplierBankAccount, { foreignKey: 'supplierId', sourceKey: 'supplierId' });

  this.db = db;
  return Promise.resolve(this);
};

module.exports.all = function(queryObj, includes)
{
  const includeModels = associationsFromIncludes(this.db.models, includes);

  return this.db.models.Supplier.findAll({ where: queryObj, include: includeModels }).map(supplier => {
    return supplierWithAssociations(supplier);
  });
};

module.exports.find = function(supplierId, includes)
{
  const includeModels = associationsFromIncludes(this.db.models, includes);

  return this.db.models.Supplier.findOne({where: { supplierId: supplierId }, include: includeModels}).then(supplier => {
    return supplierWithAssociations(supplier);
  });
};

module.exports.create = function(supplier)
{
  normalize(supplier);

  const self = this;
  let supplierId = supplier.supplierName.replace(/[^0-9a-z_\-]/gi, '').slice(0, 27);

  function generateSupplierId(id) {
    return self.exists(id).then(exists => {
      if (exists) {
        return generateSupplierId(supplierId + randomNumber());
      } else {
        return id;
      }
    });
  }

  return generateSupplierId(supplierId).then(id => {
    supplier.supplierId = id;
    supplier.role = 'selling';
    return this.db.models.Supplier.create(supplier);
  });
};

module.exports.update = function(supplierId, supplier)
{
  normalize(supplier);

  let self = this;
  return this.db.models.Supplier.update(supplier, { where: { supplierId: supplierId } }).then(() => {
    return self.find(supplierId, []);
  });
};

module.exports.delete = function(supplierId)
{
  return this.db.models.Supplier.destroy({ where: { supplierId: supplierId } }).then(() => null);
};

module.exports.exists = function(supplierId)
{
  return this.db.models.Supplier.findById(supplierId).then(supplier => Boolean(supplier));
};

module.exports.searchRecord = function(query)
{
  normalize(query);

  let rawQueryArray = [];

  if (query.supplierName) rawQueryArray.push(equalSQL('SupplierName', query.supplierName));
  if (query.vatIdentificationNo) rawQueryArray.push(similar('VatIdentificationNo', query.vatIdentificationNo));
  if (query.dunsNo) rawQueryArray.push(similar('DUNSNo', query.dunsNo));
  if (query.globalLocationNo) rawQueryArray.push(equalSQL('GlobalLocationNo', query.globalLocationNo));

  if (query.commercialRegisterNo) {
    const commercialRegisterNoQuery = [
      similar('CommercialRegisterNo', query.commercialRegisterNo),
      similar('CityOfRegistration', query.cityOfRegistration),
      equalSQL('CountryOfRegistration', query.countryOfRegistration)
    ].join(' AND ');
    rawQueryArray.push(`(${commercialRegisterNoQuery})`);
  }

  if (query.taxIdentificationNo) {
    const taxIdentificationNoQuery = [
      similar('TaxIdentificationNo', query.taxIdentificationNo),
      equalSQL('CountryOfRegistration', query.countryOfRegistration)
    ].join(' AND ');
    rawQueryArray.push(`(${taxIdentificationNoQuery})`);
  }

  let rawQuery = rawQueryArray.length > 1 ? '(' + rawQueryArray.join(' OR ') + ')' : rawQueryArray[0];

  if (query.supplierId) rawQuery = rawQuery + ` AND SupplierID != '${query.supplierId}'`;

  const rawAttributes = this.db.models.Supplier.rawAttributes;
  const attributes = Object.keys(rawAttributes).map(fieldName => `${rawAttributes[fieldName].field} AS ${fieldName}`).join(', ');

  return this.db.query(
    `SELECT ${attributes} FROM Supplier WHERE ${rawQuery} LIMIT 1`,
    { model:  this.db.models.Supplier }
  ).then(suppliers => suppliers[0]);
};

module.exports.recordExists = function(supplier)
{
  return this.searchRecord(supplier).then(supplier => Boolean(supplier));
};

module.exports.isAuthorized = function(supplierId, changedBy)
{
  return this.db.models.Supplier.findById(supplierId).then(supplier => supplier && supplier.changedBy === changedBy);
};

let randomNumber = function()
{
  return Math.floor((Math.random() * 1000));
};

let associationsFromIncludes = function(dbModels, includes)
{
  const associations = {
    contacts: dbModels.SupplierContact,
    addresses: dbModels.SupplierAddress,
    bankAccounts: dbModels.SupplierBankAccount
  };

  let includeModels = [];

  for (const association of includes) {
    if (associations[association]) includeModels.push(associations[association]);
  }

  return includeModels;
}

let supplierWithAssociations = function(supplier)
{
  if (!supplier) return supplier;

  supplier.dataValues.contacts = supplier.SupplierContacts;
  supplier.dataValues.addresses = supplier.SupplierAddresses;
  supplier.dataValues.bankAccounts = supplier.SupplierBankAccounts;

  delete supplier.dataValues.SupplierContacts;
  delete supplier.dataValues.SupplierAddresses;
  delete supplier.dataValues.SupplierBankAccounts;

  return supplier.dataValues;
}

let normalize = function(supplier)
{
  if (supplier.vatIdentificationNo) supplier.vatIdentificationNo = supplier.vatIdentificationNo.replace(/\s+/g, '');
  for (const fieldName of ['supplierName', 'commercialRegisterNo', 'cityOfRegistration', 'taxIdentificationNo']) {
    if (supplier[fieldName]) supplier[fieldName] = supplier[fieldName].trim();
  }
}

let similar = function(fieldName, value)
{
  /* Min length for MATCH is 4 */
  if (value.length > 4) return matchSQL(fieldName, value);

  return equalSQL(fieldName, value);
}

let matchSQL = function(fieldName, value)
{
  return `MATCH (${fieldName}) AGAINST ('${value}')`;
}

let equalSQL = function(fieldName, value)
{
  return `${fieldName} = '${value}'`;
}
