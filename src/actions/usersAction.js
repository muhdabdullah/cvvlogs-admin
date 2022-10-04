export const getUsers = (page, admin_status = undefined) => {
    return (dispatch) => {
        fetch(`${process.env.REACT_APP_API_END_POINT}/get_job_list.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                auth_id: `${localStorage.getItem("auth_id")}`,
            },
            body: JSON.stringify({
                page: page,
                admin_status: admin_status,
            }),
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.status == 200) {
                    const users = response.data;
                    dispatch({
                        type: "GET_USERS",
                        users: users,
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
