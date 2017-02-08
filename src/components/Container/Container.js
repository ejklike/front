import React from 'react';
import Button from 'react-button';
import { CategoryFilters, Map, Markers, PathSidebar } from '../';
import GoogleApiComponent from '../GoogleApiModules/GoogleApiComponent';
import styles from './Container.css';
import { connect } from 'react-redux';

class Container extends React.Component {
  constructor(props) {
    super(props);
  };

  render(){
    return(
      <div className={styles.container}>
        <div className={styles.categoryFiltersBar}>
          {this.props.categoryData.map((category, i) => {
            return (
              <CategoryFilters name={category.categoryName}
                                idx={i}
                          isPressed={category.isPressed}/>
            );
          })}
        <div className={styles.pathSidebar}>
          <PathSidebar/>
        </div>
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
    categoryData: state.category.categoryData
  };
}

Container = connect(mapStateToProps)(Container);

export default GoogleApiComponent({
  apiKey: 'AIzaSyDTOr0hyONA5Xfcbh80TP_pyW4umpuRAas'
})(Container);
