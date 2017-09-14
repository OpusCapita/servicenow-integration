import React, { Component, PropTypes } from 'react';
import Gauge from 'react-svg-gauge';
import request from 'superagent-bluebird-promise';
import hexColourCalculator from './hexColourCalculator.js';
import browserInfo from '../../utils/browserInfo';

class SupplierProfileStrength extends Component {
  static propTypes = {
    actionUrl: PropTypes.string.isRequired,
    supplierId: PropTypes.string.isRequired
  };

  constructor() {
    super();
    this.state = {
      value: 0
    }
  }

  profileStrengthPromise = null;

  componentDidMount() {
    const getRequest = request.get(`${this.props.actionUrl}/supplier/api/suppliers/${encodeURIComponent(this.props.supplierId)}/profile_strength`);

    if (browserInfo.isIE()) getRequest.query({ cachebuster: Date.now().toString() }); /* Do not use cache in request if browser is IE */

    this.profileStrengthPromise = getRequest.set('Accept', 'application/json').promise();

    this.profileStrengthPromise.then(response => this.setState({ value: response.body })).catch(errors => null);
  }

  componentWillUnmount() {
    if (this.profileStrengthPromise) {
      this.profileStrengthPromise.cancel();
    }
  }

  render() {
    const colorHex = hexColourCalculator.colourFor(this.state.value);

    return (
      <div>
        <Gauge value={this.state.value} width={200} height={160} color={colorHex} label="" />
      </div>
    );
  }
}

export default SupplierProfileStrength;
