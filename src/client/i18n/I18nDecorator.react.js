import React, { Component, PropTypes } from 'react';
import { I18nManager } from '@opuscapita/i18n';
import globalMessages from '../utils/validatejs/i18n';

import _ from 'lodash';

function injectI18NToContextTypes(DecoratedComponent) {
  if (DecoratedComponent.contextTypes === undefined) {
    // eslint-disable-next-line no-param-reassign
    DecoratedComponent.contextTypes = {};
  }
  // eslint-disable-next-line no-param-reassign
  DecoratedComponent.contextTypes.i18n = PropTypes.object.isRequired;
}

/**
 * Injects messages for any current component or just adds 'i18n' to 'contextTypes'.
 * Equivalent notation:
 * ...
 *  static contextTypes = {
 *    i18n: PropTypes.object.isRequired,
 *  };
 * ...
 *
 * Usage:
 *  @i18n({
 *    componentName: 'SupplierEditor',
 *    messages: require('./i18n').default,
 *  })
 *  or
 *  @i18n
 *
 * @param options Map with settings or decorated component when it is called like @i18n.
 * Now it's using the only property 'messages'.
 * @returns {Function}
 */
export default function i18n(options) {
  // if it's called via @i18n, options === DecoratedComponent
  if (_.isFunction(options)) {
    const DecoratedComponent = options;

    injectI18NToContextTypes(DecoratedComponent);

    return class extends Component {
      render() {
        return (
          <DecoratedComponent {...this.props} />
        );
      }
    }
  }

  return (DecoratedComponent) => {
    injectI18NToContextTypes(DecoratedComponent);
    // eslint-disable-next-line react/no-multi-comp
    return class extends Component {
      static contextTypes = {
        i18n: PropTypes.object.isRequired,
      };

      static childContextTypes = {
        i18n: PropTypes.object.isRequired,
      };

      getChildContext = () => {
        if (!this.context.i18n) {
          if (!this.props.locale) {
            console.warn('attribute [locale] must be require, because I18nManager not defined in parent context');
          }

          this.context.i18n = new I18nManager({
              locale: this.props.locale,
              fallbackLocale: 'en',
              localeFormattingInfo: { }
          });

          this.context.i18n.register('validatejs', globalMessages);
        }

        this.context.i18n.register(options.componentName, options.messages);
        return this.context;
      };

      render() {
        return (
          <DecoratedComponent {...this.props} />
        );
      }
    }
  }
}
