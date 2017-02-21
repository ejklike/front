import React from 'react';
import { Input } from 'react-materialize';
import { connect } from 'react-redux';
import { travelTimeChange } from '../../actions';
import styles from './PathItem.css';

class PathItem extends React.Component {
	constructor(props) {
		super(props);
	}

	handleClick(val) {
		console.log("idx", this.props.idx/2 - 0.5);

		this.props.onTravelTimeChange(this.props.idx/2 - 0.5, val);
		this.props.onUpdateTravelTimeSum();
	}

	renderPathItem() {
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
					<div>
				    <Input name={this.props.idx} type='radio' value='red' label={this.props.path.car.text} 
				    		onClick={this.handleClick.bind(this,this.props.path.car.value)}/>
    				<Input name={this.props.idx} type='radio' value='yellow' label={this.props.path.walk.text} 
    						onClick={this.handleClick.bind(this,this.props.path.walk.value)}/>
  				  <Input name={this.props.idx} type='radio' value='green' label={this.props.path.subway.text} 
  				  		onClick={this.handleClick.bind(this,this.props.path.subway.value)}/>
   					<Input name={this.props.idx} type='radio' value='brown' label={this.props.path.bus.text} 
   							onClick={this.handleClick.bind(this,this.props.path.bus.value)} />
					</div>
				)
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

let mapDispatchToProps = (dispatch) => {
	return {
		onTravelTimeChange: (key,time) => dispatch(travelTimeChange(key,time))
	};
}

PathItem = connect(undefined, mapDispatchToProps)(PathItem);

export default PathItem;