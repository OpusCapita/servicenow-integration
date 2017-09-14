// Confirmation dialogs
let Confirmation = {
  cancel: 'Do you really want to cancel?',
  delete: 'Do you really want to delete this contact?'
};
// eslint-disable-next-line max-len
let Title = 'Please state the different contact persons from the following departments here: Management, Sales, Accounting and Logistics.';

let ContactType = {};
ContactType.Default = 'Default';
ContactType.Sales = 'Sales';
ContactType.Escalation = 'Escalation';
ContactType.Product = 'Product';
ContactType.Technical = 'Technical';

let Department = {};
Department.Management = 'Management';
Department.Logistics = 'Logistics';
Department.Sales = 'Sales';
Department.Accounting = 'Accounting';
Department.Support = 'Support';
Department.IT = 'IT';
Department.Others = 'Others';

let Select = {};
Select.contactType = 'Select type...';
Select.department = 'Select department...';

let Label = {
  contactId: 'Contact ID',
  contactType: 'Contact Type',
  firstName: 'First Name',
  lastName: 'Last Name',
  email: 'Email',
  phone: 'Phone',
  mobile: 'Mobile',
  department: 'Department',
  title: 'Salutation',
  fax: 'Fax'
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
  SupplierContactEditor: {
    Title: Title,
    Tooltip: Tooltip,
    Select: Select,
    ContactType: ContactType,
    Department: Department,
    Message: Message,
    Error: Error,
    ContactInfo: ContactInfo,
    Confirmation: Confirmation,
    Button: Button,
    Label: Label,
  },
};
