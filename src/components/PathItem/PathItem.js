import React from 'react';
import { Input } from 'react-materialize';

class PathItem extends React.Component {
	constructor(props) {
		super(props);
	}

	renderPathItem() {
		console.log("상민",Object.assign({}, this.props));
		if(this.props.idx%2 === 0) {
			if(this.props.path.placeName) {
				return (
					<a id="spot" className="menu-item" href="/">
						{this.props.path.placeName}
					</a>
				);
			}
		} else {
			if(this.props.path.bus && this.props.path.car && this.props.path.subway && this.props.path.walk) {
				return (
					<a id="spot" className="menu-item" href="/">
						<Input name={this.props.idx} type='radio' value='bus' label={this.props.path.bus.text}/>
						<Input name={this.props.idx} type='radio' value='car' label={this.props.path.car.text}/>
						<Input name={this.props.idx} type='radio' value='subway' label={this.props.path.subway.text}/>
						<Input name={this.props.idx} type='radio' value='walk' label={this.props.path.walk.text}/>
					</a>
				);
			}
		}
	}

	render() {
		return(
			<div>
				{this.renderPathItem()}
			</div>
		);
	}
}

export default PathItem;