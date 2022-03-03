import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import "../../Assets/css/layout.css";
import Avatar from "@material-ui/core/Avatar";
import Logout from "../Logout";
import avator from "../../Assets/images/profilePic.png";
import { LogOut, Settings, Bell } from "react-feather";
import { getUser } from "../../Utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import { setMetamaskAction } from "../../actions";
import { connectMetaMaskaction } from "../../metamask/metamask";
import swal from "sweetalert";
import { Badge } from "@material-ui/core";
// import { Route, Router } from "react-router-dom";
import CollapsedBreadcrumbs from "../breadcrumb";


// const routes = [
//   {
//     path:'/ProjectManagement',
//     main:()=> <h2>ProjectManagement</h2>
//   },
//   {
//     path:'/manageAccount',
//     main:()=> <h2>ManageAccount</h2>
//   },
//   {
//     path:'/orderDetail',
//     main:()=> <h2>OrderDetail</h2>
//   },
//   {
//     path:'/manageCollection',
//     main:()=> <h2>ManageCollection</h2>
//   },
//   {
//     path:'/createNFT',
//     main:()=> <h2>CreateNFT</h2>
//   },

// ]


const StyledMenu = withStyles({
  paper: {
    // border: "1px solid #d3d4d5",
    backgroundColor: "black !important",
    width: 230,
    left: 1155,
    top: "60px !important",
    color: "#fff !important",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    height: 75,
    padding: "0 !important",
    "&:focus": {
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

function TopNavbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const walletDataSelector = useSelector(state => state?.metamaskData)
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (walletDataSelector?.accounts) {

      setIsMetamaskConnected(true)
    }

    else {
      setIsMetamaskConnected(false)
    }

  }, [walletDataSelector]);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (

    <div className="topbarDiv">
           <div style={{}}>
      <CollapsedBreadcrumbs/>
        </div>
      {/* <Badge badgeContent={4} color="primary" className="mr-3" style={{marginTop:"-6%"}} >
        <Bell />
      </Badge> */}

      <Button
        className="mr-2 mr-t-7"
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={() => {
          if (!isMetamaskConnected) {
             connectMetaMaskaction().then((resp) => {
              dispatch(setMetamaskAction(resp))
            }).catch(() => {
              alert("metamask connection error")
            })
          }
        }}
        color="secondary" style={{background:"#308afb"}} >
        {isMetamaskConnected ? walletDataSelector?.accounts[0].substr(0, 10) : "Connect Metamask"}
      </Button>

      <Button
        className="avator-btn mr-t-7"
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <Avatar alt="User" src={avator} />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Logout>
          <StyledMenuItem className="topbarDrop">
            <ListItemIcon>
              <LogOut className="userMenuIcon" width={30}></LogOut>
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </StyledMenuItem>
        </Logout>
      </StyledMenu>
      
    </div>
  );
}
const mapStatesToProps = (state) => {
  return ({
    walletData: state
  })
}
const mapDispatchToProps = () => {

}
export default TopNavbar;
