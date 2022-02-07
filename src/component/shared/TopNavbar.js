import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import "../../Assets/css/layout.css";
import Avatar from "@material-ui/core/Avatar";
import Logout from "../Logout";
import Setting from "../Setting";
import avator from "../../Assets/images/profilePic.png";
import ListItem from "@material-ui/core/ListItem";
import { Link } from "react-router-dom";
import { LogOut, Settings } from "react-feather";
import { ImageBaseUrl, UserProfileTokenId } from "../../Constants/BusinessManager";
import { getUser } from "../../Utils/Utils";

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
      // backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

function TopNavbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  let user = getUser();
  return (
    <div className="topbarDiv">
      <Button
        className="avator-btn"
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <Avatar alt="User" src={avator}/>
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* <StyledMenuItem>
          <ListItemIcon>]
            <img alt="User" src={user?(!user.ProfileImage||user.ProfileImage===""?avator:ImageBaseUrl+user.ProfileImage):avator} className="userMenuIcon" width={40} />
          </ListItemIcon>
          <Link to="/Profile">
            <ListItemText primary={user?(!user.Email||user.Email===""?"Email":user.Email):"EMAIL"} />{" "}
          </Link>
        </StyledMenuItem>
        <hr style={{ marginTop: 0 }} />

        <StyledMenuItem>
          <ListItemIcon>
            <Settings className="userMenuIcon" width={30}></Settings>
          </ListItemIcon>
          <Link to="/Setting">
            <ListItemText primary="Settings" />{" "}
          </Link>
        </StyledMenuItem>
        <hr style={{ marginTop: 0 }} /> */}
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
export default TopNavbar;
