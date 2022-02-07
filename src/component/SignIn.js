import React, { useState } from "react";
import { Link, useHistory, withRouter, Redirect } from "react-router-dom";
import swal from "sweetalert";
import { Lock, Mail, Eye, EyeOff } from "react-feather";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import IsMerchant from "../component/ApplicationType";
import { SendHttpRequest } from "../component/utility";
import FALogin from "./2FALoginCode";
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
  UserAuthTokenId,
  UserProfileTokenId,
  LogoSmall,
} from "../Constants/BusinessManager";
import Reset2FA from "./Reset2FA";
import { SetUser } from "../Utils/Utils";
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
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailValidate: true,
      password: "",
      emailMsg: "",
      passwordValidate: true,
      loading: false,
      BiometricLogin: false,
      hiddenPassword: true,
      emptyFieldMsg: null,
      invalidLogin: "",
      data: {},
      TwoFA: false,
      resetTwoFA: false,
      isFirst: true,
    };
    this.toggleShow = this.toggleShow.bind(this);
    this.textInput = null;
  }
  componentDidMount() {
    this.textInput.focus();
  }
  toggleShow() {
    this.setState({ hiddenPassword: !this.state.hiddenPassword });
  }
  validateEmail(text) {
    if (this.state.isFirst === false) {
      var alph =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

      if (alph.test(text)) {
        this.setState({
          emailValidate: true,
          emailMsg: "",
          email: text,
          emptyFieldMsg: null,
        });
      } else {
        this.setState({
          emailValidate: false,
          emailMsg: "•	Email is not valid\n",
          emptyFieldMsg: null,
        });
      }
    } else {
      this.setState({ email: text });
    }
  }
  static navigationOptions = {
    title: "Sign In",
    headerTransparent: true,
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontFamily: "exo",
    },
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const { email, password, emailValidate, passwordValidate } = this.state;
    if (email === "" || password === "") {
      return this.setState({ emptyFieldMsg: "Please fill all fields" });
    } else {
      this.setState({ emptyFieldMsg: null });
    }
    if (!emailValidate) {
      return;
    }
    try {
      this.props.setIsLoaderActive(true);
      const data = await SendHttpRequest(
        BaseUrl + "AdminAuth/login",
        { email: email, password: password },
        "POST"
      );
      // console.log(data)
      if (data.isSuccess == true) {
        SetUser(data.data.token, {
          name: data.data.userInfo.name,
          email: data.data.userInfo.email,
        });
        this.props.setIsLoaderActive(false);
        return this.props.history.push("/ProjectManagement");
      } else {
        this.props.setIsLoaderActive(false);
        this.setState({ invalidLogin: data?.message || "Invalid Login" });
      }
      // if (data.Response === "OK") {
      //   this.setState({ data: data });
      //   if (data.is2FAEnabled) {
      //     this.setState({ TwoFA: true });
      //     this.props.setIsLoaderActive(false);
      //     return;
      //   } else {
      //     this.AuthorizeClient();
      //   }
      //   //return this.props.history.push("/overview");
      // } else {
      //   this.props.setIsLoaderActive(false);
      //   this.setState({ invalidLogin: "Invalid Login" });
      // }
    } catch (error) {
      localStorage.clear();
      this.props.setIsLoaderActive(false);
      return;
    }
  };
  async AuthorizeClient(TwoFA) {
    localStorage.setItem(AuthenticationTokenId, this.state.data.Token);
    await this.props.setToken(this.state.data.Token);
    await this.props.setIsMerchant(this.state.data.IsMerchant);
    localStorage.setItem(UserTypeTokenId, this.state.data.IsMerchant);
    await this.props.setDefaults({
      DefaultCurrencyId: this.state.data.DefaultCurrencyId,
    });
    localStorage.setItem(
      DefaultCurrencyTokenId,
      this.state.data.DefaultCurrencyId
    );

    localStorage.setItem(
      UserAuthTokenId,
      TwoFA === undefined ? this.state.data.is2FAEnabled : TwoFA
    );
    localStorage.setItem(
      UserProfileTokenId,
      JSON.stringify({
        ProfileImage: this.state.data.UserImageUrl,
        Email: this.state.data.Email,
      })
    );
    var BaseCurrencyString = localStorage.getItem("BaseCurrency");
    if (!BaseCurrencyString || BaseCurrencyString === "") {
      let _objCurr = {
        Name: "USD",
        Image: require("../Assets/Icons/Currencies/USD.png"),
        symbol: "$",
      };
      localStorage.setItem("BaseCurrency", JSON.stringify(_objCurr));
    }

    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const c = params.get("ref");
    if (c) {
      if (c.trim() !== "" || c.trim() !== null) {
        return this.props.history.push(c);
      }
    }
  }
  ResetTwoFA() {
    this.setState({ resetTwoFA: true, TwoFA: false });
  }
  render() {
    const iconStyling = {
      position: "absolute",
      display: "flex",
      margin: "9px 8px",
    };
    return (
      <>
        {this.state.TwoFA ? (
          <FALogin
            RedirectResetTwoFA={this.ResetTwoFA.bind(this)}
            onAuthorize={this.AuthorizeClient.bind(this)}
            token={this.state.data.Token}
          ></FALogin>
        ) : this.state.resetTwoFA ? (
          <Reset2FA
            onAuthorize={this.AuthorizeClient.bind(this)}
            token={this.state.data.Token}
          ></Reset2FA>
        ) : (
          <div id="wrapper">
            <div className="card card-authentication1 mx-auto my-5">
              <div className="card-body">
                <div className="card-content p-2">
                  <div className="text-center">
                    {/* <img src={LogoSmall} width="200" alt="logo icon" /> */}
                    <h1>DOXPAD</h1>
                  </div>
                  <div className="card-title text-uppercase text-center py-3">
                    Sign In
                  </div>
                  <form
                    onSubmit={(event) => {
                      this.onSubmit(event);
                    }}
                  >
                    <div className="form-group">
                      <label htmlFor="exampleInputUsername" className="sr-only">
                        Username
                      </label>
                      <div className="position-relative has-icon-right">
                        <input
                          ref={(elem) => (this.textInput = elem)}
                          type="text"
                          onChange={(event) =>
                            this.validateEmail(event.target.value)
                          }
                          placeholder="Email"
                          className="form-control input-shadow"
                          onBlur={() => {
                            this.setState({ isFirst: false });
                          }}
                        />
                        <div className="form-control-position">
                          <i className="icon-user"></i>
                        </div>
                        {this.state.emailMsg.length > 0 && (
                          <span className="error">{this.state.emailMsg}</span>
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword" className="sr-only">
                        Password
                      </label>
                      <div className="position-relative has-icon-right">
                        <input
                          onChange={(event) =>
                            event.target.value
                              ? this.setState({
                                  passwordValidate: true,
                                  password: event.target.value,
                                })
                              : this.setState({ passwordValidate: false })
                          }
                          type={this.state.hiddenPassword ? "password" : "text"}
                          className="form-control"
                          placeholder="Password"
                        />
                        <div className="form-control-position">
                          <span onClick={this.toggleShow}>
                            {this.state.hiddenPassword === true ? (
                              <EyeOff size={18} style={{ color: "#fff" }} />
                            ) : (
                              <Eye size={18} style={{ color: "#fff" }} />
                            )}
                          </span>
                        </div>

                        <span className="error">
                          {this.state.invalidLogin || this.state.emptyFieldMsg}
                        </span>
                      </div>
                    </div>
                    {/* <div className="form-row">
                          <div className="form-group col-6"></div>
                          <div className="form-group col-6 text-right">
                            <Link to="/ForgetPassword">Reset Password</Link>
                          </div>
                        </div> */}
                    <button
                      type="submit"
                      className="create-btn"
                      style={{ fontWeight: "bold", letterSpacing: 1 }}
                    >
                      Sign In
                    </button>
                  </form>
                </div>
              </div>
              {/* <div className="card-footer text-center py-3">
                    <p
                      className="text-warning mb-0"
                      style={{ fontSize: 15, fontWeight: "bold" }}
                    >
                      Do not have an account?{" "}
                      <Link to="/SignUp" style={{ color: "#fff" }}>
                        {" "}
                    Sign Up here
                  </Link>
                    </p>
                  </div> */}
            </div>
          </div>
        )}
      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
