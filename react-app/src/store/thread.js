// TYPES
const GET_USER = '/thread/GET_USER'
const GET_THREAD = '/thread/GET_THREAD'
const CLEAR_CONTENTS = '/thread/CLEAR_CONTENTS'


// ACTIONS
const actionGetUser = (user) => ({
    type: GET_USER,
    payload: user
})

const actionGetThread = (thread) => ({
    type: GET_THREAD,
    payload: thread
})

const actionClearContents = () => ({
    type: CLEAR_CONTENTS
})


// THUNKS
export const thunkGetUser = (id) => async dispatch => {
    const res = await fetch(`/api/users/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
        dispatch(actionGetUser(data))
    }
}


export const thunkClearContents = () => async dispatch => {
    dispatch(actionClearContents())
}





// REDUCER
const initialState = { current: {} }
const thread = (state = initialState, action) => {
    switch(action.type) {
        case GET_USER:
        case GET_THREAD: {
            const newState = { ...state }
            newState.current = action.payload
            return newState
        }
        case CLEAR_CONTENTS: {
            const newState = { current: {} }
            return newState
        }
        default:
            return state
    }
}

export default thread
