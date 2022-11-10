import React, { useEffect, useState } from "react";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {getDashboard, updateJobStatus, updateJobStatusAdmin} from "../../actions/dashboardAction";
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
import {CheckBox, ScrollView, TextBox} from "devextreme-react";

const options = [
    'Pending Jobs',
    'Approved Jobs',
    'Rejected Jobs'
];

const jobStatusOptions = [
    // 'Pending',
    'Approved',
    'Rejected'
];


function Home(props) {
  const [page, setPage] = React.useState(1);
  const [jobsListing, setJobsListing] = useState([]);
  const [jobsLength, setJobsLength] = useState(0);
  const [status, setStatus] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
    const [videoPopUp, setVideoPopUp] = useState(false);
    const [videoPopUpTitle, setVideoPopUpTitle] = useState('');
    const [videoPopUpData, setVideoPopUpData] = useState({});
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    // JOB STATUS CHANGE
    const [anchorElJob, setAnchorElJob] = React.useState(null);
    const [selectedIndexJob, setSelectedIndexJob] = React.useState(0);

    // SELECTED ROWS
    const [selectionModel, setSelectionModel] = React.useState([]);

    // Job Details PopUp
    const [jobDetailPopUp, setJobDetailPopUp] = useState(false);
    const [jobDetailPopUpTitle, setJobDetailPopUpTitle] = useState('');
    const [jobDetailPopUpData, setJobDetailPopUpData] = useState({});


  useEffect(() => {
      setPage(1);
    dashboardData(1, status);
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

    const updateJobStatus = async (params, jobstatus) => {
        fetch(`${process.env.REACT_APP_API_END_POINT}/update-job-approve-status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify({
                id: params,
                status: jobstatus,
            }),
        })
            .then((res) => res.json())
            .then((response) => {
                // console.log('AGAYA');
                // console.log(response);
                if (response.success) {
                    setLoading(false);
                    dashboardData(page, status);
                } else {
                    alert(response.message);
                }
            })
            .catch((error) => {
                console.log("error", error);
            });
        return null;
    };


    const handleChange = (value) => {
    setPage(value);
    dashboardData(value, status);
  };

    // Recruiter PopUp
    const showVideoPopUP = (data) => {
        console.log(data['row'].recruiter);
        setVideoPopUpTitle(data['row'].job_title);
        setVideoPopUpData(data['row'].recruiter);
        setVideoPopUp(true);
    };
    const hideVideoPopUP = () => {
        setVideoPopUpTitle('');
        setVideoPopUpData({});
        setVideoPopUp(false);
    };

    // Job Details PopUp
    const showJobDetailPopUP = (data) => {
        console.log(data['row']);
        setJobDetailPopUpTitle(data['row'].job_title);
        setJobDetailPopUpData(data['row']);
        setJobDetailPopUp(true);
    };
    const hideJobDetailPopUP = () => {
        setJobDetailPopUpTitle('');
        setJobDetailPopUpData({});
        setJobDetailPopUp(false);
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
            setStatus((prev) => (prev = 0));
            dashboardData(1, 0);
        }
        if (index === 1) {
            setStatus((prev) => (prev = 1));
            dashboardData(1, 1);
        }
        if (index === 2) {
            setStatus((prev) => (prev = 2));
            dashboardData(1, 2);
        }
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };


    // JOB STATUS CHANGE
    const openJob = Boolean(anchorElJob);
    const handleClickListItemJobStatus = (event) => {
        setAnchorElJob(event.currentTarget);
    };

    const handleMenuItemClickJob = (event, index) => {
        setSelectedIndexJob(index);
        // if (index === 0) {
        //     updateJobStatus(selectionModel, 0);
        //     setLoading(false);
        //     dashboardData(1, status);
        // }
        if (index === 0) {
            updateJobStatus(selectionModel, 1);
            // setLoading(false);
            // dashboardData(page, status);
        }
        if (index === 1) {
            updateJobStatus(selectionModel, 2);
            // setLoading(false);
            // dashboardData(page, status);
        }
        setAnchorElJob(null);
    };

    const handleCloseMenuJob = () => {
        setAnchorElJob(null);
    };

    const columns = [
        { field: 'job_title', headerName: 'Title', flex: 1 },
        {
            field: 'city',
            headerName: 'City',
            flex: 1,
            renderCell: (params: GridRenderCellParams<any>) => (
                <>
                    <span>{params['row'].city ? params['row'].city.name : ''}</span>
                </>
            ),
        },
        {
            field: 'country',
            headerName: 'Country',
            flex: 1,
            renderCell: (params: GridRenderCellParams<any>) => (
                <>
                    <span>{params['row'].country ? params['row'].country.name : ''}</span>
                </>
            ),
        },
        { field: 'job_admin_status', headerName: 'Status', flex: 1 },
        { field: 'total_applicants', headerName: 'Applicants', flex: 1 },
        {
            headerName: 'Actions',
            flex: 2,
            renderCell: (params: GridRenderCellParams<any>) => (
                <>
                    <div style={{display: "flex", "justify-content": "space-between", width: "100%"}}>
                        <button
                            className="btn btn-success btn-sm"
                            style={{color: "var(--light-purple)", border: 'none'}}
                            onClick={() => {updateJobStatus([params.id], 1)}}
                        >Accept</button>
                        <button
                            className="btn btn-danger btn-sm"
                            style={{color: "var(--light-purple)", border: 'none'}}
                            onClick={() => {updateJobStatus([params.id], 2)}}
                        >Reject</button>
                        <button
                            className="btn btn-primary btn-sm"
                            style={{color: "var(--light-purple)", "background-color": "var(--purple)", border: 'none'}}
                            onClick={() => {showJobDetailPopUP(params)}}
                        >Job Details</button>
                        <button
                            className="btn btn-primary btn-sm"
                            style={{color: "var(--light-purple)", "background-color": "var(--purple)", border: 'none'}}
                            onClick={() => {showVideoPopUP(params)}}
                        >View Recruiter</button>
                    </div>
                </>
            ),
        },
    ];

  if (loading == false) {
    return <FullPageLoader />;
  }
  return (
    <>
      <div className="container-fluid">
          <div className="card custom-main-card-styling">
              <div className="card-header" style={{"background-color": "var(--purple)"}}>
                  <div style={{width: "100%", display: "flex", "justify-content": "space-between"}}>
                      <h3 className="m-0" style={{color: "#FFFFFF", "align-self": "center"}}><b>Jobs Listed</b></h3>
                      <div>
                          <div className="filter-btn-container">
                              {selectionModel && selectionModel.length >= 2 ? <div>
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
                                          aria-expanded={openJob ? 'true' : undefined}
                                          onClick={handleClickListItemJobStatus}
                                      >
                                          <Button
                                              id="demo-customized-button"
                                              aria-controls={openJob ? 'demo-customized-menu' : undefined}
                                              aria-haspopup="true"
                                              aria-expanded={openJob ? 'true' : undefined}
                                              variant="contained"
                                              disableElevation
                                              // onClick={handleClick}
                                              endIcon={<KeyboardArrowDownIcon />}
                                          >
                                              Change Status
                                          </Button>
                                      </ListItem>
                                  </List>
                                  <Menu
                                      id="lock-menu"
                                      anchorEl={anchorElJob}
                                      open={openJob}
                                      onClose={handleCloseMenuJob}
                                      MenuListProps={{
                                          'aria-labelledby': 'lock-button',
                                          role: 'listbox',
                                      }}
                                  >
                                      {jobStatusOptions.map((option, index) => (
                                          <MenuItem
                                              key={option}
                                              selected={index === selectedIndexJob}
                                              onClick={(event) => handleMenuItemClickJob(event, index)}
                                          >
                                              {option}
                                          </MenuItem>
                                      ))}
                                  </Menu>
                              </div>: <></>}

                              <div>
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
                          </div>
                      </div>
                  </div>
              </div>
              <div className="card-body">
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
                                  checkboxSelection={true}
                                  onSelectionModelChange={(newSelectionModel) => {
                                      setSelectionModel(newSelectionModel);
                                  }}
                                  disableSelectionOnClick={true}
                                  selectionModel={selectionModel}
                                  onPageChange={(newPage) => handleChange(newPage)}
                                  columns={columns}
                              />
                          </Box>
                      </div>
                  </div>
              </div>
          </div>
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
            {/*<div style={{height: "100%", display: "flex", "flex-direction": "column", "justify-content": "center"}}>*/}
            {/*    <div className="row mb-2" style={{height: "60%"}}>*/}
            {/*        <div className="col-3" style={{display: 'flex', "flex-direction": "column", "justify-content": 'space-between'}}>*/}
            {/*            <div className="card recruiter-profile-card-customization" style={{height: "100%", "border-radius": "20px", "background-color": "var(--purple)"}}>*/}
            {/*                <div className="card-body">*/}
            {/*                    <div style={{height: "100%", display: 'flex', "flex-direction": "column", "justify-content": 'space-between'}}>*/}
            {/*                        <i className="fas fa-user" style={{color: "var(--light-purple)", "font-size": "8vw", "text-align": "center"}}></i>*/}
            {/*                        <h5 className="m-0" style={{color: "var(--light-purple)", "text-align": "center"}}>{videoPopUpData['name']}</h5>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="col-3" style={{display: 'flex', "flex-direction": "column", "justify-content": 'space-between'}}>*/}
            {/*            <div className="card recruiter-card-customization" style={{height: "100px", "border-radius": "20px", "background-color": "var(--purple)"}}>*/}
            {/*                <div className="card-body p-0 px-2">*/}
            {/*                    <div style={{height: "100%", display: 'flex', "justify-content": 'space-between'}}>*/}
            {/*                        <h3 style={{color: "var(--light-purple)", margin: "0px !important", "text-align": "center", display: "flex", "flex-direction": "column", "justify-content": "center"}}><b>Premium</b></h3>*/}
            {/*                        {videoPopUpData['premium'] === 1 ? <i className="fas fa-check-circle" style={{color: "var(--light-purple)", "font-size": "1.5vw", "text-align": "center", display: "flex", "flex-direction": "column", "justify-content": "center"}}></i> :*/}
            {/*                            <i className="fas fa-close-circle" style={{color: "var(--light-purple)", "font-size": "1.5vw", "text-align": "center", display: "flex", "flex-direction": "column", "justify-content": "center"}}></i>}*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className="card recruiter-card-customization" style={{height: "60px", "border-radius": "20px", "background-color": "var(--purple)"}}>*/}
            {/*                <div className="card-body p-0 px-2">*/}
            {/*                    <div style={{height: "100%", display: 'flex', "justify-content": 'space-between'}}>*/}
            {/*                        <h3 style={{color: "var(--light-purple)", margin: "0px !important", "text-align": "center", display: "flex", "flex-direction": "column", "justify-content": "center"}}><b>Eco Compliance</b></h3>*/}
            {/*                        {videoPopUpData['eco_complaince'] === 1 ? <i className="fas fa-check-circle" style={{color: "var(--light-purple)", "font-size": "1.5vw", "text-align": "center", display: "flex", "flex-direction": "column", "justify-content": "center"}}></i> :*/}
            {/*                            <i className="fas fa-close-circle" style={{color: "var(--light-purple)", "font-size": "1.5vw", "text-align": "center", display: "flex", "flex-direction": "column", "justify-content": "center"}}></i>}*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className="card recruiter-card-customization" style={{height: "60px", "border-radius": "20px", "background-color": "var(--purple)"}}>*/}
            {/*                <div className="card-body p-0 px-2">*/}
            {/*                    <div style={{height: "100%", display: 'flex', "justify-content": 'space-between'}}>*/}
            {/*                        <h3 style={{color: "var(--light-purple)", margin: "0px !important", "text-align": "center", display: "flex", "flex-direction": "column", "justify-content": "center"}}><b>Verified</b></h3>*/}
            {/*                        {videoPopUpData['verified'] === 1 ? <i className="fas fa-check-circle" style={{color: "var(--light-purple)", "font-size": "1.5vw", "text-align": "center", display: "flex", "flex-direction": "column", "justify-content": "center"}}></i> :*/}
            {/*                            <i className="fas fa-close-circle" style={{color: "var(--light-purple)", "font-size": "1.5vw", "text-align": "center", display: "flex", "flex-direction": "column", "justify-content": "center"}}></i>}*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="col-6" style={{display: "flex", "flex-direction": "column", "justify-content": "space-between"}}>*/}
            {/*            <div className="card recruiter-card-customization" style={{height: "100px", width: "100%", "border-radius": "20px", "background-color": "var(--purple)"}}>*/}
            {/*                <div className="card-body">*/}
            {/*                    <div className="row">*/}
            {/*                        <div className="col-4" style={{display: "flex", "flex-direction": "column", "justify-content": "center"}}>*/}
            {/*                            <i className="fas fa-calendar" style={{color: "var(--light-purple)", "font-size": "60px"}}></i>*/}
            {/*                        </div>*/}
            {/*                        <div className="col-8">*/}
            {/*                            <h3 style={{color: "var(--light-purple)", margin: "0px !important", "text-align": "end"}}><b>Recruiter Created At</b></h3>*/}
            {/*                            <h4 style={{color: "var(--light-purple)", margin: "0px !important", "text-align": "end"}}><b>{moment(videoPopUpData['created_at']).format('yyyy-MM-DD HH:mm:ss A')}</b></h4>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            <div className="card recruiter-card-customization" style={{height: "130px", width: "100%", "border-radius": "20px", "background-color": "var(--purple)"}}>*/}
            {/*                <div className="card-body" style={{display: "flex", "flex-direction": "column", "justify-content": "space-between"}}>*/}
            {/*                    <h4 style={{color: "var(--light-purple)", margin: "0px !important", "text-align": "center"}}><b>Job Counts</b></h4>*/}
            {/*                    <div className="row">*/}
            {/*                        <div className="col-6">*/}
            {/*                            <h5 style={{color: "var(--light-purple)", margin: "0px !important", "text-align": "start"}}><b>Total Posted Jobs</b></h5>*/}
            {/*                        </div>*/}
            {/*                        <div className="col-6">*/}
            {/*                            <h5 style={{color: "var(--light-purple)", margin: "0px !important", "text-align": "end"}}><b>{videoPopUpData['total_posted_job_count']}</b></h5>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className="row">*/}
            {/*                        <div className="col-6">*/}
            {/*                            <h5 style={{color: "var(--light-purple)", margin: "0px !important", "text-align": "start"}}><b>Remaining Jobs</b></h5>*/}
            {/*                        </div>*/}
            {/*                        <div className="col-6">*/}
            {/*                            <h5 style={{color: "var(--light-purple)", margin: "0px !important", "text-align": "end"}}><b>{videoPopUpData['remain_job_count']}</b></h5>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    <div className="row" style={{height: "39%", }}>*/}
            {/*        <div className="col-6" style={{display: "flex", "flex-direction": "column", "justify-content": "center"}}>*/}
            {/*            <div className="card recruiter-card-customization" style={{"border-radius": "20px", border: "2px solid var(--purple)"}}>*/}
            {/*                <div className="card-body">*/}
            {/*                    <h4 style={{color: "var(--purple)", margin: "0px !important", "text-align": "center"}}><b>Recruiter Information</b></h4>*/}
            {/*                    <div className="row">*/}
            {/*                        <div className="col-6">*/}
            {/*                            <h5 style={{color: "var(--purple)", margin: "0px !important", "text-align": "start"}}><b><u>Email</u></b></h5>*/}
            {/*                        </div>*/}
            {/*                        <div className="col-6">*/}
            {/*                            <h5 style={{color: "grey", margin: "0px !important", "text-align": "end"}}><b>{videoPopUpData['email']}</b></h5>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className="row">*/}
            {/*                        <div className="col-6">*/}
            {/*                            <h5 style={{color: "var(--purple)", margin: "0px !important", "text-align": "start"}}><b><u>Phone No.</u></b></h5>*/}
            {/*                        </div>*/}
            {/*                        <div className="col-6">*/}
            {/*                            <h5 style={{color: "grey", margin: "0px !important", "text-align": "end"}}><b>{videoPopUpData['num']}</b></h5>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="col-6" style={{display: "flex", "flex-direction": "column", "justify-content": "center"}}>*/}
            {/*            <div className="card recruiter-card-customization" style={{"border-radius": "20px", border: "2px solid var(--purple)"}}>*/}
            {/*                <div className="card-body">*/}
            {/*                    <h4 style={{color: "var(--purple)", margin: "0px !important", "text-align": "center"}}><b>Company Information</b></h4>*/}
            {/*                    <div className="row">*/}
            {/*                        <div className="col-6">*/}
            {/*                            <h5 style={{color: "var(--purple)", margin: "0px !important", "text-align": "start"}}><b><u>Name</u></b></h5>*/}
            {/*                        </div>*/}
            {/*                        <div className="col-6">*/}
            {/*                            <h5 style={{color: "grey", margin: "0px !important", "text-align": "end"}}><b>{videoPopUpData['company'] ? videoPopUpData['company']['name'] : ''}</b></h5>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className="row">*/}
            {/*                        <div className="col-6">*/}
            {/*                            <h5 style={{color: "var(--purple)", margin: "0px !important", "text-align": "start"}}><b><u>Industry</u></b></h5>*/}
            {/*                        </div>*/}
            {/*                        <div className="col-6">*/}
            {/*                            <h5 style={{color: "grey", margin: "0px !important", "text-align": "end"}}><b>{videoPopUpData['company'] ? videoPopUpData['company']['industry']['name'] : ''}</b></h5>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <ScrollView width='100%' height='100%'>
                <div className="row main-styled-form-class">
                    <div className="col-lg-4">
                        <div className="dx-field">
                            <div className="dx-field-label" style={{"font-weight": "700", color: "var(--purple)"}}>Name</div>
                            <div className="dx-field-value">
                                <TextBox disabled={true} value={videoPopUpData['name']} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="dx-field">
                            <div className="dx-field-label" style={{"font-weight": "700", color: "var(--purple)"}}>Email</div>
                            <div className="dx-field-value">
                                <TextBox disabled={true} value={videoPopUpData['email']} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="dx-field">
                            <div className="dx-field-label" style={{"font-weight": "700", color: "var(--purple)"}}>Phone</div>
                            <div className="dx-field-value">
                                <TextBox disabled={true} value={videoPopUpData['num']} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4 main-styled-form-class">
                    <div className="col-lg-4">
                        <div className="dx-field">
                            <div className="dx-field-label" style={{"font-weight": "700", color: "var(--purple)"}}>Remaining Job Count</div>
                            <div className="dx-field-value">
                                <TextBox disabled={true} value={videoPopUpData['remain_job_count']} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="dx-field">
                            <div className="dx-field-label" style={{"font-weight": "700", color: "var(--purple)"}}>Total Posted Jobs</div>
                            <div className="dx-field-value">
                                <TextBox disabled={true} value={videoPopUpData['total_posted_job_count']} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="dx-field">
                            <div className="dx-field-label" style={{"font-weight": "700", color: "var(--purple)"}}>Phone</div>
                            <div className="dx-field-value">
                                <TextBox disabled={true} value={videoPopUpData['num']} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4 main-styled-form-class">
                    <div className="col-lg-4">
                        <div className="dx-field">
                            <div className="dx-field-label" style={{"font-weight": "700", color: "var(--purple)"}}>Membership Expiry</div>
                            <div className="dx-field-value">
                                <TextBox disabled={true} value={videoPopUpData['membership_expiry_date'] ? moment(videoPopUpData['membership_expiry_date']).format('yyyy-MM-DD') : ''} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="dx-field">
                            <div className="dx-field-label" style={{"font-weight": "700", color: "var(--purple)"}}>Created</div>
                            <div className="dx-field-value">
                                <TextBox disabled={true} value={videoPopUpData['created_at'] ? moment(videoPopUpData['created_at']).format('yyyy-MM-DD') : ''} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="dx-field">
                            <div className="dx-field-label" style={{"font-weight": "700", color: "var(--purple)"}}>Updated</div>
                            <div className="dx-field-value">
                                <TextBox disabled={true} value={videoPopUpData['updated_at'] ? moment(videoPopUpData['updated_at']).format('yyyy-MM-DD') : ''} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4 main-styled-form-class">
                    <div className="col-lg-4">
                        <div className="dx-field">
                            <div className="dx-field-label" style={{"font-weight": "700", color: "var(--purple)"}}>Verified</div>
                            <div className="dx-field-value">
                                <CheckBox disabled={true} defaultValue={jobDetailPopUpData['verified'] === 1 ? true : false} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="dx-field">
                            <div className="dx-field-label" style={{"font-weight": "700", color: "var(--purple)"}}>Premium</div>
                            <div className="dx-field-value">
                                <CheckBox disabled={true} defaultValue={jobDetailPopUpData['premium'] === 1 ? true : false} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="dx-field">
                            <div className="dx-field-label" style={{"font-weight": "700", color: "var(--purple)"}}>Eco Compliance</div>
                            <div className="dx-field-value">
                                <CheckBox disabled={true} defaultValue={jobDetailPopUpData['eco_compliance'] === 1 ? true : false} />
                            </div>
                        </div>
                    </div>
                </div>

                <h3 className="mt-4" style={{color: "#FCA120", "font-weight": "700"}}>
                    Company
                </h3>
                <div className="row mt-4 main-styled-form-class">
                    <div className="col-lg-6">
                        <div className="dx-field">
                            <div className="dx-field-label" style={{"font-weight": "700", color: "var(--purple)"}}>Name</div>
                            <div className="dx-field-value">
                                <TextBox disabled={true} value={videoPopUpData['company'] ? (videoPopUpData['company']['name'] ? videoPopUpData['company']['name'] : '') : ''} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="dx-field">
                            <div className="dx-field-label" style={{"font-weight": "700", color: "var(--purple)"}}>Industry</div>
                            <div className="dx-field-value">
                                <TextBox disabled={true} value={videoPopUpData['company'] ? (videoPopUpData['company']['industry'] ? videoPopUpData['company']['industry']['name'] : '') : ''} />
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollView>
        </Popup>


        <Popup
            visible={jobDetailPopUp}
            onHiding={hideJobDetailPopUP}
            dragEnabled={false}
            hideOnOutsideClick={true}
            showCloseButton={false}
            showTitle={true}
            title={jobDetailPopUpTitle}
            container=".dx-viewport"
            width="60vw"
            height="40vh"
        >
            <Position
                at="center"
                my="center"
                of="center"
            />
            <ScrollView width='100%' height='100%'>
                <div className="row main-styled-form-class">
                    <div className="col-lg-6">
                        <div className="dx-field">
                            <div className="dx-field-label" style={{"font-weight": "700", color: "var(--purple)"}}>Job Description</div>
                            <div className="dx-field-value">
                                <TextBox disabled={true} value={jobDetailPopUpData['job_description']} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="dx-field">
                            <div className="dx-field-label" style={{"font-weight": "700", color: "var(--purple)"}}>Job Status</div>
                            <div className="dx-field-value">
                                <TextBox disabled={true} value={jobDetailPopUpData['job_admin_status']} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4 main-styled-form-class">
                    <div className="col-lg-6">
                        <div className="dx-field">
                            <div className="dx-field-label" style={{"font-weight": "700", color: "var(--purple)"}}>Created At</div>
                            <div className="dx-field-value">
                                <TextBox disabled={true} value={jobDetailPopUpData['ago']} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="dx-field">
                            <div className="dx-field-label" style={{"font-weight": "700", color: "var(--purple)"}}>Updated At</div>
                            <div className="dx-field-value">
                                <TextBox disabled={true} value={moment(jobDetailPopUpData['updated_at']).format('yyyy-MM-DD HH:mm:ss a')} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4 main-styled-form-class">
                    <div className="col-lg-6">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="dx-field">
                                    <div className="dx-field-label" style={{"font-weight": "700", color: "var(--purple)"}}>Currency</div>
                                    <div className="dx-field-value">
                                        <TextBox disabled={true} value={jobDetailPopUpData['currency']} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="dx-field">
                                    <div className="dx-field-label" style={{"font-weight": "700", color: "var(--purple)"}}>Gender</div>
                                    <div className="dx-field-value">
                                        <TextBox disabled={true} value={jobDetailPopUpData['gender']} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="dx-field">
                            <div className="dx-field-label" style={{"font-weight": "700", color: "var(--purple)"}}>Experience Required</div>
                            <div className="dx-field-value">
                                <TextBox disabled={true} value={jobDetailPopUpData['experience_req']} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-4 main-styled-form-class">
                    <div className="col-lg-6">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="dx-field">
                                    <div className="dx-field-label" style={{"font-weight": "700", color: "var(--purple)"}}>Applicants</div>
                                    <div className="dx-field-value">
                                        <TextBox disabled={true} value={jobDetailPopUpData['total_applicants']} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="dx-field">
                                    <div className="dx-field-label" style={{"font-weight": "700", color: "var(--purple)"}}>Vacancy</div>
                                    <div className="dx-field-value">
                                        <TextBox disabled={true} value={jobDetailPopUpData['vacancy']} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="dx-field">
                            <div className="dx-field-label" style={{"font-weight": "700", color: "var(--purple)"}}>Salary</div>
                            <div className="dx-field-value">
                                <TextBox disabled={true} value={jobDetailPopUpData['salary_min'] + " - " + jobDetailPopUpData['salary_max']} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-4 main-styled-form-class">
                    <div className="col-lg-6">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="dx-field">
                                    <div className="dx-field-label" style={{"font-weight": "700", color: "var(--purple)"}}>Work Level</div>
                                    <div className="dx-field-value">
                                        <TextBox disabled={true} value={jobDetailPopUpData['work_level']} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="dx-field">
                                    <div className="dx-field-label" style={{"font-weight": "700", color: "var(--purple)"}}>Status</div>
                                    <div className="dx-field-value">
                                        <CheckBox disabled={true} defaultValue={jobDetailPopUpData['status'] === 1 ? true : false} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="dx-field">
                                    <div className="dx-field-label" style={{"font-weight": "700", color: "var(--purple)"}}>Approved</div>
                                    <div className="dx-field-value">
                                        <CheckBox disabled={true} defaultValue={jobDetailPopUpData['is_admin_approved'] === 1 ? true : false} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="dx-field">
                                    <div className="dx-field-label" style={{"font-weight": "700", color: "var(--purple)"}}>International Hiring</div>
                                    <div className="dx-field-value">
                                        <CheckBox disabled={true} defaultValue={jobDetailPopUpData['international_hiring_status'] === 1 ? true : false} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollView>
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
