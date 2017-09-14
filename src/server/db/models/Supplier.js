'use strict';
const Sequelize = require('sequelize');
const vatNumber = require('../../utils/validators/vatNumber.js');
const dunsNumber = require('../../utils/validators/dunsNumber.js');
const globalLocationNumber = require('../../utils/validators/globalLocationNumber.js');
const uniqueIdentifier = require('../../utils/validators/uniqueIdentifier.js');

module.exports = function(sequelize) {
  /**
   * Supplier - organization that provides Products to buyers.
   * @class Supplier
   */
  let Supplier = sequelize.define('Supplier',
  /** @lends Supplier */
  {
    /** Unique identifier */
    supplierId: {
      type: Sequelize.STRING(30),
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: ["[a-zA-Z_\\-0-9]+"]
      },
      field: "SupplierID"
    },
    supplierName: {
      allowNull: false,
      type: Sequelize.STRING(50),
      field: "SupplierName",
      validate: {
        notEmpty: true
      }
    },
    foundedOn: {
      allowNull: true,
      type: Sequelize.DATE(),
      field: "FoundedOn"
    },
    legalForm: {
      allowNull: true,
      type: Sequelize.STRING(250),
      field: "LegalForm"
    },
    commercialRegisterNo: {
      allowNull: true,
      type: Sequelize.STRING(250),
      field: "CommercialRegisterNo"
    },
    /** A supplier's city of registration */
    cityOfRegistration: {
      allowNull: false,
      type: Sequelize.STRING(250),
      field: "CityOfRegistration",
      validate: {
        notEmpty: true
      }
    },
    /** A supplier's country of registration as in ISO 3166-1 alpha2 */
    countryOfRegistration: {
      allowNull: false,
      type: Sequelize.STRING(250),
      field: "CountryOfRegistration",
      validate: {
        notEmpty: true
      }
    },
    /** A Tax Identification Number or TIN */
    taxIdentificationNo: {
      allowNull: true,
      type: Sequelize.STRING(250),
      field: "TaxIdentificationNo"
    },
    /** A value added tax identification number or VAT identification number (VATIN) */
    vatIdentificationNo: {
      allowNull: true,
      type: Sequelize.STRING(250),
      field: "VatIdentificationNo",
      validate: {
        isValid(value) {
          if (value.length === 0) return;

          if (vatNumber.isInvalid(value)) throw new Error('vatIdentificationNo value is invalid');
        }
      }
    },
    globalLocationNo: {
      allowNull: true,
      type: Sequelize.STRING(250),
      field: "GlobalLocationNo",
      validate: {
        isValid(value) {
          if (value.length === 0) return;

          if (globalLocationNumber.isInvalid(value)) throw new Error('globalLocationNo value is invalid');
        }
      }
    },
    /** Company homepage url */
    homePage: {
      allowNull: true,
      type: Sequelize.STRING(250),
      field: "HomePage"
    },
    role: {
      allowNull: false,
      type: Sequelize.STRING(25),
      field: "Role"
    },
    /** Duns stands for 'Data Universal Numbering System'. It is a nine-digit number issued by D&B (Dun & Bradstreet) and assigned to each business location in the D&B database */
    dunsNo: {
      allowNull: true,
      type: Sequelize.STRING(250),
      field: "DUNSNo",
      validate: {
        isValid(value) {
          if (value.length === 0) return;

          if (dunsNumber.isInvalid(value)) throw new Error('dunsNo value is invalid');
        }
      }
    },
    status: {
      allowNull: true,
      type: Sequelize.STRING(100),
      field: "Status"
    },
    noVatReason: {
      allowNull: true,
      type: Sequelize.STRING(500),
      field: "NoVatReason"
    },
    rejectionReason: {
      allowNull: true,
      type: Sequelize.STRING(2000),
      field: "RejectionReason"
    },
    changedBy: {
      type: Sequelize.STRING(60),
      field: "ChangedBy"
    },
    createdBy: {
      type: Sequelize.STRING(60),
      field: "CreatedBy"
    },
    createdOn: {
      type: Sequelize.DATE,
      field: "CreatedOn"
    },
    changedOn: {
      type: Sequelize.DATE,
      field: "ChangedOn"
    }
  }, {
    validate: {
      hasUniqueIdentifier() {
        const fields = [this.vatIdentificationNo, this.dunsNo, this.globalLocationNo];

        if (uniqueIdentifier.isInvalid(fields)) {
          throw new Error('Supplier must contain a unique identifier - vatIdentificationNo, dunsNo or globalLocationNo');
        }
      }
    },
    getterMethods: {
      _objectLabel: function() {
        return this.supplierName ? this.supplierName + ' (' + this.supplierId + ')' : this.supplierId
      }
    },
    updatedAt: 'changedOn',
    createdAt: 'createdOn',
    timestamps: true,
    freezeTableName: true,
    tableName: 'Supplier' // needs to be just supplier in future
  });

  return Supplier;
};
