module.exports.isValid = function(value) {
  return value.replace(/(\s|-|\.)+/g, '').length === 9;
};

module.exports.isInvalid = function(value) {
  return !this.isValid(value);
};
