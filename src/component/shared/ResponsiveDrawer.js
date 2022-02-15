import React, { Component, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import Logo from "../../Assets/images/iconm.png";
import LogoCustomer from "../../Assets/images/icon.png";

import AppBar from "@material-ui/core/AppBar";

import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import {ChevronRight,ChevronDown,Clipboard,Users,HardDrive,Truck,FilePlus,Columns,} from "react-feather";

import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import "../../Assets/css/layout.css";
import TopNavbar from "../shared/TopNavbar";
import "../../Assets/js/app-script";
import $ from "jquery";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { Breadcrumbs, Typography } from '@material-ui/core';
// import { Breadcrumbs } from "material-ui-breadcrumbs";


// import '../../Assets/css/app-style.css'
import {
  BaseUrl,
  TradeUrl,
  AuthenticationTokenId,
  UserTypeTokenId,
  UserProfileTokenId,
  LogoSmall,
} from "../../Constants/BusinessManager";
import { getToken } from "../../Utils/Utils";



const routes = [
  {
    path:'/ProjectManagement',
    main:()=> <h2>ProjectManagement</h2>
  },
  {
    path:'/manageAccount',
    main:()=> <h2>ManageAccount</h2>
  },
  {
    path:'/orderDetail',
    main:()=> <h2>OrderDetail</h2>
  },
  {
    path:'/manageCollection',
    main:()=> <h2>ManageCollection</h2>
  },
  {
    path:'/createNFT',
    main:()=> <h2>CreateNFT</h2>
  },
]

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: "15px",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));


   
function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [openExchange, setOpenExchange] = React.useState(false);
  const [openSecurity, setOpenSecurity] = React.useState(false);
  const [openHistory, setOpenHistory] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isActive, setisActive] = React.useState(false);
  const [isActive1, setisActive1] = React.useState(false);
  const [isActive2, setisActive2] = React.useState(false);
  const [isActive3, setisActive3] = React.useState(false);
  const [isActive4, setisActive4] = React.useState(false);
  
  useEffect(()=>{
    console.log("loc", routes[0].path)
  })
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  // let isM = getToken();
  const iconStyling = {
    position: "absolute",
    display: "none",
    top: "5px",
    right: "10px",
    margin: "9px 8px",
  };

  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

  const drawer = (
    <div>
      {/* <div role="presentation" onClick={handleClick}> */}
     
        <List>
          <ListItem className="breadcrumb">
            <div className="user-details w-100">
              <div className="avatar">
                <Link to="/ProjectManagement">
                  <h1>DOXPAD</h1>
                </Link>
              </div>
            </div>
          </ListItem>

          <ListItem  onClick={()=>{ 
              setisActive(true);  
              setisActive1(false); 
              setisActive2(false);
              setisActive3(false);
              setisActive4(false);
              }}  
              className={isActive ? 'waves-effect active': 'waves-effect'} >
            <Link id='1' to="/ProjectManagement" className="waves-effect">
              <Clipboard className="sidebarIcons mt-5" color="white" size={30} />
              <p className="LINK_OVERVIEW">Project Management</p>
            </Link>
            </ListItem>

          <ListItem onClick={()=>{ 
              setisActive(false);  
              setisActive1(true); 
              setisActive2(false);
              setisActive3(false);
              setisActive4(false);
              }} 
            className={isActive1 ? 'waves-effect active': 'waves-effect'}>
            <Link id='2' to="/manageAccount"className="waves-effect" >

              <Users className="sidebarIcons mt-5" color="white" size={30} />
              <p className="LINK_OVERVIEW">Manage Account</p>
            </Link>
          </ListItem>


          <ListItem 
            onClick={()=>{ 
              setisActive(false);  
              setisActive1(false); 
              setisActive2(true);
              setisActive3(false);
              setisActive4(false);
              }}
            className={isActive2 ? 'waves-effect active': 'waves-effect'}>
            <Link id='3' to="/orderDetail" className="waves-effect">

              <Truck className="sidebarIcons mt-5" color="white" size={30} />
              <p className="LINK_OVERVIEW">Manage Orders</p>
            </Link>
          </ListItem>


          <ListItem 
            onClick={()=>{ 
              setisActive(false);  
              setisActive1(false); 
              setisActive2(false);
              setisActive3(true);
              setisActive4(false);
              }}
            className={isActive3 ? 'waves-effect active': 'waves-effect'}>
            <Link id='4' to="/manageCollection" className="waves-effect">

              <Columns className="sidebarIcons mt-5" color="white" size={30} />
              <p className="LINK_OVERVIEW">Manage Collection</p>
            </Link>
          </ListItem>



          <ListItem  
            onClick={()=>{ 
              setisActive(false);  
              setisActive1(false); 
              setisActive2(false);
              setisActive3(false);
              setisActive4(true);
              }}
            className={isActive4 ? 'waves-effect active': 'waves-effect'}>
            <Link id='5' to="/ManageNFt" className="waves-effect">
              <FilePlus className="sidebarIcons mt-5" color="white" size={30} />
              <p className="LINK_OVERVIEW">Create NFT</p>
            </Link>
          </ListItem>
        </List>
        {/* {
          routes.map((route)=>{
            <Route 
            key={route.path}
            path={route.path}
            exact={route.exact}
            >
              <route.main/>
              </Route>
          })
        } */}
      {/* </Breadcrumbs> */}
      <Divider />
      
      </div>
    // </div>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <img alt="Logo" src={require("../../Assets/Icons/menu.png")}></img>
          </IconButton>
          <TopNavbar />
        </Toolbar>
      </AppBar>
      <nav
        className={classes.drawer}
        aria-label="mailbox folders"
        style={{ background: "transparent", boxShadow: "none" }}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content} id="yoo">
        {props.children}

        {/* <BasicExchange show={showBasic} />  */}
      </main>
      <div className="right-sidebar" style={{ zIndex: "999999" }}>
        <div className="switcher-icon">
          <i className="fa fa-cog" style={{ marginTop: "8px" }} />
        </div>
        <div className="right-sidebar-content">
          <p className="mb-0">Gaussion Texture</p>
          <hr style={{ marginBottom: 9, marginTop: 4 }} />
          <ul className="switcher">
            <li id="theme1" />
            <li id="theme2" />
            <li id="theme3" />
            <li id="theme4" />
            <li id="theme5" />
            <li id="theme6" />
          </ul>
          <p className="mb-0">Gradient Background</p>
          <hr style={{ marginBottom: 9, marginTop: 4 }} />
          <ul className="switcher">
            <li id="theme7" />
            <li id="theme8" />
            <li id="theme9" />
            <li id="theme10" />
            <li id="theme11" />
            <li id="theme12" />
          </ul>
        </div>
      </div>
    </div>
  );
}
export default withRouter(ResponsiveDrawer);
