import React from 'react';
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
		return (
      <div className={styles.blogSidebar}>
				<Menu noOverlay 
              customBurgerIcon={false}
                        isOpen={this.props.isBlogSidebarOpen}>
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
