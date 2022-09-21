import React, { useEffect, useState } from "react";
import "./CompanyProfile.css";
import ComapnyProfile from "../../Assests/company-profile/company-profile.png";
import EditIcon from "../../Assests/company-profile/edit.svg";
import Nav2 from "../../Components/Nav2/Nav2";
import Footer from "../../Components/Footer/Footer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCompanyInfo } from "../../actions/companyinfoAction";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";
import place from "../../Assests/placeholderbuilding.svg";
import { useParams } from "react-router-dom";
import {
  blockRecruiter,
  unBlockRecruiter,
} from "../../actions/blockUnblockRec";

function CompanyProfile(props) {
  let { id } = useParams();
  useEffect(() => {
    props.getCompanyInfo(id);
  }, []);

  return (
    <>
      <Nav2 />
      <div className="container mt-2 pt-4 mb-2 pb-5 company-profile-parent">
        <div className="row px-5 py-5 mt-4 shadow">
          <div className="col-12 col-md-2 company-profile-pic ">
            {props.companyinfoReducer.companyinfo &&
            props.companyinfoReducer.companyinfo.dp !== null &&
            props.companyinfoReducer.companyinfo.dp !== undefined &&
            props.companyinfoReducer.companyinfo.dp !== "" ? (
              <img
                src={props.companyinfoReducer.companyinfo.dp || ComapnyProfile}
                style={{
                  objectFit: "contain",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <img
                className="border"
                src={place}
                height="100%"
                width="70%"
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
            )}
          </div>
          <div className="col-12 col-md-6 pl-lg-4 pl-md-4  pt-2 my-auto">
            <h3 className="company-profile-font-head  mb-0">
              {props.companyinfoReducer.companyinfo &&
              props.companyinfoReducer.companyinfo.name !== null &&
              props.companyinfoReducer.companyinfo.name !== undefined
                ? props.companyinfoReducer.companyinfo.name
                : ""}
            </h3>
            <p className="company-profile-font-para mb-0">
              {props.companyinfoReducer.companyinfo &&
              props.companyinfoReducer.companyinfo.tagline !== null &&
              props.companyinfoReducer.companyinfo.tagline !== undefined
                ? props.companyinfoReducer.companyinfo.tagline
                : ""}
            </p>
            <p className="mt-2" style={{ color: "lightgray" }}>
              {props.companyinfoReducer.companyinfo &&
              props.companyinfoReducer.companyinfo.country !== null &&
              props.companyinfoReducer.companyinfo.country !== undefined
                ? props.companyinfoReducer.companyinfo.country
                : ""}
              {","}
              {props.companyinfoReducer.companyinfo &&
              props.companyinfoReducer.companyinfo.state !== null &&
              props.companyinfoReducer.companyinfo.state !== undefined
                ? props.companyinfoReducer.companyinfo.state
                : ""}
              {","}
              {props.companyinfoReducer.companyinfo &&
              props.companyinfoReducer.companyinfo.city !== null &&
              props.companyinfoReducer.companyinfo.city !== undefined
                ? props.companyinfoReducer.companyinfo.city
                : ""}{" "}
              |{" "}
              {props.companyinfoReducer.companyinfo &&
              props.companyinfoReducer.companyinfo.industry !== null &&
              props.companyinfoReducer.companyinfo.industry !== undefined
                ? props.companyinfoReducer.companyinfo.industry
                : ""}
            </p>
          </div>
          <div className="col-12 col-md-4 d-flex justify-content-end align-items-center flex-wrap action-btns">
            <Link className="btn">Message</Link>
            <button className="btn">Ban</button>
            <button className="btn" onClick={() => props.blockRecruiter(id)}>
              Block
            </button>
          </div>
        </div>
        <div className="row mt-4 pb-5 box">
          <div className="col-lg-4 shadow">
            <h2 className="heading-main-comp-sub-child">About Us</h2>
            <p className="company-profile-about-para px-2">
              {props.companyinfoReducer.companyinfo &&
              props.companyinfoReducer.companyinfo.desc !== null &&
              props.companyinfoReducer.companyinfo.desc !== undefined
                ? props.companyinfoReducer.companyinfo.desc
                : ""}
            </p>
          </div>
          <div className="col-lg-8">
            <div className="row box g-5">
              <div className="col-md-6 col-12 shadow">
                <h5 className="main-tit-head mb-0 pb-1">Website</h5>
                <small style={{ color: "gray" }} className="">
                  {props.companyinfoReducer.companyinfo &&
                  props.companyinfoReducer.companyinfo.website !== null &&
                  props.companyinfoReducer.companyinfo.website !== undefined
                    ? props.companyinfoReducer.companyinfo.website
                    : ""}
                </small>
              </div>
              <div className="col-md-6 col-12 shadow">
                <h5 className="main-tit-head mb-0 pb-1">Industry</h5>
                <small style={{ color: "gray" }} className="">
                  {props.companyinfoReducer.companyinfo &&
                  props.companyinfoReducer.companyinfo.industry !== null &&
                  props.companyinfoReducer.companyinfo.industry !== undefined
                    ? props.companyinfoReducer.companyinfo.industry
                    : ""}
                </small>
              </div>
              <div className="col-md-6 col-12 shadow">
                <h5 className="main-tit-head mb-0 pb-1">Company Size</h5>
                <small style={{ color: "gray" }} className="">
                  {props.companyinfoReducer.companyinfo &&
                  props.companyinfoReducer.companyinfo.size !== null &&
                  props.companyinfoReducer.companyinfo.size !== undefined &&
                  props.companyinfoReducer.companyinfo.size !== ""
                    ? `${props.companyinfoReducer.companyinfo.size} employees`
                    : ""}
                </small>
              </div>
              <div className="col-md-6 col-12 shadow">
                <h5 className="main-tit-head mb-0 pb-1">Location</h5>
                <small style={{ color: "gray" }} className="">
                  {props.companyinfoReducer.companyinfo &&
                  props.companyinfoReducer.companyinfo.country !== null &&
                  props.companyinfoReducer.companyinfo.country !== undefined
                    ? props.companyinfoReducer.companyinfo.country
                    : ""}
                  {", "}
                  {props.companyinfoReducer.companyinfo &&
                  props.companyinfoReducer.companyinfo.state !== null &&
                  props.companyinfoReducer.companyinfo.state !== undefined
                    ? props.companyinfoReducer.companyinfo.state
                    : ""}
                  {", "}
                  {props.companyinfoReducer.companyinfo &&
                  props.companyinfoReducer.companyinfo.city !== null &&
                  props.companyinfoReducer.companyinfo.city !== undefined
                    ? props.companyinfoReducer.companyinfo.city
                    : ""}{" "}
                </small>
              </div>
              <div className="col-md-6 col-12 shadow">
                <h5 className="main-tit-head mb-0 pb-1">Founded</h5>
                <small style={{ color: "gray" }} className="">
                  {props.companyinfoReducer.companyinfo &&
                  props.companyinfoReducer.companyinfo.founded !== null &&
                  props.companyinfoReducer.companyinfo.founded !== undefined
                    ? props.companyinfoReducer.companyinfo.founded
                    : ""}
                </small>
              </div>
              <div className="col-md-6 col-12 shadow">
                <h5 className="main-tit-head mb-0 pb-1">Contact</h5>
                <small style={{ color: "gray" }} className="">
                  {props.companyinfoReducer.companyinfo &&
                  props.companyinfoReducer.companyinfo.phone !== null &&
                  props.companyinfoReducer.companyinfo.phone !== undefined
                    ? props.companyinfoReducer.companyinfo.phone
                    : ""}
                </small>
              </div>
            </div>
          </div>
        </div>
        {props.companyinfoReducer.loading == false ? <FullPageLoader /> : null}
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  companyinfoReducer: state.companyinfoReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getCompanyInfo: (userId) => dispatch(getCompanyInfo(userId)),
  blockRecruiter: (userId) => dispatch(blockRecruiter(userId)),
  unBlockRecruiter: (userId) => dispatch(unBlockRecruiter(userId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CompanyProfile);
