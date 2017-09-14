import React, {Component} from "react";

class DisplayTable extends Component {

  static propTypes = {
    headers: React.PropTypes.array.isRequired,
  };

  static defaultProps = {
    headers: [],
  };

  render() {
    const headers = this.props.headers;
    return (
      <table className="table">
        <thead>
        <tr>
          { headers.map((element, index) => (
            <th key={index}>{element.label}</th>)) }
        </tr>
        </thead>
        <tbody>
        { this.props.children }
        </tbody>
      </table>
    );
  }
}

export default DisplayTable;
