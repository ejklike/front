import React from 'react';
import Map from '../Map/Map';
import GoogleApiComponent from '../GoogleApiModules/GoogleApiComponent';
import styles from './Container.css';

export class Container extends React.Component{
  render(){
      return(
          <div className={styles.container}>
              <Map google={this.props.google}/>
          </div>
      );
  }
}

export default GoogleApiComponent({
  apiKey: 'AIzaSyDTOr0hyONA5Xfcbh80TP_pyW4umpuRAas'
})(Container)
