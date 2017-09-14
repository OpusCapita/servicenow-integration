const Sequelize = require("sequelize");

module.exports = {

  up: function(db) {
    var queryInterface = db.getQueryInterface();

    return queryInterface.createTable('SIMSupplier', {
        supplierId: {
          type: Sequelize.STRING(30),
          primaryKey: true,
          allowNull: false,
          field: "SupplierID"
        },
        supplierName: {
          allowNull: true,
          type: Sequelize.STRING(50),
          field: "SupplierName"
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
        registrationNumber: {
          allowNull: true,
          type: Sequelize.STRING(250),
          field: "RegistrationNumber"
        },
        cityOfRegistration: {
          allowNull: true,
          type: Sequelize.STRING(250),
          field: "CityOfRegistration"
        },
        countryOfRegistration: {
          allowNull: true,
          type: Sequelize.STRING(250),
          field: "CountryOfRegistration"
        },
        taxId: {
          allowNull: true,
          type: Sequelize.STRING(250),
          field: "TaxID"
        },
        vatRegNo: {
          allowNull: true,
          type: Sequelize.STRING(250),
          field: "VatRegNo"
        },
        globalLocationNo: {
          allowNull: true,
          type: Sequelize.STRING(250),
          field: "GlobalLocationNo"
        },
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
        dunsNo: {
          allowNull: true,
          type: Sequelize.STRING(250),
          field: "DUNSNo"
        },
        status: {
          allowNull: true,
          type: Sequelize.STRING(100),
          field: "Status"
        },
        rejectionReason: {
          allowNull: true,
          type: Sequelize.STRING(2000),
          field: "RejectionReason"
        },
        changedBy: {
          type: Sequelize.STRING(60),
          field: "ChangedBy",
          allowNull: false
        },
        createdBy: {
          type: Sequelize.STRING(60),
          field: "CreatedBy",
          allowNull: false
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
        }
      }).then(() => queryInterface.createTable('CatalogUser2Supplier', {
        loginName: {
          field: 'LoginName',
          type: Sequelize.STRING(50),
          primaryKey: true
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
      }))
      .then(() => queryInterface.addIndex('CatalogUser2Supplier', ['SupplierID']))
      .then(() => {
        return Promise.all([
          queryInterface.createTable('SIMAddress', {
            id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              autoIncrement: true,
              field: 'AddressSN'
            },
            addressId: {
              type: Sequelize.STRING(50),
              allowNull: false,
              unique: true,
              field: 'AddressID'
            },
            supplierId: {
              type: Sequelize.STRING(50),
              allowNull: false,
              field: 'SupplierID'
            },
            type: {
              type: Sequelize.STRING(10),
              allowNull: false,
              field: "Type"
            },
            salutation: {
              type: Sequelize.STRING(20),
              field: 'Salutation'
            },
            name1: {
              type: Sequelize.STRING(100),
              field: 'Name1'
            },
            name2: {
              type: Sequelize.STRING(100),
              field: 'Name2'
            },
            name3: {
              type: Sequelize.STRING(100),
              field: 'Name3'
            },
            street: {
              type: Sequelize.STRING(50),
              field: 'Street'
            },
            zipCode: {
              type: Sequelize.STRING(10),
              field: 'ZipCode'
            },
            city: {
              type: Sequelize.STRING(50),
              field: 'City'
            },
            poboxZipCode: {
              type: Sequelize.STRING(10),
              field: 'POBoxZipCode'
            },
            pobox: {
              type: Sequelize.STRING(10),
              field: 'POBox'
            },
            isCompany: {
              type: Sequelize.BOOLEAN,
              field: 'IsCompany'
            },
            areaCode: {
              type: Sequelize.STRING(10),
              field: 'AreaCode'
            },
            phoneNo: {
              type: Sequelize.STRING(50),
              field: 'PhoneNo'
            },
            faxNo: {
              type: Sequelize.STRING(50),
              field: 'FaxNo'
            },
            email: {
              type: Sequelize.STRING(1024),
              field: 'EMail'
            },
            corporateURL: {
              type: Sequelize.STRING(1024),
              field: 'CorporateURL'
            },
            numOfEmployees: {
              type: Sequelize.INTEGER,
              field: 'NumOfEmployees'
            },
            countryId: {
              type: Sequelize.STRING(2),
              field: 'CountryID'
            },
            state: {
              type: Sequelize.STRING(50),
              field: 'State'
            },
            changedBy: {
              type: Sequelize.STRING(60),
              field: "ChangedBy",
              allowNull: false
            },
            createdBy: {
              type: Sequelize.STRING(60),
              field: "CreatedBy",
              allowNull: false
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
            }
          }),
          queryInterface.createTable('SIMSupplierContact', {
            contactId: {
              type: Sequelize.STRING(50),
              primaryKey: true,
              allowNull: false,
              field: "ContactId"
            },
            title: {
              type: Sequelize.STRING(20),
              field: "Title"
            },
            contactType: {
              type: Sequelize.STRING(10),
              field: "ContactType"
            },
            firstName: {
              type: Sequelize.STRING(100),
              allowNull: false,
              field: "FirstName"
            },
            lastName: {
              type: Sequelize.STRING(100),
              allowNull: false,
              field: "LastName"
            },
            email: {
              type: Sequelize.STRING(100),
              field: "Email"
            },
            phone: {
              type: Sequelize.STRING(20),
              field: "Phone"
            },
            mobile: {
              type: Sequelize.STRING(20),
              field: "Mobile"
            },
            department: {
              type: Sequelize.STRING(100),
              field: "Department"
            },
            fax: {
              type: Sequelize.STRING(20),
              field: "Fax"
            },
            supplierId: {
              type: Sequelize.STRING(30),
              field: "SupplierId"
            },
            changedBy: {
              type: Sequelize.STRING(60),
              field: "ChangedBy",
              allowNull: false
            },
            createdBy: {
              type: Sequelize.STRING(60),
              field: "CreatedBy",
              allowNull: false
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
            }
          })
        ]);
      });
  },

  down: function(db) {

    var queryInterface = db.getQueryInterface();

    return Promise.all([
      queryInterface.dropTable('CatalogUser2Supplier'),
      queryInterface.dropTable('SIMAddress'),
      queryInterface.dropTable('SIMSupplier'),
      queryInterface.dropTable('SIMSupplierContact')
    ]);
  }
};
