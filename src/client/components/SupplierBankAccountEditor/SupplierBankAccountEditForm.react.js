import React, { Component } from "react";
import Button from "react-bootstrap/lib/Button";
import validator from "validate.js";
import "./SupplierBankAccountEditForm.css";
import SupplierBankAccountFormConstraints from "./SupplierBankAccountFormConstraints";
import SupplierBankAccountEditFormRow from "../AttributeValueEditorRow.react.js";
import serviceComponent from "@opuscapita/react-loaders/lib/serviceComponent";
import customValidation from "../../utils/validatejs/custom.js";

function getValidator() {
  customValidation.iban(validator);
  customValidation.bic(validator);
  return validator;
}

class SupplierBankAccountEditForm extends Component {
  static propTypes = {
    account: React.PropTypes.object.isRequired,
    actionUrl: React.PropTypes.string.isRequired,
    errors: React.PropTypes.object,
    editMode: React.PropTypes.oneOf(['edit', 'create', 'create-first', 'view']),
    onSave: React.PropTypes.func.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired
  };

  static contextTypes = {
    i18n: React.PropTypes.object.isRequired
  };

  static defaultProps = {
    editMode: 'create',
    errors: {}
  };

  state = {
    account: this.props.account,
    errors: this.props.errors || {}
  };

  componentWillMount() {
    let serviceRegistry = (service) => ({ url: `${this.props.actionUrl}/isodata` });
    const CountryField = serviceComponent({
      serviceRegistry,
      serviceName: 'isodata',
      moduleName: 'isodata-countries',
      jsFileName: 'countries-bundle'
    });

    this.externalComponents = {CountryField};

    this.constraints = SupplierBankAccountFormConstraints(this.context.i18n);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.account) {
      this.setState({account: nextProps.account, errors: nextProps.errors || {}});
    }

    this.constraints = SupplierBankAccountFormConstraints(nextContext.i18n);
  }

  handleSaveOrUpdate = (event) => {
    event.preventDefault();

    const account = this.state.account;
    let errors = getValidator()(this.state.account, this.constraints, { fullMessages: false });

    let errorsReformatted = Object.keys(errors)
      .map(key => ({ [key]:
        errors[key].map((element)=>({
          message: element
        }))})).reduce((current, prev, {}) => {
        return Object.assign(current, prev);
      });

    if (!errors) {
      const editMode = this.props.editMode;

      if (editMode === 'edit') {
        this.props.onUpdate(account);
      } else {
        this.props.onSave(account);
      }
    } else {
      this.setState({ errors: errorsReformatted });
    }
  };

  handleCancel = () => {
    const account = this.state.account;
    this.props.onCancel(account);
  };

  handleCountryChange = (fieldName, country) => {
    if (this.props.onChange) {
      this.props.onChange(fieldName, this.state.account[fieldName], country);
    }

    this.setState({
      account: {
        ...this.state.account,
        [fieldName]: country
      }
    });
  };

  handleChange = (fieldName, event) => {
    let newValue = event.target.value;

    if (this.props.onChange) {
      this.props.onChange(fieldName, this.state.account[fieldName], newValue);
    }

    this.setState({
      account: {
        ...this.state.account,
        [fieldName]: newValue
      }
    });
  };

  handleBlur = (fieldName/* , event*/) => {
    const errors = getValidator()(
      this.state.account, {
        [fieldName]: this.constraints[fieldName]
      }, {
        fullMessages: false
      }
    );

    this.setState({
      errors: {
        ...this.state.errors,
        [fieldName]: errors ?
          errors[fieldName].map(msg => ({ message: msg })) :
          []
      }
    });
  };

  renderField = (attrs) => {
    const { account, errors } = this.state;
    const { fieldName, disabled } = attrs;
    const fieldNames = attrs.fieldNames || [fieldName];

    let component = attrs.component ||
      <input className="form-control"
        type="text"
        value={ typeof account[fieldName] === 'string' ? account[fieldName] : '' }
        onChange={ this.handleChange.bind(this, fieldName) }
        onBlur={ this.handleBlur.bind(this, fieldName) }
        disabled={disabled}
      />;

    let isRequired = fieldNames.some(name => {
      return this.constraints[name] && this.constraints[name].presence;
    });

    let rowErrors = fieldNames.reduce(
      (rez, name) => rez.concat(errors[name] || []),
      []
    );

    return (
      <SupplierBankAccountEditFormRow
        labelText={ this.context.i18n.getMessage(`SupplierBankAccountEditor.Label.${fieldName}`) }
        required={ isRequired }
        rowErrors={ rowErrors }
      >
        { component }
      </SupplierBankAccountEditFormRow>
    );
  };

  render() {
    const editMode = this.props.editMode;
    const disabled = editMode === 'view';
    const { account } = this.state;
    const { CountryField } = this.externalComponents;

    return (
      <form className="form-horizontal" onSubmit={this.handleSaveOrUpdate}>
        { this.renderField({ fieldName: 'bankName', disabled: disabled }) }
        { this.renderField({ fieldName: 'accountNumber', disabled: disabled }) }
        { this.renderField({ fieldName: 'bankIdentificationCode', disabled: disabled }) }
        { this.renderField({ fieldName: 'bankCode', disabled: disabled }) }
        { this.renderField({ fieldName: 'swiftCode', disabled: disabled }) }
        { this.renderField({
          fieldName: 'bankCountryKey',
          component: (
            <CountryField
              actionUrl={this.props.actionUrl}
              value={account['bankCountryKey']}
              onChange={this.handleCountryChange.bind(this, 'bankCountryKey')}
              onBlur={this.handleBlur.bind(this, 'bankCountryKey')}
              optional={true}
              locale={this.context.i18n.locale}
            />
          )
        })}

        { this.renderField({ fieldName: 'extBankControlKey', disabled: disabled }) }

        <div className="col-sm-12 text-right address-form-submit">
          {editMode !== 'create-first' ? (
            <Button bsStyle="link"
              onClick={this.handleCancel}
            >
              {
                this.context.i18n.getMessage('SupplierBankAccountEditor.Button.' + (editMode === 'view' ? 'close' : 'cancel'))
              }
            </Button>
          ) : null}
          {editMode !== 'view' ? (
            <Button bsStyle="primary"
                    type="submit"
            >{this.context.i18n.getMessage('SupplierBankAccountEditor.Button.save')}</Button>
          ) : null}
        </div>
      </form>
    );
  }
}

export default SupplierBankAccountEditForm;
