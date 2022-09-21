export const handleJobStatusChange = (id) => {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_API_END_POINT}/approve_job.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth_id: `${localStorage.getItem("auth_id")}`,
      },
      body: JSON.stringify({
        job_id: id,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        alert(response.message);
      })
      .catch((error) => {
        alert(error);
      });
  };
};
