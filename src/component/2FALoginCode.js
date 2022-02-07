import React, { useState } from "react";
//import { Link, useHistory, withRouter, Redirect } from "react-router-dom";
import swal from "sweetalert";
import { Lock, Mail, Eye, EyeOff } from "react-feather";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
//import IsMerchant from "../component/ApplicationType";
import { SendHttpRequest } from "../component/utility";
import {
  addWallets,
  setFocused,
  setToken,
  setIntervalStarted,
  setDefaults,
  setIsLoaderActive,
  setIsMerchant,
} from "../actions/index";
import Logo from "../Assets/images/icon.png";
import {
  BaseUrl,
  AuthenticationToken,
  DefaultCurrencyTokenId,
  AuthenticationTokenId,
  UserTypeTokenId,
} from "../Constants/BusinessManager";
const mapStateToProps = (state) => {
  return { Wallets: state.Wallets, Focused: state.Focused, Token: state.Token };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addWallets: bindActionCreators(addWallets, dispatch),
    setFocused: bindActionCreators(setFocused, dispatch),
    setToken: bindActionCreators(setToken, dispatch),
    setDefaults: bindActionCreators(setDefaults, dispatch),
    setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
    setIsMerchant: bindActionCreators(setIsMerchant, dispatch),
  };
};
class TwoFaLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = { Code: "" };
  }
  componentDidMount() {}

  async Check2FA() {
    if (!this.state.Code || this.state.Code === "") {
      return swal({
        text: "Please enter code",
        icon: "warning",
      });
    }
    try {
      this.props.setIsLoaderActive(true);
      let response = await SendHttpRequest(
        BaseUrl + "Enable2FAAuth",
        {
          Token: this.props.token,
          Code: this.state.Code,
        },
        "POST"
      );
      if (response.Success) {
        this.props.onAuthorize();
      } else {
        this.props.setIsLoaderActive(false);
        return swal({
          text: "Wrong code entered",
          icon: "warning",
        });
      }
    } catch (error) {
      this.props.setIsLoaderActive(false);
      return swal({
        text: "Something went wrong try later",
        icon: "error",
      });
    }
  }
  render() {
    const iconStyling = {
      position: "absolute",
      display: "flex",
      margin: "9px 8px",
    };
    return (
      <div id="wrapper">
        <div className="card card-authentication1 mx-auto my-5">
          <div className="card-body">
            <div className="card-content p-2">
              <div className="text-center">
                <img src={Logo} width="100" alt="logo icon" />
              </div>
              <div className="card-title text-uppercase text-center py-3">
                Two factor authentication
              </div>
              <div className="form-group">
                <div className="position-relative has-icon-right">
                  <input
                    type="text"
                    placeholder="Enter Code"
                    className="form-control input-shadow"
                    onChange={(params) => {
                      this.setState({ Code: params.target.value });
                    }}
                  />
                  <div className="form-control-position">
                    <i className="icon-user"></i>
                  </div>
                </div>
              </div>

              <button
                className="create-btn"
                style={{ fontWeight: "bold", letterSpacing: 1 }}
                onClick={(params) => {
                  this.Check2FA();
                }}
              >
                Verify Code
              </button>
            </div>
          </div>
          <div className="text-center">
            <a
              href
              onClick={(e) => {
                e.preventDefault();
                this.props.RedirectResetTwoFA();
              }}
            >
              <strong style={{ color: "#ffffff" }} className="user-pointer">
                Disable Two Factor Authentication?
              </strong>
            </a>
          </div>
          <div className="Divide30"></div>
          <div className="Divide30"></div>
          <div className="Divide30"></div>

          <div className="card-footer text-center py-3">
            <div className="text-center">
              <a href="/Signin">
                <strong style={{ color: "#ebc751" }}>Return to </strong>
                <strong>SignIn ?</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TwoFaLogin);
