import React from 'react';
import { connect } from 'react-redux';
import { pathToggle, pathAddModeToggle } from '../../actions';
import { PathItem } from '../';
import styles from './PathSidebar.css';

var Menu = require('react-burger-menu').slide;
var Button = require('react-button');

var themes = Button.themes;
themes.default.style = {
  width: '260px',
  height: '30px'
}
themes.default.overStyle = {
  background: '#4db6ac'
}
themes.default.pressedStyle = {
  background: '#4db6ac'
}
themes.default.overPressedStyle = {
  background: '#55c6bc'
}
themes.default.activeStyle = {
  background: '#4db6ac'
}
themes.default.activePressedStyle = {
  background: '#4db6ac'
}

class PathSidebar extends React.Component {
  constructor(props) {
	 super(props);
  }

  shouldComponentUpdate(nextProps) {
    if(this.props.pathData.length !== nextProps.pathData.length
      || this.props.isPathSidebarOpen !== nextProps.isPathSidebarOpen
      || this.props.isPathAddMode !== nextProps.isPathAddMode) return true;
    return false;
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
          <Button onClick={this.props.onPathAddModeToggle}
                  pressed={this.props.isPathAddMode}>경로 추가</Button>
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
