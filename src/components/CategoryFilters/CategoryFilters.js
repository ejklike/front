import React from 'react';
import Button from 'react-button';
import update from 'react-addons-update';

class CategoryFilters extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
 
  handleClick()
  {
    this.props.onSelect(this.props.pressedKey);
  }

  render() {
    return(
        <Button pressed={this.props.pressed}
                onClick={this.handleClick}>
                { this.props.name }
        </Button>
    );
  }
}

export default CategoryFilters;
