import React, { PropTypes, Component } from 'react';
import request from 'superagent-bluebird-promise';
import validationMessages from '../../utils/validatejs/i18n';
import i18nMessages from './i18n';
import Alert from '../Alert';
import SupplierRegistrationEditorForm from './SupplierRegistrationEditorForm.react.js';
import SupplierExistsView from './SupplierExistsView.react';

/**
 * Provide general company information.
 */
class SupplierRegistrationEditor extends Component {

  static propTypes = {
    actionUrl: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    supplier: PropTypes.object,
    onChange: React.PropTypes.func,
    onUpdate: React.PropTypes.func,
    onUnauthorized: React.PropTypes.func,
    onLogout: React.PropTypes.func
  };

  static contextTypes = {
    i18n : React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      hasErrors: false,
      supplier: {
        ...this.props.supplier
      },
      supplierExist: false
    }
  }

  createSupplierPromise = null;

  componentWillMount(){
    this.context.i18n.register('SupplierValidatejs', validationMessages);
    this.context.i18n.register('SupplierRegistrationEditor', i18nMessages);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      globalInfoMessage: '',
      globalErrorMessage: ''
    });

    if(nextContext.i18n){
      nextContext.i18n.register('SupplierValidatejs', validationMessages);
      nextContext.i18n.register('SupplierRegistrationEditor', i18nMessages);
    }
  }

  componentWillUnmount() {
    if (this.createSupplierPromise) {
      this.createSupplierPromise.cancel();
    }
  }

  handleChange = () => {
    if (this.props.onChange) {
      this.props.onChange({ isDirty: true });
    }
  }

  handleBackToForm = () => {
    this.setState({ supplierExist: false });
  }

  handleUpdate = newSupplier => {
    if (!newSupplier) {
      this.setState({
        globalInfoMessage: '',
        globalErrorMessage: '',
      });
      return;
    }

    newSupplier = {  // eslint-disable-line no-param-reassign
      ...newSupplier,
      createdBy: this.props.user.id,
      changedBy: this.props.user.id
    };

    this.createSupplierPromise = request.post(`${this.props.actionUrl}/supplier/api/suppliers`).
      set('Accept', 'application/json').
      send(newSupplier).
      promise();

    return this.createSupplierPromise.then(response => {
      this.setState({
        supplier: response.body,
        globalInfoMessage: this.context.i18n.getMessage('SupplierRegistrationEditor.Messages.saved'),
        globalErrorMessage: ''
      });

      const { supplier } = this.state;

      // we need to refresh the id token before we can do any calls to backend as supplier user
      return request.post('/refreshIdToken').set('Content-Type', 'application/json').then((resp) => {
        console.log("id token refreshed");

        const user = this.props.user;
        const contact = {
            contactId: `${user.id}_${supplier.supplierId}`,
            contactType: "Default",
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            supplierId: supplier.supplierId,
            createdBy: user.id,
            changedBy: user.id
        }

        return request.post(`${this.props.actionUrl}/supplier/api/suppliers/${encodeURIComponent(supplier.supplierId)}/contacts`).
        set('Accept', 'application/json').send(contact).then(response => {
          console.log('contact created');

          if (this.props.onUpdate) {
            this.props.onUpdate({
              supplierId: supplier.supplierId,
              supplierName: supplier.supplierName
            });
          }

          if (this.props.onChange) {
            this.props.onChange({ isDirty: false });
          }

          return Promise.resolve(null);
        }).catch(err => {
          console.error('error creating contact: ' + err);
          throw err;
        })
      }).catch(err => {
        console.err('error refreshing idToken: ' + err);
        throw err;
      });
    }).
    catch(errors => {
      this.setState({
        supplier: newSupplier
      })

      switch (errors.status) {
        case 403: case 405:
          this.setState({
            globalInfoMessage: '',
            globalErrorMessage: this.context.i18n.getMessage('SupplierRegistrationEditor.Messages.failedUnauthorized'),
          });
          break;
        case 401:
          this.props.onUnauthorized();
          break;
        case 409:
          this.setState({
            supplierExist: true,
            globalInfoMessage: '',
            globalErrorMessage: ''
          });
          break;
        default:
          this.setState({
            globalInfoMessage: '',
            globalErrorMessage: this.context.i18n.getMessage('SupplierRegistrationEditor.Messages.failed'),
          });
      }

      return Promise.resolve(null);
    });
  }

  toRender = () => {
    if (this.state.supplierExist) {
      return <SupplierExistsView i18n={this.context.i18n} onBack={ this.handleBackToForm }/>
    } else {
      return <SupplierRegistrationEditorForm
               {...this.props}
               supplier={ this.state.supplier }
               onSupplierChange={ this.handleUpdate }
               onChange={ this.handleChange }
               onCancel={ this.props.onLogout }
             />
    }
  }

  render() {
    const { hasErrors, globalInfoMessage = '', globalErrorMessage = '' } = this.state;

    if (hasErrors) {
      return (
        <div>{ this.context.i18n.getMessage('SupplierRegistrationEditor.Messages.unableToRender') }</div>
      );
    }

    return (
      <div className="container supplier-registration-container">
        <div className='box' id='supplier-registration'>
          <Alert bsStyle="info"
            message={globalInfoMessage}
            visible={!!globalInfoMessage}
            hideCloseLink={true}
          />

          <Alert bsStyle="danger"
            message={globalErrorMessage}
            visible={!!globalErrorMessage}
            hideCloseLink={true}
          />

          <h2>{this.context.i18n.getMessage('SupplierRegistrationEditor.Messages.companyRegistration')}</h2>

          {this.toRender()}
        </div>
      </div>
    );
  }
}

export default SupplierRegistrationEditor;
