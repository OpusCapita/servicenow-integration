module.exports = function(validatejsI18N) {
  return {
    bankName: {
      presence: {
        message: validatejsI18N.getMessage('SupplierValidatejs.blank.message')
      },
      length: {
        maximum: 50,
        tooLong: validatejsI18N.getMessage('SupplierValidatejs.invalid.maxSize.message', {
          limit: 50
        })
      }
    },
    accountNumber: {
      presence: {
        message: validatejsI18N.getMessage('SupplierValidatejs.blank.message')
      },
      length: {
        maximum: 30,
        tooLong: validatejsI18N.getMessage('SupplierValidatejs.invalid.maxSize.message', {
          limit: 30
        })
      },
      iban: {
        message: validatejsI18N.getMessage('SupplierValidatejs.invalid.iban.message')
      }
    },
    bankIdentificationCode: {
      presence: {
        message: validatejsI18N.getMessage('SupplierValidatejs.blank.message')
      },
      length: {
        maximum: 15,
        tooLong: validatejsI18N.getMessage('SupplierValidatejs.invalid.maxSize.message', {
          limit: 15
        })
      },
      bic: {
        message: validatejsI18N.getMessage('SupplierValidatejs.invalid.bic.message')
      }
    },
    bankCode: {
      presence: {
        message: validatejsI18N.getMessage('SupplierValidatejs.blank.message')
      },
      length: {
        maximum: 12,
        tooLong: validatejsI18N.getMessage('SupplierValidatejs.invalid.maxSize.message', {
          limit: 12
        })
      }
    },
    swiftCode: {
      presence: {
        message: validatejsI18N.getMessage('SupplierValidatejs.blank.message')
      },
      length: {
        maximum: 11,
        tooLong: validatejsI18N.getMessage('SupplierValidatejs.invalid.maxSize.message', {
          limit: 11
        })
      },
      bic: {
        message: validatejsI18N.getMessage('SupplierValidatejs.invalid.swiftCode.message')
      }
    },
    bankCountryKey: {
      presence: {
        message: validatejsI18N.getMessage('SupplierValidatejs.blank.message')
      }
    },
    extBankControlKey: {
      presence: {
        message: validatejsI18N.getMessage('SupplierValidatejs.blank.message')
      },
      length: {
        maximum: 2,
        tooLong: validatejsI18N.getMessage('SupplierValidatejs.invalid.maxSize.message', {
          limit: 2
        })
      }
    }
  };
};
