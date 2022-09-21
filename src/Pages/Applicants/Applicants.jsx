import React, { useEffect, useState } from "react";
import "./Applicants.css";
import Nav2 from "../../Components/Nav2/Nav2";
import { getAllApplicants } from "../../actions/allapplicantsAction";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";
import { createAddtofav } from "../../actions/addtofaavAction";
import { connect } from "react-redux";
import { useParams } from "react-router";

function Applicants(props) {
  let { id } = useParams();
  useEffect(() => {
    props.getAllApplicants(id);
  }, []);

  if (props.allapplicantsReducer.loading == false) {
    return <FullPageLoader />;
  }
  return (
    <>
      <Nav2 />
      <div className="container mt-5">
        <h1 className="applicants-head-recr">Applicants</h1>
        <p className="applicants-para-recr">
          Showing{" "}
          {props.allapplicantsReducer.allapplicants &&
          props.allapplicantsReducer.allapplicants.users &&
          props.allapplicantsReducer.allapplicants.users.length > 0
            ? props.allapplicantsReducer.allapplicants.users.length
            : "0"}{" "}
          applicants
        </p>
        <div className="row">
          <div className="col-md-9 mb-md-0 mb-lg-0 mb-3">
            {props.allapplicantsReducer.allapplicants.users &&
            props.allapplicantsReducer.allapplicants.users.length > 0
              ? props.allapplicantsReducer.allapplicants.users.map((user) => (
                  <div className="row shadow p-2 recr-user-info-main mb-2 mr-1 mt-2 ml-1 home-hover-effect">
                    <div className="col-md-12 text-right"></div>
                    <div
                      // onClick={() =>
                      //   navigate(user.is_client_disabled, user.applicant_id)
                      // }
                      className="link-tag-home"
                    >
                      <div className="row ">
                        <div className="col-lg-3 col-md-5 col-8 pr-md-0">
                          {!user.is_client_disabled ? (
                            <img
                              src={
                                user.dp !== null && user.dp !== undefined
                                  ? user.dp
                                  : ""
                              }
                              height="130px"
                              width="70%"
                              style={{
                                objectFit: "cover",
                                borderRadius: "50%",
                              }}
                              className="mt-2"
                            />
                          ) : (
                            <i
                              className="far fa-user fa-7x"
                              style={{ color: "lightgray" }}
                            ></i>
                          )}
                        </div>
                        {!user.is_client_disabled ? (
                          <div className="col-lg-6 col-md-6">
                            <h1 className="user-name-recr m-0 p-0">
                              {user.name !== null && user.name !== undefined
                                ? user.name
                                : ""}
                            </h1>
                            <p className="user-loc-recr m-0 p-0">
                              {user.city !== null && user.city !== undefined
                                ? user.city
                                : ""}{" "}
                              ,{" "}
                              {user.country !== null &&
                              user.country !== undefined
                                ? user.country
                                : ""}
                            </p>
                            <h3 className="key-skills-recr-applicants m-0 p-0">
                              Key Skills
                            </h3>
                            <p className="userskills-appli m-0 p-0">
                              {user.skills && user.skills.length > 0
                                ? user.skills.map((sk) => <>{sk} ,</>)
                                : "no skills"}
                            </p>
                          </div>
                        ) : (
                          <div className="col-lg-6 col-md-6">
                            <h3 className="key-skills-recr-applicants m-0 p-0">
                              Account Deactivated
                            </h3>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              : "No applicants"}
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  allapplicantsReducer: state.allapplicantsReducer,
  addtofavReducer: state.addtofavReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getAllApplicants: (id) => dispatch(getAllApplicants(id)),
  createAddtofav: (id) => dispatch(createAddtofav(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Applicants);
