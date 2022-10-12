import React, { useEffect, useState } from "react";
import "./dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav2 from "../../Components/Nav2/Nav2";
import { connect } from "react-redux";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";

import Chart, {
    ArgumentAxis,
    Series,
    Legend, Size, CommonAxisSettings, Label, Grid, ValueAxis
} from 'devextreme-react/chart';
import {getDashboard} from "../../actions/homepageAction";
import {signOut} from "../../actions/authAction";

const data = [{
    arg: 1990,
    val: 5320816667
}, {
    arg: 2000,
    val: 6127700428
}, {
    arg: 2010,
    val: 6916183482
},
    {
        arg: 2020,
        val: 6926183482
    },
    {
        arg: 2030,
        val: 6956183482
    },
    {
        arg: 2040,
        val: 7892908091
    }];


function Dashboard(props) {
    const [status, setStatus] = useState(undefined);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dashboardData(1, status);
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

    if (loading == false) {
        return <FullPageLoader />;
    }

    return (
        <>
            {/*<Nav2 />*/}
            <div className="container-fluid">
                <div className="row mt-5">
                    <div className="col-3">
                        <div className="card custom-card row-animation">
                            <div className="card-body" style={{height: '110px',}}>
                                <div style={{display: 'flex', "justify-content": 'space-between', height: '100%'}}>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <h5 className="purple-card-heading"><b>Verified Users</b></h5>
                                        <p>{ stats ? stats.total_verified_users : '' }</p>
                                    </div>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <i className="fas fa-users dashboard-purple-card-icon" style={{display: 'flex', "justify-content": 'center'}}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card custom-card row-animation">
                            <div className="card-body" style={{height: '110px',}}>
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
                    <div className="col-3">
                        <div className="card custom-card row-animation">
                            <div className="card-body" style={{height: '110px',}}>
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
                            <div className="card-body" style={{height: '110px',}}>
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
                </div>


                <div className="row mt-5">
                    <div className="col-3">
                        <div className="card custom-card row-animation">
                            <div className="card-body" style={{height: '110px',}}>
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
                    <div className="col-3">
                        <div className="card custom-card row-animation">
                            <div className="card-body" style={{height: '110px',}}>
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
                    <div className="col-3">
                        <div className="card custom-card row-animation">
                            <div className="card-body" style={{height: '110px',}}>
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
                    <div className="col-3">
                        <div className="card custom-card row-animation">
                            <div className="card-body" style={{height: '110px',}}>
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
                </div>

                <div className="row mt-5">
                    <div className="col-3">
                        <div className="card custom-card row-animation">
                            <div className="card-body" style={{height: '110px',}}>
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
                    <div className="col-3">
                        <div className="card custom-card row-animation">
                            <div className="card-body" style={{height: '110px',}}>
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
                    <div className="col-3">
                        <div className="card custom-card row-animation">
                            <div className="card-body" style={{height: '110px',}}>
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
                </div>





                {/*<div className="row mt-10" style={{"margin-top": "200px"}}>*/}
                {/*    <div className="col-4">*/}
                {/*        <div className="card custom-card row-animation">*/}
                {/*            <div className="card-body" style={{height: '250px',}}>*/}
                {/*                <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'space-between'}}>*/}
                {/*                    <div className="dashboard-purple-card-chart" style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>*/}
                {/*                        <Chart dataSource={data} palette="material">*/}
                {/*                            <ArgumentAxis tickInterval={10} />*/}
                {/*                            <Series type="bar" />*/}
                {/*                            <Legend visible={false} />*/}
                {/*                            <Size*/}
                {/*                                height={250}*/}
                {/*                            />*/}
                {/*                            <CommonAxisSettings color={'#ffffff'}>*/}
                {/*                                <Grid visible={true} color={'#ffffff'} />*/}
                {/*                            </CommonAxisSettings>*/}
                {/*                        </Chart>*/}
                {/*                    </div>*/}
                {/*                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-end', height: '100%'}}>*/}
                {/*                        <h3 className="purple-card-heading"><b>Total Users</b></h3>*/}
                {/*                        <p>2.5k</p>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="col-4">*/}
                {/*        <div className="card custom-card row-animation">*/}
                {/*            <div className="card-body" style={{height: '250px',}}>*/}
                {/*                <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'space-between'}}>*/}
                {/*                    <div className="dashboard-green-card-chart" style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>*/}
                {/*                        <Chart dataSource={data} palette="material">*/}
                {/*                            <ArgumentAxis tickInterval={10} />*/}
                {/*                            <Series type="bar" />*/}
                {/*                            <Legend visible={false} />*/}
                {/*                            <Size*/}
                {/*                                height={250}*/}
                {/*                            />*/}
                {/*                            <CommonAxisSettings color={'#ffffff'}>*/}
                {/*                                <Grid visible={true} color={'#ffffff'} />*/}
                {/*                            </CommonAxisSettings>*/}
                {/*                        </Chart>*/}
                {/*                    </div>*/}
                {/*                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-end'}}>*/}
                {/*                        <h3 className="green-card-heading"><b>Total Users</b></h3>*/}
                {/*                        <p>2.5k</p>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="col-4">*/}
                {/*        <div className="card custom-card row-animation">*/}
                {/*            <div className="card-body" style={{height: '250px',}}>*/}
                {/*                <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'space-between'}}>*/}
                {/*                    <div className="dashboard-yellow-card-chart" style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>*/}
                {/*                        <Chart dataSource={data} palette="material">*/}
                {/*                            <ArgumentAxis tickInterval={10} />*/}
                {/*                            <Series type="bar" />*/}
                {/*                            <Legend visible={false} />*/}
                {/*                            <Size*/}
                {/*                                height={250}*/}
                {/*                            />*/}
                {/*                            <CommonAxisSettings color={'#ffffff'}>*/}
                {/*                                <Grid visible={true} color={'#ffffff'} />*/}
                {/*                            </CommonAxisSettings>*/}
                {/*                        </Chart>*/}
                {/*                    </div>*/}
                {/*                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-end'}}>*/}
                {/*                        <h3 className="yellow-card-heading"><b>Total Users</b></h3>*/}
                {/*                        <p>2.5k</p>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
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
