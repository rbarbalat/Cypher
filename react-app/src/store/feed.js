// TYPES
const GET_FEED = '/feed/GET_FEED'

// ACTIONS
const actionGetFeed = (feed) => ({
    type: GET_FEED,
    payload: feed
})

// THUNK
export const thunkGetFeed = (type, id) => async dispatch => {
    let res
    if (type === 'channel') {
        res = await fetch(`/api/channels/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
    } else {
        res = await fetch()
    }
    if (res.ok) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
        console.log('did we get this far?');
        dispatch(actionGetFeed(data))
    }
}

// REDUCER
const initialState = { currentFeed: {} }
const feed = (state = initialState, action) => {
    switch(action.type) {
        case GET_FEED: {
            const newState = { ...state }
            newState.currentFeed = action.payload
            return newState
        }
        default:
            return state;
    }
}

export default feed;
