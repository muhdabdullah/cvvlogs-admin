export const getDashboard = (page, admin_status = undefined) => {
    return (dispatch) => {
        fetch(`${process.env.REACT_APP_API_END_POINT}/get-stats`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            },
            // body: JSON.stringify({
            //     page: page,
            //     // admin_status: admin_status,
            // }),
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.success) {
                    dispatch({
                        type: "GET_HOMEPAGE",
                        homepage: response.data,
                        homepageResponse: "got it",
                        loading: true,
                    });
                } else {
                    alert(response.message);
                }
            })
            .catch((error) => {
                console.log("error", error);
                dispatch({
                    type: "GET_PERSONAL",
                    homepage: {},
                    homepageResponse: null,
                    loading: true,
                });
            });
    };
};


export const getMonthlyStats = (startDate, endDate) => {
    return (dispatch) => {
        fetch(`${process.env.REACT_APP_API_END_POINT}/get-monthly-stats?start_date=${startDate}&end_date=${endDate}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            },
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.success) {
                    dispatch({
                        type: "GET_HOMEPAGE",
                        homepageMonthly: response.data,
                        homepageMonthlyResponse: "got it",
                        loading: true,
                    });
                } else {
                    alert(response.message);
                }
            })
            .catch((error) => {
                console.log("error", error);
                dispatch({
                    type: "GET_PERSONAL",
                    homepageMonthly: {},
                    homepageMonthlyResponse: null,
                    loading: true,
                });
            });
    };
};
