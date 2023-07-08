// TYPES
const GET_CHANNELS = '/channels/GET_CHANNELS'
const CREATE_CHANNEL = '/channels/CREATE_CHANNEL'
const GET_CHANNEL = '/channel/GET_CHANNEL'
const GET_LIVE_CHATS = '/channel/GET_LIVE_CHATS'
const DELETE_CHANNEL = "/channel/DELETE_CHANNEL"
const DELETE_MEMBER = "/channel/DELETE_MEMBER"
const GET_CHANNELS_USER = '/channels/GET_CHANNELS_USER'


// ACTIONS
const actionGetChannels = (channels) => ({
    type: GET_CHANNELS,
    payload: channels
})
const actionGetChannelsUser = (channels) => ({
    type: GET_CHANNELS_USER,
    payload: channels
})

const actionCreateChannel = (channel) => ({
    type: CREATE_CHANNEL,
    payload: channel
})

const actionGetChannel = (channel) => ({
    type: GET_CHANNEL,
    payload: channel
})

const actionDeleteChannel = (channelId) => ({
    type: DELETE_CHANNEL,
    payload: channelId
})

const actionGetLiveChats = (live_chats) => ({
    type: GET_LIVE_CHATS,
    payload: live_chats
})

const actionDeleteChannelMember = (channels) => ({
    type: DELETE_MEMBER,
    payload: channels
})



// THUNKS
export const thunkGetChannels = (id) => async dispatch => {
    const res = await fetch(`/api/teams/${id}/channels`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    //dispatch(actionGetChannels(data))
    if (res.ok) {
        const data = await res.json();
        // console.log("good response")
        // console.log(data)
        dispatch(actionGetChannels(data))
        return data;
    }else{
        const errorData = await res.json();
        console.log("error response");
        console.log(errorData);
        return errorData;
    }
}

// get channels by user
export const thunkGetChannelsByUser = (id) => async dispatch => {
    const res = await fetch(`/api/teams/${id}/channels/user`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    // dispatch(actionGetChannelsUser(data))
    if (res.ok) {
        const data = await res.json();
        // console.log("good response")
        // console.log(data)
        dispatch(actionGetChannelsUser(data))
        return data;
    }else{
        const errorData = await res.json();
        console.log("error response");
        console.log(errorData);
        return errorData;
    }
}

export const thunkGetChannel = (id) => async dispatch => {
    const res = await fetch(`/api/channels/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    //dispatch(actionGetChannel(data))
    if (res.ok) {
        const data = await res.json();
        // console.log("good response")
        // console.log(data)
        dispatch(actionGetChannel(data))
        return data;
    }else{
        const errorData = await res.json();
        console.log("error response");
        console.log(errorData);
        return errorData;
    }
}

export const thunkCreateChannel = (id, channel) => async dispatch => {
    const res = await fetch(`/api/teams/${id}/channels`, {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        // body: JSON.stringify(channel)
        body: channel
    })
    //dispatch(actionCreateChannel(data))
    console.log("normal response");
    console.log(res);
    if (res.ok) {
        const data = await res.json();
        // console.log("good response")
        // console.log(data)
        dispatch(actionCreateChannel(data))
        return data;
    }else{
        const errorData = await res.json();
        console.log("error response");
        console.log(errorData);
        return errorData;
    }
}

export const thunkDeleteUserFromChannel = (chan_id, user_id) => async dispatch => {
    const res = await fetch(`/api/channels/${chan_id}/member/${user_id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    //dispatch(actionDeleteChannelMember(data))
    if (res.ok) {
        const data = await res.json();
        // console.log("good response")
        // console.log(data)
        dispatch(actionDeleteChannelMember(data))
        return data;
    }else{
        const errorData = await res.json();
        console.log("error response");
        console.log(errorData);
        return errorData
    }
}

export const deleteChannel = (id) => async dispatch => {
    const res = await fetch(`/api/channels/${id}/delete`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    //dispatch(actionDeleteChannel(id))
    if (res.ok) {
        const data = await res.json();
        // console.log("good response")
        // console.log(data)
        dispatch(actionDeleteChannel(id))
        return data;
    }else{
        const errorData = await res.json();
        console.log("error response");
        console.log(errorData);
        return errorData
    }
}

export const thunkGetLiveChats = (id) => async dispatch => {
    const res = await fetch(`/api/channels/${id}/chats`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    //dispatch(actionGetLiveChats(data))
    if (res.ok) {
        const data = await res.json();
        // console.log("good response")
        // console.log(data)
        dispatch(actionGetLiveChats(data))
        return data;
    }else{
        const errorData = await res.json();
        console.log("error response");
        console.log(errorData);
        return errorData
    }
}

//THE DISPATCH WAS COMMENTED OUT HERE INVESTIGATE
export const thunkJoinChannel = (id) => async dispatch => {
    const res = await fetch(`/api/channels/${id}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        const data = await res.json();
        // console.log("good response")
        // console.log(data)

        //dispatch commented out b/c redirecting on join to to diff page that gets the data itself
        //dispatch(actionJoinChannel(data))
        return data;
    }else{
        const errorData = await res.json();
        console.log("error response");
        console.log(errorData);
        return errorData
    }
}
// REDUCER

const initialState = { allChannels: {}, singleChannel: {}, liveChats: {}, everyChannel: {}}

const channels = (state = initialState, action) => {
    switch(action.type) {
        case GET_CHANNELS: {
            const newState = {...state, everyChannel: {} }
            action.payload.forEach(channel => newState.everyChannel[channel.id] = channel)
            return newState
        }
        case GET_CHANNELS_USER: {
            const newState = {...state, allChannels: {} }
            action.payload.forEach(channel => newState.allChannels[channel.id] = channel)
            return newState
        }
        case GET_CHANNEL: {
            const newState = {...state, singleChannel: {} }
            newState.singleChannel = action.payload
            return newState
        }
        case CREATE_CHANNEL: {
            const newState = { ...state }
            newState.allChannels = { ...newState.allChannels, [action.payload.id]: action.payload }
            newState.singleChannel = action.payload
            return newState;
        }
        case GET_LIVE_CHATS: {
            const newState = {...state, liveChats: {}}
            action.payload.forEach(chat => newState.liveChats[chat.id] = chat)
            return newState
        }
        case DELETE_CHANNEL: {
            const newAllChannels = {...state.allChannels}
            delete newAllChannels[action.payload];
            return {...state, allChannels: newAllChannels, singleChannel: {}}
        }
        case DELETE_MEMBER: {
            const newState = {...state, singleChannel: {}, allChannels: {} }
            action.payload.forEach(channel => newState.allChannels[channel.id] = channel)
            return newState;
        }
        default:
            return state
    }
}


export default channels
