// Confirmation dialogs
let Confirmation = {
  cancel: 'Do you really want to cancel?',
  delete: 'Do you really want to delete this contact?'
};
// eslint-disable-next-line max-len
let Title = 'Please enter your bank account details';

let Label = {
  accountNumber: 'IBAN',
  bankIdentificationCode: 'BIC',
  bankCountryKey: 'Bank Country',
  bankCode: 'Bank Code',
  bankName: 'Bank Name',
  extBankControlKey: 'External Bank Control',
  swiftCode: 'Swift Code'
};

let Tooltip = {
  // eslint-disable-next-line max-len
  email: 'The email address provided here will be used for further communication. Please ensure that the email is correct.',
  // eslint-disable-next-line max-len
  contactType: '"Supplier Information Manager" is the main contact regarding all supplier master data.\nThe "Catalog Manager" is the main contact regarding catalog and content management.\n"Employees" are all other staff members.'
};

let Button = {
  add: 'Add',
  edit: 'Edit',
  delete: 'Delete',
  save: 'Save',
  view: 'View',
  cancel: 'Cancel',
  close: 'Close'
};

let ContactInfo = {
  created: 'Information on this page was initially created by {by} on {on}.',
  changed: 'Information on this page was last updated on {on} by {by}.'
};

let Message = {
  objectDeleted: 'Object deleted.',
  objectUpdated: 'Object updated.',
  objectSaved: 'Object saved.',
  deleteFailed: 'Failed to delete object, perhaps it is already in use.',
  saveFailed: 'Object save failed.',
  updateFailed: 'Object update failed.'
};

let Error = {
  notUnique: 'Value must be unique'
};

export default {
  SupplierBankAccountEditor: {
    Title: Title,
    Tooltip: Tooltip,
    Message: Message,
    Error: Error,
    ContactInfo: ContactInfo,
    Confirmation: Confirmation,
    Button: Button,
    Label: Label,
  },
};
