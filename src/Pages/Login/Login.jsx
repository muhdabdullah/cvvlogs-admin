import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { SignIn } from "../../actions/authAction";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import Logo from "../../Assests/navbar/logo.png";
import LoginImg from "../../Assests/login.png";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ecoComplaince, setEcoComplaince] = useState(0);

  const AddLogin = async () => {
    const reg =
      /^([a-zA-Z0-9~`!@#\$%\^&\*\(\)_\-\+={\[\}\]\|\\:;"'<,>\.\?\/  ]*)@([a-zA-Z]+)\.([a-zA-Z]+).([a-zA-Z]+)$/;
    if (username == "") {
      alert("Username required");
    } else if (password == "") {
      alert("Password required");
    } else if (password.length < 6) {
      alert("Password length must be greater than 6");
    } else {
      await props.SignIn(username, password);
    }
  };

  let history = useHistory();
  if (
    localStorage.getItem("auth_id") !== null &&
    localStorage.getItem("auth_id") !== undefined &&
    localStorage.getItem("auth_id") !== ""
  ) {
    history.push("/jobs");
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
        <meta name="description" content="Welcome to cvvlogs" />
      </Helmet>
      <div className="row m-0 d-flex justify-content-center">
        <div className="col-lg-6 col-md-12 main-login-form shadow">
          <div className="row">
            <div className="col-lg-4 col-sm-12 login-image-container">
              <img src={LoginImg} alt="Login Image" className="login-img" />
            </div>
            <div className="col-lg-8 col-sm-12">
              <div className="row">
                <div className="col-12">
                  <img src={Logo} alt="Logo" className="logo my-2" />
                  <h1 className="heading my-2">
                    Welcome Back! Login to Your Account
                  </h1>
                </div>
                <div className="col-12 my-2">
                  <label className="p-0 m-0 recr-login-label mb-1">
                    Username or Email
                  </label>
                  <input
                    type="email"
                    required
                    className="form-control"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Type your username or email"
                  />
                </div>
                <div className="col-12 my-2">
                  <label className="p-0 m-0 recr-login-label mb-1">
                    Password
                  </label>
                  <input
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        AddLogin();
                      }
                    }}
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Type your password"
                    className="form-control"
                  />
                </div>
                <div className="col-12 my-2">
                  <input
                    onChange={() =>
                      setEcoComplaince((prev) =>
                        prev === 0 ? (prev = 1) : (prev = 0)
                      )
                    }
                    type="checkbox"
                    className="mr-2"
                  />
                  <label className="p-0 m-0 recr-login-label mb-1">
                    Remember Me
                  </label>
                </div>
                <div className="col-12 my-2">
                  <button
                    type="submit"
                    className="btn btn-primary login-recr-btn form-control d-flex justify-content-center align-items-center"
                    onClick={() => AddLogin()}
                  >
                    <i className="fas fa-sign-in mr-3"></i>
                    Login to Account
                  </button>
                </div>
                <div className="col-12">
                  <Link to="/forgetpassword">
                    <p className="forget-pass-login">Forget Password?</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  SignIn: (username, password) => dispatch(SignIn(username, password)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
