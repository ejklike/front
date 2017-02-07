import React from 'react';
import restaurant from './restaurant.json';
import shopping from './shopping.json';
import entertainment from './entertainment.json';
import history from './history.json';

class Markers extends React.Component {
  constructor(props) {
    super(props);
  }
 
  componentDidMount() {
    console.log("setMarkers");
    this.setMarkers();

    if(this.props.isPressed) {
      this.showMarkers();
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.isPressed !== prevProps.isPressed) {
      console.log("different");
      if(this.props.isPressed) {
        console.log("click");
        this.showMarkers();
      } else {
        console.log("cancel");
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
      marker.setOpacity(0.6);

      let request = {
        placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
      };

      let service = new google.maps.places.PlacesService(this.props.map); 

      service.getDetails(request, function(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          marker.rating = place.rating;
          marker.placeName = place.name;
        }
      });
      
      marker.addListener('mouseover', () => {
        marker.setOpacity(1.0);        
        
        const content = "rating: " + marker.rating + "<br>" + "name: " + marker.placeName;

        marker.infoWindow = new google.maps.InfoWindow({
          content: content
        })

        marker.infoWindow.open(this.props.map, marker);
      })
      
      marker.addListener('mouseout', () => {
        marker.setOpacity(0.6);

        marker.infoWindow.close(this.props.map, marker);
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
