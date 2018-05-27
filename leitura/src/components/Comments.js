import _ from 'lodash';
import React, { Component } from 'react';
import red from '@material-ui/core/colors/red';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import {
    Button,
    ListGroup,
    ListGroupItem
} from 'react-bootstrap';
import {
    fetchComments,
} from '../actions/comments';


class Comments extends Component {

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
        const { comments, classes } = this.props
        if (comments) {
            return _.map(comments, (post, id) => {
                return (
                    <ListGroupItem
                        header={post.title}
                        key={id}
                    >
                        <div>{post.timestamp} by {post.author}</div>
                        <div>{post.body}</div>
                        <div>{post.category} {post.voteScore}</div>
                        <BottomNavigation
                                                showLabels
                                            >
                                                <BottomNavigationAction label="Edit" icon={<Edit />} />
                                                <BottomNavigationAction onClick={() => this.deleteButtonPress(post.id)} label="Delete" icon={<Delete />} />
                                            </BottomNavigation>
 
                    </ListGroupItem>
                );
            });
        }
    }

    render() {
        return (
            <ListGroup>{this.renderCommentsList()}</ListGroup>
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
})(Comments);
