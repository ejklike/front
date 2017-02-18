import React from 'react';
import styles from './BlogSidebar.css';
import { connect } from 'react-redux';

var Menu = require('react-burger-menu').slide;

class BlogSidebar extends React.Component {
  constructor(props) {
	  super(props);
    this.handleOpen = this.handleOpen.bind(this);
	}

	shoulComponentUpdate(nextProps) {
		if(this.props.isBlogSidebarOpen !== nextProps.isBlogSidebarOpen) {
			return true;
		}
		return false;
	}

  handleOpen() {
    if(this.props.isPathAddMode && this.props.isBlogSidebarOpen) {
      this.props.isBlogSidebarOpen = false;
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
      <div className={styles.blogSidebar}>
				<Menu noOverlay 
              customBurgerIcon={false}
                        isOpen={this.props.isBlogSidebarOpen}
                        styles={styles}>
					<a id="add" href="/">More details...</a>
				</Menu>
      </div>
		);
	}
}

let mapStateToProps = (state) => {
  return {
    isBlogSidebarOpen: state.blogSidebar.isBlogSidebarOpen,
    isPathAddMode: state.pathSidebar.isPathAddMode
  };
}

BlogSidebar = connect(mapStateToProps)(BlogSidebar);

export default BlogSidebar;
