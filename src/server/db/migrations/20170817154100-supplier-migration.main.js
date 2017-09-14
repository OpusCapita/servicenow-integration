const Sequelize = require("sequelize");

module.exports = {

  up: function(db) {
    var queryInterface = db.getQueryInterface();

    return Promise.all([
      db.query('ALTER TABLE SupplierAddress DROP INDEX AddressID;').then(() => queryInterface.removeColumn('SupplierAddress', 'AddressID')),
      queryInterface.removeColumn('SupplierAddress', 'Salutation'),
      queryInterface.removeColumn('SupplierAddress', 'IsCompany'),
      queryInterface.renameColumn('SupplierAddress', 'AddressSN', 'ID'),
      queryInterface.renameColumn('SupplierAddress', 'Name1', 'Name'),
      queryInterface.renameColumn('SupplierAddress', 'Street', 'Street1'),
      queryInterface.renameColumn('SupplierAddress', 'Name2', 'Street2'),
      queryInterface.renameColumn('SupplierAddress', 'Name3', 'Street3'),
      queryInterface.renameColumn('SupplierContact', 'ContactId', 'ID'),
      db.query('ALTER TABLE SupplierBankAccount DROP INDEX BankAccountID;').then(() => queryInterface.removeColumn('SupplierBankAccount', 'BankAccountID'))
    ]);
  },

  down: function(db) {

    var queryInterface = db.getQueryInterface();

    return Promise.all([
      queryInterface.addColumn('SupplierAddress', 'AddressID', { type: Sequelize.STRING(50), allowNull: false, unique: true }),
      queryInterface.addColumn('SupplierAddress', 'Salutation'),
      queryInterface.addColumn('SupplierAddress', 'IsCompany'),
      queryInterface.renameColumn('SupplierAddress', 'ID', 'AddressSN'),
      queryInterface.renameColumn('SupplierAddress', 'Name', 'Name1'),
      queryInterface.renameColumn('SupplierAddress', 'Street1', 'Street'),
      queryInterface.renameColumn('SupplierAddress', 'Street2', 'Name2'),
      queryInterface.renameColumn('SupplierAddress', 'Street3', 'Name3'),
      queryInterface.renameColumn('SupplierContact', 'ID', 'ContactId'),
      queryInterface.addColumn('SupplierBankAccount', 'BankAccountID', { type: Sequelize.STRING(50), allowNull: false, unique: true })
    ]);
  }
};
