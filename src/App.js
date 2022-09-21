import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "./helpers/firebase";
import "./style.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import { PrivateRoute } from "./Routing/Routing";
import CompanyProfile from "./Pages/CompanyProfile/CompanyProfile";
import PostedJobsDesc from "./Pages/PostedJobsDesc/PostedJobsDesc";
import EditJob from "./Pages/CreateAJob/editjob";
import Applicants from "./Pages/Applicants/Applicants";

function App() {
  useEffect(() => {
    if (firebase.messaging.isSupported()) {
      const msg = firebase.messaging();
      msg
        .requestPermission()
        .then(() => {
          return msg.getToken();
        })
        .then((data) => {
          localStorage.setItem("dToken", data);
        })
        .catch((e) => {
          console.log("errorrrr", e);
        });
    } else {
      console.log("Not supported");
    }
  });
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <PrivateRoute path="/dashboard" exact component={Home} />
          <PrivateRoute
            path="/recruiterProfile/:id"
            exact
            component={CompanyProfile}
          />
          <PrivateRoute
            path="/jobDetail/:id"
            exact
            component={PostedJobsDesc}
          />
          <PrivateRoute path="/editJob/:id" exact component={EditJob} />
          <PrivateRoute path="/applicants/:id" exact component={Applicants} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
