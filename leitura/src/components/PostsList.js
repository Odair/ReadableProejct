import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllPosts } from '../actions/posts'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import _ from 'lodash';

class PostList extends Component {

    componentWillMount() {
        this.props.fetchAllPosts();
        console.log(this.props)
    }

    postList() {
        const { posts } = this.props;
        if (posts) {
            return _.map(posts, post => {
                return (
                    <ListGroupItem eventKey={post.id} header={post.title}>{post.body}</ListGroupItem>

                );
            });
        }
    }

    render() {
        return (
            <div className="container">
                <ListGroup>
                    {this.postList()}
                </ListGroup>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { posts: state.posts }
}

export default connect(mapStateToProps, { fetchAllPosts })(PostList);