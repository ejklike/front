import React from 'react';
import { Button } from 'react-materialize';
import { connect } from 'react-redux';
import { pathToggle, pathAddModeToggle } from '../../actions';
import { PathItem } from '../';

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
  		}
		};
		return (

      <div>
        <Menu right noOverlay 
          customBurgerIcon={false}
                    isOpen={this.props.isPathSidebarOpen}
                 className={styles.menu}
                    styles={styles}>
          {this.props.pathData.map((path, i) => {
            console.log(i, path);
            return (
              <div className="textAlign: center">
                <PathItem idx={i} key={i} path={path}/>
              </div>
            );
          })}
          <div className="textAlign: center">
            <a id="add" className="menu-item">
              <Button floating className='red' waves='light' icon='add' onClick={this.handleClick}/>
            </a>
          </div>
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
