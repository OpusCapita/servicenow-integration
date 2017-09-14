const SupplierContact = require('../queries/supplier_contacts');

module.exports = function(app, db, config) {
  SupplierContact.init(db, config).then(() =>
  {
    app.get('/api/suppliers/:supplierId/contacts', (req, res) => sendSupplierContacts(req, res));
    app.post('/api/suppliers/:supplierId/contacts', (req, res) => createSupplierContact(req, res));
    app.get('/api/suppliers/:supplierId/contacts/:contactId', (req, res) => sendSupplierContact(req, res));
    app.put('/api/suppliers/:supplierId/contacts/:contactId', (req, res) => updateSupplierContact(req, res));
    app.delete('/api/suppliers/:supplierId/contacts/:contactId', (req, res) => deleteSupplierContact(req, res));
  });
};

let sendSupplierContacts = function(req, res)
{
  SupplierContact.all(req.params.supplierId).then(contacts =>
  {
    res.json(contacts);
  });
};

let sendSupplierContact = function(req, res)
{
  SupplierContact.find(req.params.supplierId, req.params.contactId).then(contact =>
  {
    res.json(contact);
  });
};

let createSupplierContact = function(req, res)
{
  SupplierContact.create(req.body).then(contact => res.status('200').json(contact))
  .catch(error => {
    req.opuscapita.logger.error('Error when creating SupplierContact: %s', error.message);
    return res.status('400').json({ message : error.message });
  });
}

let updateSupplierContact = function(req, res)
{
  let contactId = decodeURIComponent(req.params.contactId);
  let supplierId = req.params.supplierId;
  SupplierContact.contactExists(supplierId, contactId).then(exists =>
  {
    if(exists)
    {
      return SupplierContact.update(supplierId, contactId, req.body).then(contact => res.status('200').json(contact));
    } else {
      const message = 'A supplier contact with ID ' + contactId + ' does not exist.'
      req.opuscapita.logger.error('Error when updating SupplierContact: %s', message);
      return res.status('404').json({ message : message });
    }
  })
  .catch(error => {
    req.opuscapita.logger.error('Error when updating SupplierContact: %s', error.message);
    return res.status('400').json({ message : error.message });
  });
}

let deleteSupplierContact = function(req, res)
{
  let contactId = decodeURIComponent(req.params.contactId);
  SupplierContact.delete(req.params.supplierId, contactId).then(() => res.status('200').json(null))
  .catch(error => {
    req.opuscapita.logger.error('Error when deleting SupplierContact: %s', error.message);
    return res.status('400').json({ message : error.message });
  });
}
