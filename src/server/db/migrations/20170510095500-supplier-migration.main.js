const Sequelize = require("sequelize");

module.exports = {

  up: function(db) {
    var queryInterface = db.getQueryInterface();

    return Promise.all([
      queryInterface.renameTable('SIMSupplier', 'Supplier'),
      queryInterface.renameTable('SIMSupplierContact', 'SupplierContact'),
      queryInterface.renameTable('SIMAddress', 'SupplierAddress')
    ]);
  },

  down: function(db) {

    var queryInterface = db.getQueryInterface();

    return Promise.all([
      queryInterface.renameTable('Supplier', 'SIMSupplier'),
      queryInterface.renameTable('SupplierContact', 'SIMSupplierContact'),
      queryInterface.renameTable('SupplierAddress', 'SIMAddress')
    ]);
  }
};
