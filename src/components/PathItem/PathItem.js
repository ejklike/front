import React from 'react';

class PathItem extends React.Component {
	constructor(props) {
		super(props);
	}

	renderPathItem() {
		if(this.props.idx%2 === 0) {
			return (
				<span>
					<a id="spot" className="menu-item" href="/">
						{this.props.path.placeName}
					</a>
				</span>
			);
		} else {
			return (
				<span>
					<a id="spot" className="menu-item" href="/">
						{this.props.path.car}
						{this.props.path.walk}
						{this.props.path.bus}
						{this.props.path.subway}
					</a>
				</span>
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