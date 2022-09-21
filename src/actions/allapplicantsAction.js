export const getAllApplicants = (id) => {
  return (dispatch) => {
    fetch(
      `${process.env.REACT_APP_API_END_POINT}/job_applicants.php?job_id=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth_id: localStorage.getItem("auth_id"),
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        const allapplicants = response.data;
        dispatch({
          type: "GET_ALLAPPLICANTS",
          allapplicants: allapplicants,
          allapplicantsResponse: "got it",
          loading: true,
        });
      })
      .catch((error) => {
        console.log("error", error);
        dispatch({
          type: "GET_ALLAPPLICANTS",
          allapplicants: {},
          allapplicantsResponse: null,
          loading: true,
        });
      });
  };
};
