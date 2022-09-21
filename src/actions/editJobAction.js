const config = require("../helpers/config.json");
export const getEditJobData = (userId, id) => {
  return (dispatch) => {
    /// get request
    fetch(
      `${process.env.REACT_APP_API_END_POINT}/edit_job_get.php?job_id=${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json", auth_id: `${userId}` },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        const editjob = response.data;
        dispatch({
          type: "GET_EDITJOB",
          editjob: editjob,
          editjobResponse: "got it",
          loading: true,
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_EDITJOB",
          editjob: {},
          editjobResponse: null,
          loading: true,
        });
      });
  };
};

export const editJob = (
  userId,
  id,
  job_title,
  country,
  state,
  city,
  gender,
  numberOfPostion,
  job_description,
  skill_by_industry,
  functional_area,
  required_work_level,
  curr_type,
  salary_type,
  salary_min,
  salary_max,
  experience_level,
  skills,
  international_recruiting
) => {
  let data = {
    job_id: id !== null ? Number(id) : id,
    job_title: job_title,
    country_id: country !== null ? Number(country) : country,
    state_id: state !== null ? Number(state) : state,
    work_location_city: city !== null ? Number(city) : city,
    gender: gender !== null ? Number(gender) : gender,
    vacancies:
      numberOfPostion !== null ? Number(numberOfPostion) : numberOfPostion,
    job_description: job_description,
    skill_by_industry:
      skill_by_industry !== null
        ? Number(skill_by_industry)
        : skill_by_industry,
    functional_area:
      functional_area !== null ? Number(functional_area) : functional_area,
    required_work_level:
      required_work_level !== null
        ? Number(required_work_level)
        : required_work_level,
    curr_type: curr_type,
    salary_type: salary_type !== null ? Number(salary_type) : salary_type,
    salary_min: salary_min,
    salary_max: salary_max,
    experience_level:
      experience_level !== null ? Number(experience_level) : experience_level,
    skills: skills,
    international_recruiting:
      international_recruiting !== 0
        ? Number(international_recruiting)
        : international_recruiting,
  };

  return (dispatch) => {
    dispatch({
      type: "EDITJOB_RESET",
      loading: false,
    });
    fetch(`${process.env.REACT_APP_API_END_POINT}/edit_job_post.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json", auth_id: `${userId}` },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "EDITJOB_SUCCESS",
            editjobResponse: response,
            loading: true,
          });
          window.location = `/jobDetail/${id}`;
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
          type: "EDITJOB_FAIL",
          editjobResponse: "creation failed",
          loading: true,
        });
      });
  };
};
