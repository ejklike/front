import React from 'react';

class Marker extends React.Component {
	constructor(props) {
		super(props);
		console.log(this.props);
		this.loadMarker();
	}

	componentWillUnmount() {
		if(this.marker && !this.props.isOn) {
			this.marker.setMap(null);
		}
	}

	loadMarker() {
		if(this.props && this.props.google) {
			const pref = {
		    	position: {
		          lat: this.props.pos.lat,
		          lng: this.props.pos.lng
		        }
		    };
      
			this.marker = new google.maps.Marker(pref);
			this.marker.setMap(this.props.map);

			this.marker.addListener('mouseover', () => {
				this.marker.setOpacity(0.5);
			})
		}
	}

	render() {
		return null;
	}
}

export default Marker;