export const blockRecruiter = (id) => {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_API_END_POINT}/block_rec.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth_id: `${localStorage.getItem("auth_id")}`,
      },
      body: JSON.stringify({
        id: id,
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
export const unBlockRecruiter = (id) => {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_API_END_POINT}/unblock_rec.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth_id: `${localStorage.getItem("auth_id")}`,
      },
      body: JSON.stringify({
        id: id,
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
