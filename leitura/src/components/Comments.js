import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ChatBubbleOutLine from '@material-ui/icons/ChatBubbleOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Divider from '@material-ui/core/Divider';
import {
    Button,
    ListGroup,
    ListGroupItem
} from 'react-bootstrap';
import {
    fetchComments,
} from '../actions/comments';

const styles = theme => ({
    card: {
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: blue[500],
    },
});

class Comments extends Component {
    state = { anchorEl: null };

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };

    componentDidMount() {
        console.log(this.props);
        this.props.fetchComments(this.props.postId);
    }

    deleteButtonPress(id) {
        const {
            deleteCommentPost,
            fetchComments,
            postId
        } = this.props;

        deleteCommentPost(id, () => {
            fetchComments(postId);
        });
    }

    renderCommentsList() {
        const { comments, classes, voteComment } = this.props
        const { anchorEl } = this.state;

        if (comments) {
            return _.map(comments, (comment, id) => {
                return (
                    <div>
                        
                        <Divider />
                        <Typography paragraph variant="body2">
                            <Moment format="DD/MM/YYYY"> {comment.timestamp}</Moment> by {comment.author}
                        </Typography>
                        <Typography paragraph>
                            <p>{comment.body}</p>
                            <p>{comment.voteScore}</p>
                        </Typography>
                    </div>
                );
            });
        }
    }

    render() {
        return (
            <div>
                {this.renderCommentsList()}
            </div>
        );
    }
}
Comments.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps(comments) {
    return comments
}

export default connect(mapStateToProps, {
    fetchComments
})(withStyles(styles)(Comments));
