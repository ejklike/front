import React from 'react';
import detailStyles from './DetailInfo.css';
import img from '../../../img/no-image.jpg';

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
          <div className={detailStyles.detail}>
            <a id="placeName" target="_blank" href={this.props.detail.website ? this.props.detail.website : '/'}>{this.props.detail.name}</a>
            <div id="storeInfo">
              <img width="300" height="200" src={this.props.detail.photos ? this.props.detail.photos[0].getUrl({'width':500,'maxHeight':500}) : img} />
              <p className="menu-item"> 전화번호 : {this.props.detail.international_phone_number ? this.props.detail.international_phone_number : 'None'}</p>
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
              <div>
                {console.log(this.props.detail)}
                <Review reviews={this.props.detail.reviews} />
              </div>
            </div>
          </div>
		);
	}
}

export default DetailInfo;