import React from 'react';
import Button from 'react-button';
import { connect } from 'react-redux';
import { toggle } from '../../actions';

class CategoryFilters extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onToggle(this.props.idx);
  }

  render() {
    return(
        <Button pressed={this.props.isPressed}
                onClick={this.handleClick}>
                { this.props.name }
        </Button>
    );
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    onToggle: (idx) => dispatch(toggle(idx))
  };
}

CategoryFilters = connect(undefined, mapDispatchToProps)(CategoryFilters);

export default CategoryFilters;
