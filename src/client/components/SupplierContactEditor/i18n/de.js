// Confirmation dialogs
let Confirmation = {
  cancel: 'Wollen Sie den Vorgang wirklich abbrechen?',
  delete: 'Do you really want to delete this contact?'
};
// eslint-disable-next-line max-len
let Title = 'Bitte hinterlegen Sie hier die Ansprechpartner aus den Bereichen Geschäftsleitung, Vertrieb, Buchhaltung und Logistik.\nGerne können Sie auch noch weitere Ansprechpartner benennen.';

let ContactType = {};
ContactType.Default = 'Default';
ContactType.Sales = 'Verkauf';
ContactType.Escalation = 'Eskalation';
ContactType.Product = 'Produkt';
ContactType.Technical = 'Technisch';

let Department = {};
Department.Management = 'Geschäftsführung';
Department.Logistics = 'Logistik';
Department.Sales = 'Vertrieb';
Department.Accounting = 'Buchhaltung';
Department.Support = 'Kundenbetreuung';
Department.IT = 'Datenmanagement';
Department.Others = 'Sonstiges';

let Select = {};
Select.contactType = 'Ansprechpartner-Typ auswählen ...';
Select.department = 'Abteilung auswählen ...';

let Label = {
  contactId: 'Kontakt ID',
  contactType: 'Ansprechpartner-Typ',
  firstName: 'Vorname',
  lastName: 'Nachname',
  email: 'E-Mail',
  phone: 'Telefon',
  mobile: 'Mobiltelefon',
  department: 'Abteilung',
  title: 'Anrede',
  fax: 'Telefax'
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
