import React from 'react';
import ReactDOM from 'react-dom';

export class Map extends React.Component {
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
    }

    loadMap() {
        if (this.props && this.props.google) {
            const {google} = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            let zoom = 14;
            let lat = 35.652832;
            let lng = 139.839478;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom
            })

            this.map = new maps.Map(node, mapConfig);
        
            console.log(this.map);
        }
    }

    render() {
        const style = {
            height: '100vh'    
        }

        return(
            <div ref='map' style={style}>
                Loading map...
            </div>
        );
    }
}

export default Map;
