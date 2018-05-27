import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { fetchCategories } from '../actions/categories'
import { reduxForm, Field } from 'redux-form';
import { AddPost } from '../actions/posts'
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import classNames from 'classnames';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import Category from '@material-ui/icons/Drafts';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Modal from '@material-ui/core/Modal';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  textField: {
    flexBasis: 200,
  },
  margin: {
    margin: theme.spacing.unit,
  },
});


class Header extends Component {

  state = {
    value: 0,
    open: false
  };

  componentDidMount() {
    this.props.fetchCategories();
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onSubmit = (values) => {
    this.props.AddPost(values);
  }

  categoryList() {
    const { categories, classes } = this.props;

    if (categories) {
      return _.map(categories, category => {
        return (

          <BottomNavigationAction href={`/${category.name}`} label={category.name} icon={<Category />} />



        );
      });
    }
  }

  render() {

    const { categories, classes, handleSubmit } = this.props;
    const { value, idCategory } = this.state;
    return (

      <Grid>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className="flex">
              READable
          </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <Row className="show-grid">
          <BottomNavigation
            value={value}
            onChange={this.handleChange}
            showLabels
            className={classes.root}
          >
            <BottomNavigationAction href={`/`} label="All" icon={<Category />} />
            {this.categoryList()}
          </BottomNavigation>
        </Row>
        <Button onClick={this.handleOpen} variant="fab" color="primary" aria-label="add" className="button">
          <AddIcon />
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <div style={getModalStyle()} className={classes.paper}>
              <div className={classes.root}>
                <TextField
                  label="Title"
                  name="title"
                  id="simple-start-adornment"
                  className={classNames(classes.margin, classes.textField)}
                />
                <TextField
                  select
                  label="Category"
                  name="category"
                  className={classNames(classes.margin, classes.textField)}
                >
                  {_.map(categories, option => (
                    <MenuItem key={option.path} value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                <FormControl fullWidth className={classes.margin}>
                  <InputLabel htmlFor="adornment-amount">Post content</InputLabel>
                  <Input
                    id="adornment-amount"
                    nmae="body"
                  />
                </FormControl>
                <FormControl
                  className={classNames(classes.margin, classes.withoutLabel, classes.textField)}
                  aria-describedby="weight-helper-text"
                >
                  <InputLabel>Author</InputLabel>
                  <Input
                    id="adornment-weight"
                    name="author"

                  />
                  <FormHelperText id="weight-helper-text">Weight</FormHelperText>
                </FormControl>
                <Button type="submit" bsStyle="primary">Submit</Button>
                <Button type="button" bsStyle="danger" onClick={this.handleClose} >Cancel</Button>
              </div>
            </div>
          </form>
        </Modal>
      </Grid>

    );
  }
}


function mapStateToProps(state) {
  return { categories: state.categories }
}
export default reduxForm({
  form: 'CreatePostForm'
})(connect(mapStateToProps, { fetchCategories, AddPost })(withStyles(styles)(Header)));