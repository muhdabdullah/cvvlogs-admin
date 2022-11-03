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
    'Pending',
    'Approved',
    'Rejected'
];

function Users(props) {
    const [page, setPage] = React.useState(1);
    const [users, setUsers] = useState([]);
    const [usersLength, setUsersLength] = useState(0);
    const [status, setStatus] = useState(undefined);
    const [isMoreData, setIsMoreData] = useState(false);
    const [nextPage, setNext_page] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [videoPopUp, setVideoPopUp] = useState(false);
    const [videoPopUpTitle, setVideoPopUpTitle] = useState('');
    const [videoPopUpLink, setVideoPopUpLink] = useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);



    useEffect(() => {
        usersData(1, status);
    }, []);
    useEffect(() => {
        console.log(props.userReducer.users);
        setUsers(
            (prev) => (prev = props.userReducer.users)
        );
        setUsersLength(
            (prev) => (prev = props.userReducer.users.length)
        );
        // setTotalPages(
        //     (prev) => (prev = props.userReducer.users.total_pages)
        // );
        setLoading((prev) => (prev = props.userReducer.loading));
    }, [props.userReducer]);

    const usersData = async (page, admin_status) => {
        setLoading(false);
        await props.getUsers(page, admin_status);
        return null;
    };

    const updateStatus = async (user, status) => {
        await props.updateVideoStatus(user.row.id, status);
        setLoading(false);
        await props.getUsers(page, undefined);
        return null;
    };

    const showVideoPopUP = (data) => {
        setVideoPopUpTitle(data.row.first_name+' '+data.row.last_name);
        setVideoPopUpLink(data.row.link);
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
        // if (index === 0) {
        //     setStatus((prev) => (prev = undefined));
        //     usersData(1, 0);
        // }
        // if (index === 1) {
        //     setStatus((prev) => (prev = undefined));
        //     usersData(1, 1);
        // }
        // if (index === 2) {
        //     setStatus((prev) => (prev = undefined));
        //     usersData(1, 2);
        // }
    };

    const columns = [
        { field: 'first_name', headerName: 'First Name', flex: 1 },
        { field: 'last_name', headerName: 'Last Name', flex: 1 },
        { field: 'num', headerName: 'Phone No.', flex: 1 },
        { field: 'status', headerName: 'Status', flex: 1 },
        {
            headerName: 'Actions',
            width: 200,
            renderCell: (params: GridRenderCellParams<any>) => (
                <>
                    <div style={{display: "flex", "justify-content": "space-between", width: "100%"}}>
                        <button
                            className="btn btn-success btn-sm"
                            style={{color: "var(--light-purple)", border: 'none'}}
                            onClick={() => {updateStatus(params, 2)}}
                        >Accept</button>
                        <button
                            className="btn btn-danger btn-sm"
                            style={{color: "var(--light-purple)", border: 'none'}}
                            onClick={() => {updateStatus(params, 3)}}
                        >Reject</button>
                        <button
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
                <Card sx={{ minWidth: 275 }}>
                    <CardHeader
                        className="custom-card-header"
                        title="Users"
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
                                        getRowId={(row: any) => row.id+row.first_name}
                                        rows={users}
                                        pagination
                                        pageSize={15}
                                        columns={columns}
                                    />
                                </Box>
                            </div>
                        </div>
                        {/*<DataGrid*/}
                        {/*    dataSource={users}*/}
                        {/*    allowColumnReordering={true}*/}
                        {/*    rowAlternationEnabled={true}*/}
                        {/*    showBorders={true}*/}
                        {/*    height="75vh"*/}
                        {/*>*/}
                        {/*    <GroupPanel visible={true} />*/}
                        {/*    <SearchPanel visible={true} highlightCaseSensitive={true} width="20vw"/>*/}

                        {/*    <Column dataField="first_name" dataType="string" caption="First Name" />*/}
                        {/*    <Column dataField="last_name" dataType="string" caption="Last Name" />*/}
                        {/*    <Column dataField="num" dataType="string" caption="Phone No." />*/}
                        {/*    <Column dataField="status" dataType="string" />*/}
                        {/*    <Column dataField="Video"*/}
                        {/*            width={100}*/}
                        {/*            allowSorting={false}*/}
                        {/*            cellRender={cellRenderShowVideo}*/}
                        {/*    />*/}
                        {/*    /!*<Column dataField="Customer" dataType="string" width={150} />*!/*/}

                        {/*    <Pager allowedPageSizes={[10, 20, 30]} showPageSizeSelector={true} showNavigationButtons={true} showInfo={true} displayMode={'full'} />*/}
                        {/*    <Paging defaultPageSize={10} />*/}
                        {/*</DataGrid>*/}
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
    updateVideoStatus: (id, status) =>
        dispatch(updateUserVideoStatus(id, status)),

});
export default connect(mapStateToProps, mapDispatchToProps)(Users);
