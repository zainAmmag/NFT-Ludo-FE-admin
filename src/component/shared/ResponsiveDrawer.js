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
import {
  ChevronRight,
  ChevronDown,
  Clipboard,
  Users,
  HardDrive,
} from "react-feather";
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

// import '../../Assets/css/app-style.css'
import {
  BaseUrl,
  TradeUrl,
  AuthenticationTokenId,
  UserTypeTokenId,
  UserProfileTokenId,
  LogoSmall,
} from "../../Constants/BusinessManager";
import BasicExchange from "../BasicExchange";
import ProExchange from "../ProExchange";
import { getToken } from "../../Utils/Utils";

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
  // useEffect(() => {
  //   $(function () {
  //     $(function () {
  //       //$('[data-toggle="tooltip"]').tooltip()
  //       let theme = localStorage.getItem("bg-theme");
  //       if (theme === "" || theme === null || !theme) {
  //       } else {
  //         $("body").attr("class", "bg-theme " + theme);
  //       }
  //     });

  //     // theme setting
  //     $(".switcher-icon").on("click", function (e) {
  //       //e.preventDefault();
  //       $(".right-sidebar").toggleClass("right-toggled");
  //     });

  //     $("#theme1").click(theme1);
  //     $("#theme2").click(theme2);
  //     $("#theme3").click(theme3);
  //     $("#theme4").click(theme4);
  //     $("#theme5").click(theme5);
  //     $("#theme6").click(theme6);
  //     $("#theme7").click(theme7);
  //     $("#theme8").click(theme8);
  //     $("#theme9").click(theme9);
  //     $("#theme10").click(theme10);
  //     $("#theme11").click(theme11);
  //     $("#theme12").click(theme12);

  //     function theme1() {
  //       localStorage.setItem("bg-theme", "bg-theme1");
  //       $("body").attr("class", "bg-theme bg-theme1");
  //     }

  //     function theme2() {
  //       localStorage.setItem("bg-theme", "bg-theme2");
  //       $("body").attr("class", "bg-theme bg-theme2");
  //     }

  //     function theme3() {
  //       localStorage.setItem("bg-theme", "bg-theme3");
  //       $("body").attr("class", "bg-theme bg-theme3");
  //     }

  //     function theme4() {
  //       localStorage.setItem("bg-theme", "bg-theme4");
  //       $("body").attr("class", "bg-theme bg-theme4");
  //     }

  //     function theme5() {
  //       localStorage.setItem("bg-theme", "bg-theme5");
  //       $("body").attr("class", "bg-theme bg-theme5");
  //     }

  //     function theme6() {
  //       localStorage.setItem("bg-theme", "bg-theme6");
  //       $("body").attr("class", "bg-theme bg-theme6");
  //     }

  //     function theme7() {
  //       localStorage.setItem("bg-theme", "bg-theme7");
  //       $("body").attr("class", "bg-theme bg-theme7");
  //     }

  //     function theme8() {
  //       localStorage.setItem("bg-theme", "bg-theme8");
  //       $("body").attr("class", "bg-theme bg-theme8");
  //     }

  //     function theme9() {
  //       localStorage.setItem("bg-theme", "bg-theme9");
  //       $("body").attr("class", "bg-theme bg-theme9");
  //     }

  //     function theme10() {
  //       localStorage.setItem("bg-theme", "bg-theme10");
  //       $("body").attr("class", "bg-theme bg-theme10");
  //     }

  //     function theme11() {
  //       localStorage.setItem("bg-theme", "bg-theme11");
  //       $("body").attr("class", "bg-theme bg-theme11");
  //     }

  //     function theme12() {
  //       localStorage.setItem("bg-theme", "bg-theme12");
  //       $("body").attr("class", "bg-theme bg-theme12");
  //     }
  //   });
  // });
  const drawer = (
    <div>
      {/* <div className={classes.toolbar} /> */}

      <List>
        <ListItem>
          <div className="user-details w-100">
            <div className="avatar">
              <Link to="/ProjectManagement">
                {/* <img
                  className="side-user-img"
                  src={LogoSmall}
                  style={{ width: "200" }}
                  alt="user avatar"
                /> */}
                <h1>DOXPAD</h1>
                {/* <Clipboard  color="white" size={18} style={iconStyling} /> */}
              </Link>
            </div>
          </div>
        </ListItem>
        <ListItem>
          <Link to="/ProjectManagement" className="waves-effect">
            {/* <img
              className="sidebarIcons"
              src={require("../../Assets/Icons/desktop.png")}
              alt="desktop"
            />{" "} */}
            <Clipboard className="sidebarIcons mt-5" color="white" size={30} />
            <p className="LINK_OVERVIEW">Project Management</p>
          </Link>
        </ListItem>

        <ListItem>
          <Link to="/manageAccount" className="waves-effect">
            {/* <img
              className="sidebarIcons"
              src={require("../../Assets/Icons/desktop.png")}
              alt="desktop"
            />{" "} */}
            <Clipboard className="sidebarIcons mt-5" color="white" size={30} />
            <p className="LINK_OVERVIEW">Manage Account</p>
          </Link>
        </ListItem>


        <ListItem>
          <Link to="/managerOrder" className="waves-effect">
            {/* <img
              className="sidebarIcons"
              src={require("../../Assets/Icons/desktop.png")}
              alt="desktop"
            />{" "} */}
            <Clipboard className="sidebarIcons mt-5" color="white" size={30} />
            <p className="LINK_OVERVIEW">Manage Orders</p>
          </Link>
        </ListItem>


        <ListItem>
          <Link to="/manageCollection" className="waves-effect">
            {/* <img
              className="sidebarIcons"
              src={require("../../Assets/Icons/desktop.png")}
              alt="desktop"
            />{" "} */}
            <Clipboard className="sidebarIcons mt-5" color="white" size={30} />
            <p className="LINK_OVERVIEW">Manage Collection</p>
          </Link>
        </ListItem>
        {/* to="/UserManagement" className="waves-effect"> */}
        {/* <img
              className="sidebarIcons"
              src={require("../../Assets/Icons/desktop.png")}
              alt="desktop"
            />{" "} */}
        {/* <Users className="sidebarIcons mt-5"  color="white" size={30} />
            <p className="LINK_OVERVIEW">User Management</p>
          </Link>
        </ListItem> */}
        {/* <ListItem>
          <Link to="/MasterSupplyWallet" className="waves-effect"> */}
        {/* <img
              className="sidebarIcons"
              src={require("../../Assets/Icons/desktop.png")}
              alt="desktop"
            />{" "} */}
        {/* <HardDrive className="sidebarIcons mt-5"  color="white" size={30} />
            <p className="LINK_OVERVIEW">Master Supply Wallet</p>
          </Link>
        </ListItem> */}
        <Divider />
        {/* <ListItem>
          <Link to="/Wallets" className="waves-effect">
            <img
              className="sidebarIcons"
              src={require("../../Assets/Icons/wallet_1.png")}
            />
            <p className="LINK_WALLET">Wallet</p>
          </Link>
        </ListItem>
        <Divider />
        <ListItem>
          <Link to="/Asset" className="waves-effect">
            <img
              className="sidebarIcons"
              src={require("../../Assets/Icons/asset-icon.png")} style={{width:"27%"}}
            />
            <p className="LINK_ASSET">Asset</p>
          </Link>
        </ListItem>
        <Divider /> */}
        {/* {isM === "true" ? (
          <ListItem>
            <Link to="/WalaGate" className="waves-effect">
              <img
                className="sidebarIcons"
                alt="icon"
                style={{ width: "22%" }}
                src={require("../../Assets/Icons/qr2.png")}
              />
              <p className="LINK_WALLET">QuantGate</p>
            </Link>
          </ListItem>
        ) : null}
        {isM === "false" ? (
          <ListItem>
            <Link to="/PayWala" className="waves-effect">
              <img
                className="sidebarIcons"
                alt="icon"
                style={{ width: "22%" }}
                src={require("../../Assets/Icons/qr2.png")}
              />
              <p className="LINK_WALLET">payWala</p>
            </Link>
          </ListItem>
        ) : null}
        <Divider /> */}
        {/* 
        <ListItem button onClick={handleClickExchange} className="waves-effect">
          <div className="waves-effect">
            <img
              className="sidebarIcons"
              src={require("../../Assets/Icons/exchange.png")}
            />
            <p className="LINK_EXCHANGE ">Exchange</p>
            {openExchange ? (
              <ChevronDown color="white" size={18} style={iconStyling} />
            ) : (
              <ChevronRight color="white" size={18} style={iconStyling} />
            )}
          </div>
        </ListItem>
        <Collapse in={openExchange} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem>
              <Link to="/BasicExchange" className="waves-effect">
                <p className="LINK_WALLET" style={{ fontSize: 15 }}>
                  Basic exchange
                </p>
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/ProExchange" className="waves-effect">
                <p className="LINK_WALLET" style={{ fontSize: 15 }}>
                  Pro exchange
                </p>
              </Link>
            </ListItem>
          </List>
        </Collapse>

        <Divider />
        <ListItem>
          <Link to="/MarketPlace" className="waves-effect">
            <img
              className="sidebarIcons"
              src={require("../../Assets/Icons/market.png")}
              alt="desktop"
            />{" "}
            <p className="">Market</p>
          </Link>
        </ListItem>
        <Divider />
        <ListItem button onClick={handleClickSecurity} className="waves-effect">
          <div className="waves-effect">
            <img
              className="sidebarIcons"
              src={require("../../Assets/Icons/security.png")}
            />
            <p className="LINK_SECURITY ">Security</p>
            {openExchange ? (
              <ChevronDown color="white" size={18} style={iconStyling} />
            ) : (
              <ChevronRight color="white" size={18} style={iconStyling} />
            )}
          </div>
        </ListItem>
        <Collapse in={openSecurity} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem>
              <Link to="/KYC" className="waves-effect">
                <p className="LINK_WALLET" style={{ fontSize: 15 }}>
                  KYC
                </p>
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/TwoFactorAuthentication" className="waves-effect">
                <p className="LINK_WALLET" style={{ fontSize: 15 }}>
                  Two Factor Authentication
                </p>
              </Link>
            </ListItem>
          </List>
        </Collapse>
        <Divider />

        <ListItem button onClick={handleClickHistory} className="waves-effect">
          <div className="waves-effect">
            <img
              className="sidebarIcons"
              src={require("../../Assets/Icons/transaction.png")}
            />
            <p className="LINK_SECURITY ">History</p>
            {openExchange ? (
              <ChevronDown color="white" size={18} style={iconStyling} />
            ) : (
              <ChevronRight color="white" size={18} style={iconStyling} />
            )}
          </div>
        </ListItem>
        <Collapse in={openHistory} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem>
              <Link to="/Invoice" className="waves-effect">
                <p className="LINK_WALLET" style={{ fontSize: 15 }}>
                  Invoices
                </p>
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/RecentTransaction" className="waves-effect">
                <p className="LINK_WALLET" style={{ fontSize: 15 }}>
                  Transactions
                </p>
              </Link>
            </ListItem>
          </List>
        </Collapse>
        <Divider /> */}
      </List>
      <Divider />
    </div>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;
  //debugger;
  // let showBasic = props.location.pathname
  //   ? props.location.pathname === "/BasicExchange"
  //     ? true
  //     : false
  //   : false;
  // let showPro = props.location.pathname
  //   ? props.location.pathname === "/ProExchange"
  //     ? true
  //     : false
  //   : false;
  // if (showPro===true&&mobileOpen===false) {
  //   setMobileOpen(!mobileOpen);
  // }
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
      {/* <div className="right-sidebar" style={{ zIndex: "999999" }}>
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
      </div> */}
    </div>
  );
}
export default withRouter(ResponsiveDrawer);
