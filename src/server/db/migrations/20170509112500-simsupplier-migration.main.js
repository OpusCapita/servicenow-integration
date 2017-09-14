const Sequelize = require("sequelize");

module.exports = {

  up: function(db) {
    var queryInterface = db.getQueryInterface();

    return Promise.all([
      queryInterface.dropTable('CatalogUser2Supplier')
    ]);
  },

  down: function(db) {

    var queryInterface = db.getQueryInterface();

    return Promise.all([
      queryInterface.createTable('CatalogUser2Supplier', {
        loginName: {
          field: 'LoginName',
          type: Sequelize.STRING(50),
          primaryKey: true
          // references: {
          //   model: 'CatalogUser',
          //   key: 'LoginName'
          // }
        },
        supplierId: {
          field: 'SupplierID',
          type: Sequelize.STRING(30),
          primaryKey: true,
          references: {
            model: 'SIMSupplier',
            key: 'SupplierID'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }
      }).then(() => queryInterface.addIndex('CatalogUser2Supplier', ['SupplierID']))
    ]);
  }
};
