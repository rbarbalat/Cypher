// TYPES
const GET_TEAMS = '/teams/GET_TEAMS'
const GET_TEAM = '/teams/GET_TEAM'
const CREATE_TEAM = '/teams/CREATE_TEAM'
const GET_EVERY_TEAM = '/teams/GET_EVERY_TEAM'
const CLEAR_TEAM = '/teams/CLEAR_TEAM'
const DELETE_TEAM = '/teams/DELETE_TEAM'
const GET_ALL_MEMBERS = '/teams/GET_ALL_MEMBERS'

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
const actionDeleteTeam = (teamId) => ({
    type: DELETE_TEAM,
    payload: teamId
})

const actionGetAllMembers = (members) => ({
    type: GET_ALL_MEMBERS,
    payload: members
})

// THUNKS
export const thunkGetTeams = () => async dispatch => {
    const res = await fetch("/api/teams/currentuser", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetTeams(data))
        return data;
    }else{
        const errorData = await res.json();
        return errorData
    }
}

export const thunkGetTeam = (id) => async dispatch => {
    const res = await fetch(`/api/teams/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetTeam(data))
        return data;
    }else{
        const errorData = await res.json();
        return errorData
    }
}


export const thunkGetEveryTeam = () => async dispatch => {
    const res = await fetch(`/api/teams/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetEveryTeam(data))
        return data;
    }else{
        const errorData = await res.json();
        return errorData
    }
}

export const thunkCreateTeam = (team) => async dispatch => {
    const res = await fetch(`/api/teams/`, {
        method: "POST",
        body: team
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(actionCreateTeam(data))
        return data;
    }else{
        const errorData = await res.json();
        return errorData;
    }
}

export const thunkJoinTeam = (id) => async dispatch => {
    const res = await fetch(`/api/teams/${id}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        const data = await res.json();
        return data;
    }else{
        const errorData = await res.json();
        return errorData
    }

}

export const clearTeam = () => async dispatch => {
    dispatch(actionClearTeam())
}

export const deleteTeam = (id) => async dispatch => {
    const res = await fetch(`/api/teams/${id}`, {
        method: "DELETE"
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(actionDeleteTeam(id));
        return data;
    }else{
        const errorData = await res.json();
        return errorData
    }
}

export const thunkGetAllMembers = (id) => async dispatch => {
    const res = await fetch(`/api/teams/${id}/members`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(actionGetAllMembers(data))
        return data;
    }else{
        const errorData = await res.json();
        return errorData
    }
}

// REDUCER
const initialState = { allTeams: {}, singleTeam: {}, everyTeam: {}, allMembers: {} }

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
        case DELETE_TEAM: {
            const newAllTeams = {...state.allTeams}
            delete newAllTeams[action.payload]
            const newEveryTeam = {...state.everyTeam}
            delete newEveryTeam[action.payload]
            return {everyTeam:newEveryTeam, allTeams:newAllTeams, singleTeam: {}}
        }
        case GET_ALL_MEMBERS: {
            const newState = {...state, allMembers: {}}
            action.payload.forEach(member => newState.allMembers[member.id] = member)
            return newState
        }
        default:
            return state
    }
}

export default teams
