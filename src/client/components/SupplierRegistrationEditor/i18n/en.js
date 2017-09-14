let ButtonLabel = { continue: 'Continue', cancel: 'Cancel', back: 'Back To Form' };

let Select = {};
Select.country = 'Select country...';

let Label = {
  supplierName: {},
  supplierId: {},
  homePage: {},
  role: {},
  buying: {},
  selling: {},
  foundedOn: {},
  legalForm: {},
  commercialRegisterNo: {},
  cityOfRegistration: {},
  countryOfRegistration: {},
  taxIdentificationNo: {},
  vatIdentificationNo: {},
  dunsNo: {},
  globalLocationNo: {},
  isNewSupplier: {},
  supplier: {}
};
Label.supplierName.label = 'Company Name';
Label.supplierId.label = 'Company ID';
Label.homePage.label = 'Home Page';
Label.role.label = 'Role';
Label.buying.label = 'Buying';
Label.selling.label = 'Selling';
Label.foundedOn.label = 'Founded/\u200bEstablished\u00a0On';
Label.legalForm.label = 'Legal Form';
Label.commercialRegisterNo.label = 'Company Registration Number';
Label.cityOfRegistration.label = 'City Of Registration';
Label.countryOfRegistration.label = 'Country Of Registration';
Label.taxIdentificationNo.label = 'Tax Identification Number';
Label.vatIdentificationNo.label = 'VAT Registration Number';
Label.dunsNo.label = 'D-U-N-S Number';
Label.globalLocationNo.label = 'Global Location Number';
Label.isNewSupplier.label = 'Select existing company';
Label.supplier.label = 'Company';

let SupplierRegistrationEditor = {};
SupplierRegistrationEditor.created = 'Information on this page was initially created by {by} on {on}.';
SupplierRegistrationEditor.changed = 'Information on this page was last updated on {on} by {by}.';

const Messages = {};
Messages.companyRegistration = 'Company Registration';
Messages.loading = 'Loading...';
Messages.unableToRender = 'Unable to render editor';
Messages.saved = 'Data is successfully saved';
Messages.failed = 'Supplier creation failed.';
Messages.failedUnauthorized = 'Supplier creation failed: not authorized.';
Messages.supplierExistsHeader = 'Supplier already exists!';
Messages.supplierExistsText = 'It seems someone else already registered your company on the Business Network. Please reach out to our support at +49 231 3967 350 or customerservice.de@opuscapita.com in order to initiate an access request to the registered company.';
Messages.information1 = 'Please provide information that helps us to uniquely identify your company and allows us to add it to our trading partner directory.';
Messages.information2 = 'After providing this information you are ready to login.';
Messages.required = '** Please provide your VAT Registration Number. If you do not have one, then provide your Global Location Number or D-U-N-S number.';
Messages.noVatId = 'My Company does not have a VAT Registration Number.';
Messages.clickCheckBox = 'Please provide your VAT Registration Number.';

export default {
  SupplierRegistrationEditor: {
    ButtonLabel: ButtonLabel,
    Select: Select,
    SupplierRegistrationEditor: SupplierRegistrationEditor,
    Label: Label,
    Messages,
  },
};
