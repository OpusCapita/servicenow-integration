module.exports.isValid = function(fields) {
  return fields.some(field => Boolean(field));
}

module.exports.isInvalid = function(fields) {
  return !this.isValid(fields);
}
