import React from 'react';
//import Button from 'react-button';
import { Button, Row, Col, Icon, Navbar, NavItem, Input } from 'react-materialize';
import { connect } from 'react-redux';
import { categoryToggle, pathToggle } from '../../actions';
import styles from './CategoryFilters.css';

class CategoryFilters extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar className={styles.navbar}>
        <NavItem onClick={this.props.onPathSidebarToggle}><Icon>playlist_add</Icon></NavItem>
        {this.props.categoryData.map((category, i) => {
          return(
            <NavItem onClick={this.props.onCategoryToggle.bind(this, i)}
                         key={i}>{category.categoryName}</NavItem>
          );
        })}
        </Navbar>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    categoryData: state.category.categoryData
  };
}

let mapDispatchToProps = (dispatch) => {
  return {
    onCategoryToggle: (idx) => dispatch(categoryToggle(idx)),
    onPathSidebarToggle: () => dispatch(pathToggle())
  };
}

CategoryFilters = connect(mapStateToProps, mapDispatchToProps)(CategoryFilters);

export default CategoryFilters;
