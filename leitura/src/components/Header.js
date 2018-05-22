import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ButtonToolbar, Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { fetchCategories } from '../actions/categories'
import _ from 'lodash';

class Header extends Component {

  componentDidMount() {
    this.props.fetchCategories();
  }

  categoryList() {
    const { categories } = this.props;
    if (categories) {
      return _.map(categories, category => {
        return (
          
        <Button eventKey={category.path}  bsSize="large">{category.name}</Button>
        );
      });
    }
  }

  render() {
    return (
      <ButtonToolbar>
          {this.categoryList()}
      </ButtonToolbar>
      
    );
  }
}


function mapStateToProps(state) {
  return { categories: state.categories }
}

export default connect(mapStateToProps, { fetchCategories })(Header);