import React from 'react';
import dummies from './dummies.json';

export class Markers extends React.Component {
  constructor(props) {
    super(props);
    this.setMarkers();
    this.renderMarkers();
  }
 
  componentDidUpdate(prevProps) {
    if(this.props.isPressed !== prevProps.isPressed 
        || this.props.map !== prevProps.map) 
      this.renderMarkers();
  }
  
  setMarkers() {
    for(var i=0; i<dummies.length; i++)
    {
      let pref = {
        position: {
          lat: dummies[i].pos.lat,
          lng: dummies[i].pos.lng
        }
      };

      let marker = new google.maps.Marker(pref);

      if(this.props.category === "식사" && dummies[i].category === "식사") {
        this.props.restaurantMarkers.push(marker);
      } else if(this.props.category === "쇼핑" && dummies[i].category === "쇼핑") {
        this.props.shoppingMarkers.push(marker);
      } else if(this.props.category === "유흥" && dummies[i].category === "유흥") {
        this.props.entertainMarkers.push(marker);
      } else if(this.props.category === "유적" && dummies[i].category === "유적"){
        this.props.historyMarkers.push(marker);
      }
    }
  }

  renderMarkers() {
    const map = this.props.map;
    let google = this.props.google;
    let markers = [];

    if(this.props.category === "식사")
      markers = this.props.restaurantMarkers;
    else if(this.props.category === "쇼핑")
      markers = this.props.shoppingMarkers;
    else if(this.props.category == "유흥")
      markers = this.props.entertainMarkers;
    else
      markers = this.props.historyMarkers;

    console.log(this.props.category, markers);
    for(var i=0; i<markers.length; i++) {
      if(this.props.isPressed) {
        markers[i].setMap(map);
      } else {
        markers[i].setMap(null);
      }
    }
  }

  render() {
    return null;
  }
}


Markers.defaultProps = {
  restaurantMarkers: [],
  shoppingMarkers: [],
  entertainMarkers: [],
  historyMarkers: []
};

export default Markers;
