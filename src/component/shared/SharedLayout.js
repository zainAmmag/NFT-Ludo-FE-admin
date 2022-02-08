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
  setMetamaskAction,
} from "../../actions/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Route, withRouter, Redirect } from "react-router-dom";
import {
  BaseUrl,
  AuthenticationTokenId,
  DefaultCurrencyTokenId,
  UserAuthTokenId,
  UserProfileTokenId,
  UserTypeTokenId,
  UserDetailId,
} from "../../Constants/BusinessManager";
import ResponsiveDrawer from "../shared/ResponsiveDrawer";
import { getToken } from "../../Utils/Utils";
import { connectMetaMaskaction } from "../../metamask/metamask";

const mapStateToProps = (state) => {
  return {
    walletData: state.metamaskData
    // Wallets: state.Wallets,
    // Focused: state.Focused,
    // Token: state.Token,
    // Interval: state.Interval,
    // Defaults: state.Defaults,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    metamaskAction: bindActionCreators(setMetamaskAction, dispatch),
    setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
    addWallets: bindActionCreators(addWallets, dispatch),
    setFocused: bindActionCreators(setFocused, dispatch),
    setToken: bindActionCreators(setToken, dispatch),
    setApiInterval: bindActionCreators(setApiInterval, dispatch),
    setDefaults: bindActionCreators(setDefaults, dispatch),
  };
};

class SharedLayout extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      redirectNow: false,
      redirectUrl: "/SignIn"
    }
  }

  // clearSession() {
  //   localStorage.removeItem(AuthenticationTokenId);
  //   localStorage.removeItem(UserAuthTokenId);
  //   localStorage.removeItem(UserProfileTokenId);
  //   localStorage.removeItem(UserTypeTokenId);
  //   localStorage.removeItem(UserDetailId);
  //   localStorage.removeItem(DefaultCurrencyTokenId);
  //   this.props.addWallets({});
  //   this.props.setToken("");
  //   clearInterval(this.props.Interval);
  //   this.props.setIsLoaderActive(false);
  //   var s = this.props.location;
  //   if ((s.pathname + "").includes("ref")) {
  //     s.search = (s.pathname + "").split("?ref=")[1];
  //     s.pathname = "";
  //   }
  //   var rUrl="/SignIn";
  //   this.setState({redirectUrl:rUrl,redirectNow:true});
  //   // this.props.history.push();
  //   this.setState({})
  // }

  // GetWallet = async (token) => {
  //   try {
  //     var t = getToken();
  //     var data = await SendHttpRequest(
  //       BaseUrl + "GetWalletData",
  //       { Token: t },
  //       "POST"
  //     );
  //     let cur = localStorage.getItem(DefaultCurrencyTokenId);
  //     if (cur && cur !== "") {
  //       if (!this.props.Defaults.DefaultCurrencyId) {
  //         this.props.setDefaults({ DefaultCurrencyId: cur });
  //       }
  //     }
  //     if (data.Success) {
  //       let IsBusy = false;
  //       this.props.addWallets(data.Data);
  //       var i = setInterval(async () => {
  //         if (!IsBusy) {
  //           if (
  //             !getToken() ||
  //             getToken() === ""
  //           ) {
  //             swal({
  //               icon: "error",
  //               text: "Session timeout re-login",
  //             });
  //             this.clearSession();
  //           }
  //           IsBusy = true;
  //           var data = await SendHttpRequest(
  //             BaseUrl + "GetWalletData",
  //             { Token: getToken() },
  //             "POST"
  //           );
  //           if (data.Success === true) {
  //             IsBusy = false;
  //             this.props.setToken(getToken());
  //             this.props.addWallets(data.Data);
  //           } else if (data.Success === false) {
  //             if (data.Exception === "Token Invalid") {
  //               swal({
  //                 icon: "error",
  //                 text: "Session timeout re-login",
  //               });
  //               this.clearSession();
  //             }
  //             IsBusy = false;
  //           } else {
  //             IsBusy = false;
  //           }
  //         }
  //       }, 4000);
  //       this.props.setIsLoaderActive(false);
  //       return this.props.setApiInterval(i);
  //     } else {
  //       throw new Error("Something went wrong try again later,");
  //     }
  //   } catch (error) {
  //     this.props.setIsLoaderActive(false);
  //     throw error;
  //   }
  // };

  // componentWillUnmount() {
  //   clearInterval(this.props.Interval);
  // }


  componentDidUpdate() {
    if (this.props.walletData?.chainId !== "0x61") {
      swal({
        icon: "error",
        text: "Please connect to Smart Chain-Testnet",
      });
    }
  }



  metamaskConnection() {
    connectMetaMaskaction().then((resp) => {
      this.props.metamaskAction(resp)

    }).catch(() => {
      swal({
        icon: "error",
        text: "Metamask connection error",
      });
    })
  }

  // componentDidMount() {
  // }



  componentDidMount(){
    this.metamaskConnection();

    return window.ethereum?.on("chainChanged", function (accounts) {
      if (accounts !== "0x61") {
        swal({
          icon: "error",
          text: "Please connect to Smart Chain-Testnet",
        });
      }

    });
  }














  render() {
    return (
      <>
        <ResponsiveDrawer>
          {this.props.children}
        </ResponsiveDrawer>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SharedLayout));
