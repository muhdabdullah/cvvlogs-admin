import React, { useEffect, useState } from "react";
import "./dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";

import Chart, {
    ArgumentAxis,
    Series,
    Legend, Size, CommonAxisSettings, Label, Grid, ValueAxis, CommonSeriesSettings, Format, Export
} from 'devextreme-react/chart';
import {getDashboard} from "../../actions/homepageAction";
import axios from "axios";


function Dashboard(props) {
    const [status, setStatus] = useState(undefined);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(false);
    const [monthlyStatsDataTotalUsers, setMonthlyStatsDataTotalUsers] = useState({});
    const [monthlyStatsDataTotalVerifiedUsers, setMonthlyStatsDataTotalVerifiedUsers] = useState({});
    const [monthlyStatsDataTotalRecruiter, setMonthlyStatsDataTotalRecruiter] = useState({});
    const [monthlyStatsDataTotalVerifiedRecruiter, setMonthlyStatsDataTotalVerifiedRecruiter] = useState({});
    const [monthlyDeviceTypeUserData, setMonthlyDeviceTypeUserData] = useState({});
    const [monthlyDeviceTypeRecruitersData, setMonthlyDeviceTypeRecruitersData] = useState({});

    useEffect(() => {
        dashboardData(1, status);
    }, []);

    useEffect(() => {
        monthlyStats("2021-09-01", "2022-10-31");
    }, []);

    useEffect(() => {
        setStats((prev) => (prev = props.homepageReducer.homepage));
        setLoading((prev) => (prev = props.homepageReducer.loading));
    }, [props.homepageReducer]);

    const dashboardData = async (page, admin_status) => {
        setLoading(false);
        await props.getDashboard(page, admin_status);
        return null;
    };

    const monthlyStats = async (startDate, endDate) => {
        await fetch(`${process.env.REACT_APP_API_END_POINT}/get-monthly-stats?start_date=${startDate}&end_date=${endDate}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            },
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.success) {
                    setMonthlyStatsDataTotalUsers(response.data.total_users);
                    setMonthlyStatsDataTotalVerifiedUsers(response.data.total_verified_users);
                    setMonthlyStatsDataTotalRecruiter(response.data.total_recruiter);
                    setMonthlyStatsDataTotalVerifiedRecruiter(response.data.total_verified_recruiter);

                    // Setting Device Type Users Graph Data Source
                    let deviceUsers = [];
                    Object.keys(response.data.total_device_type_users).map((key, value) => {
                        let ObjectToMap = {
                            'month': key,
                            'ios': response.data.total_device_type_users[key.toString()].filter((item) => Object.keys(item).includes('ios'))[0] ? response.data.total_device_type_users[key.toString()].filter((item) => Object.keys(item).includes('ios'))[0]['ios'] : 0,
                            'android': response.data.total_device_type_users[key.toString()].filter((item) => Object.keys(item).includes('android'))[0] ? response.data.total_device_type_users[key.toString()].filter((item) => Object.keys(item).includes('android'))[0]['android'] : 0,
                            'web': response.data.total_device_type_users[key.toString()].filter((item) => Object.keys(item).includes('web'))[0] ? response.data.total_device_type_users[key.toString()].filter((item) => Object.keys(item).includes('web'))[0]['web'] : 0
                        };
                        deviceUsers.push(ObjectToMap);
                    });
                    setMonthlyDeviceTypeUserData(deviceUsers);

                    // Setting Device Type Recruiters Graph Data Source
                    let deviceRecruiters = [];
                    Object.keys(response.data.total_device_type_recruiters).map((key, value) => {
                        let ObjectToMap = {
                            'month': key,
                            'ios': response.data.total_device_type_recruiters[key.toString()].filter((item) => Object.keys(item).includes('ios'))[0] ? response.data.total_device_type_recruiters[key.toString()].filter((item) => Object.keys(item).includes('ios'))[0]['ios'] : 0,
                            'android': response.data.total_device_type_recruiters[key.toString()].filter((item) => Object.keys(item).includes('android'))[0] ? response.data.total_device_type_recruiters[key.toString()].filter((item) => Object.keys(item).includes('android'))[0]['android'] : 0,
                            'web': response.data.total_device_type_recruiters[key.toString()].filter((item) => Object.keys(item).includes('web'))[0] ? response.data.total_device_type_recruiters[key.toString()].filter((item) => Object.keys(item).includes('web'))[0]['web'] : 0
                        };
                        deviceRecruiters.push(ObjectToMap);
                    });
                    setMonthlyDeviceTypeRecruitersData(deviceRecruiters);
                } else {
                    alert(response.message);
                }
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    if (loading == false) {
        return <FullPageLoader />;
    }

    return (
        <>
            {/*<Nav2 />*/}
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-2">
                        <div className="card custom-card row-animation">
                            <div className="card-body" style={{height: '90px',}}>
                                <div style={{display: 'flex', "justify-content": 'space-between', height: '100%'}}>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <h5 className="purple-card-heading"><b>Total Users</b></h5>
                                        <p>{ stats ? stats.total_users : '' }</p>
                                    </div>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <i className="fas fa-users dashboard-purple-card-icon" style={{display: 'flex', "justify-content": 'center'}}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="card custom-card row-animation">
                            <div className="card-body" style={{height: '90px',}}>
                                <div style={{display: 'flex', "justify-content": 'space-between', height: '100%'}}>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <h5 className="yellow-card-heading"><b>Verified Users</b></h5>
                                        <p>{ stats ? stats.total_verified_users : '' }</p>
                                    </div>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <i className="fas fa-users dashboard-yellow-card-icon" style={{display: 'flex', "justify-content": 'center'}}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="card custom-card row-animation">
                            <div className="card-body" style={{height: '90px',}}>
                                <div style={{display: 'flex', "justify-content": 'space-between', height: '100%'}}>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <h5 className="purple-card-heading"><b>Complete Profiles</b></h5>
                                        <p>{ stats ? stats.total_complete_profiles : '' }</p>
                                    </div>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <i className="fas fa-solid fa-address-card dashboard-purple-card-icon" style={{display: 'flex', "justify-content": 'center'}}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="card custom-card row-animation">
                            <div className="card-body" style={{height: '90px',}}>
                                <div style={{display: 'flex', "justify-content": 'space-between', height: '100%'}}>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <h5 className="green-card-heading"><b>IOS Users</b></h5>
                                        <p>{ stats ? stats.total_ios_users : ''}</p>
                                    </div>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <i className="fas fa-solid fa-mobile dashboard-green-card-icon" style={{display: 'flex', "justify-content": 'center'}}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="card custom-card row-animation">
                            <div className="card-body" style={{height: '90px',}}>
                                <div style={{display: 'flex', "justify-content": 'space-between', height: '100%'}}>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <h5 className="purple-card-heading"><b>Android Users</b></h5>
                                        <p>{ stats ? stats.total_android_users : '' }</p>
                                    </div>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <i className="fa fa-mobile dashboard-purple-card-icon" style={{display: 'flex', "justify-content": 'center'}}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="card custom-card row-animation">
                            <div className="card-body" style={{height: '90px',}}>
                                <div style={{display: 'flex', "justify-content": 'space-between', height: '100%'}}>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <h5 className="yellow-card-heading"><b>Web Users</b></h5>
                                        <p>{ stats ? stats.total_web_users : '' }</p>
                                    </div>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <i className="fas fa-browser dashboard-yellow-card-icon" style={{display: 'flex', "justify-content": 'center'}}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-3">
                        <div className="card custom-card row-animation">
                            <div className="card-body" style={{height: '90px',}}>
                                <div style={{display: 'flex', "justify-content": 'space-between', height: '100%'}}>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <h5 className="green-card-heading"><b>Recruiters</b></h5>
                                        <p>{ stats ? stats.total_recruiter : ''}</p>
                                    </div>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <i className="fas fa-user-tie dashboard-green-card-icon" style={{display: 'flex', "justify-content": 'center'}}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card custom-card row-animation">
                            <div className="card-body" style={{height: '90px',}}>
                                <div style={{display: 'flex', "justify-content": 'space-between', height: '100%'}}>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <h5 className="green-card-heading"><b>Verified Recruiters</b></h5>
                                        <p>{ stats ? stats.total_verified_recruiter : ''}</p>
                                    </div>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <i className="fas fa-user-tie dashboard-green-card-icon" style={{display: 'flex', "justify-content": 'center'}}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="card custom-card row-animation">
                            <div className="card-body" style={{height: '90px',}}>
                                <div style={{display: 'flex', "justify-content": 'space-between', height: '100%'}}>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <h5 className="green-card-heading"><b>IOS Recruiters</b></h5>
                                        <p>{ stats ? stats.total_ios_recruiter : ''}</p>
                                    </div>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <i className="fas fa-solid fa-mobile dashboard-green-card-icon" style={{display: 'flex', "justify-content": 'center'}}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="card custom-card row-animation">
                            <div className="card-body" style={{height: '90px',}}>
                                <div style={{display: 'flex', "justify-content": 'space-between', height: '100%'}}>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <h5 className="green-card-heading"><b>Android Recruiters</b></h5>
                                        <p>{ stats ? stats.total_android_recruiter : ''}</p>
                                    </div>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <i className="fas fa-mobile dashboard-green-card-icon" style={{display: 'flex', "justify-content": 'center'}}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="card custom-card row-animation">
                            <div className="card-body" style={{height: '90px',}}>
                                <div style={{display: 'flex', "justify-content": 'space-between', height: '100%'}}>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <h5 className="green-card-heading"><b>Web Recruiters</b></h5>
                                        <p>{ stats ? stats.total_web_recruiter : ''}</p>
                                    </div>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <i className="fas fa-browser dashboard-green-card-icon" style={{display: 'flex', "justify-content": 'center'}}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*Graphs Row*/}
                <div className="row mt-10">
                    <div className="col-lg-6">
                        <div className="row" style={{"margin-top": "150px"}}>
                            <div className="col-md-6">
                                <div className="card custom-card row-animation">
                                    <div className="card-body" style={{height: '150px',}}>
                                        <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'space-between'}}>
                                            <div className="dashboard-purple-card-chart" style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                                <Chart id="chart" dataSource={monthlyStatsDataTotalUsers}>
                                                    <Series
                                                        valueField="total_users"
                                                        argumentField="month"
                                                        name="Monthly Users"
                                                        type="bar"
                                                        color="#ffaa66" />
                                                    <Size
                                                        height={150}
                                                    />
                                                    <Legend visible={false} />
                                                </Chart>
                                            </div>
                                            <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-end', height: '100%', "margin-top": '15px'}}>
                                                <h3 className="purple-card-heading" style={{"margin-bottom": '0px'}}><b>Total Users</b></h3>
                                                <p>2.5k</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card custom-card row-animation">
                                    <div className="card-body" style={{height: '150px',}}>
                                        <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'space-between'}}>
                                            <div className="dashboard-purple-card-chart" style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                                <Chart id="chart" dataSource={monthlyStatsDataTotalVerifiedUsers}>
                                                    <Series
                                                        valueField="total_verified_users"
                                                        argumentField="month"
                                                        name="Monthly Verified Users"
                                                        type="bar"
                                                        color="#337ab7" />
                                                    <Size
                                                        height={150}
                                                    />
                                                    <Legend visible={false} />
                                                </Chart>
                                            </div>
                                            <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-end', height: '100%', "margin-top": '15px'}}>
                                                <h3 className="purple-card-heading" style={{"margin-bottom": '0px'}}><b>Total Verified Users</b></h3>
                                                <p>2.5k</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{"margin-top": "150px"}}>
                            <div className="col-md-6">
                                <div className="card custom-card row-animation">
                                    <div className="card-body" style={{height: '150px',}}>
                                        <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'space-between'}}>
                                            <div className="dashboard-purple-card-chart" style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                                <Chart id="chart" dataSource={monthlyStatsDataTotalRecruiter}>
                                                    <Series
                                                        valueField="total_recruiter"
                                                        argumentField="month"
                                                        name="Monthly Recruiters"
                                                        type="bar"
                                                        color="#ffaa66" />
                                                    <Size
                                                        height={150}
                                                    />
                                                    <Legend visible={false} />
                                                </Chart>
                                            </div>
                                            <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-end', height: '100%', "margin-top": '15px'}}>
                                                <h3 className="purple-card-heading" style={{"margin-bottom": '0px'}}><b>Total Recruiters</b></h3>
                                                <p>2.5k</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card custom-card row-animation">
                                    <div className="card-body" style={{height: '150px',}}>
                                        <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'space-between'}}>
                                            <div className="dashboard-purple-card-chart" style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                                <Chart id="chart" dataSource={monthlyStatsDataTotalVerifiedRecruiter}>
                                                    <Series
                                                        valueField="total_verified_recruiter"
                                                        argumentField="month"
                                                        name="Monthly Users"
                                                        type="bar"
                                                        color="var(--orange)" />
                                                    <Size
                                                        height={150}
                                                    />
                                                    <Legend visible={false} />
                                                </Chart>
                                            </div>
                                            <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-end', height: '100%', "margin-top": '15px'}}>
                                                <h3 className="purple-card-heading" style={{"margin-bottom": '0px'}}><b>Total Verified Recruiters</b></h3>
                                                <p>2.5k</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 mt-4">
                        <div className="card">
                            <div className="card-header" style={{"background-color": "var(--purple)", color: "var(--light-purple)"}}>
                                <h5>User's Devices Summary</h5>
                            </div>
                            <div className="card-body">
                                <Chart id="chart" dataSource={monthlyDeviceTypeUserData}>
                                    <CommonSeriesSettings
                                        argumentField="month"
                                        type="bar"
                                        hoverMode="allArgumentPoints"
                                        selectionMode="allArgumentPoints"
                                    >
                                        <Label visible={true}>
                                            <Format type="fixedPoint" precision={0} />
                                        </Label>
                                    </CommonSeriesSettings>
                                    <Size
                                        height={190}
                                    />
                                    <Series
                                        argumentField="month"
                                        valueField="ios"
                                        name="IOS"
                                    />
                                    <Series
                                        valueField="android"
                                        name="Android"
                                    />
                                    <Series
                                        valueField="web"
                                        name="Web"
                                    />
                                    <Legend verticalAlignment="bottom" horizontalAlignment="center"></Legend>
                                    {/*<Export enabled={true} />*/}
                                </Chart>
                            </div>
                        </div>
                        <div className="card mt-2">
                            <div className="card-header" style={{"background-color": "var(--purple)", color: "var(--light-purple)"}}>
                                <h5>Recruiter's Devices Summary</h5>
                            </div>
                            <div className="card-body">
                                <Chart id="chart" dataSource={monthlyDeviceTypeRecruitersData}>
                                    <CommonSeriesSettings
                                        argumentField="month"
                                        type="bar"
                                        hoverMode="allArgumentPoints"
                                        selectionMode="allArgumentPoints"
                                    >
                                        <Label visible={true}>
                                            <Format type="fixedPoint" precision={0} />
                                        </Label>
                                    </CommonSeriesSettings>
                                    <Size
                                        height={190}
                                    />
                                    <Series
                                        argumentField="month"
                                        valueField="ios"
                                        name="IOS"
                                    />
                                    <Series
                                        valueField="android"
                                        name="Android"
                                    />
                                    <Series
                                        valueField="web"
                                        name="Web"
                                    />
                                    <Legend verticalAlignment="bottom" horizontalAlignment="center"></Legend>
                                    {/*<Export enabled={true} />*/}
                                </Chart>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    homepageReducer: state.homepageReducer,
});

const mapDispatchToProps = (dispatch) => ({
    getDashboard: (page, admin_status) =>
        dispatch(getDashboard(page, admin_status)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
