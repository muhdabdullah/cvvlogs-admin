import React, { useEffect, useState } from "react";
import "./Users.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";
import {getUsers} from "../../actions/usersAction";
import {Button, Card, CardContent} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import { Popup, Position } from 'devextreme-react/popup';
import ReactPlayer from "react-player";
import DataGrid, {
    Column,
    Grouping,
    GroupPanel,
    Pager,
    Paging,
    SearchPanel,
} from 'devextreme-react/data-grid';

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

    useEffect(() => {
        usersData(1, status);
    }, []);
    useEffect(() => {
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

    const showVideoPopUP = (firstName, lastName, link) => {
        setVideoPopUpTitle(firstName+' '+lastName);
        setVideoPopUpLink(link);
        setVideoPopUp(true);
    };
    const hideVideoPopUP = () => {
        setVideoPopUpTitle('');
        setVideoPopUpLink('');
        setVideoPopUp(false);
    };

    const cellRenderShowVideo = (data) => {
        console.log(data);
        return <div style={{width: "100%", display: "flex", "justify-content": "center"}}>
            <IconButton aria-label="delete" size="small" onClick={() => {showVideoPopUP(data.data['first_name'], data.data['last_name'], data.data['link'])}}>
                <i className="fas fa-video" style={{color: "var(--purple)", "font-size": "20px"}}></i>
            </IconButton>
        </div>;
    };

    // const showVideoPopUP = async () => {
    //     setVideoPopUp(false);
    // };
    //
    // const hideVideoPopUP = async () => {
    //     setVideoPopUp(false);
    // };

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
                    />
                    <CardContent>
                        <DataGrid
                            dataSource={users}
                            allowColumnReordering={true}
                            rowAlternationEnabled={true}
                            showBorders={true}
                            height="75vh"
                        >
                            <GroupPanel visible={true} />
                            <SearchPanel visible={true} highlightCaseSensitive={true} width="20vw"/>

                            <Column dataField="first_name" dataType="string" caption="First Name" />
                            <Column dataField="last_name" dataType="string" caption="Last Name" />
                            <Column dataField="num" dataType="string" caption="Phone No." />
                            <Column dataField="status" dataType="string" />
                            <Column dataField="Video"
                                    width={100}
                                    allowSorting={false}
                                    cellRender={cellRenderShowVideo}
                            />
                            {/*<Column dataField="Customer" dataType="string" width={150} />*/}

                            <Pager allowedPageSizes={[10, 20, 30]} showPageSizeSelector={true} showNavigationButtons={true} showInfo={true} displayMode={'full'} />
                            <Paging defaultPageSize={10} />
                        </DataGrid>

                        {/*{users.length > 0 ? (*/}
                        {/*    users.map((user) => (*/}
                        {/*        <div key={user['link']} className="card" style={{"border-radius": "10px", "margin-bottom": "5px",}}>*/}
                        {/*            <div className="card-body">*/}
                        {/*                <div className="row" style={{"justify-content": "space-between"}}>*/}
                        {/*                    <div className="col-xs-2 col-md-2 col-lg-2">*/}
                        {/*                        <h5 style={{"margin-bottom": '0px !important', color: "var(--purple)"}}>{ user['first_name'] ? user['first_name'] : '' }</h5>*/}
                        {/*                    </div>*/}
                        {/*                    <div className="col-xs-2 col-md-2 col-lg-2">*/}
                        {/*                        <p style={{"font-size": '15px', "font-weight": "500"}}>{ user['last_name'] ? user['last_name'] : '' }</p>*/}
                        {/*                    </div>*/}
                        {/*                    <div className="col-xs-2 col-md-2 col-lg-2">*/}
                        {/*                        <p style={{"font-size": '15px', "font-weight": "500"}}>{ user['num'] ? user['num'] : '' }</p>*/}
                        {/*                    </div>*/}
                        {/*                    <div className="col-xs-1 col-md-1 col-lg-1">*/}
                        {/*                        <p style={{"font-size": '15px', "font-weight": "500"}}>{ user['status'] ? user['status'] : '' }</p>*/}
                        {/*                    </div>*/}
                        {/*                    <div className="col-xs-1 col-md-1 col-lg-1">*/}
                        {/*                        <IconButton aria-label="delete" size="small" onClick={() => {showVideoPopUP(user['first_name'], user['last_name'], user['link'])}}>*/}
                        {/*                            <i className="fas fa-video" style={{color: "var(--purple)", "font-size": "20px"}}></i>*/}
                        {/*                        </IconButton>*/}
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
