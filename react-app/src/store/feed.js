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
    // if (res.ok) {
    //     const data = await res.json()
    //     if (data.errors) {
    //         return data.errors
    //     }
    //     dispatch(actionGetFeed(data))
    // }
    if (res.ok) {
        const data = await res.json();
        // console.log("good response")
        // console.log(data)
        dispatch(actionGetFeed(data))
        return data;
    }else{
        const errorData = await res.json();
        console.log("error response");
        console.log(errorData);
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
