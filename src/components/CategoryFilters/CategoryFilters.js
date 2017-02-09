import React from 'react';
import Button from 'react-button';
import { connect } from 'react-redux';
import { categoryToggle } from '../../actions';

class CategoryFilters extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <Button pressed={this.props.isPressed}
                onClick={this.props.onCategoryToggle.bind(this, this.props.idx)}>
                { this.props.name }
        </Button>
    );
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    onCategoryToggle: (idx) => dispatch(categoryToggle(idx))
  };
}

CategoryFilters = connect(undefined, mapDispatchToProps)(CategoryFilters);

export default CategoryFilters;
