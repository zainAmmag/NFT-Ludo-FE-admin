import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  AuthenticationTokenId,
} from "../Constants/BusinessManager";
import { setIsLoaderActive, addWallets } from "../actions/index";

import { withRouter } from "react-router-dom";

function mapStateToProps(state) {
  return {
    Interval: state.Interval,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
    addWallets: bindActionCreators(addWallets, dispatch),
  };
}

class Logout extends Component {
  render() {
    return (
      <div
        style={{ cursor: "pointer" }}
        onClick={this.LogoutHandler.bind(this)}
      >
        {this.props.children}
      </div>
    );
  }
  clearSession() {
    localStorage.removeItem(AuthenticationTokenId);
    localStorage.clear();
    this.props.addWallets({});
    //this.props.setToken("");
    clearInterval(this.props.Interval);
    this.props.setIsLoaderActive(false);
    this.props.history.push("/SignIn")
  }
  LogoutHandler() {
    this.props.setIsLoaderActive(true);
    let token = localStorage.getItem(AuthenticationTokenId);
    if (!token || (token === "") | (token === null)) {
      this.clearSession();
    } else {
      try {
        this.clearSession();
      } catch (error) {
        this.clearSession();
      }
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));
