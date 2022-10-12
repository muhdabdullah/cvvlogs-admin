const initState = {
    homepage: {},
    homepageResponse: null,
    loading:false,

}

const homepageReducer = (state = initState, action) => {
    if (action.type === 'GET_HOMEPAGE') {
        return {
            ...state,
            homepage: action.homepage,
            homepageResponse: action.homepageResponse,
            loading: action.loading,
        }
    }
    // /// THESE ARE GENERAL APPLICABLE TO ALL API's
    else if (action.type === 'HOMEPAGE_RESET') {
        return {
            ...state,

            homepageResponse: null,
            loading:action.loading,

        }
    }
    else if (action.type === 'HOMEPAGE_SUCCESS') {
        return {
            ...state,

            homepageResponse: action.homepageResponse,
            loading:action.loading,
        }
    }
    else if (action.type === 'HOMEPAGE_FAIL') {
        return {
            ...state,

            homepageResponse: action.homepageResponse,
            loading:action.loading,
        }
    }

    return state;
}
export default homepageReducer;
