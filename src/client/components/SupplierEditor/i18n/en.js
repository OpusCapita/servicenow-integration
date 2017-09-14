// Confirmation dialogs
let Confirmation = {};
Confirmation.cancel = 'Do you really want to cancel?';
Confirmation.delete = 'Do you really want to delete this supplier?';

let ButtonLabel = {};
ButtonLabel.add = 'Add';
ButtonLabel.edit = 'Edit';
ButtonLabel.delete = 'Delete';
ButtonLabel.save = 'Save';
ButtonLabel.cancel = 'Cancel';

let TableHeader = {};
TableHeader.supplierName = 'Company name-';
TableHeader.homePage = 'Home page';
TableHeader.foundedOn = 'Founded/Established on';
TableHeader.legalForm = 'Legal form';
TableHeader.commercialRegisterNo = 'Company registration number';
TableHeader.cityOfRegistration = 'City of registration';
TableHeader.countryOfRegistration = 'Country of registration';
TableHeader.taxIdentificationNo = 'Tax identification number';
TableHeader.vatIdentificationNo = 'VAT registration number';
TableHeader.dunsNo = 'D-U-N-S number';
TableHeader.globalLocationNo = 'Global location number';

let Description = {};
Description.viewSupplierOrChooseAnother = 'General company information.';

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

let SupplierEditor = {};
SupplierEditor.created = 'Information on this page was initially created by {by} on {on}.';
SupplierEditor.changed = 'Information on this page was last updated on {on} by {by}.';

const Messages = {};
Messages.loading = 'Loading...';
Messages.register = 'Register';
Messages.unableToRender = 'Please register supplier before proceeding';
Messages.saved = 'Data is successfully saved';
Messages.failed = 'Data saving failed';
Messages.failedModifyingNotAuthoredSupplier = 'Data saving failed: only the author can update company information';
Messages.failedCreatingExistingSupplier = 'Data saving failed:' +
  ' a company with the same Company Name already exists';
Messages.required = '** Please provide your VAT Registration Number. If you do not have one, then provide your Global Location Number or D-U-N-S number.';
Messages.noVatId = 'My Company does not have a VAT Registration Number.';
Messages.clickCheckBox = 'Please provide your VAT Registration Number.';

export default {
  SupplierEditor: {
    Confirmation: Confirmation,
    ButtonLabel: ButtonLabel,
    TableHeader: TableHeader,
    Description: Description,
    Select: Select,
    SupplierEditor: SupplierEditor,
    Label: Label,
    Messages,
  },
};
