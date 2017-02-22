import React from 'react';

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
		return(
			<div className="menu-item">
				작성자 : {review.author_name}
				<br />
				작성 시간 : {review.relative_time_description}
				<br />
				점수 : {review.rating}
				<br />
				내용 : {review.text}
			</div>
		);
	}
}

export default Review;