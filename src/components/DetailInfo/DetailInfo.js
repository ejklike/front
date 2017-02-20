import React from 'react';
import detailStyles from './DetailInfo.css';
import img from './no-image.png';

class OpeningHours extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        {this.props.weekday_text.map((day,i) => {
          return(
                <div key={i}>{day}</div>
          );
        })}
      </div>
    )
  }
}

class DetailInfo extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      showOpeningHours: false
    }

    this.onClick = this.onClick.bind(this);
	}

  onClick(e){
    e.preventDefault();
    this.setState({
      showOpeningHours: !this.state.showOpeningHours
    })
  }

	render() {
		return(
          <div className={detailStyles}>
            <a target="_blank" href={this.props.detail.website ? this.props.detail.website : '/'}>{this.props.detail.name}</a>
            <div id="storeInfo">
              <img src={this.props.detail.photos ? this.props.detail.photos[0].getUrl({'maxWidth':200,'maxHeight':400}) : img} />
              <p className="menu-item"> Phone : {this.props.detail.international_phone_number}</p>
              <div id="opening_hours">
                Open : {this.props.detail.opening_hours ? (
                  this.props.detail.opening_hours.open_now ? 
                    <a className="menu-item" onClick={this.onClick} href='#' >true</a> : 
                    <a className="menu-item" onClick={this.onClick} href='#' >false</a> ) : (
                  'None'
                )}
              <br />
                {this.state.showOpeningHours && 
                  this.props.detail.opening_hours.weekday_text && 
                  <OpeningHours 
                    weekday_text={this.props.detail.opening_hours.weekday_text} 
                />}
                </div>
            </div>
          </div>
		);
	}
}

export default DetailInfo;