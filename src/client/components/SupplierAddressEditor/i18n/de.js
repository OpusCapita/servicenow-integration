// Confirmation dialogs
let Confirmation = {};
Confirmation.cancel = 'Wollen Sie den Vorgang wirklich abbrechen?';
Confirmation.delete = "Wollen Sie diese Adresse wirklich löschen?";

let Button = {};
Button.add = 'Hinzufügen';
Button.edit = ' Bearbeiten';
Button.view = ' Ansehen';
Button.delete = ' Löschen';
Button.attach = 'Dokument hinzufügen';
Button.save = 'Speichern';
Button.cancel = 'Abbrechen';
Button.close = 'Schliessen';

let Label = {
  address: {}
};
Label.type = 'Typ';
Label.street = 'Straße';
Label.zipCode = 'Postleitzahl';
Label.city = 'Stadt';
Label.countryId = 'Land';
Label.phoneNo = 'Telefon';
Label.faxNo = 'Telefax';
Label.salutation = 'Anrede';
Label.name = 'Name';
Label.street1 = 'Straße 1';
Label.street2 = 'Straße 2';
Label.street3 = 'Straße 3';
Label.areaCode = 'Postleitzahlbereich';
Label.state = 'Bundesland';
Label.pobox = 'Postfach';
Label.poboxZipCode = 'PLZ des Postfachs';
Label.email = 'Email';

let Title = 'Bitte hinterlegen Sie hier die Unternehmensanschrift.';

let Message = {
  objectDeleted: 'Objekt gelöscht.',
  objectUpdated: 'Objekt aktualisiert.',
  objectSaved: 'Die Daten wurden erfolgreich gespeichert',
  deleteFailed: 'Das Objekt kann nicht gelöscht werden, vielleicht ist es bereits im Einsatz.',
  saveFailed: 'Speichern von Objekten fehlgeschlagen.',
  updateFailed: 'Object update failed.'
};

let Select = {};
Select.type = 'Bitte den Adresstyp auswählen ...';
Select.country = 'Bitte ein Land auswählen ...';

let AddressInfo = {};
AddressInfo.created = 'Die Informationen auf diesem Reiter wurden erstmalig durch {by} am {on} erstellt.';
AddressInfo.changed = 'Die Informationen wurden zuletzt am {on} durch {by} bearbeitet.';

let AddressType = {};
AddressType.default = 'Standard-Firmenanschrift';
AddressType.invoice = 'Rechnungsanschrift';
AddressType.rma = 'Retourenanschrift';
AddressType.plant = 'Werksanschrift';

export default {
  SupplierAddressEditor: {
    Confirmation: Confirmation,
    Message: Message,
    Button: Button,
    Label: Label,
    Title: Title,
    Select: Select,
    AddressInfo: AddressInfo,
    AddressType: AddressType,
  }
};
