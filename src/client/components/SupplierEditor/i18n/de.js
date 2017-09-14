// Confirmation dialogs
let Confirmation = {};
Confirmation.cancel = 'Wollen Sie den Vorgang wirklich abbrechen?';
Confirmation.delete = 'Wollen Sie diesen Lieferanten wirklich löschen?';

let ButtonLabel = {};
ButtonLabel.add = 'Hinzufügen';
ButtonLabel.edit = 'Bearbeiten';
ButtonLabel.delete = 'Löschen';
ButtonLabel.attach = 'Dokument hinzufügen';
ButtonLabel.save = 'Speichern';
ButtonLabel.cancel = 'Abbrechen';

let TableHeader = {};
TableHeader.supplierName = 'Name des Unternehmens';
TableHeader.homePage = 'Homepage';
TableHeader.foundedOn = 'Datum der Firmengründung';
TableHeader.legalForm = 'Rechtsform der Unternehmung';
TableHeader.commercialRegisterNo = 'Handelsregisternummer';
TableHeader.cityOfRegistration = 'Ort der Registrierung';
TableHeader.countryOfRegistration = 'Land der Registrierung';
TableHeader.taxIdentificationNo = 'Steuernummer';
TableHeader.vatIdentificationNo = 'Umsatzsteuer-Ident-Nr.';
TableHeader.dunsNo = 'D-U-N-S-Nr.';
TableHeader.globalLocationNo = 'Global Location Number (GLN/ILN)';

let Select = {};
Select.country = 'Bitte ein Land auswählen ...';

let Description = {};
Description.viewSupplierOrChooseAnother = 'Allgemeine Firmeninformationen.';

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
Label.supplierName.label = 'Name des Unternehmens';
Label.supplierId.label = 'Firmen-ID';
Label.homePage.label = 'Homepage';
Label.role.label = 'Rolle';
Label.buying.label = 'Kauf';
Label.selling.label = 'Verkauf';
Label.foundedOn.label = 'Datum der Firmengründung';
Label.legalForm.label = 'Rechtform des Unternehmens';
Label.commercialRegisterNo.label = 'Handelsregisternummer';
Label.cityOfRegistration.label = 'Ort der Registrierung';
Label.countryOfRegistration.label = 'Land der Registrierung';
Label.taxIdentificationNo.label = 'Steuernummer';
Label.vatIdentificationNo.label = 'Umsatzsteuer-Ident-Nr.';
Label.dunsNo.label = 'D-U-N-S-Nr.';
Label.globalLocationNo.label = 'Global Location Number (GLN/ILN)';
Label.isNewSupplier.label = 'Existierenden Lieferanten auswählen';
Label.supplier.label = 'Lieferant';

let SupplierEditor = {};
SupplierEditor.created = 'Die Informationen auf diesem Reiter wurden erstmalig durch {by} am {on} erstellt.';
SupplierEditor.changed = 'Die Informationen wurden zuletzt am {on} durch {by} bearbeitet.';

const Messages = {};
Messages.loading = 'Laden...';
Messages.register = 'Registrieren';
Messages.unableToRender = 'Bitte melden sie sich an bevor Sie fortfahren';
Messages.saved = 'Die Daten wurden erfolgreich gespeichert';
Messages.failed = 'Speichern von Objekten fehlgeschlagen';
Messages.failedModifyingNotAuthoredSupplier = 'Speichern von Objekten fehlgeschlagen:' +
  ' nur der Autor kann die Firmeninformationen aktualisieren';
Messages.failedCreatingExistingSupplier = 'Speichern von Objekten fehlgeschlagen:' +
  ' ein Unternehmen mit gleiche Firmenname existiert bereits';
Messages.required = '** Bitte hinterlegen Sie Ihre Umsatzsteuer-Identifikationsnummer. Wenn Sie keine haben, dann hinterlegen Sie Ihre Global Location Number oder Ihre D-U-N-S-Nummer.';
Messages.noVatId = 'Meine Firma hat keine Umsatzsteuer-Ident-Nummer.';
Messages.clickCheckBox = 'Bitte hinterlegen Sie Ihre Umsatzsteuer-Identifikationsnummer.';

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
