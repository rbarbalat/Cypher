// TYPES
const GET_TEAMS = '/teams/GET_TEAMS'
const GET_TEAM = '/teams/GET_TEAM'
const CREATE_TEAM = '/teams/CREATE_TEAM'
const GET_EVERY_TEAM = '/teams/GET_EVERY_TEAM'
const CLEAR_TEAM = '/teams/CLEAR_TEAM'

// ACTIONS
const actionGetTeams = (teams) => ({
    type: GET_TEAMS,
    payload: teams
})

const actionGetTeam = (team) => ({
    type: GET_TEAM,
    payload: team
})

const actionGetEveryTeam = (teams) => ({
    type: GET_EVERY_TEAM,
    payload: teams
})

const actionCreateTeam = (team) => ({
    type: CREATE_TEAM,
    payload: team
})

const actionClearTeam = () => ({
    type: CLEAR_TEAM
})


// THUNKS
export const thunkGetTeams = () => async dispatch => {
    const res = await fetch("/api/teams/currentuser", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
        dispatch(actionGetTeams(data))
        return data
    }
}

export const thunkGetTeam = (id) => async dispatch => {
    const res = await fetch(`/api/teams/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
        dispatch(actionGetTeam(data))
        return data
    }
}


export const thunkGetEveryTeam = () => async dispatch => {
    const res = await fetch(`/api/teams/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
        dispatch(actionGetEveryTeam(data))
        return data
    }
}

export const thunkCreateTeam = (team) => async dispatch => {
    const res = await fetch(`/api/teams/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(team)
    })
    if (res.ok) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
        dispatch(actionCreateTeam(data))
        return data
    }
}

export const thunkJoinTeam = (id) => async dispatch => {
    const res = await fetch(`/api/teams/${id}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
        return data
    }

}

export const clearTeam = () => async dispatch => {
    dispatch(actionClearTeam())
}


// REDUCER
const initialState = { allTeams: {}, singleTeam: {}, everyTeam: {} }

const teams = (state = initialState, action) => {
    switch(action.type) {
        case GET_TEAMS: {
            const newState = { ...state, allTeams: {} }
            action.payload.forEach(team => newState.allTeams[team.id] = team)
            return newState
        }
        case GET_EVERY_TEAM: {
            const newState = { ...state, everyTeam: {} }
            action.payload.forEach(team => newState.everyTeam[team.id] = team)
            return newState
        }
        case GET_TEAM: {
            const newState = { ...state }
            newState.singleTeam = action.payload
            return newState
        }
        case CREATE_TEAM: {
            const newState = { ...state }
            newState.allTeams = { ...newState.allTeams, [action.payload.id]: action.payload }
            return newState
        }
        case CLEAR_TEAM: {
            const newState = {...state, singleTeam: {} }
            return newState
        }
        default:
            return state
    }
}

export default teams
