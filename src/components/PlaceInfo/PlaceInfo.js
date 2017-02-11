import React from 'react';
import Button from 'react-materialize';

class PlaceInfo extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{this.props.rating}
			</div>
		);
	}
}

export default PlaceInfo;