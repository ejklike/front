import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { DetailInfo } from '../';
import { connect } from 'react-redux';
import dummy from './dummy.json';

var Menu = require('react-burger-menu').slide;

class BlogSidebar extends React.Component {
  constructor(props) {
	  super(props);
    
    this.state = {
      detail: {}
    };

    this.getDetailOfMarker = this.getDetailOfMarker.bind(this);
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

  getDetailOfMarker(place_id) {
  	if(this.props.map) {
    	let service = new window.google.maps.places.PlacesService(this.props.map); 

   		let request = {
      	placeId: place_id
    	};

 	   	service.getDetails(request, (place, status) => {
      	if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          if(dummy[place_id]) {
            place.tabelog_rating = dummy[place_id].tabelog_rating;
            place.tripadvisor_rating = dummy[place_id].tripadvisor_rating;
          } else {
            place.tabelog_rating = -1;
            place.tripadvisor_rating = -1;
          }
          
       		this.setState({
        		detail: place
        	});
     	 }
    	});
 	 	}
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
      	overflow: 'auto',
        padding: '10px'
      },
      bmMorphShape: {
      	fill: '#373a47'
      },
      menuItem: {
      	textAlign: 'center'
      }
    };

		return (
      <div className={styles.blogSidebar}>
				<Menu noOverlay customBurgerIcon={false}
                       				 	  isOpen={this.props.isBlogSidebarOpen}
                       					  styles={styles}>
           <DetailInfo detail={this.state.detail}/>
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
