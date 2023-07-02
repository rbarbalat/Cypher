// TYPES
const GET_DIRECT_MESSAGES = '/directmessages/GET_DIRECT_MESSAGES'


// ACTIONS
const actionGetDirectMessages = (messages) => ({
    type: GET_DIRECT_MESSAGES,
    payload: messages
})

// THUNK
export const thunkGetDirectMessages = () => async dispatch => {
    const res = await fetch("/api/messages/", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
        console.log(data)
        dispatch(actionGetDirectMessages(data))
    }
}

// REDUX
const initialState = { directMessages: {} }

const messages = (state = initialState, action) => {
    switch(action.type) {
        case GET_DIRECT_MESSAGES: {
            const newState = { directMessages: {} }
            action.payload.forEach(message => newState.directMessages[message.id] = message)
            return newState
        }
        default:
            return state
    }
}


export default messages
