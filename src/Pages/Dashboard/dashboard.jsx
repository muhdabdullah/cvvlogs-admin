import React, { useEffect, useState } from "react";
import "./dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav2 from "../../Components/Nav2/Nav2";
import { connect } from "react-redux";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";

import Chart, {
    ArgumentAxis,
    Series,
    Legend
} from 'devextreme-react/chart';
import {getDashboard} from "../../actions/homepageAction";

const data = [{
    arg: 1990,
    val: 5320816667
}, {
    arg: 2000,
    val: 6127700428
}, {
    arg: 2010,
    val: 6916183482
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
                <div className="row">
                    <div className="col-12 mt-4">
                        <div className="row head justify-content-between">
                            <div className="col-6">
                                <div className="card">
                                    <div className="card-header custom-card-header">
                                        <h5>Bar Chart</h5>
                                    </div>
                                    <div className="card-body">
                                        <Chart dataSource={data}>
                                            <ArgumentAxis tickInterval={10} />
                                            <Series type="bar" />
                                            <Legend visible={false} />
                                        </Chart>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="card">
                                    <div className="card-header custom-card-header">
                                        <h5>Bar Chart</h5>
                                    </div>
                                    <div className="card-body">
                                        <Chart dataSource={data}>
                                            <ArgumentAxis tickInterval={10} />
                                            <Series type="bar" />
                                            <Legend visible={false} />
                                        </Chart>
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
