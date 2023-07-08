// TYPES
const GET_PARTNERS = '/directmessages/GET_PARTNERS'
const GET_DIRECT_MESSAGES_WITH_PARTNER = '/directmessages/GET_DIRECT_MESSAGES_WITH_PARTNER'
const CREATE_DIRECT_MESSAGE = '/directmessages/CREATE_DIRECT_MESSAGE'

// ACTIONS
const actionGetPartners = (partners) => ({
    type: GET_PARTNERS,
    payload: partners
})

const actionGetDirectMessagesWithPartner = (data) => ({
    type: GET_DIRECT_MESSAGES_WITH_PARTNER,
    payload: data
})

const actionCreateDirectMessage= (message) => ({
    type: CREATE_DIRECT_MESSAGE,
    payload: message
})


// THUNK
export const thunkGetPartners = () => async dispatch => {
    const res = await fetch("/api/messages/", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    //dispatch(actionGetPartners(data))
    if (res.ok) {
        const data = await res.json();
        // console.log("good response")
        // console.log(data)
        dispatch(actionGetPartners(data))
        return data;
    }else{
        const errorData = await res.json();
        console.log("error response");
        console.log(errorData);
        return errorData
    }
}

export const thunkGetDirectMessages = (id) => async dispatch => {
    const res = await fetch(`/api/messages/partner/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
    //dispatch(actionGetDirectMessagesWithPartner(data))
    if (res.ok) {
        const data = await res.json();
        // console.log("good response")
        // console.log(data)
        dispatch(actionGetDirectMessagesWithPartner(data))

        //need to return value inside useEffect for socket
        return data.messages
    }else{
        const errorData = await res.json();
        console.log("error response");
        console.log(errorData);
        return errorData
    }
}

export const thunkCreateDirectMessage = (id, message) => async dispatch => {
    const res = await fetch(`/api/messages/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message)
    })
    //dispatch(actionCreateDirectMessage(data))
    if (res.ok) {
        const data = await res.json();
        // console.log("good response")
        // console.log(data)
        dispatch(actionCreateDirectMessage(data))
        //second fetch below, don't return
    }else{
        const errorData = await res.json();
        console.log("error response");
        console.log(errorData);
        return errorData
    }
    const res2 = await fetch("/api/messages/", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    //dispatch(actionGetPartners(data))
    if (res2.ok) {
        const data = await res2.json();
        // console.log("good response")
        // console.log(data)
        dispatch(actionGetPartners(data))
        //no return
    }else{
        const errorData = await res2.json();
        console.log("error response");
        console.log(errorData);
        return errorData
    }
}

// REDUX
const initialState = { partners: {}, directMessages: {}, currentPartner: {}}

const messages = (state = initialState, action) => {
    switch(action.type) {
        case GET_PARTNERS: {
            const newState = { ...state, partners: {} }
            action.payload.forEach(message => newState.partners[message.id] = message)
            return newState
        }
        case GET_DIRECT_MESSAGES_WITH_PARTNER: {
            // const newState = { ...state, directMessages: {}}
            const newState = {...state, directMessages: {}, currentPartner: {}}
            action.payload.messages.forEach(message => newState.directMessages[message.id] = message)
            newState.currentPartner = action.payload.user
            return newState
        }
        case CREATE_DIRECT_MESSAGE: {
            const newState = { ...state }
            newState.directMessages = { ...newState.directMessages, [action.payload.id]: action.payload }
            return newState
        }
        default:
            return state
    }
}


export default messages
