import React from 'react';
//import styles from './PathSidebar.css';
import Button from 'react-button';
import { connect } from 'react-redux';
import { pathToggle, pathAddModeToggle } from '../../actions';

var Menu = require('react-burger-menu').slide;

class PathSidebar extends React.Component {
  constructor(props) {
	  super(props);

    this.handleClick = this.handleClick.bind(this);
	}

	 componentDidUpdate(prevProps) {
		if((this.props.isPathSidebarOpen !== prevProps.isPathSidebarOpen) 
      || (this.props.pathData.length !== prevProps.pathData.length)) {
     
			return true;
		}
		return false;
	}

  handleClick() {
    this.props.onPathAddModeToggle();
    if(!this.props.isPathSidebarOpen) {
      this.props.onPathSidebarToggle();
    }
    console.log("pathAddMode?",this.props.isPathAddMode);
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
   		 	fontSize: '1.15em',
        boxShadow: '5px 5px 5px 0px lightgray'
 		  },
 		  bmMorphShape: {
   			fill: '#373a47'
  		},
  		bmOverlay: {
    		background: 'rgba(0, 0, 0, 0.3)'
  		}
		};

		return (
				<Menu right noOverlay 
              isOpen={this.props.isPathSidebarOpen}
 							styles={styles}>
          {this.props.pathData.map((path, i) => {
            return (
              <a id="spot" className="menu-item" href="/" key={i}>{path}</a>
            );
          })}
          <Button onClick={this.handleClick}
                  pressed={this.props.isPathAddMode}>
                  경로추가</Button>
				</Menu>
		);
	}
}

let mapStateToProps = (state) => {
  return {
    pathData: state.pathSidebar.pathData,
    isPathSidebarOpen: state.pathSidebar.isPathSidebarOpen,
    isPathAddMode: state.pathSidebar.isPathAddMode
  };
}

let mapDispatchToProps = (dispatch) => {
  return {
    onPathSidebarToggle: () => dispatch(pathToggle()),
    onPathAddModeToggle: () => dispatch(pathAddModeToggle())
  };
}


PathSidebar = connect(mapStateToProps, mapDispatchToProps)(PathSidebar);

export default PathSidebar;