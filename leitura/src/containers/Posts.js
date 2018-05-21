import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions/posts'
import { ListGroup, ListGroupItem } from 'react-bootstrap'


class Posts extends Component {

    componentDidMount() {
        //this.props.fetchPosts()
    }

    render() {
        return (
            <ListGroup>
                <ListGroupItem header="Heading 1">Some body text</ListGroupItem>
                <ListGroupItem header="Heading 2" href="#">
                    Linked item
                </ListGroupItem>
                <ListGroupItem header="Heading 3" bsStyle="danger">
                    Danger styling
                </ListGroupItem>
            </ListGroup>
        );
    }
}

const mapStateToProps = ({ posts }) => ({
    posts,
})

const mapDispatchToProps = dispatch => ({
    fetchPosts: () => dispatch(fetchPosts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts);