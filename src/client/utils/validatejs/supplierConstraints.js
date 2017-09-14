class SupplierConstraints {
  constructor(i18n) {
    this.constraints = allConstraints(i18n);
  }

  forUpdate() {
    return this.constraints;
  }

  forRegistration() {
    let constraints = this.constraints;

    delete constraints['homePage'];
    delete constraints['foundedOn'];
    delete constraints['legalForm'];

    return constraints;
  }

  forField(fieldName) {
    if (fieldName === 'taxIdentificationNo')
      return {
        taxIdentificationNo: this.constraints['taxIdentificationNo'],
        countryOfRegistration: this.constraints['countryOfRegistration']
      };

    if (['commercialRegisterNo', 'cityOfRegistration'].indexOf(fieldName) > -1)
      return {
        commercialRegisterNo: this.constraints['commercialRegisterNo'],
        cityOfRegistration: this.constraints['cityOfRegistration'],
        countryOfRegistration: this.constraints['countryOfRegistration']
      };

    if (fieldName === 'countryOfRegistration')
      return {
        commercialRegisterNo: this.constraints['commercialRegisterNo'],
        taxIdentificationNo: this.constraints['taxIdentificationNo'],
        cityOfRegistration: this.constraints['cityOfRegistration'],
        countryOfRegistration: this.constraints['countryOfRegistration']
      };

    if (['vatIdentificationNo', 'dunsNo', 'globalLocationNo'].indexOf(fieldName) > -1)
      return {
        vatIdentificationNo: this.constraints['vatIdentificationNo'],
        dunsNo: this.constraints['dunsNo'],
        globalLocationNo: this.constraints['globalLocationNo'],
      };

    return { [fieldName]: this.constraints[fieldName] };
  }
}

let allConstraints = function(i18n) {
  return {
    supplierName: {
      presence: {
        message: i18n.getMessage('SupplierValidatejs.blank.message')
      },
      length: {
        maximum: 50,
        tooLong: i18n.getMessage('SupplierValidatejs.invalid.maxSize.message', {
          limit: 50
        })
      },
      supplierNameExists: {
        message: i18n.getMessage('SupplierValidatejs.supplierExists', {
          message: i18n.getMessage('SupplierValidatejs.duplicate.supplierName.message')
        })
      }
    },
    homePage: {
      presence: false,
      length: {
        maximum: 250,
        tooLong: i18n.getMessage('SupplierValidatejs.invalid.maxSize.message', {
          limit: 250
        })
      }
    },
    foundedOn: {
      presence: false,
      datetime: {
        message: i18n.getMessage('SupplierValidatejs.typeMismatch.java.util.Date')
      }
    },
    legalForm: {
      presence: false,
      length: {
        maximum: 250,
        tooLong: i18n.getMessage('SupplierValidatejs.invalid.maxSize.message', {
          limit: 250
        })
      }
    },
    commercialRegisterNo: {
      presence: false,
      registerationNumberExists: {
        message: i18n.getMessage('SupplierValidatejs.supplierExists', {
          message: i18n.getMessage('SupplierValidatejs.duplicate.registerationNumber.message')
        })
      }
    },
    cityOfRegistration: {
      presence: {
        message: i18n.getMessage('SupplierValidatejs.blank.message')
      },
      length: {
        maximum: 250,
        tooLong: i18n.getMessage('SupplierValidatejs.invalid.maxSize.message', {
          limit: 250
        })
      }
    },
    countryOfRegistration: {
      presence: {
        message: i18n.getMessage('SupplierValidatejs.blank.message')
      }
    },
    taxIdentificationNo: {
      presence: false,
      taxIdNumberExists: {
        message: i18n.getMessage('SupplierValidatejs.supplierExists', {
          message: i18n.getMessage('SupplierValidatejs.duplicate.taxIdNumber.message')
        })
      }
    },
    vatIdentificationNo: {
      presence: false,
      vatNumber: {
        message: i18n.getMessage('SupplierValidatejs.invalid.vatNumber.message')
      },
      vatNumberExists: {
        message: i18n.getMessage('SupplierValidatejs.supplierExists', {
          message: i18n.getMessage('SupplierValidatejs.duplicate.vatNumber.message')
        })
      },
      uniqueIdentifier: {
        message: i18n.getMessage('SupplierValidatejs.invalid.uniqueIdentifier.message')
      }
    },
    globalLocationNo: {
      presence: false,
      globalLocationNumber: {
        message: i18n.getMessage('SupplierValidatejs.invalid.globalLocationNumber.message')
      },
      globalLocationNumberExists: {
        message: i18n.getMessage('SupplierValidatejs.supplierExists', {
          message: i18n.getMessage('SupplierValidatejs.duplicate.globalLocationNumber.message')
        })
      },
      uniqueIdentifier: {
        message: i18n.getMessage('SupplierValidatejs.invalid.uniqueIdentifier.message')
      }
    },
    dunsNo: {
      presence: false,
      dunsNumber: {
        message: i18n.getMessage('SupplierValidatejs.invalid.dunsNumber.message')
      },
      dunsNumberExists: {
        message: i18n.getMessage('SupplierValidatejs.supplierExists', {
          message: i18n.getMessage('SupplierValidatejs.duplicate.dunsNumber.message')
        })
      },
      uniqueIdentifier: {
        message: i18n.getMessage('SupplierValidatejs.invalid.uniqueIdentifier.message')
      }
    }
  };
};

export default SupplierConstraints;
