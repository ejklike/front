import React from 'react';
import styles from './DetailInfo.css';
import noImg from '../../../img/no-image.jpg';
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
            <div className={styles.sectionContent} key={i}>{day}</div>
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
                  this.props.detail.international_phone_number&&
                  <div className={styles.menuItem}>
                    <div className={styles.sectionName}>전화번호</div>
                    <div className={styles.sectionContent}>
                      {this.props.detail.international_phone_number}<br/>
                    </div>
                  </div>
                }
                <div>
                  {this.props.detail.opening_hours &&
                      <a className={styles.sectionName} onClick={this.onClick} href='#' >운영 시간 보기 <img className={styles.logoImg} src='./assets/img/icons/arrow.png'/><br/></a>
                  }
                  {
                    this.state.showOpeningHours && 
                    this.props.detail.opening_hours.weekday_text && 
                    <OpeningHours className={styles.sectionContent}
                      weekday_text={this.props.detail.opening_hours.weekday_text} 
                    />
                  }
                </div>
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
