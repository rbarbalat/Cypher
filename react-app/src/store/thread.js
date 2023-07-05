const GET_USER_THREAD = '/thread/GET_USER_THREAD'
const CLEAR_THREAD = '/thread/CLEAR_THREAD'


const actionGetUserThread = (user) => ({
    type: GET_USER_THREAD,
    payload: user
})

const actionClearThread = () => ({
    type: CLEAR_THREAD
})

export const thunkGetUserThread = (id) => async dispatch => {
    const res = await fetch(`/api/users/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
        data.type = 'user'
        dispatch(actionGetUserThread(data))
        return data
    }
}

export const thunkclearThread = () => async dispatch => {
    dispatch(actionClearThread())
}


const initialState = { current: {} }

const thread = (state = initialState, action) => {
    switch(action.type) {
        case GET_USER_THREAD: {
            const newState = { ...state }
            newState.current = action.payload
            return newState
        }
        case CLEAR_THREAD: {
            const newState = { current: {} }
            return newState
        }
        default:
            return state
    }
}

export default thread
