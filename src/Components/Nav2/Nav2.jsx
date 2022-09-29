import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, NavLink } from "react-router-dom";
import "./Nav2.css";
import Logo from "../../Assests/navbar/logo.png";
import facebook from "../../Assests/navbar/facebook.svg";
import linkedin from "../../Assests/navbar/linkedin.svg";
import { signOut } from "../../actions/authAction";
import { connect } from "react-redux";
import Modal from "react-modal";
import { FeedbackModalAction } from "../../actions/feedbackModalAction";
import { feedBack } from "../../actions/feedbackAction";

function Nav2(props) {
  const [feedback, setFeedback] = useState("");
  useEffect(() => {
    if (localStorage.getItem("isFirstLogin") == 1) {
      props.FeedbackModalAction(true);
    }
  }, []);
  const OTP = () => {
    fetch(`${process.env.REACT_APP_API_END_POINT}/web/disable_otp.php`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        auth_id: localStorage.getItem("auth_id"),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          window.location = "otp-disable";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const DeleteAccount = () => {
    fetch(
      `${process.env.REACT_APP_API_END_POINT}/web/send_delete_account_otp.php`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          auth_id: localStorage.getItem("auth_id"),
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          window.location = "otp-delete";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow">
      <div className="container-fluid">
        <Link to="/dashboard">
          <img src={Logo} height="50px" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            <li className="nav-item mr-2 main-li-of-nav">
              <NavLink
                activeClassName="linkhighlight"
                exact
                className="nav-link"
                aria-current="page"
                to="/dashboard"
              >
                HOME
              </NavLink>
            </li>
            <li className="nav-item mr-3">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn dropdown-toggle p-0 py-1 px-2 mt-1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  id="btn-nav-user"
                  style={{ fontSize: "10px", borderRadius: "7px" }}
                >
                  <i className="far fa-user pr-1"></i>
                  {localStorage.getItem("name")}
                </button>
                <ul className="dropdown-menu">
                  <li
                    style={{
                      fontSize: "12px",
                      color: "#707070",
                      cursor: "pointer",
                    }}
                  >
                    <a
                      className="dropdown-item"
                      onClick={() => props.signOut()}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  feedbackModalReducer: state.feedbackModalReducer,
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
  feedBack: (userId, feedback) => dispatch(feedBack(userId, feedback)),
  FeedbackModalAction: (toggle) => dispatch(FeedbackModalAction(toggle)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Nav2);
