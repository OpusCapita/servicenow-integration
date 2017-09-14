module.exports.isValid = function(value) {
  const IBAN = require('iban');
  if (IBAN.isValid(value)) return true;

  return false;
};

module.exports.isInvalid = function(value) {
  return !this.isValid(value);
};
