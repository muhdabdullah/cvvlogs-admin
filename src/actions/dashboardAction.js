export const getDashboard = (page, admin_status = undefined) => {
    return (dispatch) => {
        fetch(`${process.env.REACT_APP_API_END_POINT}/get-job-list`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify({
                page: page,
                // admin_status: admin_status,
            }),
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.success) {
                    const dashboard = response.data;
                    console.log(dashboard);
                    dispatch({
                        type: "GET_DASHBOARD",
                        dashboard: dashboard,
                        dashboardResponse: "got it",
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
                    dashboard: {},
                    dashboardResponse: null,
                    loading: true,
                });
            });
    };
};
