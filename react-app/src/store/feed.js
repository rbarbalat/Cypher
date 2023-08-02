// TYPES
const GET_FEED = '/feed/GET_FEED'

// ACTIONS
const actionGetFeed = (feed) => ({
    type: GET_FEED,
    payload: feed
})

// THUNK
export const thunkGetFeed = (type, id) => async dispatch => {
    const res = await fetch(`/api/channels/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetFeed(data))
        return data;
    }else{
        const errorData = await res.json();
        return errorData
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
