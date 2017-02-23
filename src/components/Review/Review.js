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
      <div className={styles.container}>
        <div className={styles.substars}>
          <img className={styles.iconImg} src='./assets/img/icons/review.png'/>
          {
          review.rating == 5 ? "⭐⭐⭐⭐⭐": (
            review.rating >= 4 ? "⭐⭐⭐⭐\u00a0\u00a0": (
              review.rating >= 3 ? "⭐⭐⭐  ": "⭐⭐   "
            )
          )
          }
        </div>
        <div className={styles.review}>
          {review.text}
        </div>
        <div className={styles.reviewTime}>
        --- By {review.author_name}, {review.relative_time_description}
        </div>
			</div>
		);
	}
}

export default Review;
