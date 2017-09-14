module.exports.vatNumber = function(validate) {
  return validate.validators.vatNumber = function(value, options, key, attributes) {
    if (!value) return null;

    const vatNumberValidator = require('../../../server/utils/validators/vatNumber.js');

    if (vatNumberValidator.isValid(value)) return null;

    return options.message;
  };
};

module.exports.iban = function(validate) {
  return validate.validators.iban = function(value, options, key, attributes) {
    if (!value) return null;

    const IBAN = require('../../../server/utils/validators/iban.js');

    if (IBAN.isValid(value)) return null;

    return options.message;
  };
};

module.exports.bic = function(validate) {
  return validate.validators.bic = function(value, options, key, attributes) {
    if (!value) return null;

    const BIC = require('../../../server/utils/validators/bic.js');

    if (BIC.isValid(value)) return null;

    return options.message;
  };
};

module.exports.dunsNumber = function(validate) {
  return validate.validators.dunsNumber = function(value, options, key, attributes) {
    if (!value) return null;

    const dunsNumber = require('../../../server/utils/validators/dunsNumber.js');

    if (dunsNumber.isValid(value)) return null;

    return options.message;
  };
};

module.exports.globalLocationNumber = function(validate) {
  return validate.validators.globalLocationNumber = function(value, options, key, attributes) {
    if (!value) return null;

    const globalLocationNumber = require('../../../server/utils/validators/globalLocationNumber.js');

    if (globalLocationNumber.isValid(value)) return null;

    return options.message;
  };
};

module.exports.uniqueIdentifier = function(validate) {
  return validate.validators.uniqueIdentifier = function(value, options, key, attributes) {
    if (value) return null;

    const uniqueIdentifier = require('../../../server/utils/validators/uniqueIdentifier.js');

    const fields = [attributes.vatIdentificationNo, attributes.dunsNo, attributes.globalLocationNo];

    if (uniqueIdentifier.isValid(fields)) return null;

    return options.message;
  };
};
