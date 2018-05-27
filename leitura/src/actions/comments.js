import _ from 'lodash'
import * as blogAPI from '../utils/blogAPI'


export const requestComments = comments => {
    return {
        type: 'REQUEST_COMMENTS'
    }
}

export const receiveComments = comments => {
    return {
        type: 'RECEIVE_COMMENTS',
        comments
    }
}

export function fetchComments(postId) {
    return dispatch => {
        requestComments()
        blogAPI.fetchComments(postId)
            .then(comments => {
                dispatch(receiveComments(comments))
            })
    }
}




