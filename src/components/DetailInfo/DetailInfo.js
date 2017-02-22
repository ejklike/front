import React from 'react';
import styles from './DetailInfo.css';
import noImg from '../../../img/no-image.jpg';
import tabelogLogo from '../../../img/logos/tabelogLogo.png';
import tripadvisorLogo from '../../../img/logos/tripadvisorLogo.png';
import Review from '../Review/Review';

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
    var detail = this.props.detail;
  		return(
        <div>
          <div className={styles.placeName}>
            <a target="_blank" href={detail.website ? detail.website : '/'}>
              <b>{detail.name}</b>
            </a>
          </div>
          <div>
            <img width="270" height="200" className={styles.placeImg} 
                       src={typeof detail.photos !== 'undefined'? detail.photos[0].getUrl({'maxWidth': 280, 'maxHeight': 200}) : noImg} />
          </div>
          <div id="storeInfo">
              <div className="menu-item"> 전화번호 : {detail.international_phone_number ? detail.international_phone_number : 'None'}</div>
            <div id="opening_hours">
              {this.props.detail.opening_hours &&
                <a className="menu-item" onClick={this.onClick} href='#' >
                  운영 시간 보기</a>}
            <br />
              {this.state.showOpeningHours && 

                detail.opening_hours.weekday_text && 
                <OpeningHours 
                  weekday_text={detail.opening_hours.weekday_text} 
                />
              }
            </div>
           </div>
           <div>
             {
               detail.tabelog_rating != -1 &&
                <div>
                  <img src={tabelogLogo}/> {detail.tabelog_rating}
                  <br/>
                </div>
             }
              <img src={tripadvisorLogo}/> {detail.tripadvisor_rating}
           </div>
           <div id="Reviews">
              {detail.reviews &&
                detail.reviews.map((review,i) => {
                return(
                    <Review key={i} review={review}/>
                );
                })
              }
           </div>
        </div>
      );
  }
}

export default DetailInfo;
