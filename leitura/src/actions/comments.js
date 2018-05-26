import * as blogAPI from '../utils/blogAPI'


export const requestComments = comments => {
    return {
        type: 'REQUEST_COMMENTS'
    }
}

export const receiveComments = comments => {
    return {
        type: 'RECEIVE_COMMENTS',
        posts
    }
}

export const fetchComments = (id) => {
    return dispatch => {
        dispatch(requestComments())
        return blogAPI.fetchComments(id)
        .then(posts => dispatch(receiveComments(comments)))
    }
}
 