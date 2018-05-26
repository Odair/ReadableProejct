import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { fetchCategories } from '../actions/categories'
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

const ranges = [
  {
    value: '0-20',
    label: '0 to 20',
  },
  {
    value: '21-50',
    label: '21 to 50',
  },
  {
    value: '51-100',
    label: '51 to 100',
  },
];

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

    const { categories, classes } = this.props;
    const { value } = this.state;
    return (

      <Grid>
        <AppBar position="static">
          <Toolbar>
            <IconButton className="menuButton" color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className="flex">
              Title
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
          <div style={getModalStyle()} className={classes.paper}>
            <div className={classes.root}>
              <TextField
                label="With normal TextField"
                id="simple-start-adornment"
                className={classNames(classes.margin, classes.textField)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                }}
              />
              <TextField
                select
                label="With Select"
                className={classNames(classes.margin, classes.textField)}
                value={this.state.weightRange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                }}
              >
                {ranges.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="adornment-amount">Amount</InputLabel>
                <Input
                  id="adornment-amount"
                  value={this.state.amount}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
              </FormControl>
              <FormControl
                className={classNames(classes.margin, classes.withoutLabel, classes.textField)}
                aria-describedby="weight-helper-text"
              >
                <Input
                  id="adornment-weight"
                  value={this.state.weight}
                  endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                  inputProps={{
                    'aria-label': 'Weight',
                  }}
                />
                <FormHelperText id="weight-helper-text">Weight</FormHelperText>
              </FormControl>
              <FormControl className={classNames(classes.margin, classes.textField)}>
                <InputLabel htmlFor="adornment-password">Password</InputLabel>
                <Input
                  id="adornment-password"
                  type={this.state.showPassword ? 'text' : 'password'}
                  value={this.state.password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                      >
                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
          </div>
        </Modal>
      </Grid>

    );
  }
}


function mapStateToProps(state) {
  return { categories: state.categories }
}
const SimpleModalWrapped = connect(mapStateToProps, { fetchCategories })(withStyles(styles)(Header));
export default SimpleModalWrapped;