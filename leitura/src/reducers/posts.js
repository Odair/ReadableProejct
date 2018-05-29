import _ from 'lodash';

const posts = (state = {}, action) => {
    const { posts } = action;
    switch (action.type) {
        case 'RECEIVE_POSTS':
            return _.mapKeys(posts, 'id')
        case 'VOTE_POST':
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        default: return state
    }
}

export default posts;