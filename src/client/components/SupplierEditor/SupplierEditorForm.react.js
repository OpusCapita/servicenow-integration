import React, { PropTypes, Component } from 'react';
import _ from 'underscore';
import SupplierEditorFormRow from '../AttributeValueEditorRow.react.js';
import './SupplierEditor.css';
import SupplierConstraints from '../../utils/validatejs/supplierConstraints';
import DateInput from '@opuscapita/react-dates/lib/DateInput';
import serviceComponent from '@opuscapita/react-loaders/lib/serviceComponent';
import validator from '../../utils/validatejs/supplierValidator.js';

class SupplierEditorForm extends Component {
  static propTypes = {
    supplier: PropTypes.object,
    onSupplierChange: PropTypes.func.isRequired,
    dateTimePattern: PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    onCancel: React.PropTypes.func,
    actionUrl: React.PropTypes.string.isRequired
  };

  static contextTypes = {
    i18n: React.PropTypes.object.isRequired
  };

  static defaultProps = {
    readOnly: false
  };

  state = {
    supplier: {
      ...this.props.supplier
    },
    fieldErrors: {},
    hasVATId: Boolean(this.props.supplier.vatIdentificationNo)
  };

  componentWillMount() {
    let serviceRegistry = (service) => ({ url: `${this.props.actionUrl}/isodata` });
    const CountryField = serviceComponent({ serviceRegistry, serviceName: 'isodata' , moduleName: 'isodata-countries', jsFileName: 'countries-bundle' });

    this.externalComponents = { CountryField };

    this.constraints = new SupplierConstraints(this.context.i18n);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (!_.isEqual(this.props.supplier, nextProps.supplier)) {
      this.setState({
        supplier: {
          ...nextProps.supplier
        },
        fieldErrors: {},
        hasVATId: Boolean(nextProps.supplier.vatIdentificationNo)
      });
    }

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

    if (event && event.target) {
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

    constraints.supplierId = {};

    validator.forUpdate(this.context.i18n).
      async(this.state.supplier, constraints, { fullMessages: false }).then(null, error);
  };

  handleCancel = event => {
    event.preventDefault();
    this.props.onCancel();
  };

  handleUpdate = event => {
    event.preventDefault();

    const { onSupplierChange } = this.props;
    const supplier = this.state.supplier;
    const constraints = { ...this.constraints.forUpdate(), supplierId: {} };

    if (!supplier.vatIdentificationNo && this.state.hasVATId) {
      this.setFieldErrorsStates({ noVatReason: [this.context.i18n.getMessage('SupplierEditor.Messages.clickCheckBox')] });
    } else {
      const success = () => {
        supplier.noVatReason = supplier.vatIdentificationNo ? null : 'No VAT Registration Number';
        onSupplierChange(supplier);
      };

      const error = (errors) => {
        this.setFieldErrorsStates(errors);
        onSupplierChange(null);
      };

      validator.forUpdate(this.context.i18n).
        async(supplier, constraints, { fullMessages: false }).then(success, error);
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
    const constraints = this.constraints.forUpdate();

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
      <SupplierEditorFormRow
        labelText={ attrs.labelText || this.context.i18n.getMessage(`SupplierEditor.Label.${fieldName}.label`) }
        required={ isRequired }
        marked = { attrs.marked }
        rowErrors={ rowErrors }
      >
        { component }
      </SupplierEditorFormRow>
    );
  };

  render() {
    const { dateTimePattern } = this.props;
    const i18n = this.context.i18n;
    const { supplier } = this.state;
    const { CountryField } = this.externalComponents;
    const foundedOn = supplier['foundedOn'] ? new Date(supplier['foundedOn']) : '';

    return (
      <div>
        <h4 className="tab-description">
          { i18n.getMessage(`SupplierEditor.Description.viewSupplierOrChooseAnother`) }
        </h4>
        <form className="form-horizontal">
          { this.renderField({ fieldName: 'supplierName' }) }
          { this.renderField({ fieldName: 'homePage' }) }
          { this.renderField({
            fieldName: 'foundedOn',
            component: (
              <DateInput
                className="form-control"
                locale={i18n.locale}
                dateFormat={dateTimePattern}
                value={foundedOn}
                onChange={this.handleChange.bind(this, 'foundedOn')}
                onBlur={this.handleBlur.bind(this, 'foundedOn')}
                variants={[]}
              />
            )
          }) }

          { this.renderField({ fieldName: 'legalForm' }) }
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
                locale={this.context.i18n.locale}
              />
            )
          })}

          { this.renderField({ fieldName: 'taxIdentificationNo' }) }
          { this.renderField({ fieldName: 'vatIdentificationNo', marked: true }) }
          { this.renderField({
                  fieldName: 'noVatReason',
                  labelText: ' ',
                  component: (
                    <p>
                      <input className='fa fa-fw' type='checkbox' onChange={this.handleCheckboxChange} checked={!this.state.hasVATId}></input>
                      {this.context.i18n.getMessage('SupplierEditor.Messages.noVatId')}
                    </p>
                  )
                }) }
          { this.renderField({ fieldName: 'globalLocationNo', marked: true }) }
          { this.renderField({ fieldName: 'dunsNo', marked: true }) }

          <div className='supplier-form-submit'>
            <div className='text-right form-submit'>
              <button className="btn btn-primary" onClick={ this.handleUpdate }>
                { i18n.getMessage('SupplierEditor.ButtonLabel.save') }
              </button>
            </div>
          </div>
        </form>
        <p>{this.context.i18n.getMessage('SupplierEditor.Messages.required')}</p>
      </div>
    );
  }
}

export default SupplierEditorForm;
