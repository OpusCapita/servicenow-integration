const request = require('superagent-bluebird-promise');
const url = '/supplier/api/suppliers/exists';

module.exports.supplierNameExists = function(validate) {
  return validate.validators.supplierNameExists = function(value, options, key, attributes) {
    let queryParams = { supplierName: value };

    return recordExists(value, validate, queryParams, options.message, attributes['supplierId']);
  };
};

module.exports.vatNumberExists = function(validate) {
  return validate.validators.vatNumberExists = function(value, options, key, attributes) {
    let queryParams = { vatIdentificationNo: value };

    return recordExists(value, validate, queryParams, options.message, attributes['supplierId']);
  };
};

module.exports.dunsNumberExists = function(validate) {
  return validate.validators.dunsNumberExists = function(value, options, key, attributes) {
    let queryParams = { dunsNo: value };

    return recordExists(value, validate, queryParams, options.message, attributes['supplierId']);
  };
};

module.exports.globalLocationNumberExists = function(validate) {
  return validate.validators.globalLocationNumberExists = function(value, options, key, attributes) {
    let queryParams = { globalLocationNo: value }

    return recordExists(value, validate, queryParams, options.message, attributes['supplierId']);
  };
};

module.exports.taxIdNumberExists = function(validate) {
  return validate.validators.taxIdNumberExists = function(value, options, key, attributes) {
    let queryParams = {
      taxIdentificationNo: attributes['taxIdentificationNo'],
      countryOfRegistration: attributes['countryOfRegistration']
    };

    return recordExists(attributes['taxIdentificationNo'], validate, queryParams, options.message, attributes['supplierId']);
  };
};

module.exports.registerationNumberExists = function(validate) {
  return validate.validators.registerationNumberExists = function(value, options, key, attributes) {
    let queryParams = {
      commercialRegisterNo: attributes['commercialRegisterNo'],
      cityOfRegistration: attributes['cityOfRegistration'],
      countryOfRegistration: attributes['countryOfRegistration']
    };

    return recordExists(attributes['commercialRegisterNo'], validate, queryParams, options.message, attributes['supplierId']);
  };
};

let recordExists = function(value, validate, queryParams, errorMessage, supplierId) {
  return new validate.Promise((resolve, reject) => {
    if (!value) {
      resolve();
      return;
    }

    if (supplierId) queryParams.supplierId = supplierId;

    request.get(url).query(queryParams).set('Accept', 'application/json').then(response => {
      if (response.body) {
        resolve(errorMessage);
      } else {
        resolve();
      }
    }).catch(error => reject());
  });
};
