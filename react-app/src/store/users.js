const GET_USERS = "/users/GET_USERS"

const actionGetUsers = (users) => {
    return {
        type: GET_USERS,
        payload: users
    }
}

export const thunkGetUsers = () => async (dispatch) => {
    const res = await fetch("/api/users/all")
    if(res.ok)
    {
        const data = await res.json();
        dispatch(actionGetUsers(data));
    }
    else{
        const error = await res.json();
        console.log(error);
        return error;
    }
}

const initialState = { users: {} }
const users = (state = initialState, action) => {
    switch(action.type)
    {
        case GET_USERS:
            const newState = {users: {}}
            action.payload.forEach(user => newState.users[user.id] = user)
            return newState
        default:
            return state
    }
}

export default users
