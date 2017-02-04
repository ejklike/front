import React from 'react';
import restaurant from './restaurant.json';
import shopping from './shopping.json';
import entertainment from './entertainment.json';
import history from './history.json';

export class Markers extends React.Component {
  constructor(props) {
    super(props);
    this.setMarkers();
  }
 
  componentDidUpdate(prevProps) {
    if(this.props.isPressed !== prevProps.isPressed) {
      if(this.props.isPressed) {
        this.showMarkers();
      } else {
        this.hideMarkers();
      }
    }
  }
  
  setMarkers() {
    let dummies = [];

    if(this.props.category === "식사") {
      dummies = restaurant; 
    } else if(this.props.category === "쇼핑") {
      dummies = shopping;
    } else if(this.props.category === "유흥") {
      dummies = entertainment;
    } else if(this.props.category === "유적") {
      dummies = history;
    } 

    for(var i=0; i<dummies.length; i++)
    {
      let pref = {
        position: {
          lat: dummies[i].pos.lat,
          lng: dummies[i].pos.lng
        }
      };

      let marker = new google.maps.Marker(pref);

      marker.addListener('mouseover', () => {
        marker.setOpacity(0.5);
      })
      
      if(this.props.category === "식사") {
        this.props.restaurantMarkers.push(marker);
      } else if(this.props.category === "쇼핑") {
        this.props.shoppingMarkers.push(marker);
      } else if(this.props.category === "유흥") {
        this.props.entertainmentMarkers.push(marker);
      } else if(this.props.category === "유적") {
        this.props.historyMarkers.push(marker);
      } 
    }

    //console.log(this.props.category, this.props.markerArr.length);
  }

  showMarkers() {
    let markers = [];

    if(this.props.category === "식사") {
      markers = this.props.restaurantMarkers; 
    } else if(this.props.category === "쇼핑") {
      markers = this.props.shoppingMarkers;
    } else if(this.props.category === "유흥") {
      markers = this.props.entertainmentMarkers;
    } else if(this.props.category === "유적") {
      markers = this.props.historyMarkers;
    } 

    for(var i=0; i<markers.length; i++) {
      markers[i].setMap(this.props.map);
    }
  }
  
  hideMarkers() {
    let markers = [];

    if(this.props.category === "식사") {
      markers = this.props.restaurantMarkers; 
    } else if(this.props.category === "쇼핑") {
      markers = this.props.shoppingMarkers;
    } else if(this.props.category === "유흥") {
      markers = this.props.entertainmentMarkers;
    } else if(this.props.category === "유적") {
      markers = this.props.historyMarkers;
    } 

    for(var i=0; i<markers.length; i++) {
      markers[i].setMap(null);
    }
  } 
   
  render() {
    return null;
  }
}

Markers.defaultProps = {
  restaurantMarkers: [],
  shoppingMarkers: [],
  entertainmentMarkers: [],
  historyMarkers: []
};

export default Markers;
