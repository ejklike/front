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
    console.log('markers : ',this.state.markers);
  }

  componentDidUpdate(prevProps) {
    console.log('Component Did Update : ',this.state.markers);
    console.log('Props : ',this.props,prevProps);
    if(this.props.isPressed !== prevProps.isPressed || this.props === prevProps) {
      if(this.props.isPressed) {
        this.showMarkers();
      } else {
        this.hideMarkers();
      }
    }
  }

  calculateTransit(src, dest) {
    let directionsService = new window.google.maps.DirectionsService;
    let directionsDisplay = new window.google.maps.DirectionsRenderer;
    directionsDisplay.setMap(this.props.map);
    directionsDisplay.setOptions({
      suppressMarkers: true,
      preserveViewport: true
    });

    let request = {
      origin: {placeId: src},
      destination: {placeId: dest},
      travelMode: window.google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(response, status) {
      console.log("response", response);
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
      window.alert('Directions request failed due to ' + status);
      }
    });
  }

  handlePathAdd(marker) {
    if(this.props.pathData.length > 0) {
      this.calculateTransit(this.props.pathData[this.props.pathData.length-1].placeID, marker.placeID);
      this.props.onPathAdd({
        car: 0,
        walk: 0,
        subway: 0,
        bus: 0
      });
    }
    this.props.onPathAdd({
      placeName: marker.placeName,
      placeID: marker.placeID
    });
  }

  setMarkers() {

    let placeList = [];
    let imgUrl = [];
    var request = new XMLHttpRequest();
    var obj = this;
    var maps = this.props.map;
    console.log(this.props.category);
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
        console.log(this.state);

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
          
          marker.addListener('click', () => {


            if(!this.props.isPathAddMode) {
              if(!this.props.isBlogSidebarOpen) {
                this.props.onBlogSidebarToggle();
                this.props.onSelectedMarkerChange(marker.placeID);
              } else {
                if(this.props.selectedMarker === marker.placeID) {
                  console.log(this.props.selectedMarker, marker.placeID);
                  this.props.onBlogSidebarToggle();
                } 
              }
            } else {
              this.handlePathAdd(marker);
            }

            this.props.onSelectedMarkerChange(marker.placeID);
          })

          marker.addListener('mouseover', () => {
            const content = ReactDOMServer.renderToString(
              <PlaceInfo name={"dummy data"} rating={marker.rating}/>)
            window.infoWindow.setContent(content);
            window.infoWindow.open(this.props.map, marker);
            marker.setOpacity(1.0);        
          })
          
          marker.addListener('mouseout', () => {
            window.infoWindow.close(this.props.map, marker);
            marker.setOpacity(0.8);
          })

          this.setState({
            markers: update(
              this.state.markers, { $push: [marker] })
          });
        console.log(this.state);
        }
      } else {
        // We reached our target server, but it returned an error
        console.log("calling failed");
      }
    };
    request.send(null);
  }

  showMarkers() {
    console.log(this.state.markers);
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
