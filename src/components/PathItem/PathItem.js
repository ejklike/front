import React from 'react';
import { Input } from 'react-materialize';

class PathItem extends React.Component {
	constructor(props) {
		super(props);
	}

	renderPathItem() {
		if(this.props.idx%2 === 0) {
					console.log("왜?", this.props.idx, this.props.path);

			return (
				<a id="spot" className="menu-item" href="/">
					{this.props.path.placeName}
				</a>
			);
		} else {
		console.log("props", this.props);
		console.log("path", this.props.path);
		console.log("car", this.props.path.car);
		console.log("text",this.props.idx, this.props.path.car.text);	

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

	render() {
		return(
			<div>
				{this.renderPathItem()}
			</div>
		);
	}
}

export default PathItem;