import React, { useEffect, useState } from "react";
import "./Users.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";
import placeholder from "../../Assests/placeholder.png";
import { Link } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import { makeStyles } from "@material-ui/core/styles";
import {getUsers} from "../../actions/usersAction";

function Users(props) {
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
        usersData(1, status);
    }, []);
    useEffect(() => {
        setJobsListing(
            (prev) => (prev = props.userReducer.users.job_list)
        );
        setJobsLength(
            (prev) => (prev = props.userReducer.users.total_count)
        );
        setIsMoreData(
            (prev) => (prev = props.userReducer.users.is_more_data)
        );
        setNext_page((prev) => (prev = props.userReducer.users.next_page));
        setTotalPages(
            (prev) => (prev = props.userReducer.users.total_pages)
        );
        setLoading((prev) => (prev = props.userReducer.loading));
    }, [props.userReducer]);
    const usersData = async (page, admin_status) => {
        setLoading(false);
        await props.getUsers(page, admin_status);
        return null;
    };
    const handleChange = (event, value) => {
        setPage(value);
        usersData(value, status);
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
                                <h2 className="mr-4 mb-2">Users</h2>
                                <p className="mb-2">Showing {jobsLength} Available Users</p>
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
                    ) : null}
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    userReducer: state.userReducer,
});

const mapDispatchToProps = (dispatch) => ({
    getUsers: (page, admin_status) =>
        dispatch(getUsers(page, admin_status)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Users);
