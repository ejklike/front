import React from 'react';
import { Button } from 'react-materialize';
import { connect } from 'react-redux';
import { pathToggle, pathAddModeToggle } from '../../actions';
import { PathItem } from '../';
import styles from './PathSidebar.css';

var Menu = require('react-burger-menu').slide;

class PathSidebar extends React.Component {
  constructor(props) {
	  super(props);
	}

	 shouldComponentUpdate(prevProps) {
		if((this.props.isPathSidebarOpen !== prevProps.isPathSidebarOpen) 
      || (this.props.pathData.length !== prevProps.pathData.length)) {
			return true;
		}
		return false;
	}

  handleClick() {
    this.props.onPathAddModeToggle();
    console.log("click");
  }

	render() {
		return (
      <div className="textAlign: center">
        <Menu right noOverlay 
          customBurgerIcon={false}
                    isOpen={this.props.isPathSidebarOpen}
                    styles={styles}>
          {this.props.pathData.map((path, i) => {
            return (
              <PathItem idx={i} key={i} path={path}/>
            );
          })}
          <Button isPressed={this.props.isPathAddMode}
                    onClick={this.handleClick.bind(this)}
                  className={styles.path-add-button}>경로 추가</Button>
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
