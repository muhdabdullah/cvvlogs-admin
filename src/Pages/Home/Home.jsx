import React, { useEffect, useState } from "react";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getDashboard } from "../../actions/dashboardAction";
import { connect } from "react-redux";
import { getDeleteJob } from "../../actions/deleteJobAction";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
    Button,
    Card,
    CardContent,
    ListItem,
    Menu,
    MenuItem,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow,
} from "@mui/material";
import CardHeader from '@mui/material/CardHeader';
import {Popup, Position} from "devextreme-react/popup";
import moment from "moment";
import List from "@mui/material/List";
// import DataGrid, {Column, GroupPanel, Pager, Paging, SearchPanel} from "devextreme-react/data-grid";
import IconButton from "@mui/material/IconButton";
import { DataGrid } from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import {GridRenderCellParams} from "@mui/x-data-grid";

const options = [
    'All Jobs',
    'Pending Jobs',
    'Posted Jobs'
];


function Home(props) {
  const [page, setPage] = React.useState(1);
  const [jobsListing, setJobsListing] = useState([]);
  const [jobsLength, setJobsLength] = useState(0);
  const [status, setStatus] = useState(undefined);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
    const [videoPopUp, setVideoPopUp] = useState(false);
    const [videoPopUpTitle, setVideoPopUpTitle] = useState('');
    const [videoPopUpData, setVideoPopUpData] = useState({});
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

  useEffect(() => {
    dashboardData(page, status);
  }, []);

  useEffect(() => {
      console.log(props.dashboardReducer.dashboard.data);
    setJobsListing(
      (prev) => (prev = props.dashboardReducer.dashboard.data)
    );
      setJobsLength(
          (prev) => (prev = props.dashboardReducer.dashboard.total)
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

  const handleChange = (value) => {
    setPage(value);
    dashboardData(value, status);
  };

    const showVideoPopUP = (data) => {
        setVideoPopUpTitle(data['row'].job_title);
        setVideoPopUpData(data['row'].recruiter);
        setVideoPopUp(true);
    };
    const hideVideoPopUP = () => {
        setVideoPopUpTitle('');
        setVideoPopUpData({});
        setVideoPopUp(false);
    };

    // MENU
    const open = Boolean(anchorEl);
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
        if (index === 0) {
            setStatus((prev) => (prev = undefined));
            dashboardData(1, undefined);
        }
        if (index === 1) {
            setStatus((prev) => (prev = undefined));
            dashboardData(1, 0);
        }
        if (index === 2) {
            setStatus((prev) => (prev = undefined));
            dashboardData(1, 1);
        }
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const columns = [
        { field: 'job_title', headerName: 'Title', flex: 1 },
        { field: 'city', headerName: 'City', flex: 1 },
        { field: 'country', headerName: 'Country', flex: 1 },
        { field: 'job_admin_status', headerName: 'Status', flex: 1 },
        { field: 'total_applicants', headerName: 'Applicants', flex: 1 },
        {
            headerName: 'Actions',
            flex: 1,
            renderCell: (params: GridRenderCellParams<any>) => (
                <button
                    className="btn btn-primary btn-sm"
                    style={{color: "var(--light-purple)", "background-color": "var(--purple)", border: 'none'}}
                    onClick={() => {showVideoPopUP(params)}}
                >View Recruiter</button>
            ),
        },
    ];

  if (loading == false) {
    return <FullPageLoader />;
  }
  return (
    <>
      <div className="container-fluid">
        <Card sx={{ minWidth: 275 }}>
          <CardHeader
              className="custom-card-header"
              title="Jobs Listed"
              action={
                  <>
                      <div className="filter-btn-container">
                          <List
                              component="nav"
                              aria-label="Filters settings"
                              sx={{ bgcolor: 'var(--purple)' }}
                          >
                              <ListItem
                                  button
                                  id="lock-button"
                                  aria-haspopup="listbox"
                                  aria-controls="lock-menu"
                                  aria-expanded={open ? 'true' : undefined}
                                  onClick={handleClickListItem}
                              >
                                  <Button
                                      id="demo-customized-button"
                                      aria-controls={open ? 'demo-customized-menu' : undefined}
                                      aria-haspopup="true"
                                      aria-expanded={open ? 'true' : undefined}
                                      variant="contained"
                                      disableElevation
                                      // onClick={handleClick}
                                      endIcon={<KeyboardArrowDownIcon />}
                                  >
                                      Filters
                                  </Button>
                              </ListItem>
                          </List>
                          <Menu
                              id="lock-menu"
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleCloseMenu}
                              MenuListProps={{
                                  'aria-labelledby': 'lock-button',
                                  role: 'listbox',
                              }}
                          >
                              {options.map((option, index) => (
                                  <MenuItem
                                      key={option}
                                      selected={index === selectedIndex}
                                      onClick={(event) => handleMenuItemClick(event, index)}
                                  >
                                      {option}
                                  </MenuItem>
                              ))}
                          </Menu>
                      </div>
                  </>
              }
          />
          <CardContent>
              <div style={{ display: 'flex', height: '100%' }}>
                  <div style={{ flexGrow: 1 }}>
                      <Box sx={{ height: '75vh', width: '100%' }}>
                          <DataGrid
                              getRowId={(row: any) => row.job_id}
                              rows={jobsListing}
                              rowCount={jobsLength}
                              rowsPerPageOptions={[15]}
                              pagination
                              page={page}
                              pageSize={15}
                              paginationMode="server"
                              onPageChange={(newPage) => handleChange(newPage)}
                              columns={columns}
                          />
                      </Box>
                  </div>
              </div>

              {/*{jobsListing.length > 0 ? (*/}
              {/*    jobsListing.map((job) => (*/}
              {/*        <div className="card" style={{"border-radius": "10px", "margin-bottom": "5px",}}>*/}
              {/*            <div className="card-body p-1">*/}
              {/*                <div className="row px-3 justify-content-between">*/}
              {/*                    <div className="col-6">*/}
              {/*                        <h5 style={{"margin-bottom": '0px !important', color: "var(--purple)"}}>{ job['job_title'] ? job['job_title'] : '' }</h5>*/}
              {/*                    </div>*/}
              {/*                    <div className="col-2">*/}
              {/*                        <p style={{"font-size": '16px', "font-weight": "bold"}}>{ job['job_admin_status'] ? job['job_admin_status'] : '' }</p>*/}
              {/*                    </div>*/}
              {/*                    <div className="col-2">*/}
              {/*                        <p style={{"font-size": '16px', "font-weight": "bold"}}>Applicants: <span style={{color: "var(--purple)"}}>{ job['total_applicants'] ? job['total_applicants'] : '' }</span></p>*/}
              {/*                    </div>*/}
              {/*                    <div className="col-2" style={{display: 'flex', "justify-content": "flex-end"}}>*/}
              {/*                        <button*/}
              {/*                            className="btn btn-primary btn-sm"*/}
              {/*                            style={{color: "var(--light-purple)", "background-color": "var(--purple)", border: 'none'}}*/}
              {/*                            onClick={() => {showVideoPopUP(job['recruiter'] ? job['recruiter']['name'] : 'Recruiter Information', job['recruiter'])}}*/}
              {/*                        >View Recruiter</button>*/}
              {/*                    </div>*/}
              {/*                </div>*/}
              {/*            </div>*/}
              {/*        </div>*/}
              {/*    ))*/}
              {/*) : (*/}
              {/*    <>*/}
              {/*    </>*/}
              {/*)}*/}
          </CardContent>
        </Card>
      </div>

        <Popup
            visible={videoPopUp}
            onHiding={hideVideoPopUP}
            dragEnabled={false}
            hideOnOutsideClick={true}
            showCloseButton={false}
            showTitle={true}
            title={'Recruiter Information'}
            container=".dx-viewport"
            width="60vw"
            height="500px"
        >
            <Position
                at="center"
                my="center"
                of="center"
            />
            <div style={{height: "100%", display: "flex", "flex-direction": "column", "justify-content": "center"}}>
                <div className="row mb-2" style={{height: "60%"}}>
                    <div className="col-3" style={{display: 'flex', "flex-direction": "column", "justify-content": 'space-between'}}>
                        <div className="card recruiter-profile-card-customization" style={{height: "100%", "border-radius": "20px", "background-color": "var(--purple)"}}>
                            <div className="card-body">
                                <div style={{height: "100%", display: 'flex', "flex-direction": "column", "justify-content": 'space-between'}}>
                                    <i className="fas fa-user" style={{color: "var(--light-purple)", "font-size": "8vw", "text-align": "center"}}></i>
                                    <h5 className="m-0" style={{color: "var(--light-purple)", "text-align": "center"}}>{videoPopUpData['name']}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3" style={{display: 'flex', "flex-direction": "column", "justify-content": 'space-between'}}>
                        <div className="card recruiter-card-customization" style={{height: "100px", "border-radius": "20px", "background-color": "var(--purple)"}}>
                            <div className="card-body p-0 px-2">
                                <div style={{height: "100%", display: 'flex', "justify-content": 'space-between'}}>
                                    <h3 style={{color: "var(--light-purple)", margin: "0px !important", "text-align": "center", display: "flex", "flex-direction": "column", "justify-content": "center"}}><b>Premium</b></h3>
                                    {videoPopUpData['premium'] === 1 ? <i className="fas fa-check-circle" style={{color: "var(--light-purple)", "font-size": "1.5vw", "text-align": "center", display: "flex", "flex-direction": "column", "justify-content": "center"}}></i> :
                                        <i className="fas fa-close-circle" style={{color: "var(--light-purple)", "font-size": "1.5vw", "text-align": "center", display: "flex", "flex-direction": "column", "justify-content": "center"}}></i>}
                                </div>
                            </div>
                        </div>
                        <div className="card recruiter-card-customization" style={{height: "60px", "border-radius": "20px", "background-color": "var(--purple)"}}>
                            <div className="card-body p-0 px-2">
                                <div style={{height: "100%", display: 'flex', "justify-content": 'space-between'}}>
                                    <h3 style={{color: "var(--light-purple)", margin: "0px !important", "text-align": "center", display: "flex", "flex-direction": "column", "justify-content": "center"}}><b>Eco Compliance</b></h3>
                                    {videoPopUpData['eco_complaince'] === 1 ? <i className="fas fa-check-circle" style={{color: "var(--light-purple)", "font-size": "1.5vw", "text-align": "center", display: "flex", "flex-direction": "column", "justify-content": "center"}}></i> :
                                        <i className="fas fa-close-circle" style={{color: "var(--light-purple)", "font-size": "1.5vw", "text-align": "center", display: "flex", "flex-direction": "column", "justify-content": "center"}}></i>}
                                </div>
                            </div>
                        </div>
                        <div className="card recruiter-card-customization" style={{height: "60px", "border-radius": "20px", "background-color": "var(--purple)"}}>
                            <div className="card-body p-0 px-2">
                                <div style={{height: "100%", display: 'flex', "justify-content": 'space-between'}}>
                                    <h3 style={{color: "var(--light-purple)", margin: "0px !important", "text-align": "center", display: "flex", "flex-direction": "column", "justify-content": "center"}}><b>Verified</b></h3>
                                    {videoPopUpData['verified'] === 1 ? <i className="fas fa-check-circle" style={{color: "var(--light-purple)", "font-size": "1.5vw", "text-align": "center", display: "flex", "flex-direction": "column", "justify-content": "center"}}></i> :
                                        <i className="fas fa-close-circle" style={{color: "var(--light-purple)", "font-size": "1.5vw", "text-align": "center", display: "flex", "flex-direction": "column", "justify-content": "center"}}></i>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6" style={{display: "flex", "flex-direction": "column", "justify-content": "space-between"}}>
                        <div className="card recruiter-card-customization" style={{height: "100px", width: "100%", "border-radius": "20px", "background-color": "var(--purple)"}}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-4" style={{display: "flex", "flex-direction": "column", "justify-content": "center"}}>
                                        <i className="fas fa-calendar" style={{color: "var(--light-purple)", "font-size": "60px"}}></i>
                                    </div>
                                    <div className="col-8">
                                        <h3 style={{color: "var(--light-purple)", margin: "0px !important", "text-align": "end"}}><b>Recruiter Created At</b></h3>
                                        <h4 style={{color: "var(--light-purple)", margin: "0px !important", "text-align": "end"}}><b>{moment(videoPopUpData['created_at']).format('yyyy-MM-DD HH:mm:ss A')}</b></h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card recruiter-card-customization" style={{height: "130px", width: "100%", "border-radius": "20px", "background-color": "var(--purple)"}}>
                            <div className="card-body" style={{display: "flex", "flex-direction": "column", "justify-content": "space-between"}}>
                                <h4 style={{color: "var(--light-purple)", margin: "0px !important", "text-align": "center"}}><b>Job Counts</b></h4>
                                <div className="row">
                                    <div className="col-6">
                                        <h5 style={{color: "var(--light-purple)", margin: "0px !important", "text-align": "start"}}><b>Total Posted Jobs</b></h5>
                                    </div>
                                    <div className="col-6">
                                        <h5 style={{color: "var(--light-purple)", margin: "0px !important", "text-align": "end"}}><b>{videoPopUpData['total_posted_job_count']}</b></h5>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <h5 style={{color: "var(--light-purple)", margin: "0px !important", "text-align": "start"}}><b>Remaining Jobs</b></h5>
                                    </div>
                                    <div className="col-6">
                                        <h5 style={{color: "var(--light-purple)", margin: "0px !important", "text-align": "end"}}><b>{videoPopUpData['remain_job_count']}</b></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row" style={{height: "39%", }}>
                    <div className="col-6" style={{display: "flex", "flex-direction": "column", "justify-content": "center"}}>
                        <div className="card recruiter-card-customization" style={{"border-radius": "20px", border: "2px solid var(--purple)"}}>
                            <div className="card-body">
                                <h4 style={{color: "var(--purple)", margin: "0px !important", "text-align": "center"}}><b>Recruiter Information</b></h4>
                                <div className="row">
                                    <div className="col-6">
                                        <h5 style={{color: "var(--purple)", margin: "0px !important", "text-align": "start"}}><b><u>Email</u></b></h5>
                                    </div>
                                    <div className="col-6">
                                        <h5 style={{color: "grey", margin: "0px !important", "text-align": "end"}}><b>{videoPopUpData['email']}</b></h5>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <h5 style={{color: "var(--purple)", margin: "0px !important", "text-align": "start"}}><b><u>Phone No.</u></b></h5>
                                    </div>
                                    <div className="col-6">
                                        <h5 style={{color: "grey", margin: "0px !important", "text-align": "end"}}><b>{videoPopUpData['num']}</b></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6" style={{display: "flex", "flex-direction": "column", "justify-content": "center"}}>
                        <div className="card recruiter-card-customization" style={{"border-radius": "20px", border: "2px solid var(--purple)"}}>
                            <div className="card-body">
                                <h4 style={{color: "var(--purple)", margin: "0px !important", "text-align": "center"}}><b>Company Information</b></h4>
                                <div className="row">
                                    <div className="col-6">
                                        <h5 style={{color: "var(--purple)", margin: "0px !important", "text-align": "start"}}><b><u>Name</u></b></h5>
                                    </div>
                                    <div className="col-6">
                                        <h5 style={{color: "grey", margin: "0px !important", "text-align": "end"}}><b>{videoPopUpData['company'] ? videoPopUpData['company']['name'] : ''}</b></h5>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <h5 style={{color: "var(--purple)", margin: "0px !important", "text-align": "start"}}><b><u>Industry</u></b></h5>
                                    </div>
                                    <div className="col-6">
                                        <h5 style={{color: "grey", margin: "0px !important", "text-align": "end"}}><b>{videoPopUpData['company'] ? videoPopUpData['company']['industry']['name'] : ''}</b></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Popup>
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
