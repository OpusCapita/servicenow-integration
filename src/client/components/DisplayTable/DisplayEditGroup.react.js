import React, {Component} from "react";
import Button from "react-bootstrap/lib/Button";
import DisplayField from './DisplayField.react.js';

class DisplayEditGroup extends Component {

  static propTypes = {
    editAction: React.PropTypes.func,
    editLabel: React.PropTypes.string,
    deleteAction: React.PropTypes.func,
    deleteLabel: React.PropTypes.string
  };

  static defaultProps = {
    editAction: () => { console.warn('editAction not provided')},
    deleteAction: () => { console.warn('deleteAction not provided')},
  };

  render() {
    return (<DisplayField>
      <Button onClick={this.props.editAction.bind(this)} bsSize="sm">
        <span className="glyphicon glyphicon-edit"/>&nbsp;
        { this.props.editLabel }
      </Button>
      <Button onClick={this.props.deleteAction.bind(this)} bsSize="sm">
        <span className="glyphicon glyphicon-trash"/>&nbsp;
        { this.props.deleteLabel }
      </Button>
    </DisplayField>)
  }
}

export default DisplayEditGroup;
