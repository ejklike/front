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
    if (typeof photos == 'undefined'){
    }
    else {
      this.setState({
        imgSrc: this.props.photos[0].getUrl({'maxWidth': 280, 'maxHeight': 250})
      });
    }
  }

  showImg(){
  }

  render(){
    return null;
  }
}


class DetailInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOpeningHours: false,
      imgSrc: ''
    }

    this.onClick = this.onClick.bind(this);
    this.getImgSrc = this.getImgSrc.bind(this);
  }

  onClick(e){
    e.preventDefault();
    this.setState({
      showOpeningHours: !this.state.showOpeningHours
    })
  }

  componentDidUpdate(){
    this.getImgSrc();
  }

  getImgSrc(){
    if(typeof this.props.detail.photos === 'undefined'){
      this.setState({
        imgSrc: noImg
      });
    } else {
      console.log('photos : ',this.props.detail.photos[0].getUrl({'maxWidth': 280, 'maxHeight': 200}));
      this.setState({
        imgSrc: this.props.detail.photos[0].getUrl({'maxWidth': 280, 'maxHeight': 200})
      });
    }
  }

  render() {
    var detail = this.props.detail;
    return(
      <div>
        <div>
          <DetailImg photos={this.props.detail.photos} />
          <img width="270" height="200" className={styles.placeImg} 
                     src={this.state.imgSrc} />
        </div>

        <div className={styles.container}>
          <div className={styles.placeName}>
            <a target="_blank" href={this.props.detail.website ? this.props.detail.website : '/'}>
              <b>{this.props.detail.name}</b>
            </a>
          </div>
        </div>

        <div className={styles.container}>
          {
            this.props.detail.formatted_address&&
            <div className={styles.menuItem}>
              <div className={styles.sectionContent}>
                  <img className={styles.iconImg} src='./assets/img/icons/address.png'/>
                  {this.props.detail.formatted_address}<br/>
                </div>
            </div>
          }
        </div>

        <div className={styles.container}>
          {
            this.props.detail.international_phone_number&&
            <div className={styles.menuItem}>
              <img className={styles.iconImg} src='./assets/img/icons/phone.png'/>  
                {this.props.detail.international_phone_number}<br/>
            </div>
          }
        </div>

        <div className={styles.container}>
          {this.props.detail.website &&
            <div className={styles.menuItem}>
              <div className={styles.sectionContent}>
                <img className={styles.iconImg} src='./assets/img/icons/website.png'/>
                <a href={this.props.detail.website} target="_blank">{this.props.detail.website}</a> <br/>
              </div>
            </div>  
          }
        </div>
        
        <div className={styles.container}>
          {
            this.props.detail.price_level&&
            <div className={styles.menuItem}>
              <img className={styles.iconImg} src='./assets/img/icons/price.png'/>  
              {
                this.props.detail.price_level && 
                this.props.detail.price_level == 4 ? "매우 비싼 수준의 가격 ($$$$)": (
                  this.props.detail.price_level == 3 ? "비싼 수준의 가격 ($$$)": (
                    this.props.detail.price_level == 2 ? "보통 수준의 가격 ($$)": (
                      this.props.detail.price_level == 1 ? "저렴한 가격 ($)": "무료"
                    )
                  )
                )
              }
            </div>

          }
        </div>

        <div className={styles.bar}></div>
        
        <div classNmae={styles.container}>
          {this.props.detail.opening_hours &&
            <div className={styles.menuItem}>
            <img className={styles.iconImg} src='./assets/img/icons/openinghours.png'/> Open now :  
            {
              this.props.detail.opening_hours.open_now == true ? " Yes":" No"
            }
            </div>
          }
        </div>
          
        <div className={styles.container}>
          {this.props.detail.opening_hours &&
            <a className={styles.sectionName} onClick={this.onClick} href='#' >
            <img className={styles.iconImg} src='./assets/img/icons/arrow.png'/> Opening Hours</a>
          }
          {
            this.state.showOpeningHours && 
            this.props.detail.opening_hours.weekday_text && 
            <OpeningHours className={styles.sectionContent}
              weekday_text={this.props.detail.opening_hours.weekday_text} 
            />
          }
          {this.props.detail.opening_hours &&
            <div className={styles.bar}></div>
          }
        </div>



          <table className={styles.tg}>
            <tr>
              <th className={styles.tg2}>
                {
                  this.props.detail.rating &&
                  <div className={styles.menuItem}>
                    <div className={styles.rating}>
                      {this.props.detail.rating.toFixed(1)}
                    </div>
                    <div className={styles.stars}>
                      {
                      this.props.detail.rating && 
                      this.props.detail.rating == 5 ? "⭐⭐⭐⭐⭐": (
                        this.props.detail.rating >= 4 ? "⭐⭐⭐⭐\u00a0\u00a0": (
                          this.props.detail.rating >= 3 ? "⭐⭐⭐  ": "⭐⭐   "
                        )
                      )
                      }
                    </div>
                    <img className={styles.logoImg} src='./assets/img/logos/googlemapsLogo.png'/>
                  </div>
                }
              </th>
              <th className={styles.tg2}>
                <div className={styles.menuItem}>
                  <div className={styles.rating}>
                    {this.props.detail.tripadvisor_rating}
                  </div>
                  <div className={styles.stars}>
                    {
                      this.props.detail.tripadvisor_rating && 
                      this.props.detail.tripadvisor_rating == 5 ? "⭐⭐⭐⭐⭐": (
                        this.props.detail.tripadvisor_rating >= 4 ? "⭐⭐⭐⭐": (
                          this.props.detail.tripadvisor_rating >= 3 ? "⭐⭐⭐": "⭐⭐"
                        )
                      )
                    }
                  </div>
                  <img className={styles.logoImg} src='./assets/img/logos/tripadvisorLogo.png'/>
                </div>
              </th>
              {
                this.props.detail.tabelog_rating != -1 &&
                <th className={styles.tg2}>
                <div className={styles.menuItem}>
                  <div className={styles.rating}>
                    {this.props.detail.tabelog_rating}
                  </div>
                  <div className={styles.stars}>
                    {
                    this.props.detail.tabelog_rating && 
                    this.props.detail.tabelog_rating == 5 ? "⭐⭐⭐⭐⭐": (
                      this.props.detail.tabelog_rating >= 4 ? "⭐⭐⭐⭐": (
                        this.props.detail.tabelog_rating >= 3 ? "⭐⭐⭐": "⭐⭐"
                      )
                    )
                    }
                  </div>
                  <img className={styles.logoImg} src='./assets/img/logos/tabelog.gif'/> 
                </div>
                </th>
              }
              {/*b</th>*/}
              {/*<th className={styles.tg2}>c</th>*/}
            </tr>
          </table>
          <div>
          {/*{
            this.props.detail.rating &&
            <div className={styles.menuItem}>
              <img className={styles.logoImg} src='./assets/img/logos/googlemapsLogo.png'/>
              {
              this.props.detail.rating && 
              this.props.detail.rating == 5 ? "⭐⭐⭐⭐⭐": (
                this.props.detail.rating >= 4 ? "⭐⭐⭐⭐": (
                  this.props.detail.rating >= 3 ? "⭐⭐⭐": "⭐⭐"
                )
              )
              }
              <br/>
            </div>
          }*/}
          {/*{
            this.props.detail.tabelog_rating != -1 &&
            <div className={styles.menuItem}>
              <img className={styles.logoImg} src='./assets/img/logos/tabelog.gif'/> 
              {
              this.props.detail.tabelog_rating && 
              this.props.detail.tabelog_rating == 5 ? "⭐⭐⭐⭐⭐": (
                this.props.detail.tabelog_rating >= 4 ? "⭐⭐⭐⭐": (
                  this.props.detail.tabelog_rating >= 3 ? "⭐⭐⭐": "⭐⭐"
                )
              )
              }
              <br/>
            </div>
          }*/}
          {/*<div className={styles.menuItem}>
            <img className={styles.logoImg} src='./assets/img/logos/tripadvisorLogo.png'/> {this.props.detail.tripadvisor_rating}
            {
              this.props.detail.tripadvisor_rating && 
              this.props.detail.tripadvisor_rating == 5 ? "⭐⭐⭐⭐⭐": (
                this.props.detail.tripadvisor_rating >= 4 ? "⭐⭐⭐⭐": (
                  this.props.detail.tripadvisor_rating >= 3 ? "⭐⭐⭐": "⭐⭐"
                )
              )
              }
          </div>*/}
         </div>
         
         <div className={styles.bar}></div>

         <div classNmae={styles.container}>
           {
              <div className={styles.menuItem}>
              <img className={styles.iconImg}  src='./assets/img/icons/naver.png'/><a href="http://naver.com" target="_blank">네이버 검색결과 보기</a>
            </div>
          }
        </div>

         <div classNmae={styles.container}>
           {
              <div className={styles.menuItem}>
              <img className={styles.iconImg}  src='./assets/img/icons/google.png'/><a href="http://google.com" target="_blank">구글 검색결과 보기</a>
            </div>
          }
        </div>

        {/*<script>
          (function() {
            var cx = '009651891855097411791:_506s4zenam';
            var gcse = document.createElement('script');
            gcse.type = 'text/javascript';
            gcse.async = true;
            gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(gcse, s);
          })();
        </script>
        <gcse:search></gcse:search>*/}

        <div className={styles.bar}></div>

        <div id="Reviews">
          {detail.reviews &&
            detail.reviews.map((review,i) => {
              return(
                <Review key={i} review={review}/>
              );
          })}
        </div>

        <br /><br />
      </div>
    );

  }
}

export default DetailInfo;
