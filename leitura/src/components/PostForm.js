import React, { Component } from 'react';
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
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
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
class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {
                title :'',
                body :'',
                author:'',
                category:''
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {

        const { categories, classes, handleSubmit } = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
                <div className={classes.root}>
                    <TextField
                        label="Title"
                        name="title"
                        value={this.state.post.title}
                        id="simple-start-adornment"
                        className={classNames(classes.margin, classes.textField)}
                    />
                    <TextField
                        select
                        label="Category"
                        name="category"
                        className={classNames(classes.margin, classes.textField)}
                        value={this.state.post.category}
                    >
                        {_.map(categories, option => (
                            <MenuItem key={option.path} value={option.name}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Post content"
                        name="body"
                        value={this.state.post.author}
                        id="simple-start-adornment"
                        className={classNames(classes.margin, classes.textField)}
                    />
                    <TextField
                        label="Post content"
                        name="author"
                        value={this.state.post.author}
                        id="simple-start-adornment"
                        className={classNames(classes.margin, classes.textField)}
                    />
                    <Button type="submit" bsStyle="primary">Submit</Button>
                    <Button type="button" bsStyle="danger" onClick={this.handleClose} >Cancel</Button>
                </div>
            </form>
        );
    }
}

export default withStyles(styles)(PostForm);