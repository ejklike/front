import React from 'react';
import { CategoryFilters, Map, Markers } from '../';
import GoogleApiComponent from '../GoogleApiModules/GoogleApiComponent';
import styles from './Container.css';
import { connect } from 'react-redux';

export class Container extends React.Component {
  constructor(props) {
    super(props);
  };
  
  render(){
      return(
          <div className={styles.container}>
          {this.props.categoryData.map((category, i) => {
            return (
              <CategoryFilters name={category.categoryName}
                                idx={i}
                          isPressed={category.isPressed}/>
            );
          })}
          <Map google={this.props.google}>
          {this.props.categoryData.map((category, i) => {
            return (
              <Markers category={category.categoryName}
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
