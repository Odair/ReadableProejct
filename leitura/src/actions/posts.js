import * as blogAPI from '../utils/blogAPI'


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

export const fetchAllPosts = () => {
    return dispatch => {
        dispatch(requestPosts())
        return blogAPI.fetchPosts()
        .then(posts => dispatch(receivePosts(posts)))
    }

}
 