import React from 'react';
import dummies from './dummies.json';

export class Markers extends React.Component {
  constructor(props) {
    super(props);
  }
 
  componentDidUpdate(prevProps) {
    if(this.props.isPressed !== prevProps.isPressed 
        || this.props.map !== prevProps.map)
      this.renderMarkers();
  }

  renderMarkers() {
    const map = this.props.map;
    let google = this.props.google;

    console.log(this.props.category);
    for(var i=0; i<dummies.length; i++)
    {
      if(dummies[i].category == this.props.category)
      {
        let pref = {
           position: { lat: dummies[i].pos.lat, lng: dummies[i].pos.lng },
        };
        let marker = new google.maps.Marker(pref);
       
        if(this.props.isPressed) { 
          console.log("set",marker);
          marker.setMap(map);
        } else {
          console.log("remove",marker);
          marker.setMap(null);
        }
      }
    }
  }

  render() {
    return null;
  }
}

export default Markers;
