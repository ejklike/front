import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Map.css';
import mapStyles from './mapStyles2.json';

class Map extends React.Component {
  componentDidUpdate(prevProps) {
    if(this.props.google !== prevProps.google) {
      this.loadMap();
    }
  }
  
  loadMap() {
    if (this.props && this.props.google) {
      const google = this.props.google;
      const styledMap = new google.maps.StyledMapType(mapStyles,
                          {name: "Styled Map"});
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      //set map options
      let zoom = 13;
      //lat,lng of Tokyo
      let lat = 35.652832 ;
      let lng = 139.839478;
      
      const center = new google.maps.LatLng(lat, lng);
      const mapOptions = Object.assign({}, {
          center: center,
          zoom: zoom,
          mapTypeControlOptions: {
              mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
          }
      })

      this.map = new google.maps.Map(node, mapOptions);
      this.map.mapTypes.set('map_style', styledMap);
      this.map.setMapTypeId('map_style');

      this.map.addListener('center_changed', () => {
        var center = this.map.getCenter();
        var bound = this.map.getBounds();
        //this.map.center = center;
        //this.map.northEast = bound.getNorthEast();
        //this.map.southWest = bound.getSouthWest();
        //console.log("center: ", center.lat(), center.lng());
        //console.log("NE: ", bound.getNorthEast().lat(), bound.getNorthEast().lng());
        //console.log("SW: ", bound.getSouthWest().lat(), bound.getSouthWest().lng());
     });

      window.infoWindow = new window.google.maps.InfoWindow({
        content: ''
      });
    }
	}

  renderChildren() {
    if(this.props && this.map && this.props.google) {
      return React.Children.map(this.props.children, c => {
        return React.cloneElement(c, {
          map: this.map
        });
      });
    }
  }

  render() {
    return(
      <div ref='map' className={styles.container}>
        Loading map...
        {this.renderChildren()}
      </div>
    );
  }
}

export default Map;
