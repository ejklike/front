import React from 'react';
import { Button } from 'react-materialize';
import { connect } from 'react-redux';
import { pathToggle, blogToggle, pathAdd } from '../../actions';

class PlaceInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      star: "",
      money: ""
    }
    this.renderRatingAndPrice = this.renderRatingAndPrice.bind(this);
  }

  renderRatingAndPrice() {
    let starTmp = "";

    for(let i=1; i<=Math.floor(this.props.rating); i++) {
      starTmp += "★";
    }

    this.setState({
      star: starTmp
    });

    let moneyTmp = "";

    for(let i=1; i<=Math.floor(this.props.price_level); i++) {
      moneyTmp += "$";
    }

    this.setState({
      money: moneyTmp
    });

    console.log("star", starTmp, "money", moneyTmp);
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
          rating: {this.state.star}<br />
          price level: {this.state.money}
        </div>
      );
    }
  }
}

export default PlaceInfo;
