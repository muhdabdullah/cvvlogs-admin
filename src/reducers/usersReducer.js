const initState = {
    users: {},
    usersResponse: null,
    loading:false,

}

const userReducer = (state = initState, action) => {
    if (action.type === 'GET_USERS') {
        return {
            ...state,
            users: action.users,
            usersResponse: action.usersResponse,
            loading:action.loading,
        }
    }
    // /// THESE ARE GENERAL APPLICABLE TO ALL API's
    else if (action.type === 'USERS_RESET') {
        return {
            ...state,

            usersResponse: null,
            loading:action.loading,

        }
    }
    else if (action.type === 'USERS_SUCCESS') {
        return {
            ...state,

            usersResponse: action.usersResponse,
            loading:action.loading,
        }
    }
    else if (action.type === 'USERS_FAIL') {
        return {
            ...state,

            usersResponse: action.usersResponse,
            loading:action.loading,
        }
    }

    return state;
}
export default userReducer;
