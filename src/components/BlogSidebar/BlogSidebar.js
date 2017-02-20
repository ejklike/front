import React from 'react';
import ReactDOMServer from 'react-dom/server';
import styles from './BlogSidebar.css';
import detailStyles from './Detail.css';
import { connect } from 'react-redux';

var Menu = require('react-burger-menu').slide;

class BlogSidebar extends React.Component {
  constructor(props) {
	  super(props);
    
    this.state = {
      detail: {}
    };

    this.getDetailOfMarker = this.getDetailOfMarker.bind(this);
    this.getDetail = this.getDetail.bind(this);
	}

  componentDidUpdate(prevProps,prevState){
    if(prevProps.selectedMarker !== this.props.selectedMarker){
      this.getDetailOfMarker(this.props.selectedMarker);
    } 
  }

	shoulComponentUpdate(nextProps) {
		if(this.props.isBlogSidebarOpen !== nextProps.isBlogSidebarOpen) {
			return true;
		}
		return false;
	}

  getDetail(place){
    var result = {};
    this.setState({
      detail: place
    });
    console.log('detail : ',this.state.detail);
  }

  getDetailOfMarker(place_id) {
  	if(this.props.map) {
    	let service = new window.google.maps.places.PlacesService(this.props.map); 

   		let request = {
      	placeId: place_id
    	};

 	   service.getDetails(request, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        this.getDetail(place);
      }
    });
 	 }
  }

	render() {
		return (
      <div className={styles.blogSidebar}>
				<Menu noOverlay 
              customBurgerIcon={false}
              isOpen={this.props.isBlogSidebarOpen}
              styles={styles}>
                {Object.keys(this.state.detail).length !== 0 &&  console.log('yes')}
                {Object.keys(this.state.detail).length !== 0 &&
                  <DetailInfo detail={this.state.detail} />}
				</Menu>
      </div>
		);
	}
}

let mapStateToProps = (state) => {
  return {
    selectedMarker: state.markers.selectedMarker,
    isBlogSidebarOpen: state.blogSidebar.isBlogSidebarOpen,
    isPathAddMode: state.pathSidebar.isPathAddMode
  };
}

BlogSidebar = connect(mapStateToProps)(BlogSidebar);

export default BlogSidebar;
