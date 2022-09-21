const config = require("../helpers/config.json");
export const getCreateJobData = (userId) => {
  return (dispatch) => {
    /// get request
    fetch(`${process.env.REACT_APP_API_END_POINT}/web/post_job_get.php`, {
      method: "GET",
      headers: { "Content-Type": "application/json", auth_id: `${userId}` },
      // body: JSON.stringify({
      //     "data":{
      //         "company_url": companyUrl,
      //         "email": email,
      //         "password": password
      //     }
      // })
    })
      .then((res) => res.json())
      .then((response) => {
        const getcreatejob = response.data;
        console.log(getcreatejob);

        // console.log("kkkkk", response);
        dispatch({
          type: "GET_CREATEJOBS",
          getcreatejob: getcreatejob,
          getcreatejobResponse: "got it",
          loading: true,
        });
      })
      .catch((error) => {
        console.log("error", error);
        dispatch({
          type: "GET_CREATEJOBS",
          getcreatejob: {},
          getcreatejobResponse: null,
          loading: true,
        });
        // alert("Please Check Your Internet Connection...")
      });
  };
};

export const createJob = (data) => {
  console.log(data);
  return (dispatch) => {
    dispatch({
      type: "CREATEJOBS_RESET",
      loading: false,
    });
    fetch(`${process.env.REACT_APP_API_END_POINT}/web/post_job_post.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth_id: `${data.userId}`,
      },
      body: JSON.stringify({
        job_title: data.job_title,
        country_id: data.country !== 0 ? Number(data.country) : data.country,
        state_id: data.state !== 0 ? Number(data.state) : data.state,
        work_location_city: data.city !== 0 ? Number(data.city) : data.city,
        gender: data.gender,
        vacancies:
          data.numberOfPostion !== 0
            ? Number(data.numberOfPostion)
            : data.numberOfPostion,
        job_description: data.job_description,
        skill_by_industry:
          data.skill_by_industry !== 0
            ? Number(data.skill_by_industry)
            : data.skill_by_industry,
        functional_area:
          data.functional_area !== 0
            ? Number(data.functional_area)
            : data.functional_area,
        required_work_level:
          data.required_work_level !== 0
            ? Number(data.required_work_level)
            : data.required_work_level,
        curr_type: data.curr_type,
        salary_type:
          data.salary_type !== 0 ? Number(data.salary_type) : data.salary_type,
        salary_min: data.salary_min,
        salary_max: data.salary_max,
        experience_level:
          data.experience_level !== 0
            ? Number(data.experience_level)
            : data.experience_level,
        skills: data.checkId,
        international_recruiting:
          data.international_recruiting !== 0
            ? Number(data.international_recruiting)
            : data.international_recruiting,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "CREATEJOBS_SUCCESS",
            getcreatejobResponse: response,
            loading: true,
          });
          window.location = "/dashboard";
        } else if (response.status != 200) {
          alert(response.message);
          dispatch({
            loading: true,
          });
          return;
        }
      })
      .catch((error) => {
        dispatch({
          type: "CREATEJOBS_FAIL",
          getcreatejobResponse: "creation failed",
          loading: true,
        });
      });
  };
};
