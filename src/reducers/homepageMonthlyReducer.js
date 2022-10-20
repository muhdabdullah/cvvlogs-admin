const initState = {
    homepageMonthly: {},
    homepageMonthlyResponse: null,
    loading:false,

}

const homepageMonthlyReducer = (state = initState, action) => {
    if (action.type === 'GET_HOMEPAGE_MONTHLY') {
        return {
            ...state,
            homepageMonthly: action.homepageMonthly,
            homepageMonthlyResponse: action.homepageMonthlyResponse,
            loading: action.loading,
        }
    }
    // /// THESE ARE GENERAL APPLICABLE TO ALL API's
    else if (action.type === 'HOMEPAGE_RESET_MONTHLY') {
        return {
            ...state,

            homepageMonthlyResponse: null,
            loading:action.loading,

        }
    }
    else if (action.type === 'HOMEPAGE_SUCCESS_MONTHLY') {
        return {
            ...state,

            homepageMonthlyResponse: action.homepageMonthlyResponse,
            loading:action.loading,
        }
    }
    else if (action.type === 'HOMEPAGE_FAIL_MONTHLY') {
        return {
            ...state,

            homepageMonthlyResponse: action.homepageMonthlyResponse,
            loading:action.loading,
        }
    }

    return state;
}
export default homepageMonthlyReducer;
