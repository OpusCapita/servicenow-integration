import React, {Component} from "react";

class DisplayRow extends Component {

  render() {
    return (
      <tr>{ this.props.children }</tr>
    );
  }
}

export default DisplayRow;
