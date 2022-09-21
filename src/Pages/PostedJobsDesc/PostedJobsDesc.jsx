import React, { useEffect, useState } from "react";
import "./PostedJobsDesc.css";
import Nav2 from "../../Components/Nav2/Nav2";
import { connect } from "react-redux";
import { getJobDescription } from "../../actions/jobdescriptionAction";
import { Link, useParams } from "react-router-dom";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";
import { handleJobStatusChange } from "../../actions/jobStatusChangeAction";

function PostedJobsDesc(props) {
  const [copy, setCopy] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    props.getJobDescription(id);
  }, []);
  if (props.jobdescriptionReducer.loading == false) {
    return <FullPageLoader />;
  }
  return (
    <>
      <Nav2 />
      <div className="container job-detail my-5">
        <div className="row px-2 py-4 mt-4 shadow">
          <div className="col-md-6">
            <h1 className="job-detail-title p-0 m-0">
              {props.jobdescriptionReducer.jobdescription.job_title}
            </h1>
            <p>{props.jobdescriptionReducer.jobdescription.company_name}</p>
            <p>
              {props.jobdescriptionReducer.jobdescription.country},{" "}
              {props.jobdescriptionReducer.jobdescription.state},{" "}
              {props.jobdescriptionReducer.jobdescription.city} |{" "}
              {props.jobdescriptionReducer.jobdescription.industry}
            </p>
          </div>
          <div className="col-md-6 d-flex justify-content-end align-items-center flex-wrap action-btns">
            <Link
              className="btn"
              to={`/recruiterProfile/${props.jobdescriptionReducer.jobdescription.recruiter_id}`}
            >
              View Recruiter Profile
            </Link>

            <Link
              className="btn"
              to={`/editJob/${props.jobdescriptionReducer.jobdescription.id}`}
            >
              Edit Job
            </Link>
            <button
              className="btn"
              onClick={() =>
                props.handleJobStatusChange(
                  props.jobdescriptionReducer.jobdescription.id
                )
              }
            >
              Approve
            </button>
          </div>
        </div>
        <div className="row py-4 mt-4 shadow job-features d-flex align-items-center justify-content-between">
          <div className="col-lg-3 col-md-6 col-sm-12 row d-flex align-items-center justify-content-center">
            <div className="col-4">
              <i className="far fa-arrows-alt-v"></i>
            </div>
            <div className="col-8">
              <p>Experience</p>
              <h2>{props.jobdescriptionReducer.jobdescription.exp}</h2>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 row d-flex align-items-center justify-content-center">
            <div className="col-4">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="col-8">
              <p>Location</p>
              <h2>
                {props.jobdescriptionReducer.jobdescription.country},{" "}
                {props.jobdescriptionReducer.jobdescription.state},{" "}
                {props.jobdescriptionReducer.jobdescription.city}{" "}
              </h2>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 row d-flex align-items-center justify-content-center">
            <div className="col-4">
              <i className="fas fa-industry"></i>
            </div>
            <div className="col-8">
              <p>Industry</p>
              <h2>{props.jobdescriptionReducer.jobdescription.industry}</h2>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 row d-flex align-items-center justify-content-center">
            <div className="col-4">
              <i className="fas fa-wallet"></i>
            </div>
            <div className="col-8">
              <p>
                Salary {props.jobdescriptionReducer.jobdescription.currency}
              </p>
              <h2>
                {props.jobdescriptionReducer.jobdescription.salary_min} -{" "}
                {props.jobdescriptionReducer.jobdescription.salary_max}
              </h2>
            </div>
          </div>
        </div>
        <div className="row px-2 py-4 mt-4 shadow job-description">
          <div className="col-sm-12">
            <h2>Job Description</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: props.jobdescriptionReducer.jobdescription.job_desc,
              }}
            />
            <div className="d-flex justify-content-center mt-4">
              <Link className="btn" to={`/applicants/${id}`}>
                View All Candidates
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  jobdescriptionReducer: state.jobdescriptionReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getJobDescription: (id) => dispatch(getJobDescription(id)),
  handleJobStatusChange: (id) => dispatch(handleJobStatusChange(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PostedJobsDesc);
