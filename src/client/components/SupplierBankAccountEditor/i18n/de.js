// Confirmation dialogs
let Confirmation = {
  cancel: 'Wollen Sie den Vorgang wirklich abbrechen?',
  delete: 'Do you really want to delete this contact?'
};
// eslint-disable-next-line max-len
let Title = 'Bitte hinterlegen Sie Ihre Bankverbindung.';

let Label = {
  accountNumber: 'IBAN',
  bankIdentificationCode: 'BIC',
  bankCountryKey: 'Bank Land',
  bankCode: 'Bankleitzahl',
  bankName: 'Bank Name',
  extBankControlKey: 'External Bank Control Key',
  swiftCode: 'SWIFT-Code'
};

let Tooltip = {
  // eslint-disable-next-line max-len
  email: 'Die hier hinterlegte E-Mail wird für die weitere Kommunikation mit Ihnen verwendet. Bitte stellen Sie sicher, dass es sich um eine korrekte E-Mail Adresse handelt und diese zum angegebenen Ansprechpartner passt.',
  // eslint-disable-next-line max-len
  contactType: 'Der "LSA-Verantwortliche" Mitarbeiter ist Ihr Ansprechpartner rund um die Lieferantenstammdaten.\nDer "Katalog-Verantwortliche" Mitarbeiter ist Ihr Ansprechpartner rund um das Katalogmanagement.\n"Mitarbeiter" sind alle weiteren Ansprechpartner Ihres Unternehmens.'
};

let Button = {
  add: 'Hinzufügen',
  edit: 'Bearbeiten',
  delete: 'Löschen',
  save: 'Speichern',
  view: 'Ansehen',
  cancel: 'Abbrechen',
  close: 'Schliessen'
};

let ContactInfo = {
  created: 'Die Informationen auf diesem Reiter wurden erstmalig durch {by} am {on} erstellt.',
  changed: 'Die Informationen wurden zuletzt am {on} durch {by} bearbeitet.'
};

let Message = {
  objectDeleted: 'Objekt gelöscht.',
  objectUpdated: 'Objekt aktualisiert.',
  objectSaved: 'Die Daten wurden erfolgreich gespeichert.',
  deleteFailed: 'Das Objekt kann nicht gelöscht werden, vielleicht ist es bereits im Einsatz.',
  saveFailed: 'Speichern von Objekten fehlgeschlagen.',
  updateFailed: 'Object update failed.'
};

let Error = {
  notUnique: 'Der Wert darf nur einmal vorkommen'
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
