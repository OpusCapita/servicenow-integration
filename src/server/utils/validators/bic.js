module.exports.isValid = function(value) {
  return /^([A-Z]{6}[A-Z2-9][A-NP-Z1-2])(X{3}|[A-WY-Z0-9][A-Z0-9]{2})?$/.test(value.toUpperCase());
};

module.exports.isInvalid = function(value) {
  return !this.isValid(value);
};
