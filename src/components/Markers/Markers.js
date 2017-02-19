import React from 'react';
import ReactDOMServer from 'react-dom/server';
import update from '../../../node_modules/react-addons-update';
import restaurant from './restaurant.json';
import shopping from './shopping.json';
import entertainment from './entertainment.json';
import history from './history.json';
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

  handlePathAdd(marker) {
    if(this.props.pathData.length > 0) {
      this.props.onPathAdd("소요시간: ???");
    }
    this.props.onPathAdd(marker.placeName);
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

    console.log(this.props.category, dummies);
    for(var i=0; i<dummies.length; i++)
    {
      let pref = {
        position: {
          lat: dummies[i].lat,
          lng: dummies[i].lng
        },
        icon: imgUrl
      };

      let marker = new window.google.maps.Marker(pref);
      marker.setOpacity(0.8);

      let request = {
        placeId: dummies[i].place_id
      };
  
      let service = new window.google.maps.places.PlacesService(this.props.map); 

      service.getDetails(request, function(place, status) {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          marker.placeName = place.name;
          marker.rating = place.rating;
          marker.placeID = place.place_id;
        }
      });
      
      console.log('requst is : ',request);
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
    onSelectedMarkerChange: (markerID) => dispatch(selectedMarkerChange(markerID))
  };
}

Markers = connect(mapStateToProps, mapDispatchToProps)(Markers);

export default Markers;
