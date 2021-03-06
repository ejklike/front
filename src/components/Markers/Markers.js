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

  calculateTransit(src, dest, marker) {
    let ret = {}, request = {};

    let directionsService = new window.google.maps.DirectionsService;
    let directionsDisplay = new window.google.maps.DirectionsRenderer;
    directionsDisplay.setMap(this.props.map);
    directionsDisplay.setOptions({
      suppressMarkers: true,
      preserveViewport: true
    });

    let carPromise = new Promise(function(resolve, reject) {
    //차
    request = {
      origin: {placeId: src},
      destination: {placeId: dest},
      travelMode: window.google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(response, status) {
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        setTimeout(resolve, 0, response);
      } else {
        setTimeout(reject, 0, status);
      }});
    });

    let walkPromise = new Promise(function(resolve, reject) {

    //도보
    request = {
      origin: {placeId: src},
      destination: {placeId: dest},
      travelMode: window.google.maps.TravelMode.WALKING
    };

    directionsService.route(request, function(response, status) {
      if (status === window.google.maps.DirectionsStatus.OK) {
         directionsDisplay.setDirections(response);
         setTimeout(resolve, 0, response);
      } else {
        setTimeout(reject, 0, status);
      }});
    });

    let subwayPromise = new Promise(function(resolve, reject) {
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
         setTimeout(resolve, 0, response);
      } else {
        setTimeout(reject, 0, status);
      }});
    });


    let busPromise = new Promise(function(resolve, reject) {
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
         setTimeout(resolve, 0, response);
      } else {
        setTimeout(reject, 0, status);
      }});
    });

    let vm = this;

    Promise.all([carPromise, walkPromise, subwayPromise, busPromise]).then(function(results) {
      let carResult = results[0];
      let walkResult = results[1];
      let subwayResult = results[2];
      let busResult = results[3];

     let ret = {
      car : {
        text: carResult.routes[0].legs[0].duration.text,
        value: carResult.routes[0].legs[0].duration.value
      },
      walk : {
        text: walkResult.routes[0].legs[0].duration.text,
        value: walkResult.routes[0].legs[0].duration.value
      },
      subway : {
        text: subwayResult.routes[0].legs[0].duration.text,
        value: subwayResult.routes[0].legs[0].duration.value
      },
      bus : {
        text: busResult.routes[0].legs[0].duration.text,
        value: busResult.routes[0].legs[0].duration.value
      }
    };

    vm.props.onPathAdd(ret);
    vm.props.onPathAdd({
      placeName: marker.name, 
      placeID: marker.placeID
    });
  }, function (reason) {
      window.alert('Directions request failed due to ' + reason[0]);
  });
  }

  setMarkers() {
    let placeList = [];
    let imgUrl = [];
    var request = new XMLHttpRequest();
    var maps = this.props.map;

    if(this.props.category === "식사") {
      //'restaurant'
      request.open('GET', 'http://api.norang.io/tokyo/place/list/eat', true);
      imgUrl = './assets/img/icons/restaurant.png';
    } else if(this.props.category === "커피/베이커리") {
      //'cafe', 'bakery'
      request.open('GET', 'http://api.norang.io/tokyo/place/list/coffee', true);
      imgUrl = './assets/img/icons/coffee.png';
    } else if(this.props.category === "바") {
      //'bar'
      request.open('GET', 'http://api.norang.io/tokyo/place/list/bar', true);
      imgUrl = './assets/img/icons/bar.png';
    } else if(this.props.category === "쇼핑") {
      //'shop'
      request.open('GET', 'http://api.norang.io/tokyo/place/list/shop', true);
      imgUrl = './assets/img/icons/shopping.png';
    } else if(this.props.category === "문화") {
      //'museum', 'art_gallery',
      request.open('GET', 'http://api.norang.io/tokyo/place/list/culture', true);
      imgUrl = './assets/img/icons/culture.png';
    } else if(this.props.category === "오락") { 
      //'amusement_park', 'zoo', 'aquarium'
      request.open('GET', 'http://api.norang.io/tokyo/place/list/amusement', true);
      imgUrl = './assets/img/icons/amusement.png';
    } else if(this.props.category === "공원/신사") { 
      //'place_of_worship', 'park'
      request.open('GET', 'http://api.norang.io/tokyo/place/list/park', true);
      imgUrl = './assets/img/icons/park.png';
    } else if(this.props.category === "숙박") {
      //'lodging'
      request.open('GET', 'http://api.norang.io/tokyo/place/list/hotel', true);
      imgUrl = './assets/img/icons/hotel.png';
    }


    // if(this.props.category === "식사/카페/바") {
    //   request.open('GET', 'http://api.norang.io/tokyo/place/list/eat', true);
    //   imgUrl = './assets/img/icons/restaurant.png';
    // } else if(this.props.category === "쇼핑") {
    //   request.open('GET', 'http://api.norang.io/tokyo/place/list/shop', true);
    //   imgUrl = './assets/img/icons/shopping.png';
    // } else if(this.props.category === "볼거리") {
    //   request.open('GET', 'http://api.norang.io/tokyo/place/list/interest', true);
    //   imgUrl = './assets/img/icons/amusement.png';
    // } else if(this.props.category === "숙박") {
    //   request.open('GET', 'http://api.norang.io/tokyo/place/list/hotel', true);
    //   imgUrl = './assets/img/icons/park.png';
    // }

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

          marker.placeID = placeList[i].place_id;
          marker.name = placeList[i].name;
          marker.rating = placeList[i].rating;
          marker.price_level = placeList[i].price_level;
        
          marker.addListener('click', () => {
            
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
                this.calculateTransit(this.props.pathData[this.props.pathData.length-1].placeID, marker.placeID, marker);
              } else {
                this.props.onPathAdd({
                  placeName: marker.name,
                  placeID: marker.placeID
                });
              }
            }    
            
            this.props.onSelectedMarkerChange(marker.placeID);
          })

          marker.addListener('mouseover', () => {
            marker.setOpacity(1.0);        
            const content = ReactDOMServer.renderToString(
              <PlaceInfo name={marker.name} rating={marker.rating} price_level={marker.price_level}/>);

            window.infoWindow.setContent(content);
            window.infoWindow.open(this.props.map, marker);
          })
          
          marker.addListener('mouseout', () => {
            marker.setOpacity(0.8);
            window.infoWindow.close(this.props.map, marker);
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
