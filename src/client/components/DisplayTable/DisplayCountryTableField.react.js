import React, { Component } from 'react';
import request from 'superagent-bluebird-promise';
import DisplayField from "./DisplayField.react";

class DisplayCountryTableField extends Component {

  static propTypes = {
    actionUrl: React.PropTypes.string.isRequired,
    countryId: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      country: null
    }
  }

  loadCountryPromise = null;

  componentDidMount() {
    this.loadCountry(this.props.countryId);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.countryId !== newProps.countryId) {
      this.loadCountry(newProps.countryId);
    }
  }

  componentWillUnmount() {
    if (this.loadCountryPromise) {
      this.loadCountryPromise.cancel();
    }
  }

  loadCountry = (countryId) => {
    this.loadCountryPromise = request
      .get(`${this.props.actionUrl}/isodata/countries/${countryId}`)
      .set('Accept', 'application/json').promise();

    this.loadCountryPromise.then(response => {
      this.setState({
        country: response.body.name || response.body.id
      });
      return;
    }).
    catch(errors => {
      if (errors.status === 401) {
        this.props.onUnauthorized();
        return;
      }
    });

    return;
  };

  render() {
    return (<DisplayField>{this.state.country}</DisplayField>);
  }
}

export default DisplayCountryTableField;
