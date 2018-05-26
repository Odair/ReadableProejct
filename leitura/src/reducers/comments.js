const comments = (state = {}, action) => {
    const { comments } = action;
    switch (action.type) {
        case 'RECEIVE_COMMENTS':
            return comments
        default: return state
    }
}

export default comments;