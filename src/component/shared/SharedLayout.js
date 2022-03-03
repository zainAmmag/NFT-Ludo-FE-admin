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
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

const mapStateToProps = (state) => {
  return {
    walletData: state.metamaskData
  
  };
};

const mapDispatchToProps = (dispatch) => {

  return {
    metamaskAction: bindActionCreators(setMetamaskAction, dispatch),
    setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),

  };
};

class SharedLayout extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      metamaskData: {},
      redirectNow: false,
      redirectUrl: "/SignIn"
    }
  }


  componentDidUpdate(prevProps, prevState) {
    if (this.state.metamaskData != prevState.metamaskData) {
      this.props.metamaskAction(this.state.metamaskData)
    }
  }


  metamaskConnection() {
    connectMetaMaskaction().then((resp) => {
      this.setState({ metamaskData: resp })

    }).catch(() => {
      swal({
        icon: "error",
        text: "Metamask connection error",
      });
    })
  }

  async componentDidMount() {
    this.metamaskConnection();
    const provider = await detectEthereumProvider();

    if (provider !== window.ethereum) {
      window.web3 = new Web3(provider);
    } else {
      window.web3 = new Web3(window.ethereum);
    }

    return window.ethereum?.on("chainChanged", async function (accounts) {
       
      if (accounts !== "0x61") {
        const chainId = window.ethereum.chainId;
        const accountss = await window.web3.eth.getAccounts();
        const balance = await window.web3.eth.getBalance(accountss[0])
        const metamaskData = { chainId, accounts: accountss, balance }
        this.setState({ metamaskData })
        swal({
          icon: "error",
          text: " Select correct Blockchain",
          buttons: false ,
          closeOnClickOutside: false
        });
      }
      else
      {
        swal({
          icon: "error",
          text: " Select correct Blockchain",
          buttons: false ,
          timer:500,
          closeOnClickOutside: false
        });
      }
    }.bind(this));
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
