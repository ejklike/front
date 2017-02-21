import React from 'react';
import { connect } from 'react-redux';
import { pathToggle, pathAddModeToggle, travelTimeSum } from '../../actions';
import { PathItem } from '../';

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

    this.state = {
      travelTimeSum: 0
    }

    this.updateTravelTimeSum = this.updateTravelTimeSum.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.pathData.length !== nextProps.pathData.length
      || this.props.isPathSidebarOpen !== nextProps.isPathSidebarOpen
      || this.props.isPathAddMode !== nextProps.isPathAddMode
      || this.state.travelTimeSum !== nextState.travelTimeSum) return true;
    return false;
  }

  updateTravelTimeSum() {
    let sum = 0;

    console.log("travelTime", this.props.travelTime);
    for(let i=0; i<this.props.travelTime.length; i++) {
      sum += this.props.travelTime[i];
    }

    this.setState({
      travelTimeSum: sum
    });

    console.log("sum",this.state.travelTimeSum);
  }

  render() {
    let styles = {
      bmMenu: {
        background: '#373a47',
        padding: '0px',
        fontSize: '1.15em',
        opacity: 0.8
      },
      bmItemList: {
        overflow: 'auto'
      },
      bmMorphShape: {
        fill: '#373a47'
      },
      menuItem: {
        textAlign: 'center'
      }
    };

		return (
      <div className="textAlign: center">
        <Menu right noOverlay 
          customBurgerIcon={false}
                    isOpen={this.props.isPathSidebarOpen}
                    styles={styles}>
          {this.props.pathData.map((path, i) => {
            return (
              <PathItem idx={i} key={i} path={path} onUpdateTravelTimeSum={this.updateTravelTimeSum}/>
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
    isPathAddMode: state.pathSidebar.isPathAddMode,
    travelTime: state.pathSidebar.travelTime
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
