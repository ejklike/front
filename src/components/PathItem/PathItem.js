import React from 'react';

class PathItem extends React.Component {
	constructor(props) {
		super(props);
	}

	renderPathItem() {
		if(this.props.idx%2 === 0) {
			return (
				<a id="spot" className="menu-item" href="/">
					{this.props.path.placeName}
				</a>
			);
		} else {
			return (
				<a id="spot" className="menu-item" href="/">
					{this.props.path.car}
					{this.props.path.walk}
					{this.props.path.bus}
					{this.props.path.subway}
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