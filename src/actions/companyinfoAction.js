const config = require("../helpers/config.json");
export const getCompanyInfo = (id) => {
  return (dispatch) => {
    /// get request
    fetch(
      `${process.env.REACT_APP_API_END_POINT}/recruiter_detail.php?id=${id}`,
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
        const companyinfo = response.data?.company;
        dispatch({
          type: "GET_COMPANYINFO",
          companyinfo: companyinfo,
          companyinfoResponse: "got it",
          loading: true,
        });
      })
      .catch((error) => {
        console.log("error", error);
        dispatch({
          type: "GET_COMPANYINFO",
          companyinfo: {},
          companyinfoResponse: null,
          loading: true,
        });
      });
  };
};
