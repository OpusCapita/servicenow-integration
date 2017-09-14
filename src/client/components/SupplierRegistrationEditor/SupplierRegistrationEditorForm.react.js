import React, { PropTypes, Component } from 'react';
import _ from 'underscore';
import AttributeValueEditorRow from '../AttributeValueEditorRow.react.js';
import './SupplierRegistrationEditor.css';
import SupplierConstraints from '../../utils/validatejs/supplierConstraints';
import serviceComponent from '@opuscapita/react-loaders/lib/serviceComponent';
import validator from '../../utils/validatejs/supplierValidator.js';

class SupplierRegistrationEditorForm extends Component {
  static propTypes = {
    supplier: PropTypes.object,
    onSupplierChange: PropTypes.func.isRequired,
    onChange: React.PropTypes.func,
    onCancel: React.PropTypes.func,
    actionUrl: React.PropTypes.string.isRequired
  };

  static contextTypes = {
    i18n : React.PropTypes.object.isRequired
  };

  state = {
    supplier: {
      ...this.props.supplier
    },
    fieldErrors: {},
    hasVATId: true
  };

  componentWillMount() {
    let serviceRegistry = (service) => ({ url: `${this.props.actionUrl}/isodata` });
    const CountryField = serviceComponent({ serviceRegistry, serviceName: 'isodata' , moduleName: 'isodata-countries', jsFileName: 'countries-bundle' });

    this.externalComponents = { CountryField };

    this.constraints = new SupplierConstraints(this.context.i18n);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (_.isEqual(this.props.supplier, nextProps.supplier)) {
      return;
    }

    this.setState({
      supplier: {
        ...nextProps.supplier
      },
      fieldErrors: {},
    });

    this.constraints = new SupplierConstraints(nextContext.i18n);
  }

  setFieldErrorsStates = (errors) => {
    this.setState({
      fieldErrors: Object.keys(errors).reduce((rez, fieldName) => ({
        ...rez,
        [fieldName]: errors[fieldName].map(msg => ({ message: msg }))
      }), this.state.fieldErrors)
    });
  };

  handleChange = (fieldName, event) => {
    let newValue;

    if (event.target) {
      newValue = event.target.value;
    } else {
      newValue = event;
    }

    if (this.props.onChange) {
      this.props.onChange(fieldName, this.state.supplier[fieldName], newValue);
    }

    this.setState({
      supplier: {
        ...this.state.supplier,
        [fieldName]: newValue
      }
    });
  };

  handleBlur = (fieldName) => {
    const constraints = this.constraints.forField(fieldName);

    this.setState({
      fieldErrors: Object.keys(constraints).reduce((rez, fieldName) => ({
        ...rez,
        [fieldName]: []
      }), this.state.fieldErrors)
    });

    const error = (errors) => {
      this.setFieldErrorsStates(errors);
    };

    validator.forRegistration().async(this.state.supplier, constraints, { fullMessages: false }).then(null, error);
  };

  handleCancel = event => {
    event.preventDefault();
    this.props.onCancel();
  };

  handleUpdate = event => {
    event.preventDefault();

    const { onSupplierChange } = this.props;
    const supplier = this.state.supplier;
    const constraints = this.constraints.forRegistration();

    if (!supplier.vatIdentificationNo && this.state.hasVATId) {
      this.setFieldErrorsStates({ noVatReason: [this.context.i18n.getMessage('SupplierRegistrationEditor.Messages.clickCheckBox')] });
    } else {
      const success = () => {
        supplier.noVatReason = supplier.vatIdentificationNo ? null : 'No VAT Registration Number';
        onSupplierChange(supplier);
      };

      const error = (errors) => {
        this.setFieldErrorsStates(errors);
        onSupplierChange(null);
      };

      validator.forRegistration().async(supplier, constraints, { fullMessages: false }).then(success, error);
    }
  };

  handleCheckboxChange = () => {
    this.setFieldErrorsStates({ noVatReason: [] });
    this.setState({hasVATId: !this.state.hasVATId});
  };

  renderField = (attrs) => {
    const { supplier, fieldErrors } = this.state;
    const { fieldName } = attrs;
    const fieldNames = attrs.fieldNames || [fieldName];
    const constraints = this.constraints.forRegistration();

    let component = attrs.component ||
      <input className="form-control"
        type="text"
        value={ typeof supplier[fieldName] === 'string' ? supplier[fieldName] : '' }
        onChange={ this.handleChange.bind(this, fieldName) }
        onBlur={ this.handleBlur.bind(this, fieldName) }
      />;

    let isRequired = fieldNames.some(name => {
      return constraints[name] && constraints[name].presence;
    });

    let rowErrors = fieldNames.reduce((rez, name) => rez.concat(fieldErrors[name] || []), []);

    return (
      <AttributeValueEditorRow
        labelText={ attrs.labelText || this.context.i18n.getMessage(`SupplierRegistrationEditor.Label.${fieldName}.label`) }
        required={ isRequired }
        marked = { attrs.marked }
        rowErrors={ rowErrors }>
        { component }
      </AttributeValueEditorRow>
    );
  };

  render() {
    const { supplier } = this.state;
    const { CountryField } = this.externalComponents;

    return (
      <div className="row">
        <div className="col-md-8">
          <form className="form-horizontal">
            <div className="row">
              <div className="col-md-12">
                { this.renderField({ fieldName: 'supplierName' }) }
                { this.renderField({ fieldName: 'commercialRegisterNo' }) }
                { this.renderField({ fieldName: 'cityOfRegistration' }) }
                { this.renderField({
                  fieldName: 'countryOfRegistration',
                  component: (
                    <CountryField
                      actionUrl={this.props.actionUrl}
                      value={this.state.supplier['countryOfRegistration']}
                      onChange={this.handleChange.bind(this, 'countryOfRegistration')}
                      onBlur={this.handleBlur.bind(this, 'countryOfRegistration')}
                      optional={true}
                      locale={this.context.i18n.locale}
                    />
                  )
                }) }

                { this.renderField({ fieldName: 'taxIdentificationNo' }) }
                { this.renderField({ fieldName: 'vatIdentificationNo', marked: true }) }
                { this.renderField({
                  fieldName: 'noVatReason',
                  labelText: ' ',
                  component: (
                    <p>
                      <input className='fa fa-fw' type='checkbox' onChange={this.handleCheckboxChange}></input>
                      {this.context.i18n.getMessage('SupplierRegistrationEditor.Messages.noVatId')}
                    </p>
                  )
                }) }
                { this.renderField({ fieldName: 'globalLocationNo', marked: true }) }
                { this.renderField({ fieldName: 'dunsNo', marked: true }) }

                <div className='supplier-registration-form-submit'>
                  <div className='text-right form-submit'>
                    <button className="btn btn-link" onClick={this.handleCancel}>
                      {this.context.i18n.getMessage('SupplierRegistrationEditor.ButtonLabel.cancel')}
                    </button>
                    <button className="btn btn-primary" onClick={ this.handleUpdate }>
                      {this.context.i18n.getMessage('SupplierRegistrationEditor.ButtonLabel.continue')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-4">
          <p>{this.context.i18n.getMessage('SupplierRegistrationEditor.Messages.information1')}</p>
          <p>{this.context.i18n.getMessage('SupplierRegistrationEditor.Messages.information2')}</p>
          <p>{this.context.i18n.getMessage('SupplierRegistrationEditor.Messages.required')}</p>
        </div>
      </div>
    );
  }
}

export default SupplierRegistrationEditorForm;
