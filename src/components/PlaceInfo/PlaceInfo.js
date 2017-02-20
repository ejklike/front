import React from 'react';
import { Button } from 'react-materialize';
import { connect } from 'react-redux';
import { pathToggle, blogToggle, pathAdd } from '../../actions';

class PlaceInfo extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{this.props.name}
				{this.props.rating}
			</div>
		);
	}
}

export default PlaceInfo;