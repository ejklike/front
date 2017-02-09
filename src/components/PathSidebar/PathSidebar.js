import React from 'react';
//import styles from './PathSidebar.css';
import { Button } from 'react-materialize';
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
  }

	render() {
	  const styles = {
		  bmCrossButton: {
 	 			height: '24px',
    		width: '24px'
  		},
  		bmCross: {
   			background: '#bdc3c7'
  		},
  		bmMenu: {
    		background: '#373a47 !important',
   		 	padding: '0px',
   		 	fontSize: '1.15em',
 		  },
 		  bmMorphShape: {
   			fill: '#373a47 !important'
  		},
  		bmOverlay: {
    		background: 'rgba(0, 0, 0, 0.3)'
  		}
		};

		return (
        <div class="teal lighten-2">
				<Menu right noOverlay 
              customBurgerIcon={false}
              isOpen={this.props.isPathSidebarOpen}
 							className={styles.menu}>
          {this.props.pathData.map((path, i) => {
            return (
              <a id="spot" className="menu-item" href="/" key={i}>{path}</a>
            );
          })}
          <Button floating large 
                  className='red'
                      waves='light'
                       icon='add'
                    onClick={this.handleClick}>
                  경로추가</Button>
				</Menu>
        </div>
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