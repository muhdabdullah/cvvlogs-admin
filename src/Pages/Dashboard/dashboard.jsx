import React, { useEffect, useState } from "react";
import "./dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";

import Chart, {
    Series,
    Title,
    Font,
    Legend, Size, Label, CommonSeriesSettings, Format, Connector
} from 'devextreme-react/chart';
import {getDashboard} from "../../actions/homepageAction";
import {PieChart} from "devextreme-react";


function Dashboard(props) {
    const [status, setStatus] = useState(undefined);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(false);
    const [graphDataForUsersAndRecruiters, setgraphDataForUsersAndRecruiters] = useState([]);
    const [monthlyDeviceTypeUserData, setMonthlyDeviceTypeUserData] = useState({});
    const [monthlyDeviceTypeRecruitersData, setMonthlyDeviceTypeRecruitersData] = useState({});
    const [piechartUserData, setPiechartUserData] = useState([]);
    const [piechartRecruiterData, setPiechartRecruiterData] = useState([]);

    useEffect(() => {
        dashboardData(1, status);
    }, []);

    useEffect(() => {
        monthlyStats("2021-09-01", "2022-10-31");
    }, []);

    useEffect(() => {
        // console.log(props.homepageReducer.homepage);
        setStats((prev) => (prev = props.homepageReducer.homepage));
        setLoading((prev) => (prev = props.homepageReducer.loading));
        let piechartUsers = [
            {
                region: 'Android Users',
                val: props.homepageReducer.homepage.total_android_users
            },
            {
                region: 'IOS Users',
                val: props.homepageReducer.homepage.total_ios_users
            },
            {
                region: 'Web Users',
                val: props.homepageReducer.homepage.total_web_users
            }
        ];
        setPiechartUserData((prev) => (prev = piechartUsers));
        let piechartRecruiters = [
            {
                region: 'Android Recruiters',
                val: props.homepageReducer.homepage.total_android_recruiter
            },
            {
                region: 'IOS Recruiters',
                val: props.homepageReducer.homepage.total_ios_recruiter
            },
            {
                region: 'Web Recruiters',
                val: props.homepageReducer.homepage.total_web_recruiter
            }
        ];
        setPiechartRecruiterData((prev) => (prev = piechartRecruiters));
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

                    // Making the DataSource For Graph
                    let graphDataForUsersAndRecruiters = [];
                    for (let i = 0; i < response.data.total_users.length; i++) {
                        let ObjectToMap = {
                            'month': response.data.total_users[i].month,
                        }
                        if (response.data.total_users[i] && response.data.total_verified_users[i]) {
                            ObjectToMap['total_users'] = response.data.total_users[i].total_users;
                            ObjectToMap['total_verified_users'] = response.data.total_verified_users[i].total_verified_users;
                        } else {
                            ObjectToMap['total_users'] = 0;
                            ObjectToMap['total_verified_users'] = 0;
                        }
                        if (response.data.total_recruiter[i] && response.data.total_verified_recruiter[i]) {
                            ObjectToMap['total_recruiters'] = response.data.total_recruiter[i].total_recruiter;
                            ObjectToMap['total_verified_recruiters'] = response.data.total_verified_recruiter[i].total_verified_recruiter;
                        } else {
                            ObjectToMap['total_recruiters'] = 0;
                            ObjectToMap['total_verified_recruiters'] = 0;
                        }
                        graphDataForUsersAndRecruiters.push(ObjectToMap);
                    }
                    setgraphDataForUsersAndRecruiters((prev) => (prev = graphDataForUsersAndRecruiters));

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
                    <div className="col-lg-6">
                        <div className="card custom-card">
                            <div className="card-body" style={{height: '100%',}}>
                                <div className="row">
                                    <div className="col-lg-6" style={{display: 'flex', "flex-direction": 'column', "justify-content": 'space-between', "margin-top": '20px'}}>
                                        <div className="card custom-card row-animation">
                                            <div className="card-body" style={{height: '90px',}}>
                                                <div style={{display: 'flex', "justify-content": 'space-between', height: '100%'}}>
                                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                                        <h3 className="purple-card-heading"><b>Total Users</b></h3>
                                                        <p>{ stats ? stats.total_users : '' }</p>
                                                    </div>
                                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                                        <i className="fas fa-users dashboard-purple-card-icon" style={{display: 'flex', "justify-content": 'center'}}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card custom-card row-animation">
                                            <div className="card-body" style={{height: '90px',}}>
                                                <div style={{display: 'flex', "justify-content": 'space-between', height: '100%'}}>
                                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                                        <h3 className="yellow-card-heading"><b>Verified Users</b></h3>
                                                        <p>{ stats ? stats.total_verified_users : '' }</p>
                                                    </div>
                                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                                        <i className="fas fa-users dashboard-yellow-card-icon" style={{display: 'flex', "justify-content": 'center'}}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card custom-card row-animation">
                                            <div className="card-body" style={{height: '90px',}}>
                                                <div style={{display: 'flex', "justify-content": 'space-between', height: '100%'}}>
                                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                                        <h3 className="purple-card-heading"><b>Complete Profiles</b></h3>
                                                        <p>{ stats ? stats.total_complete_profiles : '' }</p>
                                                    </div>
                                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                                        <i className="fas fa-solid fa-address-card dashboard-purple-card-icon" style={{display: 'flex', "justify-content": 'center'}}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <PieChart
                                            id="pie"
                                            type="doughnut"
                                            palette="material"
                                            dataSource={piechartUserData}
                                        >
                                            <Series argumentField="region">
                                                <Label visible={true} >
                                                    <Connector visible={true} />
                                                </Label>
                                            </Series>
                                            {/*<Export enabled={true} />*/}
                                            <Legend
                                                margin={0}
                                                horizontalAlignment="center"
                                                verticalAlignment="bottom"
                                            />
                                        </PieChart>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card custom-card">
                            <div className="card-body" style={{height: '100%',}}>
                                <div className="row">
                                    <div className="col-lg-6" style={{display: 'flex', "flex-direction": 'column', "justify-content": 'space-between', "margin-top": '20px'}}>
                                        <div className="card custom-card row-animation">
                                            <div className="card-body" style={{height: '160px',}}>
                                                <div style={{display: 'flex', "justify-content": 'space-between', height: '100%'}}>
                                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'space-between'}}>
                                                        <h3 className="green-card-heading"><b>Recruiters</b></h3>
                                                        <p>{ stats ? stats.total_recruiter : ''}</p>
                                                    </div>
                                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                                        <i className="fas fa-user-tie dashboard-green-card-icon" style={{display: 'flex', "justify-content": 'center'}}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card custom-card row-animation">
                                            <div className="card-body" style={{height: '160px',}}>
                                                <div style={{display: 'flex', "justify-content": 'space-between', height: '100%'}}>
                                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'space-between'}}>
                                                        <h3 className="green-card-heading"><b>Verified Recruiters</b></h3>
                                                        <p>{ stats ? stats.total_verified_recruiter : ''}</p>
                                                    </div>
                                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                                        <i className="fas fa-user-tie dashboard-green-card-icon" style={{display: 'flex', "justify-content": 'center'}}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <PieChart
                                            id="pie"
                                            type="doughnut"
                                            palette="material"
                                            dataSource={piechartRecruiterData}
                                        >
                                            <Series argumentField="region">
                                                <Label visible={true} >
                                                    <Connector visible={true} />
                                                </Label>
                                            </Series>
                                            {/*<Export enabled={true} />*/}
                                            <Legend
                                                margin={0}
                                                horizontalAlignment="center"
                                                verticalAlignment="bottom"
                                            />
                                        </PieChart>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*Graphs Row*/}
                <div className="row mt-4">
                    <div className="col-lg-4">
                        <div className="dashboard-purple-card-chart" style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                            <Chart id="chart" dataSource={graphDataForUsersAndRecruiters}>
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
                                <Title text="Users & Recruiters Summary" >
                                    <Font color="#FFFFFF" />
                                </Title>
                                <Size
                                    height={300}
                                />
                                <Series
                                    argumentField="month"
                                    valueField="total_users"
                                    name="Users"
                                />
                                <Series
                                    argumentField="month"
                                    valueField="total_verified_users"
                                    name="Verified Users"
                                />
                                <Series
                                    argumentField="month"
                                    valueField="total_recruiters"
                                    name="Recruiters"
                                />
                                <Series
                                    argumentField="month"
                                    valueField="total_verified_recruiters"
                                    name="Verified Recruiters"
                                />
                                <Legend verticalAlignment="bottom" horizontalAlignment="center" font={{color: '#FFFFFF'}}></Legend>
                                {/*<Export enabled={true} />*/}
                            </Chart>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="dashboard-purple-card-chart" style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
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
                                <Title text="User's Devices Summary" >
                                    <Font color="#FFFFFF" />
                                </Title>
                                <Size
                                    height={300}
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
                                <Legend verticalAlignment="bottom" horizontalAlignment="center" font={{color: '#FFFFFF'}}></Legend>
                                {/*<Export enabled={true} />*/}
                            </Chart>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="dashboard-purple-card-chart" style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
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
                                <Title text="Recruiters's Devices Summary" >
                                    <Font color="#FFFFFF" />
                                </Title>
                                <Size
                                    height={300}
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
                                <Legend verticalAlignment="bottom" horizontalAlignment="center" font={{color: '#FFFFFF'}}></Legend>
                                {/*<Export enabled={true} />*/}
                            </Chart>
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
