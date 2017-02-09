import React from 'react';
import { CategoryFilters, Map, Markers, PathSidebar, BlogSidebar } from '../';
import GoogleApiComponent from '../GoogleApiModules/GoogleApiComponent';
import styles from './Container.css';
import { connect } from 'react-redux';
import { Navbar } from 'react-materialize';

class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.container}>
        <CategoryFilters/>
        <div className={styles.blogSidebar}>
          <BlogSidebar/>
        </div>
        <div className={styles.pathSidebar}>
          <PathSidebar/>
        </div>
        <Map google={this.props.google}>
        {this.props.categoryData.map((category, i) => {
          return (
            <Markers category={category.categoryName}
                         idx={i}
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
