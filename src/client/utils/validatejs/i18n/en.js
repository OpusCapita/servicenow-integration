const SupplierValidatejs = {
  doesnt: {
    match: {},
  },
  invalid: {
    url: {},
    creditCard: {},
    email: {},
    range: {},
    size: {},
    max: {},
    min: {},
    maxOrEqual: {},
    minOrEqual: {},
    maxSize: {},
    minSize: {},
    vatNumber: {},
    dunsNumber: {},
    globalLocationNumber: {},
    iban: {},
    bic: {},
    swiftCode: {},
    uniqueIdentifier: {}
  },
  not: {
    inlist: {},
    equal: {},
    unique: {},
  },
  blank: {},
  'null': {},
  typeMismatch: {
    java: {
      net: {},
      util: {},
      lang: {},
      math: {},
    },
  },
  duplicate: {
    supplierName: {},
    registerationNumber: {},
    taxIdNumber: {},
    vatNumber: {},
    dunsNumber: {},
    globalLocationNumber: {}
  }
};

SupplierValidatejs.doesnt.match.message = "Value does not match the required pattern '{limit}'";
SupplierValidatejs.invalid.url.message = "Not a valid URL format";
SupplierValidatejs.invalid.creditCard.message = "Not a valid credit card number format";
SupplierValidatejs.invalid.email.message = "Not a valid e-mail address format";
SupplierValidatejs.invalid.range.message = "Value is not in the valid range of '{from}' to '{to}'";
SupplierValidatejs.invalid.size.message = "Value is not in the valid size range of '{from}' to '{to}'";
SupplierValidatejs.invalid.max.message = "Value exceeds maximum value '{limit}'";
SupplierValidatejs.invalid.min.message = "Value is less than minimum value '{limit}'";
SupplierValidatejs.invalid.maxOrEqual.message = "Value must be less than or equal to max value '{limit}'";
SupplierValidatejs.invalid.minOrEqual.message = "Value must be greater than or equal to min value '{limit}'";
SupplierValidatejs.invalid.maxSize.message = "Value exceeds the maximum size of '{limit}'";
SupplierValidatejs.invalid.minSize.message = "Value is less than the minimum size of '{limit}'";
SupplierValidatejs.not.inlist.message = "Value is not in the list '{limit}'";
SupplierValidatejs.blank.message = "Field cannot be blank";
SupplierValidatejs.not.equal.message = "Value cannot equal '{limit}'";
SupplierValidatejs.null.message = "Property cannot be null";
SupplierValidatejs.not.unique.message = "Value must be unique";
SupplierValidatejs.invalid.vatNumber.message = "Value is not a valid EU VAT number";
SupplierValidatejs.invalid.dunsNumber.message = "Value is not a valid D-U-N-S number";
SupplierValidatejs.invalid.globalLocationNumber.message = "Value is not a valid Global Location Number";
SupplierValidatejs.invalid.iban.message = "Value is not a valid IBAN";
SupplierValidatejs.invalid.bic.message = "Value is not a valid BIC";
SupplierValidatejs.invalid.swiftCode.message = "Value is not a valid SWIFT Code";
SupplierValidatejs.invalid.uniqueIdentifier.message = "Either VAT number, D-U-N-S number, or Global Location Number must be provided";
SupplierValidatejs.duplicate.supplierName.message = "A company already exists with this name.";
SupplierValidatejs.duplicate.registerationNumber.message = "A company already exists with this registration number, city and country.";
SupplierValidatejs.duplicate.taxIdNumber.message = "A company already exists with this Tax Identification Number and country.";
SupplierValidatejs.duplicate.vatNumber.message = "A company already exists with this VAT number.";
SupplierValidatejs.duplicate.dunsNumber.message = "A company already exists with this D-U-N-S number.";
SupplierValidatejs.duplicate.globalLocationNumber.message = "A company already exists with this Global Location Number.";

SupplierValidatejs.typeMismatch.java.net.URL = "Value must be a valid URL";
SupplierValidatejs.typeMismatch.java.net.URI = "Value must be a valid URI";
SupplierValidatejs.typeMismatch.java.util.Date = "Value must be a valid Date";
SupplierValidatejs.typeMismatch.java.lang.Double = "Value must be a valid number";
SupplierValidatejs.typeMismatch.java.lang.Integer = "Value must be a valid number";
SupplierValidatejs.typeMismatch.java.lang.Long = "Value must be a valid number";
SupplierValidatejs.typeMismatch.java.lang.Short = "Value must be a valid number";
SupplierValidatejs.typeMismatch.java.math.BigDecimal = "Value must be a valid number";
SupplierValidatejs.typeMismatch.java.math.BigInteger = "Value must be a valid number";

SupplierValidatejs.supplierExists = "{message}\nPlease reach out to our support at +49 231 3967 350 or customerservice.de@opuscapita.com in order to initiate an access request to the registered company."

export default {
  SupplierValidatejs,
};
