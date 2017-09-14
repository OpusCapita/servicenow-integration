const Sequelize = require("sequelize");

module.exports = {

  up: function(db) {
    var queryInterface = db.getQueryInterface();

    return Promise.all([
      queryInterface.renameColumn('Supplier', 'VatRegNo', 'VatIdentificationNo'),
      queryInterface.renameColumn('Supplier', 'TaxID', 'TaxIdentificationNo'),
      queryInterface.renameColumn('Supplier', 'RegistrationNumber', 'CommercialRegisterNo')
    ]);
  },

  down: function(db) {

    var queryInterface = db.getQueryInterface();

    return Promise.all([
      queryInterface.renameColumn('Supplier', 'VatIdentificationNo', 'VatRegNo'),
      queryInterface.renameColumn('Supplier', 'TaxIdentificationNo', 'TaxID'),
      queryInterface.renameColumn('Supplier', 'CommercialRegisterNo', 'RegistrationNumber')
    ]);
  }
};
