import React from 'react';
import styles from './DetailInfo.css';
import noImg from './no-image.png';
import tabelogLogo from '../../../img/logos/tabelogLogo.png';
import tripadvisorLogo from '../../../img/logos/tripadvisorLogo.png';

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
    );
  }
}

class Review extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div id="reviewInfo">
        <h5>reviews</h5>
        <div>

        </div>
      </div>
    );
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
      <div>
        <div className={styles.placeName}>
          <a target="_blank" href={this.props.detail.website ? this.props.detail.website : '/'}>
            <b>{this.props.detail.name}</b>
          </a>
        </div>
        <div>
          <img className={styles.placeImg} 
                     src={this.props.detail.photos? this.props.detail.photos[0].getUrl({'width':280,'maxHeight':200}) : noImg} />
        </div>
        <div id="storeInfo">
            <div className="menu-item"> 전화번호 : {this.props.detail.international_phone_number ? this.props.detail.international_phone_number : 'None'}</div>
          <div id="opening_hours">
            {this.props.detail.opening_hours &&
              <a className="menu-item" onClick={this.onClick} href='#' >운영 시간 보기</a>}
          <br />
            {this.state.showOpeningHours && 
              this.props.detail.opening_hours.weekday_text && 
              <OpeningHours 
                weekday_text={this.props.detail.opening_hours.weekday_text} 
            />}

            </div>
         </div>
         <div>
            <img src={tabelogLogo}/> {this.props.detail.tabelog_rating} <br/>
            <img src={tripadvisorLogo}/> {this.props.detail.tripadvisor_rating}
         </div>
      </div>
		);
	}
}

export default DetailInfo;
