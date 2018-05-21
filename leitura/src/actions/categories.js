import * as blogAPI from '../utils/blogAPI'


export const requestCategories = categories => {
    return {
        type: 'REQUEST_CATEGORIES'
    }
}

export const receiveCategories = categories => {
    return {
        type: 'RECEIVE_CATEGORIES',
        categories
    }
}

export const fetchCategories = () => {
    return dispatch => {
        dispatch(requestCategories())
        return blogAPI.fetchCategories()
        .then(categories => dispatch(receiveCategories(categories)))
    }

}
 