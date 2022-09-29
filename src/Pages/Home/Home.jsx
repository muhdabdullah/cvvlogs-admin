import React, { useEffect, useState } from "react";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav2 from "../../Components/Nav2/Nav2";
import { getDashboard } from "../../actions/dashboardAction";
import { connect } from "react-redux";
import { getDeleteJob } from "../../actions/deleteJobAction";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";
import placeholder from "../../Assests/placeholder.png";
import { Link } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import { makeStyles } from "@material-ui/core/styles";

function Home(props) {
  const [page, setPage] = React.useState(1);
  const [jobsListing, setJobsListing] = useState([]);
  const [jobsLength, setJobsLength] = useState(0);
  const [status, setStatus] = useState(undefined);
  const [isMoreData, setIsMoreData] = useState(false);
  const [nextPage, setNext_page] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const useStyles = makeStyles(() => ({
    ul: {
      "& .MuiPaginationItem-root": {
        color: "var(--purple)"
      }
    }
  }));

  const classes = useStyles();

  useEffect(() => {
    dashboardData(1, status);
  }, []);
  useEffect(() => {
    setJobsListing(
      (prev) => (prev = props.dashboardReducer.dashboard.job_list)
    );
    setJobsLength(
      (prev) => (prev = props.dashboardReducer.dashboard.total_count)
    );
    setIsMoreData(
      (prev) => (prev = props.dashboardReducer.dashboard.is_more_data)
    );
    setNext_page((prev) => (prev = props.dashboardReducer.dashboard.next_page));
    setTotalPages(
      (prev) => (prev = props.dashboardReducer.dashboard.total_pages)
    );
    setLoading((prev) => (prev = props.dashboardReducer.loading));
  }, [props.dashboardReducer]);
  const dashboardData = async (page, admin_status) => {
    setLoading(false);
    await props.getDashboard(page, admin_status);
    return null;
  };
  const handleChange = (event, value) => {
    setPage(value);
    dashboardData(value, status);
  };
  if (loading == false) {
    return <FullPageLoader />;
  }
  return (
    <>
      {/*<Nav2 />*/}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 mt-4">
            <div className="row head">
              <div className="col-lg-6 col-sm-12 d-flex align-items-center flex-wrap">
                <h2 className="mr-4 mb-2">Job Lists</h2>
                <p className="mb-2">Showing {jobsLength} Available Job Posts</p>
              </div>
              <div className="col-lg-6 col-sm-12 d-flex align-items-center filter-btn-container">
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search by name, status or posted"
                />
              </div>
            </div>
          </div>
          <div className="col-12 pl-0 my-4 d-flex align-items-center justify-content-lg-start justify-content-center filter-btn-container flex-wrap">
            <button
              className={`${status == undefined ? "active" : ""} btn mr-4`}
              onClick={() => {
                setStatus((prev) => (prev = undefined));
                dashboardData(1, undefined);
              }}
            >
              All 10+
            </button>
            <button
              className={`${status == 1 ? "active" : ""} btn mr-4`}
              onClick={() => {
                setStatus((prev) => (prev = 1));
                dashboardData(1, 1);
              }}
            >
              Posted
            </button>
            <button
              className={`${status == 0 ? "active" : ""} btn mr-4`}
              onClick={() => {
                setStatus((prev) => (prev = 0));
                dashboardData(1, 0);
              }}
            >
              Pending
            </button>
          </div>
          <div className="col-12 mb-4">
            {jobsListing.length > 0 ? (
              jobsListing.map((job, i) => (
                <div className="row mt-2 py-2 job-list" key={i}>
                  <div className="col-md-4 col-sm-12 my-2 d-flex align-items-center">
                    <img
                      className="avatar"
                      src={job.dp ? job.dp : placeholder}
                    />
                    <span>
                      <h2>{job.recruiter}</h2>
                      <p>{job.job_date}</p>
                    </span>
                  </div>
                  <div className="col-md-4 col-sm-12 my-2 d-flex align-items-center">
                    <i className="fas fa-industry"></i>
                    <span>
                      <h2>{job.job_title}</h2>
                      <p>{job.industry}</p>
                    </span>
                  </div>
                  <div className="col-md-2 col-sm-12 my-2 d-flex align-items-center">
                    <input type="radio" />
                    <span>
                      <h2 className="status">{job.job_admin_status}</h2>
                      <p>Job Status</p>
                    </span>
                  </div>
                  <div className="col-md-2 col-sm-12 my-2 d-flex align-items-center justify-content-center">
                    <Link className="btn" to={`/jobDetail/${job.job_id}`}>
                      View
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div>No Record</div>
            )}
          </div>
          {jobsListing.length > 0 ? (
                  <div className="col-12 mb-4 pagination py-2 d-flex align-items-center justify-content-center flex-wrap">
                    <Pagination count={totalPages} page={page} classes={{ ul: classes.ul }} onChange={handleChange} />
                  </div>
            // <div className="col-12 mb-4 pagination py-2 d-flex align-items-center justify-content-center flex-wrap">
            //   {nextPage - 2 ? <button className="btn">{"<"}</button> : ""}
            //   {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            //     (x, i) => (
            //       <button
            //         key={i}
            //         className={`btn ${nextPage - 1 == x ? "active" : ""}`}
            //         onClick={() => dashboardData(x, status)}
            //       >
            //         {x}
            //       </button>
            //     )
            //   )}
            //   {isMoreData ? (
            //     <button
            //       className="btn"
            //       onClick={() => dashboardData(nextPage, status)}
            //     >
            //       {">"}
            //     </button>
            //   ) : null}
            // </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  dashboardReducer: state.dashboardReducer,
  deletejobReducer: state.deletejobReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getDashboard: (page, admin_status) =>
    dispatch(getDashboard(page, admin_status)),
  getDeleteJob: (userId, id) => dispatch(getDeleteJob(userId, id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
