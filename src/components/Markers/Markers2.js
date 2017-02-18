import React from 'react';
import restaurant from './restaurant.json';
import shopping from './shopping.json';
import entertainment from './entertainment.json';
import history from './history.json';
import { connect } from 'react-redux';
import { pathToggle, blogToggle, pathAdd, pathAddModeToggle } from '../../actions';

class Markers extends React.Component {
  componentDidMount() {
    this.setMarkers();

    if(this.props.isPressed) {
      this.showMarkers();
    }
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
    let imgUrl = {};

    if(this.props.category === "식사") {
      dummies = restaurant; 
      imgUrl = './assets/img/icons/restaurant.png';
    } else if(this.props.category === "쇼핑") {
      dummies = shopping;
      imgUrl = './assets/img/icons/shopping.png';
    } else if(this.props.category === "유흥") {
      dummies = entertainment;
      imgUrl = './assets/img/icons/entertainment.png';
    } else if(this.props.category === "유적") {
      dummies = history;
      imgUrl = './assets/img/icons/history.png';
    } 

    for(var i=0; i<dummies.length; i++)
    {
      let pref = {
        position: {
          lat: dummies[i].pos.lat,
          lng: dummies[i].pos.lng
        },
        icon: imgUrl
      };

      let marker = new window.google.maps.Marker(pref);
      marker.setOpacity(0.8);

      let request = {
        placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
      };
  
      let service = new window.google.maps.places.PlacesService(this.props.map); 

      service.getDetails(request, function(place, status) {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          marker.rating = place.rating;
          marker.placeName = place.name;
        }
      });
      
      marker.addListener('click', () => {
        const content = "rating: " + marker.rating + "<br>" + "name: " + marker.placeName;

        marker.infoWindow = new window.google.maps.InfoWindow({
          content: content
        })

        marker.infoWindow.open(this.props.map, marker);
          
        if(this.props.isPathAddMode) {
          this.props.onPathAdd(marker.placeName);
          this.props.onPathAddModeToggle();
          if(!this.props.isPathSidebarOpen) {
            this.props.onPathSidebarToggle();
          }
        } else {
          this.props.onBlogSidebarToggle();
        }
      })

      this.props.categoryMarkers.push(marker);
      /*if(this.props.category === "식사") {
        this.props.restaurantMarkers.push(marker);
      } else if(this.props.category === "쇼핑") {
        this.props.shoppingMarkers.push(marker);
      } else if(this.props.category === "유흥") {
        this.props.entertainmentMarkers.push(marker);
      } else if(this.props.category === "유적") {
        this.props.historyMarkers.push(marker);
      }*/
      marker.addListener('mouseover', () => {
        marker.setOpacity(1.0);        
      })
      
      marker.addListener('mouseout', () => {
        marker.setOpacity(0.8);
      })
    }
  }

  showMarkers() {
    /*
    let markers = [];

    if(this.props.category === "식사") {
      markers = this.props.restaurantMarkers; 
    } else if(this.props.category === "쇼핑") {
      markers = this.props.shoppingMarkers;
    } else if(this.props.category === "유흥") {
      markers = this.props.entertainmentMarkers;
    } else if(this.props.category === "유적") {
      markers = this.props.historyMarkers;
    }*/ 

    
    for(var i=0; i<this.props.categoryMarkers.length; i++) {
      this.props.categoryMarkers[i].setMap(this.props.map);
    }
  }
  
  hideMarkers() {
   /* let markers = [];

    if(this.props.category === "식사") {
      markers = this.props.restaurantMarkers; 
    } else if(this.props.category === "쇼핑") {
      markers = this.props.shoppingMarkers;
    } else if(this.props.category === "유흥") {
      markers = this.props.entertainmentMarkers;
    } else if(this.props.category === "유적") {
      markers = this.props.historyMarkers;
    }
*/
    for(var i=0; i<this.props.categoryMarkers.length; i++) {
      categoryMarkers[i].setMap(null);
    }
  } 
   
  render() {
    return null; 
  }
}

let mapStateToProps = (state) => {
  return {
    isPathSidebarOpen: state.pathSidebar.isPathSidebarOpen,
    isBlogSidebarOpen: state.blogSidebar.isBlogSidebarOpen,
    isPathAddMode: state.pathSidebar.isPathAddMode
  };
}

let mapDispatchToProps = (dispatch) => {
  return {
    onPathSidebarToggle: () => dispatch(pathToggle()),
    onBlogSidebarToggle: () => dispatch(blogToggle()),
    onPathAdd: (spot) => dispatch(pathAdd(spot)),
    onPathAddModeToggle: () => dispatch(pathAddModeToggle())
  };
}

Markers = connect(mapStateToProps, mapDispatchToProps)(Markers);

Markers.defaultProps = {
  categoryMarkers: []
};

export default Markers;
