export const getDashboard = (page, admin_status = undefined) => {
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
          const dashboard = response.data;
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
