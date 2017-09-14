module.exports = function(validatejsI18N) {
  return {
    type: {
      presence: {
        message: validatejsI18N.getMessage('SupplierValidatejs.blank.message')
      }
    },
    "name": {
      presence: {
        message: validatejsI18N.getMessage('SupplierValidatejs.blank.message')
      },
      length: {
        maximum: 100,
        tooLong: validatejsI18N.getMessage('SupplierValidatejs.invalid.maxSize.message', {
          limit: 100
        })
      }
    },
    "street1": {
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
    "street2": {
      length: {
        maximum: 100,
        tooLong: validatejsI18N.getMessage('SupplierValidatejs.invalid.maxSize.message', {
          limit: 100
        })
      }
    },
    "street3": {
      length: {
        maximum: 100,
        tooLong: validatejsI18N.getMessage('SupplierValidatejs.invalid.maxSize.message', {
          limit: 100
        })
      }
    },
    "zipCode": {
      presence: {
        message: validatejsI18N.getMessage('SupplierValidatejs.blank.message')
      },
      length: {
        maximum: 10,
        tooLong: validatejsI18N.getMessage('SupplierValidatejs.invalid.maxSize.message', {
          limit: 10
        })
      }
    },
    "city": {
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
    "countryId": {
      presence: {
        message: validatejsI18N.getMessage('SupplierValidatejs.blank.message')
      }
    },
    "areaCode": {
      length: {
        maximum: 10,
        tooLong: validatejsI18N.getMessage('SupplierValidatejs.invalid.maxSize.message', {
          limit: 10
        })
      }
    },
    "state": {
      length: {
        maximum: 50,
        tooLong: validatejsI18N.getMessage('SupplierValidatejs.invalid.maxSize.message', {
          limit: 50
        })
      }
    },
    "pobox": {
      length: {
        maximum: 10,
        tooLong: validatejsI18N.getMessage('SupplierValidatejs.invalid.maxSize.message', {
          limit: 10
        })
      }
    },
    "poboxZipCode": {
      length: {
        maximum: 10,
        tooLong: validatejsI18N.getMessage('SupplierValidatejs.invalid.maxSize.message', {
          limit: 10
        })
      }
    },
    "phoneNo": {
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
    "faxNo": {
      length: {
        maximum: 50,
        tooLong: validatejsI18N.getMessage('SupplierValidatejs.invalid.maxSize.message', {
          limit: 50
        })
      }
    },
    "email": {
      length: {
        maximum: 1024,
        tooLong: validatejsI18N.getMessage('SupplierValidatejs.invalid.maxSize.message', {
          limit: 1024
        })
      },
      email: {
        message: validatejsI18N.getMessage('SupplierValidatejs.invalid.email.message')
      }
    }
  };
};
