import React from 'react';
import CategoryFilters from '../CategoryFilters/CategoryFilters';
import Map from '../Map/Map';
import GoogleApiComponent from '../GoogleApiModules/GoogleApiComponent';
import Markers from '../Markers/Markers';
import styles from './Container.css';
import update from '../../../node_modules/react-addons-update';

export class Container extends React.Component{
  constructor(props) {
    super(props);
    
    this.state = {
      CategoryFiltersData: [
        { categoryName: "모두", isPressed: true },
        { categoryName: "식사", isPressed: false },
        { categoryName: "쇼핑", isPressed: false },
        { categoryName: "유흥", isPressed: false },
        { categoryName: "유적", isPressed: false }
      ]
    };

    this.isSelected = this.isSelected.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  isSelected(key) {
    return this.state.CategoryFiltersData[key].isPressed;
  }

  onSelect(key) {
    this.setState ({
      CategoryFiltersData: update(
                               this.state.CategoryFiltersData,
                               {
                                 [key]: {
                                   isPressed: { $set: !(this.isSelected(key)) }
                                 }
                               }
                            )
    });
    
  } 

  render(){
      return(
          <div className={styles.container}>
          {this.state.CategoryFiltersData.map((category, i) => {
            return (
              <CategoryFilters name={category.categoryName}
                         pressedKey={i}
                            pressed={this.isSelected(i)}
                           onSelect={this.onSelect}/>
            );
          })}
          <Map google={this.props.google}>
          {this.state.CategoryFiltersData.map((category, i) => {
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

export default GoogleApiComponent({
  apiKey: API_KEY
})(Container)
