import React from 'react';
import { CategoryFilters, Map, Markers, PathSidebar, BlogSidebar } from '../';
import GoogleApiComponent from '../GoogleApiModules/GoogleApiComponent';
import styles from './Container.css';
import { connect } from 'react-redux';

class Container extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <CategoryFilters/>
        <BlogSidebar/>
        <PathSidebar/>
        <Map google={window.google}>
          {this.props.categoryData.map((category, i) => {
            return (
              <Markers category={category.categoryName}
                            idx={i}
                            key={i}
                      isPressed={category.isPressed}/>
            );  
          })}
        </Map>
       </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    categoryData: state.category.categoryData,
    isBlogSidebarOpen: state.blogSidebar.isBlogSidebarOpen,
    pathData: state.pathSidebar.pathData,
    isPathSidebarOpen: state.pathSidebar.isPathSidebarOpen
  };
}

Container = connect(mapStateToProps)(Container);

export default GoogleApiComponent({
  apiKey: 'AIzaSyDTOr0hyONA5Xfcbh80TP_pyW4umpuRAas'
})(Container);
