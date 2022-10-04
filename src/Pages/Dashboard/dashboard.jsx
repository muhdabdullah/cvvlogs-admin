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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dashboardData(1, status);
    }, []);
    useEffect(() => {
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
                    <div className="col-4">
                        <div className="card custom-card row-animation">
                            <div className="card-body" style={{height: '150px',}}>
                                <div style={{display: 'flex', "justify-content": 'space-between', height: '100%'}}>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <h3 className="purple-card-heading"><b>Total Users</b></h3>
                                        <p>2.5k</p>
                                    </div>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <i className="fas fa-user dashboard-purple-card-icon" style={{display: 'flex', "justify-content": 'center'}}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card custom-card row-animation">
                            <div className="card-body" style={{height: '150px',}}>
                                <div style={{display: 'flex', "justify-content": 'space-between', height: '100%'}}>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <h3 className="green-card-heading"><b>Total Active Users</b></h3>
                                        <p>1.8k</p>
                                    </div>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <i className="fas fa-user dashboard-green-card-icon" style={{display: 'flex', "justify-content": 'center'}}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card custom-card row-animation">
                            <div className="card-body" style={{height: '150px',}}>
                                <div style={{display: 'flex', "justify-content": 'space-between', height: '100%'}}>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <h3 className="yellow-card-heading"><b>Total Active Jobs</b></h3>
                                        <p>22.5k</p>
                                    </div>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <i className="fas fa-user dashboard-yellow-card-icon" style={{display: 'flex', "justify-content": 'center'}}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row mt-10" style={{"margin-top": "200px"}}>
                    <div className="col-4">
                        <div className="card custom-card row-animation">
                            <div className="card-body" style={{height: '250px',}}>
                                <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'space-between'}}>
                                    <div className="dashboard-purple-card-chart" style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <Chart dataSource={data} palette="material">
                                            <ArgumentAxis tickInterval={10} />
                                            <Series type="bar" />
                                            <Legend visible={false} />
                                            <Size
                                                height={250}
                                            />
                                            <CommonAxisSettings color={'#ffffff'}>
                                                <Grid visible={true} color={'#ffffff'} />
                                            </CommonAxisSettings>
                                        </Chart>
                                    </div>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-end', height: '100%'}}>
                                        <h3 className="purple-card-heading"><b>Total Users</b></h3>
                                        <p>2.5k</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card custom-card row-animation">
                            <div className="card-body" style={{height: '250px',}}>
                                <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'space-between'}}>
                                    <div className="dashboard-green-card-chart" style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <Chart dataSource={data} palette="material">
                                            <ArgumentAxis tickInterval={10} />
                                            <Series type="bar" />
                                            <Legend visible={false} />
                                            <Size
                                                height={250}
                                            />
                                            <CommonAxisSettings color={'#ffffff'}>
                                                <Grid visible={true} color={'#ffffff'} />
                                            </CommonAxisSettings>
                                        </Chart>
                                    </div>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-end'}}>
                                        <h3 className="green-card-heading"><b>Total Users</b></h3>
                                        <p>2.5k</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card custom-card row-animation">
                            <div className="card-body" style={{height: '250px',}}>
                                <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'space-between'}}>
                                    <div className="dashboard-yellow-card-chart" style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-start'}}>
                                        <Chart dataSource={data} palette="material">
                                            <ArgumentAxis tickInterval={10} />
                                            <Series type="bar" />
                                            <Legend visible={false} />
                                            <Size
                                                height={250}
                                            />
                                            <CommonAxisSettings color={'#ffffff'}>
                                                <Grid visible={true} color={'#ffffff'} />
                                            </CommonAxisSettings>
                                        </Chart>
                                    </div>
                                    <div style={{display: 'flex', "flex-direction": "column", "justify-content": 'flex-end'}}>
                                        <h3 className="yellow-card-heading"><b>Total Users</b></h3>
                                        <p>2.5k</p>
                                    </div>
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
    homepageReducer: state.homepageReducer,
});

const mapDispatchToProps = (dispatch) => ({
    getDashboard: (page, admin_status) =>
        dispatch(getDashboard(page, admin_status)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
