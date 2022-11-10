import React, { useEffect, useState } from "react";
import "./Users.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";
import {getUsers, updateUserVideoStatus} from "../../actions/usersAction";
import {Button, Card, CardContent, ListItem, Menu, MenuItem} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import { Popup, Position } from 'devextreme-react/popup';
import ReactPlayer from "react-player";
// import DataGrid, {
//     Column,
//     Grouping,
//     GroupPanel,
//     Pager,
//     Paging,
//     SearchPanel,
// } from 'devextreme-react/data-grid';
import Box from "@mui/material/Box";
import {DataGrid, GridRenderCellParams} from '@mui/x-data-grid';
import List from "@mui/material/List";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const options = [
    'All',
    'Pending',
    'Approved',
    'Rejected'
];

const userStatusOptions = [
    // 'Pending',
    'Approved',
    'Rejected'
];

function Users(props) {
    const [page, setPage] = React.useState(1);
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState(undefined);
    const [isMoreData, setIsMoreData] = useState(false);
    const [nextPage, setNext_page] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [loading, setLoading] = useState(false);
    const [videoPopUp, setVideoPopUp] = useState(false);
    const [videoPopUpTitle, setVideoPopUpTitle] = useState('');
    const [videoPopUpLink, setVideoPopUpLink] = useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    // SELECTED ROWS
    const [selectionModel, setSelectionModel] = React.useState([]);

    // JOB STATUS CHANGE
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [selectedIndexUser, setSelectedIndexUser] = React.useState(0);



    useEffect(() => {
        usersData(page, status);
    }, []);
    useEffect(() => {
        setUsers(
            (prev) => (prev = props.userReducer.users.data)
        );
        // setUsersLength(
        //     (prev) => (prev = props.userReducer.users.data.length)
        // );
        setTotalUsers(
            (prev) => (prev = props.userReducer.users.total)
        );
        setLoading((prev) => (prev = props.userReducer.loading));
    }, [props.userReducer]);

    const usersData = async (page, admin_status) => {
        setLoading(false);
        await props.getUsers(page, admin_status);
        return null;
    };

    const updateStatus = async (userIdsList, jobStatusChange) => {
        // await props.updateVideoStatus(userIdsList, jobStatusChange);
        // usersData(page, status);
        fetch(`${process.env.REACT_APP_API_END_POINT}/update-video-status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify({
                id: userIdsList,
                status: jobStatusChange,
            }),
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.success) {
                    setLoading(false);
                    usersData(page, status);
                } else {
                    alert(response.message);
                }
            })
            .catch((error) => {
                console.log("error", error);
            });
        return null;
    };

    const showVideoPopUP = (data) => {
        setVideoPopUpTitle(data['row'].first_name+' '+data['row'].last_name);
        setVideoPopUpLink(data['row'].link);
        setVideoPopUp(true);
    };
    const hideVideoPopUP = () => {
        setVideoPopUpTitle('');
        setVideoPopUpLink('');
        setVideoPopUp(false);
    };

    // MENU
    const open = Boolean(anchorEl);
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
        if (index === 0) {
            setStatus((prev) => (prev = undefined));
            usersData(1, undefined);
        }
        if (index === 1) {
            setStatus((prev) => (prev = 1));
            usersData(1, 1);
        }
        if (index === 2) {
            setStatus((prev) => (prev = 2));
            usersData(1, 2);
        }
        if (index === 3) {
            setStatus((prev) => (prev = 3));
            usersData(1, 3);
        }
    };

    // JOB STATUS CHANGE
    const openUser = Boolean(anchorElUser);
    const handleClickListItemUserStatus = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleMenuItemClickUser = (event, index) => {
        setSelectedIndexUser(index);
        if (index === 0) {
            updateStatus(selectionModel, 2);
        }
        if (index === 1) {
            updateStatus(selectionModel, 3);
        }
        setAnchorElUser(null);
    };

    const handleCloseMenuUser = () => {
        setAnchorElUser(null);
    };

    const handleChange = (value) => {
        setPage(value);
        usersData(value, status);
    };

    const columns = [
        { field: 'first_name', headerName: 'First Name', flex: 1 },
        { field: 'last_name', headerName: 'Last Name', flex: 1 },
        { field: 'num', headerName: 'Phone No.', flex: 1 },
        { field: 'status', headerName: 'Status', flex: 1 },
        {
            headerName: 'Actions',
            width: 250,
            renderCell: (params: GridRenderCellParams<any>) => (
                <>
                    <div style={{display: "flex", "justify-content": "space-between", width: "100%"}}>
                        <button
                            key={params.row.id}
                            className="btn btn-success btn-sm"
                            style={{color: "var(--light-purple)", border: 'none'}}
                            onClick={() => {updateStatus([params['row'].id], 2)}}
                        >Accept</button>
                        <button
                            key={params.row.id}
                            className="btn btn-danger btn-sm"
                            style={{color: "var(--light-purple)", border: 'none'}}
                            onClick={() => {updateStatus([params['row'].id], 3)}}
                        >Reject</button>
                        <button
                            key={params.row.id}
                            className="btn btn-primary btn-sm"
                            style={{color: "var(--light-purple)", "background-color": "var(--purple)", border: 'none'}}
                            onClick={() => {showVideoPopUP(params)}}
                        >Video</button>
                        {/*<IconButton aria-label="delete" size="small" onClick={() => {updateStatus(params, 2)}}>*/}
                        {/*    <i className="fas fa-check" style={{color: "green", "font-size": "20px"}}></i>*/}
                        {/*</IconButton>*/}
                        {/*<IconButton aria-label="delete" size="small" onClick={() => {updateStatus(params, 3)}}>*/}
                        {/*    <i className="fas fa-plus" style={{color: "red", "font-size": "20px", transform: "rotate(45deg)"}}></i>*/}
                        {/*</IconButton>*/}
                        {/*<IconButton aria-label="delete" size="small" onClick={() => {showVideoPopUP(params)}}>*/}
                        {/*    <i className="fas fa-video" style={{color: "var(--purple)", "font-size": "20px"}}></i>*/}
                        {/*</IconButton>*/}
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
                            <h3 className="m-0" style={{color: "#FFFFFF", "align-self": "center"}}><b>Users</b></h3>
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
                                                aria-expanded={openUser ? 'true' : undefined}
                                                onClick={handleClickListItemUserStatus}
                                            >
                                                <Button
                                                    id="demo-customized-button"
                                                    aria-controls={openUser ? 'demo-customized-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={openUser ? 'true' : undefined}
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
                                            anchorEl={anchorElUser}
                                            open={openUser}
                                            onClose={handleCloseMenuUser}
                                            MenuListProps={{
                                                'aria-labelledby': 'lock-button',
                                                role: 'listbox',
                                            }}
                                        >
                                            {userStatusOptions.map((option, index) => (
                                                <MenuItem
                                                    key={option}
                                                    selected={index === selectedIndexUser}
                                                    onClick={(event) => handleMenuItemClickUser(event, index)}
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
                                        getRowId={(row: any) => row.id}
                                        rows={users}
                                        rowCount={totalUsers}
                                        rowsPerPageOptions={[15]}
                                        pagination
                                        page={page}
                                        pageSize={15}
                                        checkboxSelection={true}
                                        onSelectionModelChange={(newSelectionModel) => {
                                            setSelectionModel(newSelectionModel);
                                        }}
                                        disableSelectionOnClick={true}
                                        selectionModel={selectionModel}
                                        paginationMode="server"
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
                title={videoPopUpTitle}
                container=".dx-viewport"
                width="40vw"
                height="50vh"
            >
                <Position
                    at="center"
                    my="center"
                    of="center"
                />
                <div style={{display: 'flex', "justify-content": 'center',}}>
                    <ReactPlayer
                        url={videoPopUpLink}
                        playing={true}
                        controls
                        className="react-player"
                    />
                </div>
            </Popup>
        </>
    );
}


const mapStateToProps = (state) => ({
    userReducer: state.userReducer,
});

const mapDispatchToProps = (dispatch) => ({
    getUsers: (page, admin_status) =>
        dispatch(getUsers(page, admin_status)),

});
export default connect(mapStateToProps, mapDispatchToProps)(Users);
