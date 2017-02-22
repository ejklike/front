import React from 'react';
import styles from './DetailInfo.css';
import noImg from '../../../img/no-image.jpg';

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

class DetailImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      havePhoto: false,
      imgSrc: ''
    }

    this.getImgSrc = this.getImgSrc.bind(this);
    this.showImg = this.showImg.bind(this);
  }

  componentDidMount(){
    this.getImgSrc(this.props.photos);
  }

  getImgSrc(photos){
    console.log(photos);
    if (typeof photos == 'undefined'){
      console.log('undefined');
    }
    else {
      this.setState({
        imgSrc: this.props.photos[0].getUrl({'maxWidth': 280, 'maxHeight': 250})
      });
      console.log(this.state.imgSrc);
    }
  }

  showImg(){
    console.log('showimg : ', this.state.imgSrc);
  }

  render(){
    return null;
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
          <DetailImg photos={this.props.detail.photos} />
          <img width="270" height="200" className={styles.placeImg} 
                     src={typeof this.props.detail.photos !== 'undefined'? this.props.detail.photos[0].getUrl({'maxWidth': 280, 'maxHeight': 200}) : noImg} />
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
          <div>
          {
            this.props.detail.tabelog_rating != -1 &&
            <div className={styles.menuItem}>
              <img className={styles.logoImg} src='./assets/img/logos/tabelogLogo.png'/> {this.props.detail.tabelog_rating}
              <br/>
            </div>
          }
          <div className={styles.menuItem}>
            <img className={styles.logoImg} src='./assets/img/logos/tripadvisorLogo.png'/> {this.props.detail.tripadvisor_rating}
          </div>
         </div>
      </div>
    );
  }
}

export default DetailInfo;
