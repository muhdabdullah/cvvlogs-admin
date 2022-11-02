export const getUsers = (page, admin_status = undefined) => {
    return (dispatch) => {
        fetch(`${process.env.REACT_APP_API_END_POINT}/get-user-videos`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            },
            // body: JSON.stringify({
            //     page: page,
            //     admin_status: admin_status,
            // }),
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.success) {
                    dispatch({
                        type: "GET_USERS",
                        users: response.data,
                        usersResponse: "got it",
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
                    users: {},
                    usersResponse: null,
                    loading: true,
                });
            });
    };
};


export const updateUserVideoStatus = (id, status) => {
    return (dispatch) => {
        fetch(`${process.env.REACT_APP_API_END_POINT}/update-video-status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify({
                id: id,
                status: status,
            }),
        })
            .then((res) => res.json())
            .then((response) => {
                console.log('AGAYA');
                console.log(response);
                if (response.success) {
                    dispatch({
                        type: "GET_USERS",
                        users: response.data,
                        usersResponse: "got it",
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
                    users: {},
                    usersResponse: null,
                    loading: true,
                });
            });
    };
};
