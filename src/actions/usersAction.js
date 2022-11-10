export const getUsers = (page, admin_status = undefined) => {
    return (dispatch) => {
        fetch(`${process.env.REACT_APP_API_END_POINT}/get-user-videos?status=${admin_status}&page=${page}`, {
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
