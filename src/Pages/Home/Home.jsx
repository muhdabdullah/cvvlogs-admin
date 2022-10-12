import React, { useEffect, useState } from "react";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getDashboard } from "../../actions/dashboardAction";
import { connect } from "react-redux";
import { getDeleteJob } from "../../actions/deleteJobAction";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";
import { makeStyles } from "@material-ui/core/styles";
import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
} from 'devextreme-react/data-grid';
import {Card, CardContent} from "@mui/material";
import CardHeader from '@mui/material/CardHeader';

function Home(props) {
  const [page, setPage] = React.useState(1);
  const [jobsListing, setJobsListing] = useState([]);
  const [jobsLength, setJobsLength] = useState(0);
  const [status, setStatus] = useState(undefined);
  const [isMoreData, setIsMoreData] = useState(false);
  const [nextPage, setNext_page] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const useStyles = makeStyles(() => ({
    ul: {
      "& .MuiPaginationItem-root": {
        color: "var(--purple)"
      }
    }
  }));

  const classes = useStyles();

  useEffect(() => {
    dashboardData(1, status);
  }, []);
  useEffect(() => {
    setJobsListing(
      (prev) => (prev = props.dashboardReducer.dashboard.data)
    );
    setTotalPages(
      (prev) => (prev = props.dashboardReducer.dashboard.last_page)
    );
    setLoading((prev) => (prev = props.dashboardReducer.loading));
  }, [props.dashboardReducer]);
  const dashboardData = async (page, admin_status) => {
    setLoading(false);
    await props.getDashboard(page, admin_status);
    return null;
  };
  const handleChange = (event, value) => {
    setPage(value);
    dashboardData(value, status);
  };
  if (loading == false) {
    return <FullPageLoader />;
  }
  return (
    <>
      {/*<Nav2 />*/}
      <div className="container-fluid">
        <Card sx={{ minWidth: 275 }}>
          <CardHeader
              className="custom-card-header"
              title="Jobs Listed"
              action={
                  <>
                      <div className="filter-btn-container">
                          <button
                              className={`${status == undefined ? "active" : ""} btn mr-4`}
                              onClick={() => {
                                  setStatus((prev) => (prev = undefined));
                                  dashboardData(1, undefined);
                              }}
                          >
                              All 10+
                          </button>
                          <button
                              className={`${status == 1 ? "active" : ""} btn mr-4`}
                              onClick={() => {
                                  setStatus((prev) => (prev = 1));
                                  dashboardData(1, 1);
                              }}
                          >
                              Posted
                          </button>
                          <button
                              className={`${status == 0 ? "active" : ""} btn mr-4`}
                              onClick={() => {
                                  setStatus((prev) => (prev = 0));
                                  dashboardData(1, 0);
                              }}
                          >
                              Pending
                          </button>
                      </div>
                  </>
              }
          />
          <CardContent>
            <DataGrid
                dataSource={jobsListing}
                allowColumnReordering={true}
                showBorders={true}
                hoverStateEnabled={true}
                height={'75vh'}
            >
              <SearchPanel visible={true} highlightCaseSensitive={true} width={'20vw'}/>

              <Column dataField="job_title" dataType="date" />
              <Column dataField="city" dataType="string" />
              <Column dataField="country" dataType="string" />
              <Column dataField="ago" dataType="string" />
              <Column dataField="job_admin_status" />
              <Column dataField="total_applicants" />

                <Paging defaultPageSize={10} />
                <Pager
                    visible={true}
                    allowedPageSizes={[10, 20, 30, 50]}
                    displayMode={'full'}
                    showPageSizeSelector={true}
                    showInfo={true}
                    showNavigationButtons={true} />
            </DataGrid>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  dashboardReducer: state.dashboardReducer,
  deletejobReducer: state.deletejobReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getDashboard: (page, admin_status) =>
    dispatch(getDashboard(page, admin_status)),
  getDeleteJob: (userId, id) => dispatch(getDeleteJob(userId, id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
