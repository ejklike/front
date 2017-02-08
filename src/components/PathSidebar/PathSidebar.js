import React from 'react';
import styles from './PathSidebar.css';

var Menu = require('react-burger-menu').slide;

class PathSidebar extends React.Component {
  constructor(props) {
	  super(props);

	this.state = {
			isOpen: false
		}
	}

	render() {
	  const styles = {
			bmBurgerButton: {
   			position: 'fixed',
    		width: '36px',
    		height: '30px',
    		left: '10px',
    		top: '10px'
 		 	},
  		bmBurgerBars: {
  		 	background: '#373a47'
  		},
		  bmCrossButton: {
 	 			height: '24px',
    		width: '24px'
  		},
  		bmCross: {
   			background: '#bdc3c7'
  		},
  		bmMenu: {
    		background: '#373a47',
   		 	padding: '0px',
   		 	fontSize: '1.15em'
 		  },
 		  bmMorphShape: {
   			fill: '#373a47'
  		},
 		  bmItemList: {
    		color: '#b8b7ad',
    		padding: '0.8em'
  		},
  		bmOverlay: {
    		background: 'rgba(0, 0, 0, 0.3)'
  		}
		};

		return (
				<Menu noOverlay isOpen={this.state.isOpen}
												styles={styles}>
					<a id="add" href="/">asdf</a>
				</Menu>
		);
	}
}

export default PathSidebar;