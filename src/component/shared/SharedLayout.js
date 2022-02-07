import React, { Component } from "react";
import "../../Assets/css/layout.css";
import swal from "sweetalert";
import { SendHttpRequest } from "../../component/utility";
import {
  addWallets,
  setFocused,
  setToken,
  setApiInterval,
  setIsLoaderActive,
  setDefaults,
} from "../../actions/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Route, withRouter, Redirect } from "react-router-dom";
import {
  BaseUrl,
  TradeUrl,
  AuthenticationTokenId,
  DefaultCurrencyTokenId,
  UserAuthTokenId,
  UserProfileTokenId,
  UserTypeTokenId,
  UserDetailId,
} from "../../Constants/BusinessManager";
import ResponsiveDrawer from "../shared/ResponsiveDrawer";
import ProExchange from "../ProExchange";
import { getToken } from "../../Utils/Utils";

const mapStateToProps = (state) => {
  return {
    Wallets: state.Wallets,
    Focused: state.Focused,
    Token: state.Token,
    Interval: state.Interval,
    Defaults: state.Defaults,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addWallets: bindActionCreators(addWallets, dispatch),
    setFocused: bindActionCreators(setFocused, dispatch),
    setToken: bindActionCreators(setToken, dispatch),
    setApiInterval: bindActionCreators(setApiInterval, dispatch),
    setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
    setDefaults: bindActionCreators(setDefaults, dispatch),
  };
};

class SharedLayout extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      redirectNow:false,
      redirectUrl:"/SignIn"
    }
  }
  
  clearSession() {
    localStorage.removeItem(AuthenticationTokenId);
    localStorage.removeItem(UserAuthTokenId);
    localStorage.removeItem(UserProfileTokenId);
    localStorage.removeItem(UserTypeTokenId);
    localStorage.removeItem(UserDetailId);
    localStorage.removeItem(DefaultCurrencyTokenId);
    this.props.addWallets({});
    this.props.setToken("");
    clearInterval(this.props.Interval);
    this.props.setIsLoaderActive(false);
    var s = this.props.location;
    if ((s.pathname + "").includes("ref")) {
      s.search = (s.pathname + "").split("?ref=")[1];
      s.pathname = "";
    }
    var rUrl="/SignIn";
    this.setState({redirectUrl:rUrl,redirectNow:true});
    // this.props.history.push();
    this.setState({})
  }
  GetWallet = async (token) => {
    try {
      var t = getToken();
      var data = await SendHttpRequest(
        BaseUrl + "GetWalletData",
        { Token: t },
        "POST"
      );
      let cur = localStorage.getItem(DefaultCurrencyTokenId);
      if (cur && cur !== "") {
        if (!this.props.Defaults.DefaultCurrencyId) {
          this.props.setDefaults({ DefaultCurrencyId: cur });
        }
      }
      if (data.Success) {
        let IsBusy = false;
        this.props.addWallets(data.Data);
        var i = setInterval(async () => {
          if (!IsBusy) {
            if (
              !getToken() ||
              getToken() === ""
            ) {
              swal({
                icon: "error",
                text: "Session timeout re-login",
              });
              this.clearSession();
            }
            IsBusy = true;
            var data = await SendHttpRequest(
              BaseUrl + "GetWalletData",
              { Token: getToken() },
              "POST"
            );
            if (data.Success === true) {
              IsBusy = false;
              this.props.setToken(getToken());
              this.props.addWallets(data.Data);
            } else if (data.Success === false) {
              if (data.Exception === "Token Invalid") {
                swal({
                  icon: "error",
                  text: "Session timeout re-login",
                });
                this.clearSession();
              }
              IsBusy = false;
            } else {
              IsBusy = false;
            }
          }
        }, 4000);
        this.props.setIsLoaderActive(false);
        return this.props.setApiInterval(i);
      } else {
        throw new Error("Something went wrong try again later,");
      }
    } catch (error) {
      this.props.setIsLoaderActive(false);
      throw error;
    }
  };
  async componentDidMount() {
    // try {
      //  if(this.props.Token!==""&&this.props.Token)
      //  {
    //   if (!this.props.Wallets.Wallets) {
    //     this.props.setIsLoaderActive(true);
    //   }
    //   await this.GetWallet("");
    //   this.props.setIsLoaderActive(false);
    //   return;
    // } catch (error) {
    //   this.props.setIsLoaderActive(false);
    //   this.clearSession();
    //   return swal({
    //     icon: "error",
    //     text: "Session timeout re-login",
    //   });
    // }
  }
 
  componentWillUnmount() {
    clearInterval(this.props.Interval);
  }

  render() {
    // let showPro = this.props.location.pathname
    // ? this.props.location.pathname === "/ProExchange"
    //   ? true
    //   : false
    // : false;
    return (
      <>
      {/* <ProExchange show={showPro}/>  */}
      {/* {this.state.redirectNow&&<Redirect to={this.state.redirectUrl} />} */}
      {/* <span style={{display:showPro?"none":""}}> */}
      <ResponsiveDrawer>
        {this.props.children}
      </ResponsiveDrawer>
      {/* </span> */}
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SharedLayout));
