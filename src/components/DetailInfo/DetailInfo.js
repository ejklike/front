import React from 'react';
import styles from './DetailInfo.css';
import noImg from '../../../img/no-image.jpg';
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
    return(
      <div>
        img in here
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
          <DetailImg photos={this.props.detail.photos} />
          <img width="270" height="200" className={styles.placeImg} 
                     src={typeof this.props.detail.photos !== 'undefined'? this.props.detail.photos[0].getUrl({'maxWidth': 280, 'maxHeight': 200}) : noImg} />
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
           {
             this.props.detail.tabelog_rating != -1 &&
              <div>
                <img src={tabelogLogo}/> {this.props.detail.tabelog_rating}
                <br/>
              </div>
           }
            <img src={tripadvisorLogo}/> {this.props.detail.tripadvisor_rating}
         </div>
      </div>
    );
  }
}

export default DetailInfo;
