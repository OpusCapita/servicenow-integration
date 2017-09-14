const Sequelize = require("sequelize");

module.exports = {

  up: function (db) {
    let queryInterface = db.getQueryInterface();

    return queryInterface.createTable('SupplierBankAccount', {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'ID'
      },

      accountNumber: {
        field: 'AccountNumber',
        type: Sequelize.STRING(35),
        allowNull: false
      },

      bankCountryKey: {
        field: 'BankCountryKey',
        type: Sequelize.STRING(2)
      },

      bankCode: {
        field: 'BankCode',
        type: Sequelize.STRING(12),
        allowNull: false
      },

      bankName: {
        field: 'BankName',
        type: Sequelize.STRING(50),
        allowNull: false
      },

      bankIdentificationCode: {
        field: 'BankIdentificationCode',
        type: Sequelize.STRING(15),
        allowNull: false
      },

      bankAccountId: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
        field: 'BankAccountID'
      },

      supplierId: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: 'SupplierID'
      },

      changedBy: {
        type: Sequelize.STRING(60),
        field: "ChangedBy",
        allowNull: false
      },

      createdBy: {
        type: Sequelize.STRING(60),
        field: "CreatedBy",
        allowNull: false,
      },

      createdOn: {
        type: Sequelize.DATE,
        field: "CreatedOn",
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },

      changedOn: {
        type: Sequelize.DATE,
        field: "ChangedOn",
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },

      extBankControlKey: {
        field: 'ExtBankControlKey',
        type: Sequelize.STRING(2)
      },

      swiftCode: {
        field: 'SwiftCode',
        type: Sequelize.STRING(11),
        allowNull: false,
      }
    });
  },

  down: function (db) {
    let queryInterface = db.getQueryInterface();
    return queryInterface.dropTable('SupplierBankAccount');
  }
};
