module.exports.isValid = function(value) {
  return /^\d{13}$/.test(value);
};

module.exports.isInvalid = function(value) {
  return !this.isValid(value);
};
