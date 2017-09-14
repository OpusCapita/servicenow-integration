import React from 'react';
import i18n from '../../i18n/I18nDecorator.react.js';

/**
 * Label - <objectName>.<fieldName>.label
 * Tooltip - <objectName>.<fieldName>.tooltip
 */
@i18n
class Label extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    objectName: React.PropTypes.string.isRequired,
    fieldName: React.PropTypes.string.isRequired,
    isRequired: React.PropTypes.bool,
    hideTooltip: React.PropTypes.bool
  };

  static defaultProps = {
    hideTooltip: false,
    isRequired: false
  };

  render() {
    const { className, fieldName } = this.props;

    return (
      <label className={className} htmlFor={fieldName} />
    );
  }
}

export default Label;
