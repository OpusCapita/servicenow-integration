import React, { PropTypes } from 'react';
import request from "superagent-bluebird-promise";
import querystring from 'querystring';
import translations from './i18n';
import lodash from 'lodash';
import ReactSelectSpecificProps from '../ReactSelectSpecificProps';
import ReferenceInputBaseProps from '../ReferenceInputBaseProps';
import ReferenceSearchInput from '../ReferenceSearchInput';
import ReferenceAutocomplete from '../ReferenceAutocomplete';
import isServiceRegistryConfiguredFor from '../ServiceRegistryValidator';
import refreshValueDecorator from "../utils/refreshValueDecorator.react";

const SERVICE_NAME = 'supplier';

const loadSupplier = (serviceRegistry) => {
  return (supplierId) => {
    return request.get(
      `${serviceRegistry(SERVICE_NAME).url}/api/suppliers/${supplierId}`
    ).set('Accept', 'application/json');
  }
};

@refreshValueDecorator('supplierId', '_objectLabel', loadSupplier)
export default class SupplierInput extends React.Component {

  static propTypes = {
    ...ReferenceInputBaseProps,
    reactSelectSpecificProps: React.PropTypes.shape(ReactSelectSpecificProps),
    serviceRegistry: isServiceRegistryConfiguredFor(SERVICE_NAME)
  };

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.context.i18n.register('SupplierInput', translations)
  }

  render() {
    let serviceUrl = this.props.serviceRegistry(SERVICE_NAME).url;
    let referenceSearchProps = lodash.extend(
      // copy this properties
      lodash.pick(this.props, ['id', 'name', 'onBlur', 'onFocus', 'onChange', 'multiple', 'disabled', 'readOnly']),
      // add custom properties
      {
        value: this.props.value,
        referenceSearchAction: (searchParams, callback) => {
          let queryParams = querystring.stringify(searchParams);
          return request.get(
            `${serviceUrl}/api/suppliers?${queryParams}`
          ).set('Accept', 'application/json').then((response) => {
            return callback(
              {
                count: lodash.size(response.body),
                items: response.body
              }
            )
          });
        },
        searchFields: [
          {
            name: 'supplierId',
            label: this.context.i18n.getMessage('SupplierInput.supplierId')
          },
          {
            name: 'supplierName',
            label: this.context.i18n.getMessage('SupplierInput.supplierName')
          },
          {
            name: 'supplierGroup.name',
            label: this.context.i18n.getMessage('SupplierInput.supplierGroupName')
          }
        ],
        resultFields: [
          {
            name: 'supplierId',
            label: this.context.i18n.getMessage('SupplierInput.supplierId'),
            sortable: true
          },
          {
            name: 'supplierName',
            label: this.context.i18n.getMessage('SupplierInput.supplierName'),
            sortable: true
          },
          {
            name: 'supplierGroup.name',
            label: this.context.i18n.getMessage('SupplierInput.supplierGroupName')
          }
        ],
        title: this.context.i18n.getMessage('SupplierInput.dialogTitle'),
        labelProperty: '_objectLabel',
        valueProperty: 'supplierId'
      }
    );

    let autocompleteProps = {
      labelProperty: referenceSearchProps.labelProperty,
      valueProperty: referenceSearchProps.valueProperty,
      autocompleteAction: (searchTerm) => {
        let queryParams = querystring.stringify({
          q: searchTerm
        });
        return request.get(
          `${serviceUrl}/api/suppliers?${queryParams}`
        ).set('Accept', 'application/json').then((response) => {
          return {
            options: response.body,
            complete: false
          };
        });
      },
      reactSelectSpecificProps: this.props.reactSelectSpecificProps
    };
    return (
      <ReferenceSearchInput {...referenceSearchProps}>
        <ReferenceAutocomplete {...autocompleteProps}/>
      </ReferenceSearchInput>
    );
  }
}
