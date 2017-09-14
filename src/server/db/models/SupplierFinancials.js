'use strict';
const Sequelize = require('sequelize');

module.exports = function(sequelize, config) {

  /**
   * @class SupplierFinancials
   */
  let SupplierFinancials = sequelize.define('SupplierFinancials',

  /** @lends SupplierFinancials */
  {
    /** internal identifier */
    id: {
      field: 'SupplierFinancialsSN',
      type: Sequelize.BIGINT(),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    /** supplier id */
    supplierId: {
      field: 'SupplierID',
      type: Sequelize.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    /** year */
    year: {
      field: 'Year',
      type: Sequelize.DATE(),
      validate: {
        notEmpty: true,
        uniqueYearForSupplierValidate: function(value, next) {
          if (!this.id && this.supplierId) {
            if (process.env.NODE_ENV === 'test') {
              // Selecting financials from sqlite (sqlite doesn't have function YEAR for date values)
              let now = new Date();
              now.setDate(1);
              now.setMonth(0);
              now.setFullYear(now.getFullYear() - 3);
              SupplierFinancials.findAll({
                where: {
                  supplierId: this.supplierId,
                  year: {
                    $gte: now
                  }
                }
              }).then(supplierFinancials => {
                let isValid = true;
                if (supplierFinancials && supplierFinancials.length > 0) {
                  supplierFinancials.forEach(financials => {
                    if (financials.year.getFullYear() === this.year.getFullYear()) {
                      isValid = false;
                    }
                  });
                  if (isValid) {
                    next();
                  } else {
                    next(`Supplier Financials for ${this.year.getFullYear()} year already exists`);
                  }
                } else {
                  next();
                }
              });
            } else {
              SupplierFinancials.findOne({
                where: {
                  $and: [
                    sequelize.where(sequelize.fn('YEAR', sequelize.col('year')), this.year.getFullYear()),
                    {
                      supplierId: this.supplierId
                    }
                  ]
                }
              }).then(supplierFinancials => {
                if (supplierFinancials) {
                  next(`Supplier Financials for ${this.year.getFullYear()} year already exists`);
                } else {
                  next();
                }
              });
            }
          } else {
            next();
          }
        }
      }
    },
    /** number of employees */
    noOfEmployees: {
      field: 'NoOfEmployees',
      type: Sequelize.INTEGER(),
      allowNull: true
    },
    /** number of employees details */
    noOfEmployeesDetails: {
      field: 'NoOfEmployeesDetails',
      type: Sequelize.STRING(200),
      allowNull: true
    },
    /** customer details */
    customerDetails: {
      field: 'CustomerDetails',
      type: Sequelize.STRING(200),
      allowNull: true
    },
    /** currency Id */
    currencyId: {
      field: 'CurrencyID',
      type: Sequelize.STRING(3),
      allowNull: true
    },
    /** revenue */
    revenue: {
      field: 'Revenue',
      type: Sequelize.DECIMAL(19, 2),
      allowNull: true
    },
    /** revenue details */
    revenueDetails: {
      field: 'RevenueDetails',
      type: Sequelize.STRING(),
      allowNull: true
    },
    /** profit */
    profit: {
      field: 'Profit',
      type: Sequelize.DECIMAL(19, 2),
      allowNull: true
    },
    /** capital assets */
    capitalAssets: {
      field: 'CapitalAssets',
      type: Sequelize.DECIMAL(19, 2),
      allowNull: true
    },
    /** floating assets */
    floatingAssets: {
      field: 'FloatingAssets',
      type: Sequelize.DECIMAL(19, 2),
      allowNull: true
    },
    /** total assets */
    totalAssets: {
      field: 'TotalAssets',
      type: Sequelize.DECIMAL(19, 2),
      allowNull: true
    },
    /** equity */
    equity: {
      field: 'Equity',
      type: Sequelize.DECIMAL(19, 2),
      allowNull: true
    },
    /** debt */
    debt: {
      field: 'Debt',
      type: Sequelize.DECIMAL(19, 2),
      allowNull: true
    },
    /** shareholders */
    shareholders: {
      field: 'Shareholders',
      type: Sequelize.STRING(),
      allowNull: true
    },
    /** rated by institute */
    ratedByInstitute: {
      field: 'RatedByInstitute',
      type: Sequelize.STRING(20),
      allowNull: true
    },
    /** rated financial standing */
    ratedFinancialStanding: {
      field: 'RatedFinancialStanding',
      type: Sequelize.STRING(10),
      allowNull: true
    },
    /** commentary */
    commentary: {
      field: 'Commentary',
      type: Sequelize.STRING(),
      allowNull: true
    },
    /** created on */
    createdOn: {
      field: 'CreatedOn',
      type: Sequelize.DATE,
      allowNull: false
    },
    /** created by */
    createdBy: {
      field: 'CreatedBy',
      type: Sequelize.STRING(60),
      allowNull: false
    },
    /** changed on */
    changedOn: {
      field: 'ChangedOn',
      type: Sequelize.DATE,
      allowNull: false
    },
    /** changed by */
      changedBy: {
      field: 'ChangedBy',
      type: Sequelize.STRING(60),
      allowNull: false
    }
  }, {
    updatedAt: 'changedOn',
    createdAt: 'createdOn',
    timestamps: true,
    freezeTableName: true,
    tableName: 'SupplierFinancials'
  });

  return SupplierFinancials;
};
