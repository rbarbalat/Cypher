// TYPES
const GET_CHANNELS = '/channels/GET_CHANNELS'
const CREATE_CHANNEL = '/channels/CREATE_CHANNEL'
const GET_CHANNEL = '/channel/GET_CHANNEL'

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


// REDUCER

const initialState = { allChannels: {} }

const channels = (state = initialState, action) => {
    switch(action.type) {
        case GET_CHANNELS: {
            const newState = { allChannels: {} }
            action.payload.forEach(channel => newState.allChannels[channel.id] = channel)
            return newState
        }
        case CREATE_CHANNEL: {
            const newState = { ...state }
            newState.allChannels = { ...newState.allChannels, [action.payload.id]: action.payload }
            return newState;
        }
        default:
            return state
    }
}


export default channels
