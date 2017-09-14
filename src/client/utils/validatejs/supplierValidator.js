const custom = require('./custom.js');
const customAsync = require('./customAsync.js');
const validatejs = require('validate.js');

module.exports.forRegistration = function() {
  return validator(validatejs);
};

module.exports.forUpdate = function(i18n) {
  validatejs.extend(validatejs.validators.datetime, {
    parse: function(value) {
      let date = new Date(value);
      if (isValidDate(date)) {
        return date.getTime();
      }
      return value.toString;
    },

    format: function(value) {
      const date = new Date(value);
      if (isValidDate(value)) {
        return i18n.formatDate(date);
      }
      return value;
    }
  });

  return validator(validatejs);
};

let validator = function(validatejs) {
  custom.vatNumber(validatejs);
  custom.dunsNumber(validatejs);
  custom.globalLocationNumber(validatejs);
  custom.uniqueIdentifier(validatejs);
  customAsync.supplierNameExists(validatejs);
  customAsync.registerationNumberExists(validatejs);
  customAsync.taxIdNumberExists(validatejs);
  customAsync.vatNumberExists(validatejs);
  customAsync.dunsNumberExists(validatejs);
  customAsync.globalLocationNumberExists(validatejs);

  return validatejs;
};

let isValidDate = function(d) {
  if (Object.prototype.toString.call(d) !== "[object Date]") {
    return false;
  }
  return !isNaN(d.getTime());
}
