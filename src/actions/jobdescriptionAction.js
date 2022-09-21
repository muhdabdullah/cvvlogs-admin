export const getJobDescription = (id) => {
  return (dispatch) => {
    fetch(
      `${process.env.REACT_APP_API_END_POINT}/get_job_details.php?job_id=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth_id: `${localStorage.getItem("auth_id")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        const jobdescription = response.data;
        dispatch({
          type: "GET_JOBDESCRIPTION",
          jobdescription: jobdescription,
          jobdescriptionResponse: "got it",
          loading: true,
        });
      })
      .catch((error) => {
        console.log("error", error);
        dispatch({
          type: "GET_JOBDESCRIPTION",
          jobdescription: {},
          jobdescriptionResponse: null,
          loading: true,
        });
      });
  };
};
