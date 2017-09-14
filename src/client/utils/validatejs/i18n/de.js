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
    validator: {},
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

SupplierValidatejs.doesnt.match.message = "Der Wert entspricht nicht dem vorgegebenen Muster '{limit}'";
SupplierValidatejs.invalid.url.message = "Dies ist keine g\u00fcltige URL";
SupplierValidatejs.invalid.creditCard.message = "Dies ist keine g\u00fcltige Kreditkartennummer";
SupplierValidatejs.invalid.email.message = "Dies ist keine g\u00fcltige E-Mail Adresse";
SupplierValidatejs.invalid.range.message = "Der Wert ist nicht im Wertebereich von ''{from}'' bis ''{to}''";
SupplierValidatejs.invalid.size.message = "Der Wert ist nicht im Gr\u00f6\u00dfenbereich von ''{from}'' bis ''{to}''";
SupplierValidatejs.invalid.max.message = "Der Wert ist gr\u00f6\u00dfer als der H\u00f6chstwert von '{limit}'";
SupplierValidatejs.invalid.min.message = "Der Wert ist kleiner als der Mindestwert von '{limit}'";
SupplierValidatejs.invalid.maxOrEqual.message = "Der Wert muss kleiner als oder gleich dem Maximalwert '{limit}' sein";
SupplierValidatejs.invalid.minOrEqual.message = "Der Wert muss größer als oder gleich dem Minimalwert '{limit}' sein";
SupplierValidatejs.invalid.maxSize.message = "Der Wert \u00fcbersteigt den H\u00f6chstwert von '{limit}'";
SupplierValidatejs.invalid.minSize.message = "Der Wert unterschreitet den Mindestwert von '{limit}'";
SupplierValidatejs.invalid.validator.message = "Der Wert ist ung\u00fcltig";
SupplierValidatejs.not.inlist.message = "Der Wert ist nicht in der Liste ''{limit}'' enthalten";
SupplierValidatejs.blank.message = "Das Feld darf nicht leer sein";
SupplierValidatejs.not.equal.message = "Der Wert darf nicht gleich ''{limit}'' sein";
SupplierValidatejs.null.message = "Die Eigenschaft darf nicht null sein";
SupplierValidatejs.not.unique.message = "Der Wert muss eindeutig sein";
SupplierValidatejs.invalid.vatNumber.message = "Der Wert ist keine gültige EU-Umsatzsteuer-Identifikationsnummer";
SupplierValidatejs.invalid.dunsNumber.message = "Der Wert ist keine gültige D-U-N-S Nummer";
SupplierValidatejs.invalid.globalLocationNumber.message = "Der Wert ist keine gültige Global Location Number";
SupplierValidatejs.invalid.iban.message = "Der Wert ist kein gültiger IBAN";
SupplierValidatejs.invalid.bic.message = "Der Wert ist kein gültiger BIC";
SupplierValidatejs.invalid.swiftCode.message = "Der Wert ist kein gültiger SWIFT-Code";
SupplierValidatejs.invalid.uniqueIdentifier.message = "Die Umsatzsteuer-Identifikationsnummer, die D-U-N-S-Nummer oder die Global Location Number muss angegeben werden";
SupplierValidatejs.duplicate.supplierName.message = "Ein Unternehmen existiert bereits mit dieser Name.";
SupplierValidatejs.duplicate.registerationNumber.message = "Ein Unternehmen existiert bereits mit dieser Handelsregisternummer, der Stadt und dem Land.";
SupplierValidatejs.duplicate.taxIdNumber.message = "Ein Unternehmen existiert bereits mit dieser Steueridentifikationsnummer und dem Land.";
SupplierValidatejs.duplicate.vatNumber.message = "Ein Unternehmen existiert bereits mit dieser Umsatzsteuer-Identifikationsnummer.";
SupplierValidatejs.duplicate.dunsNumber.message = "Ein Unternehmen existiert bereits mit dieser D-U-N-S-Nummer.";
SupplierValidatejs.duplicate.globalLocationNumber.message = "Ein Unternehmen existiert bereits mit dieser Global Location Number.";

SupplierValidatejs.typeMismatch.java.net.URL = "Die Wert muss eine g\u00fcltige URL sein";
SupplierValidatejs.typeMismatch.java.net.URI = "Die Wert muss eine g\u00fcltige URI sein";
SupplierValidatejs.typeMismatch.java.util.Date = "Die Wert muss ein g\u00fcltiges Datum sein";
SupplierValidatejs.typeMismatch.java.lang.Double = "Die Wert muss eine g\u00fcltige Zahl sein";
SupplierValidatejs.typeMismatch.java.lang.Integer = "Die Wert muss eine g\u00fcltige Zahl sein";
SupplierValidatejs.typeMismatch.java.lang.Long = "Die Wert muss eine g\u00fcltige Zahl sein";
SupplierValidatejs.typeMismatch.java.lang.Short = "Die Wert muss eine g\u00fcltige Zahl sein";
SupplierValidatejs.typeMismatch.java.math.BigDecimal = "Die Wert muss eine g\u00fcltige Zahl sein";
SupplierValidatejs.typeMismatch.java.math.BigInteger = "Die Wert muss eine g\u00fcltige Zahl sein";

SupplierValidatejs.supplierExists = "{message}\nBitte kontaktieren Sie unseren Support via +49 231 3967 350 oder customerservice.de@opuscapita.com, um einen Zugang zu diesem Unternehmen anzufordern."

export default {
  SupplierValidatejs,
};
