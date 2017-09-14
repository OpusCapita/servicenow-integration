import React, {Component} from "react";

class DisplayField extends Component {

  render() {
    return (
      <td>{ this.props.children }</td>
    );
  }
}

export default DisplayField;
