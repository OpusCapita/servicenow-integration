const Sequelize = require("sequelize");

module.exports = {

  up: function (db) {
    let queryInterface = db.getQueryInterface();

    return queryInterface.createTable('Supplier2User', {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'ID'
      },

      supplierId: {
        type: Sequelize.STRING(50),
        allowNull: false
      },

      userId: {
        type: Sequelize.STRING(100),
        allowNull: false
      },

      status: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'requested'
      },

      createdOn: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },

      changedOn: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: function (db) {
    let queryInterface = db.getQueryInterface();
    return queryInterface.dropTable('Supplier2User');
  }
};
