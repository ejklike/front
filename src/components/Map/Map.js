import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Map.css';
import mapStyles from './mapStyles2.json';

export class Map extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }

  loadMap() {
    if (this.props && this.props.google) {
      const {google} = this.props;
      const styledMap = new google.maps.StyledMapType(mapStyles,
                          {name: "Styled Map"});
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      //set map options
      let zoom = 14;
      //lat,lng of Tokyo
      let lat = 35.652832;
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
  	}
	}	 

  render() {
    return(
      <div ref='map' className={styles.container}>
        Loading map...
      </div>
    );
  }
}

export default Map;
