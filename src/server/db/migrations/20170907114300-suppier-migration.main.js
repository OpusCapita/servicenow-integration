const Sequelize = require("sequelize");

module.exports = {

  up: function(db) {
    var queryInterface = db.getQueryInterface();

    return queryInterface.addColumn('Supplier', 'NoVatReason', { type: Sequelize.STRING(500), allowNull: true });
  },

  down: function(db) {

    var queryInterface = db.getQueryInterface();

    return queryInterface.removeColumn('Supplier', 'NoVatReason');
  }
};
