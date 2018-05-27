import * as blogAPI from '../utils/blogAPI'
import { guid } from '../constants/constants'


export const requestPosts = posts => {
    return {
        type: 'REQUEST_POSTS'
    }
}

export const receivePosts = posts => {
    return {
        type: 'RECEIVE_POSTS',
        posts
    }
}

export const addPost = (data) => {
    return {
        type: 'CREATE_POST',
        payload: data
    };
}

export const editPostSuccess = (data) => {
    return {
        type: 'EDIT_POST',
        payload: data
    }
}

export const deletePostSuccess = (data) => {
    return {
        type: 'DELETE_POST',
        payload: data
    }
}

export const fetchAllPosts = (category) => {
    return dispatch => {
        dispatch(requestPosts())
        return blogAPI.fetchPosts(category)
            .then(posts => dispatch(receivePosts(posts)))
    }
}

export const AddPost = (values) => {
    const { title, body, author, category } = values;
    const data = {
        id: guid(),
        timestamp: Date.now(),
        title,
        body,
        author,
        category
    }

    return dispatch => {
        blogAPI.addPost(data)
            .then(res => {
                dispatch(addPost(res.data));
            });

    }
}


export const editPost = (id, values, callback) => {

    return dispatch => {
        blogAPI.updatePost(id, values, callback)
            .then(res => {
                callback();
                dispatch(editPost(res.data))
            });

    }
}

export const deletePost = (id, callback) => {

    return dispatch => {
        blogAPI.deletePost(id)
            .then(res => {
                callback()
                dispatch(deletePost(id));
            });
    }
}

export function votePost(id, vote) {
    return dispatch => {
        blogAPI.votePost(id, vote)
            .then(res => dispatch({ type: 'VOTE_POST', payload: res.data }))
    }
}

