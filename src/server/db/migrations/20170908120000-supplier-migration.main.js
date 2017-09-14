const Sequelize = require("sequelize");

module.exports = {

  up: function(db) {
    var queryInterface = db.getQueryInterface();

    return Promise.all([
      queryInterface.addIndex('Supplier', ['SupplierName'], { indexName: 'SupplierNameIndex', indicesType: 'FULLTEXT' }),
      queryInterface.addIndex('Supplier', ['CommercialRegisterNo'], { indexName: 'SupplierCommercialRegisterNoIndex', indicesType: 'FULLTEXT' }),
      queryInterface.addIndex('Supplier', ['CityOfRegistration'], { indexName: 'SupplierCityOfRegistrationIndex', indicesType: 'FULLTEXT' }),
      queryInterface.addIndex('Supplier', ['VatIdentificationNo'], { indexName: 'SupplierVatIdentificationNoIndex', indicesType: 'FULLTEXT' }),
      queryInterface.addIndex('Supplier', ['TaxIdentificationNo'], { indexName: 'SupplierTaxIdentificationNoIndex', indicesType: 'FULLTEXT' }),
      queryInterface.addIndex('Supplier', ['DUNSNo'], { indexName: 'SupplierDUNSNoIndex', indicesType: 'FULLTEXT' })
    ]);
  },

  down: function(db) {

    var queryInterface = db.getQueryInterface();

    return Promise.all([
      queryInterface.removeIndex('Supplier', 'SupplierNameIndex'),
      queryInterface.removeIndex('Supplier', 'SupplierCommercialRegisterNoIndex'),
      queryInterface.removeIndex('Supplier', 'SupplierCityOfRegistrationIndex'),
      queryInterface.removeIndex('Supplier', 'SupplierVatIdentificationNoIndex'),
      queryInterface.removeIndex('Supplier', 'SupplierTaxIdentificationNoIndex'),
      queryInterface.removeIndex('Supplier', 'SupplierDUNSNoIndex')
    ]);
  }
};
