import React from 'react';
import styles from './Review.css';

class Review extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			author_name: '',
			rating: -1,
			relative_time_description: '',
			text: ''
		};
	}

	render(){
		var review = this.props.review;
    // 작성자와 레이팅을 한 줄에 나오게 바꿔주세요
		return(
      <div>
        <p className={styles.content}>
				<img className={styles.iconImg} src='./assets/img/icons/review.svg'/>
          <div className={styles.reviewHead}>
            작성자 : {review.author_name}
          </div>
          <div className={styles.reviewHead}>
            {review.rating}
          </div>
          <div className={styles.reviewTime}>
            작성 시간 : {review.relative_time_description}
          </div>
          <div className={styles.review}>
            내용 : {review.text}
          </div>
        </p>
			</div>
		);
	}
}

export default Review;
