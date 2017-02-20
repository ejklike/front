import React from 'react';
import styles from './DetailInfo.css';
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
      <div>
        <div className={styles.placeName}>
          <a target="_blank" href={this.props.detail.website ? this.props.detail.website : '/'}>
            <b>{this.props.detail.name}</b>
          </a>
        </div>
        <div id="storeInfo">
          <img className={styles.placeImg} 
                     src={this.props.detail.photos? this.props.detail.photos[0].getUrl({'width':300,'maxHeight':200}) : img} />
          <div className="menu-item">
            <p className={styles.sectionName}>전화번호</p>
            <p className={styles.sectionContent}>{this.props.detail.international_phone_number ? this.props.detail.international_phone_number : 'None'}</p>
          </div>
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
      </div>
		);
	}
}

export default DetailInfo;
