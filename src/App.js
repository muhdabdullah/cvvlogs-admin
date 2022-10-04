import React, { useEffect } from "react";
import {BrowserRouter as Router, Switch, Route, Link, BrowserRouter} from "react-router-dom";
import firebase from "./helpers/firebase";
import "./style.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import { PrivateRoute } from "./Routing/Routing";
import CompanyProfile from "./Pages/CompanyProfile/CompanyProfile";
import PostedJobsDesc from "./Pages/PostedJobsDesc/PostedJobsDesc";
import EditJob from "./Pages/CreateAJob/editjob";
import Applicants from "./Pages/Applicants/Applicants";
import Dashboard from "./Pages/Dashboard/dashboard";
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

// Material Imports
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BadgeIcon from '@mui/icons-material/Badge';
import PeopleIcon from '@mui/icons-material/People';
import Logo from "./Assests/navbar/logo.png";
import {background} from "quill/ui/icons";
import {signOut} from "./actions/authAction";
import {connect} from "react-redux";
import Users from "./Pages/Users/Users";
import ApplicantsProfile from "./Pages/ApplicantsProfile/ApplicantsProfile";


const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
);

function App(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (firebase.messaging.isSupported()) {
      const msg = firebase.messaging();
      msg
        .requestPermission()
        .then(() => {
          return msg.getToken();
        })
        .then((data) => {
          localStorage.setItem("dToken", data);
        })
        .catch((e) => {
          console.log("errorrrr", e);
        });
    } else {
      console.log("Not supported");
    }
  });
  return (
      <>
          <Router>
              <Switch>
                  <Route path="/" exact component={Login} />
                  <>
                      <Box sx={{ display: 'flex' }}>
                          <CssBaseline />
                          <AppBar position="fixed" open={open}>
                              <Toolbar className="navbar navbar-expand-lg navbar-light bg-white shadow">
                                  <IconButton
                                      style={{
                                          background: "#FCA120",
                                          color: "#fff",
                                          fontSize: "12px",
                                      }}
                                      aria-label="open drawer"
                                      onClick={handleDrawerOpen}
                                      edge="start"
                                      sx={{
                                          marginRight: 5,
                                          ...(open && { display: 'none' }),
                                      }}
                                  >
                                      <MenuIcon />
                                  </IconButton>
                                  {/*<Typography variant="h6" noWrap component="div">*/}
                                  {/*  Mini variant drawer*/}
                                  {/*</Typography>*/}
                                  <img src={Logo} height="50px" />
                                  <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%',}}>
                                      <div className="col-xs-3">
                                          <div className="btn-group">
                                              <button
                                                  type="button"
                                                  className="btn dropdown-toggle p-0 py-2 px-3"
                                                  data-bs-toggle="dropdown"
                                                  aria-expanded="false"
                                                  id="btn-nav-user"
                                                  style={{ fontSize: "16px", borderRadius: "10px" }}
                                              >
                                                  <i className="far fa-user pr-2"></i>
                                                  {localStorage.getItem("name")}
                                              </button>
                                              <ul className="dropdown-menu">
                                                  <li
                                                      style={{
                                                          fontSize: "16px",
                                                          color: "#707070",
                                                          cursor: "pointer",
                                                      }}
                                                  >
                                                      <a
                                                          className="dropdown-item"
                                                          onClick={() => props.signOut()}
                                                      >
                                                          Logout
                                                      </a>
                                                  </li>
                                              </ul>
                                          </div>
                                      </div>
                                  </div>
                              </Toolbar>
                          </AppBar>
                          <Drawer variant="permanent" open={open}>
                              <DrawerHeader className="navbar navbar-expand-lg shadow" style={{background: 'var(--purple)'}}>
                                  <div>
                                      <IconButton onClick={handleDrawerClose} style={{background: '#FCA120', color: 'var(--white)',}}>
                                          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                                      </IconButton>
                                  </div>
                              </DrawerHeader>
                              {/*<Divider />*/}
                              <List>
                                  <ListItem key={'Dashboard'} disablePadding sx={{ display: 'block' }}>
                                      <ListItemButton
                                          sx={{
                                              minHeight: 48,
                                              justifyContent: open ? 'initial' : 'center',
                                              px: 2.5,
                                          }}
                                          onClick={() => window.location = '/dashboard'}
                                      >
                                          <ListItemIcon
                                              sx={{
                                                  minWidth: 0,
                                                  color: 'var(--purple)',
                                                  mr: open ? 3 : 'auto',
                                                  justifyContent: 'center',
                                              }}
                                          >
                                              <DashboardIcon />
                                          </ListItemIcon>
                                          <ListItemText primary={'Dashboard'} sx={{ opacity: open ? 1 : 0 }} />
                                      </ListItemButton>
                                  </ListItem>
                                  <ListItem key={'Job Search'} disablePadding sx={{ display: 'block' }}>
                                      <ListItemButton
                                          sx={{
                                              minHeight: 48,
                                              justifyContent: open ? 'initial' : 'center',
                                              px: 2.5,
                                          }}
                                          onClick={() => window.location = '/jobs'}
                                      >
                                          <ListItemIcon
                                              sx={{
                                                  minWidth: 0,
                                                  color: 'var(--purple)',
                                                  mr: open ? 3 : 'auto',
                                                  justifyContent: 'center',
                                              }}
                                          >
                                              <BadgeIcon />
                                          </ListItemIcon>
                                          <ListItemText primary={'Job Search'} sx={{ opacity: open ? 1 : 0 }} />
                                      </ListItemButton>
                                  </ListItem>
                                  <ListItem key={'Users'} disablePadding sx={{ display: 'block' }}>
                                      <ListItemButton
                                          sx={{
                                              minHeight: 48,
                                              justifyContent: open ? 'initial' : 'center',
                                              px: 2.5,
                                          }}
                                          onClick={() => window.location = '/users'}
                                      >
                                          <ListItemIcon
                                              sx={{
                                                  minWidth: 0,
                                                  color: 'var(--purple)',
                                                  mr: open ? 3 : 'auto',
                                                  justifyContent: 'center',
                                              }}
                                          >
                                              <PeopleIcon />
                                          </ListItemIcon>
                                          <ListItemText primary={'Users'} sx={{ opacity: open ? 1 : 0 }} />
                                      </ListItemButton>
                                  </ListItem>
                              </List>
                          </Drawer>
                          <Box component="main" sx={{ flexGrow: 1, p: 1, marginTop: 10, }}>
                              <PrivateRoute path="/dashboard" exact component={Dashboard} />
                              <PrivateRoute path="/jobs" exact component={Home} />
                              <PrivateRoute
                                  path="/jobDetail/:id"
                                  exact
                                  component={PostedJobsDesc}
                              />
                              <PrivateRoute
                                  path="/recruiterProfile/:id"
                                  exact
                                  component={CompanyProfile}
                              />
                              <PrivateRoute path="/users" exact component={Users} />
                              <PrivateRoute
                                  path="/userprofile/:id"
                                  exact
                                  component={ApplicantsProfile}
                              />
                              <PrivateRoute path="/editJob/:id" exact component={EditJob} />
                              <PrivateRoute path="/applicants/:id" exact component={Applicants} />
                          </Box>
                      </Box>
                  </>
              </Switch>
          </Router>
      </>
  );
}

const mapDispatchToProps = (dispatch) => ({
    signOut: () => dispatch(signOut()),
});

export default  connect(null, mapDispatchToProps) (App);
