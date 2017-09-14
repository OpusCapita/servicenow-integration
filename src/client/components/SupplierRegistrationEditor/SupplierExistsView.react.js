import React, { PropTypes, Component } from 'react';

class SupplierExistsView extends Component {
  static propTypes = {
    onBack: PropTypes.func
  };

  static contextTypes = {
    i18n : React.PropTypes.object.isRequired
  };

  handleClick = () => {
    this.props.onBack();
  }

  render() {
    return (
      <div className="jumbotron">
        <h4>{this.context.i18n.getMessage('SupplierRegistrationEditor.Messages.supplierExistsHeader')}</h4>
        <p>{this.context.i18n.getMessage('SupplierRegistrationEditor.Messages.supplierExistsText')}</p>
        <button className="btn btn-default" onClick={ this.handleClick }>
          {this.context.i18n.getMessage('SupplierRegistrationEditor.ButtonLabel.back')}
        </button>
      </div>
    );
  }
}

export default SupplierExistsView;
