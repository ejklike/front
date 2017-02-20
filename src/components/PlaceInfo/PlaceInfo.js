import React from 'react';
import { Button } from 'react-materialize';
import { connect } from 'react-redux';
import { pathToggle, blogToggle, pathAdd } from '../../actions';

class PlaceInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.price_level === null) {
      return (
        <div>
          <strong>{this.props.name}</strong><br />
          rating: {this.props.rating}
        </div>
      );
    } else {
      return (
        <div>
          <strong>{this.props.name}</strong><br />
          rating: {this.props.rating}<br />
          price level: {this.props.price_level}
        </div>
      );
    }
  }
}

export default PlaceInfo;
