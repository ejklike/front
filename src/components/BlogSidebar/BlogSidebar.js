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
  }

  getDetailOfMarker(place_id) {
    if(this.props.map) {
     let placesService = new window.google.maps.places.PlacesService(this.props.map);

      let placePromise = new Promise(function(resolve, reject) {
    		let request = {
         	placeId: place_id
      	};

        placesService.getDetails(request, (response, status) => {
        	if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            if(dummy[place_id]) {
              response.tabelog_rating = dummy[place_id].tabelog_rating;
              response.tripadvisor_rating = dummy[place_id].tripadvisor_rating;
              setTimeout(resolve, 0, response);
            } else {
              response.tabelog_rating = -1;
              response.tripadvisor_rating = -1;
              setTimeout(resolve, 0, response);
            }
          } else {
            setTimeout(reject, 0, status);
          }
        });
      });

      let vm = this;

      Promise.all([placePromise]).then(function(results) {
        let placeResult = results[0];
        vm.setState({
          detail: placeResult
        });
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
