'use strict';
const Sequelize = require('sequelize');

module.exports = function(sequelize, config) {

  /**
   * @class TradingPartner
   */
  let TradingPartner = sequelize.define('TradingPartner',
  /** @lends TradingPartner */
  {
    /** internal identifier */
    id: {
      type: Sequelize.STRING(30),
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: ["[a-zA-Z_\\-0-9]+"]
      },
      field: "id"
    },
    /** Internal human readable name, the official name of the company as registered */
    name: {
      allowNull: true,
      type: Sequelize.STRING(250),
      field: "Name"
    },
    /** company homepage */
    homePage: {
      allowNull: true,
      type: Sequelize.STRING(250),
      field: "HomePage"
    },
    /** indicating what is the status or lifecycle, e.g. onboarding */
    statusId: {
      allowNull: true,
      type: Sequelize.STRING(50),
      field: "StatusId"
    },
    /** Duns stands for Data Universal Numbering System */
    dunsNo: {
      allowNull: true,
      type: Sequelize.STRING(20),
      field: "DunsNo"
    },
    /** A value added tax identification number or VAT identification number (VATIN) */
    vatIdentificationNo: {
      allowNull: true,
      type: Sequelize.STRING(16),
      field: "VatIdentificationNo"
    },
    /** A Tax Identification Number or TIN is an identifying number used for tax purposes */
    taxIdentificationNo: {
      allowNull: true,
      type: Sequelize.STRING(20),
      field: "TaxIdentificationNo"
    },
    /** Example: "Amtsgericht Dortmund HRB 28782" for a german registration */
    commercialRegisterNo: {
      allowNull: true,
      type: Sequelize.STRING(20),
      field: "CommercialRegisterNo"
    },
    /** City where the company is registered */
    cityOfRegistration: {
      allowNull: true,
      type: Sequelize.STRING(250),
      field: "CityOfRegistration"
    },
    /** Country where company is registered */
    countryOfRegistration: {
      allowNull: true,
      type: Sequelize.STRING(250),
      field: "CountryOfRegistration"
    },
    /** Global Location Number as given out by GS1 member organizations.
     * First three digits is country code e.g. 400 - Germany
     */
    globalLocationNo: {
      allowNull: true,
      type: Sequelize.STRING(13),
      field: "GlobalLocationNo"
    },
  }, {
    getterMethods: {
      _objectLabel: function() {
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps: false,
    freezeTableName: true,
    tableName: 'TradingPartner'
  });

  return TradingPartner;
};
