import React from 'react';
import ReactDOMServer from 'react-dom/server';
import update from '../../../node_modules/react-addons-update';
import { PlaceInfo } from '../'
import { connect } from 'react-redux';
import { pathToggle, blogToggle, pathAdd, transitAdd, pathAddModeToggle, selectedMarkerChange } from '../../actions';

class Markers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: []
    }
  }

  componentDidMount() {
    this.setMarkers();
  }

  componentDidUpdate(prevProps) {
    if(this.props.isPressed !== prevProps.isPressed || this.props === prevProps) {
      if(this.props.isPressed) {
        this.showMarkers();
      } else {
        this.hideMarkers();
      }
    }
  }

  calculateTransit(src, dest) {
    console.log("src", src, "dest", dest);
    let ret = {}, request = {};

    let directionsService = new window.google.maps.DirectionsService;
    let directionsDisplay = new window.google.maps.DirectionsRenderer;
    directionsDisplay.setMap(this.props.map);
    directionsDisplay.setOptions({
      suppressMarkers: true,
      preserveViewport: true
    });

    //차
    request = {
      origin: {placeId: src},
      destination: {placeId: dest},
      travelMode: window.google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(response, status) {
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        ret.car = {};
        ret.car.text = response.routes[0].legs[0].duration.text;
        ret.car.value = response.routes[0].legs[0].duration.value;
      } else {
      window.alert('Directions request failed due to ' + status);
      }
    });

    //도보
    request = {
      origin: {placeId: src},
      destination: {placeId: dest},
      travelMode: window.google.maps.TravelMode.WALKING
    };

    directionsService.route(request, function(response, status) {
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        ret.walk = {};
        ret.walk.text = response.routes[0].legs[0].duration.text;
        ret.walk.value = response.routes[0].legs[0].duration.value;
        
      } else {
      window.alert('Directions request failed due to ' + status);
      }
    });

    //지하철
    request = {
      origin: {placeId: src},
      destination: {placeId: dest},
      travelMode: window.google.maps.TravelMode.TRANSIT,
      transitOptions: {
        modes: [window.google.maps.TransitMode.SUBWAY]
      }
    };

    directionsService.route(request, function(response, status) {
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        ret.subway = {};
        ret.subway.text = response.routes[0].legs[0].duration.text;
        ret.subway.value = response.routes[0].legs[0].duration.value;
        
      } else {
      window.alert('Directions request failed due to ' + status);
      }

    });

    //버스
    request = {
      origin: {placeId: src},
      destination: {placeId: dest},
      travelMode: window.google.maps.TravelMode.TRANSIT,
      transitOptions: {
        modes: [window.google.maps.TransitMode.BUS]
      }
    };

    directionsService.route(request, function(response, status) {
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        ret.bus = {};
        ret.bus.text = response.routes[0].legs[0].duration.text;
        ret.bus.value = response.routes[0].legs[0].duration.value;
      } else {
      window.alert('Directions request failed due to ' + status);
      }
    });

    this.props.onPathAdd(ret);
  }

  handlePathAdd(marker) {
    
  }

  setMarkers() {
    let placeList = [];
    let imgUrl = [];
    var request = new XMLHttpRequest();
    var obj = this;
    var maps = this.props.map;

    if(this.props.category === "식사") {
      request.open('GET', 'http://api.norang.io/tokyo/place/list/eat', true);
      imgUrl = './assets/img/icons/restaurant.png';
    } else if(this.props.category === "쇼핑") {
      request.open('GET', 'http://api.norang.io/tokyo/place/list/shop', true);
      imgUrl = './assets/img/icons/shopping.png';
    } else if(this.props.category === "유흥") {
      request.open('GET', 'http://api.norang.io/tokyo/place/list/interest', true);
      imgUrl = './assets/img/icons/entertainment.png';
    } else if(this.props.category === "유적") {
      request.open('GET', 'http://api.norang.io/tokyo/place/list/hotel', true);
      imgUrl = './assets/img/icons/history.png';
    }

    request.onload = () => {
      if(request.status === 200){
        placeList = JSON.parse(request.responseText);

        for(var i=0; i<placeList.length; i++) {
          let pref = {
            position: {
              lat: placeList[i].lat,
              lng: placeList[i].lng
            },
            icon: imgUrl,
            placeID: placeList[i].place_id
          };

          let marker = new window.google.maps.Marker(pref);
          marker.setOpacity(0.8);

          let request = {
            placeId: placeList[i].place_id
          };
          let service = new window.google.maps.places.PlacesService(this.props.map); 

          service.getDetails(request, function(place, status) {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              marker.placeName = place.name;
              marker.rating = place.rating;
              marker.placeID = place.place_id;
            }
          });
          
          if(marker.placeName === undefined) {
            marker.placeName = 'undefined';
          }

          marker.addListener('click', () => {
            const content = ReactDOMServer.renderToString(
              <PlaceInfo name={marker.placeName} rating={marker.rating}/>)

            window.infoWindow.setContent(content);
            window.infoWindow.open(this.props.map, marker);

            if(!this.props.isPathAddMode) {
              if(!this.props.isBlogSidebarOpen) {
                this.props.onBlogSidebarToggle();
                this.props.onSelectedMarkerChange(marker.placeID);
              } else {
                if(this.props.selectedMarker === marker.placeID) {
                  this.props.onBlogSidebarToggle();
                } 
              }
            } else {
              if(this.props.pathData.length > 0) {
                console.log("src",this.props.pathData[this.props.pathData.length-1].placeID, "dest",marker.placeID);
                this.calculateTransit(this.props.pathData[this.props.pathData.length-1].placeID, marker.placeID);
              }

              this.props.onPathAdd({
                placeName: marker.placeName,
                placeID: marker.placeID
              });
            }    
            
            this.props.onSelectedMarkerChange(marker.placeID);
          })

          marker.addListener('mouseover', () => {
            marker.setOpacity(1.0);        
          })
          
          marker.addListener('mouseout', () => {
            marker.setOpacity(0.8);
          })

          this.setState({
            markers: update(
              this.state.markers, { $push: [marker] })
          });
        }
      } else {
        // We reached our target server, but it returned an error
        console.log("calling failed");
      }
    };
    request.send(null);
  }

  showMarkers() {
    for(var i=0; i<this.state.markers.length; i++) {
      this.state.markers[i].setMap(this.props.map);
    }
  }
  
  hideMarkers() {
    for(var i=0; i<this.state.markers.length; i++) {
      this.state.markers[i].setMap(null);
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
    isPathAddMode: state.pathSidebar.isPathAddMode,
    pathData: state.pathSidebar.pathData,
    selectedMarker: state.markers.selectedMarker
  };
}

let mapDispatchToProps = (dispatch) => {
  return {
    onPathSidebarToggle: () => dispatch(pathToggle()),
    onBlogSidebarToggle: () => dispatch(blogToggle()),
    onPathAdd: (spot) => dispatch(pathAdd(spot)),
    onPathAddModeToggle: () => dispatch(pathAddModeToggle()),
    onSelectedMarkerChange: (markerID) => dispatch(selectedMarkerChange(markerID)),
    onTransitAdd: (transit) => dispatch(transitAdd(transit))
  };
}

Markers = connect(mapStateToProps, mapDispatchToProps)(Markers);

export default Markers;
