// TYPES
const GET_CHANNELS = '/channels/GET_CHANNELS'
const CREATE_CHANNEL = '/channels/CREATE_CHANNEL'
const GET_CHANNEL = '/channel/GET_CHANNEL'
const GET_LIVE_CHATS = '/channel/GET_LIVE_CHATS'
const DELETE_CHANNEL = "/channel/DELETE_CHANNEL"
const DELETE_MEMBER = "/channel/DELETE_MEMBER"

// ACTIONS
const actionGetChannels = (channels) => ({
    type: GET_CHANNELS,
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
    if (res.ok) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
        dispatch(actionGetChannels(data))
    }
}

// get channels by user
export const thunkGetChannelsByUser = (id) => async dispatch => {
    const res = await fetch(`/api/teams/${id}/channels/user`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
        dispatch(actionGetChannels(data))
    }
}

export const thunkGetChannel = (id) => async dispatch => {
    const res = await fetch(`/api/channels/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
        dispatch(actionGetChannel(data))
    }
}

export const thunkCreateChannel = (id, channel) => async dispatch => {
    const res = await fetch(`/api/teams/${id}/channels`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(channel)
    })
    if (res.ok) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
        dispatch(actionCreateChannel(data))
        return data
    }
}

export const thunkDeleteUserFromChannel = (chan_id, user_id) => async dispatch => {
    const res = await fetch(`/api/channels/${chan_id}/member/${user_id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
        dispatch(actionDeleteChannelMember(data))
        return data
    }
}

export const deleteChannel = (id) => async dispatch => {
    const res = await fetch(`/api/channels/${id}/delete`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
        dispatch(actionDeleteChannel(id))
        return data
    }
}

export const thunkGetLiveChats = (id) => async dispatch => {
    const res = await fetch(`/api/channels/${id}/chats`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
        dispatch(actionGetLiveChats(data))
        return data;
    }
}


// REDUCER

const initialState = { allChannels: {}, singleChannel: {}, liveChats: {} }

const channels = (state = initialState, action) => {
    switch(action.type) {
        case GET_CHANNELS: {
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
