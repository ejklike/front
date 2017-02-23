import React from 'react';
import { Input } from 'react-materialize';
import { connect } from 'react-redux';
import { travelTimeChange } from '../../actions';
import styles from './PathItem.css';

class PathItem extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick(val) {
        this.props.onTravelTimeChange(this.props.idx/2 - 0.5, val);
        this.props.onUpdateTravelTimeSum();
    }

    renderPathItem() {
        if(this.props.idx%2 === 0) {
            if(this.props.path.placeName) {
                return (
                    <a id="spot" className={styles.spotRow} href="/">
                        <strong>{this.props.path.placeName}</strong>
                    </a>
                );
            }
        } else {
            if(this.props.path.bus && this.props.path.car && this.props.path.subway && this.props.path.walk) {
                return (
                  <div>
                    <div className={styles.container}>
                      <img src='../../../assets/img/icons/car.png' className={styles.icon}/>
                      <Input name={this.props.idx} type='radio' value='car' label={this.props.path.car.text} className={styles.inputRow}
                            onClick={this.handleClick.bind(this,this.props.path.car.value)}/>
                    </div>
                    <div className={styles.container}> 
                      <img src='../../../assets/img/icons/train.png' className={styles.icon}/>
                      <Input name={this.props.idx} type='radio' value='subway' label={this.props.path.subway.text} 
                            onClick={this.handleClick.bind(this,this.props.path.subway.value)}/>
                    </div>
                    <div className={styles.container}>
                      <img src='../../../assets/img/icons/bus.png' className={styles.icon}/>
                       <Input name={this.props.idx} type='radio' value='bus' label={this.props.path.bus.text} 
                               onClick={this.handleClick.bind(this,this.props.path.bus.value)} />
                    </div>
                  </div>
                );
            }
        }
    }

    render() {
        return(
            <div>
                {this.renderPathItem()}
            </div>
        );
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onTravelTimeChange: (key,time) => dispatch(travelTimeChange(key,time))
    };
}

PathItem = connect(undefined, mapDispatchToProps)(PathItem);

export default PathItem;