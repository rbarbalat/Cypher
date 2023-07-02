// TYPES
const GET_CHANNELS = '/channels/GET_CHANNELS'
const GET_CHANNEL = '/channel/GET_CHANNEL'

// ACTIONS
const actionGetChannels = (channels) => ({
    type: GET_CHANNELS,
    payload: channels
})

const actionGetChannel = (channel) => ({
    type: GET_CHANNEL,
    payload: channel
})


// THUNKS
export const thunkGetChannels = (id) => async dispatch => {
    const res = await fetch("/api/channels/", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
        const filteredData = data.filter(channel => channel.id === id)
        dispatch(actionGetChannels(filteredData))
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
        default:
            return state
    }
}


export default channels
