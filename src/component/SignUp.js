import React from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import swal from "sweetalert";
import History from "history";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Lock, Mail, EyeOff, Eye, Square } from "react-feather";
import {
  addWallets,
  setFocused,
  setToken,
  setIntervalStarted,
  setDefaults,
  setIsLoaderActive,
} from "../actions/index";
import {
  BaseUrl,
  AuthenticationTokenId,
  UserTypeTokenId,
  UserAuthTokenId,
  UserProfileTokenId,
} from "../Constants/BusinessManager";
import {
  SendHttpRequest,
  SetAsyncStorage,
  DeleteAsyncStorage,
} from "../component/utility";
import Logo from "../Assets/images/icon.png";
import IsMerchant from "../component/ApplicationType";
import { render } from "@testing-library/react";
import VerifyMnemonics from "./Mnemonic/verifyMnemonic";
import Base64 from 'crypto-js/enc-base64';
var passwordValidator = require("password-validator");

const mapStateToProps = (state) => {
  return {
    Wallets: state.Wallets,
    Focused: state.Focused,
    Token: state.Token,
    IntervalStarted: state.IntervalStarted,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addWallets: bindActionCreators(addWallets, dispatch),
    setFocused: bindActionCreators(setFocused, dispatch),
    setToken: bindActionCreators(setToken, dispatch),
    setIntervalStarted: bindActionCreators(setIntervalStarted, dispatch),
    setDefaults: bindActionCreators(setDefaults, dispatch),
    setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
  };
};

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailMsg: "",
      emailValidate: true,
      password: "",
      passwordMsg: "",
      passwordValidate: "",
      confirmPassword: "",
      passwordCompareValidate: "",
      passwordCompareMsg: "",
      privacyIsChecked: false,
      loading: false,
      VerificationEmailSent: false,
      VerificationCode: "",
      hiddenPassword: true,
      hiddenConfirmPassword: true,
      IsMerchant: false,
      privacyMsg: null,
      emptyFieldMsg: null,
      emptyVerificationCodeMsg: null,
      isFirst: true,
      verifyMnemonics: true,
    };
    this.toggleShow = this.toggleShow.bind(this);
    this.toggleShow1 = this.toggleShow1.bind(this);
    this.textInput = null;
  }

  componentDidMount() {
    this.textInput.focus();
  }
  toggleShow() {
    this.setState({ hiddenPassword: !this.state.hiddenPassword });
  }
  toggleShow1() {
    this.setState({ hiddenConfirmPassword: !this.state.hiddenConfirmPassword });
  }

  validateEmail(text) {
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
      this.setState({ emailValidate: false });
      if (this.state.isFirst === false) {
        this.setState({
          emailMsg: "Email is not valid\n",
          emptyFieldMsg: null,
        });
      }
    }
  }
  //Validate password is according to format
  validatePassword(text) {
    var PasswordValidationSchema = new passwordValidator();
    PasswordValidationSchema.is()
      .min(8)
      .is()
      .max(36)
      .has()
      .uppercase()
      .has()
      .lowercase()
      .has()
      .digits()
      .has()
      .not()
      .spaces()
      .has()
      .symbols();

    var { confirmPassword } = this.state;
    var format = /^(?=.*\d)(?=.*[!@#.$%_^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    var Errors = PasswordValidationSchema.validate(text, { list: true });
    if (!Errors.length) {
      this.setState({
        passwordValidate: true,
        password: text,
        passwordMsg: "",
        emptyFieldMsg: null,
      });
    } else {
      let errorMessage = "";
      Errors.forEach((element) => {
        if (element === "min") {
          errorMessage += "• 8 minimum characters\n";
        }
        if (element === "uppercase") {
          errorMessage += "• at least 1 uppercase character\n";
        }
        if (element === "lowercase") {
          errorMessage += "• at least 1 lowercase character\n";
        }
        if (element === "digits") {
          errorMessage += "• at least 1 number\n";
        }
        if (element === "symbols") {
          errorMessage += "• at least 1 special character i.e. @, #, &\n";
        }
      });
      this.setState({
        passwordValidate: false,
        password: "",
        passwordMsg: "Password must have:\n" + errorMessage,
        emptyFieldMsg: null,
      });
    }
    if (confirmPassword) {
      if (confirmPassword === text) {
        this.setState({
          passwordCompareValidate: true,
          passwordCompareMsg: "",
        });
      } else {
        this.setState({
          passwordCompareValidate: false,
          passwordCompareMsg: "Password did not match",
        });
      }
    }
  }
  //Validating password is same
  validatePasswordConfirmation(text) {
    const { password, passwordValidate } = this.state;
    if (passwordValidate) {
      if (text === password) {
        this.setState({
          passwordCompareValidate: true,
          confirmPassword: text,
          passwordCompareMsg: "",
          emptyFieldMsg: null,
        });
      } else {
        this.setState({
          passwordCompareValidate: false,
          confirmPassword: text,
          passwordCompareMsg: "Password did not match",
          emptyFieldMsg: null,
        });
      }
    } else {
      this.setState({
        passwordCompareValidate: false,
        confirmPassword: text,
        passwordCompareMsg: "",
      });
    }
  }
  onSubmit = async (event) => {
    event.preventDefault();
    const {
      email,
      password,
      passwordCompareValidate,
      passwordValidate,
      emailValidate,
      privacyIsChecked,
    } = this.state;
    if (!(emailValidate && passwordValidate && passwordCompareValidate)) {
      if (!emailValidate) {
        return this.setState({ emptyFieldMsg: "Email is not valid." });
      }
      return this.setState({ emptyFieldMsg: "Please fill all fields" });
    } else {
      this.setState({ emptyFieldMsg: null });
    }
    if (!privacyIsChecked) {
      return this.setState({
        privacyMsg: "Please check the terms and conditions box",
      });
    }
    this.props.setIsLoaderActive(true);
    try {
      const data = await SendHttpRequest(
        BaseUrl + "SendVerificationEmail",
        { Email: email, PhoneNumber: "" },
        "POST"
      );
      console.log("hello", data);
      if (data.Success === true) {
        console.log("data", data);
        this.setState({
          VerificationCode: "",
          VerificationEmailSent: true,
          emptyVerificationCodeMsg: null,
        });
        return this.props.setIsLoaderActive(false);
      } else {
        this.props.setIsLoaderActive(false);
        this.setState({
          emailValidate: "",
          emailMsg: "Email is already Exist",
        });
      }
    } catch (error) {
      this.props.setIsLoaderActive(false);
      return alert(
        "Error",
        "Something went wrong please try later",
        [
          {
            text: "ok",
            onClick: () => {
              this.props.setIsLoaderActive(false);
            },
          },
        ],
        { cancelable: false }
      );
    }
  };
  async Register(event) {
    event.preventDefault();
    const { email, password, VerificationCode } = this.state;
    if (VerificationCode === "") {
      return this.setState({
        emptyVerificationCodeMsg: "Please fill all fields",
      });
    }
    // this.loader(true);
    this.props.setIsLoaderActive(true);
    // verfying Code
    try {
      const data = await SendHttpRequest(
        BaseUrl + "SignUpCodeVerification",
        { email: email, code: VerificationCode },
        "POST"
      );
      if (data.Success === true) {
        this.props.setIsLoaderActive(false);
        console.log("hello");
        this.setState({ verifyMnemonics: false });
      } else {
        this.props.setIsLoaderActive(false);
        return this.setState({
          VerificationEmailSent: true,
          emptyVerificationCodeMsg: data.Exception,
        });
      }
    } catch (error) {
      return swal(
        "Error",
        "Something went wrong please try later",
        [
          {
            text: "ok",
            onClick: () => {
              this.props.setIsLoaderActive(false);
            },
          },
        ],
        { cancelable: false }
      );
    }
    //Send registration call
    // try {
    //   const data = await SendHttpRequest(
    //     BaseUrl + "Register",
    //     { email: email, password: password, IsMerchant: this.state.IsMerchant },
    //     "POST"
    //   );
    //   if (data.Response === "OK") {
    //     localStorage.setItem(UserTypeTokenId, this.state.IsMerchant);
    //     localStorage.setItem(AuthenticationTokenId, data.Token);
    //     this.props.setToken(data.Token);
    //     await this.props.setDefaults({
    //       DefaultCurrencyId: data.DefaultCurrencyId,
    //     });
    //     this.setState({ email: data.Email });
    //     this.setState({ password: data.Password });
    //     localStorage.setItem(UserAuthTokenId, "false");
    //     localStorage.setItem(
    //       UserProfileTokenId,
    //       JSON.stringify({
    //         ProfileImage: null,
    //         Email: data.Email,
    //       })
    //     );
    //     // this.loader(false);
    //     this.props.setIsLoaderActive(false);
    //     // return this.props.navigation.navigate({ routeName: "Main" });
    //     this.props.history.push("/OverView");
    //   } else {
    //     return swal(
    //       "Error",
    //       data.Response,
    //       [
    //         {
    //           text: "ok",
    //           onClick: () => {
    //             this.props.setIsLoaderActive(false);
    //           },
    //         },
    //       ],
    //       { cancelable: false }
    //     );
    //   }
    // } catch (error) {
    //   localStorage.clear();
    //   this.props.setIsLoaderActive(false);
    //   return swal({
    //     icon: "error",
    //     title: "Oops...",
    //     text: "Something went wrong please try later",
    //   });
    // }
  }
  ChangeIsMerchant(Value) {
    if (Value === "Merchant") {
      this.setState({ IsMerchant: true });
    } else {
      this.setState({ IsMerchant: false });
    }
  }

  render() {
    const iconStyling = {
      position: "absolute",
      display: "flex",
      margin: "9px 8px",
    };
    return (
      <>
        {this.state.verifyMnemonics ? (
          <div id="wrapper">
            <div className="card card-authentication1 mx-auto my-4">
              <div className="card-body">
                <div className="card-content p-2">
                  <div className="text-center">
                    <img src={Logo} width="100" alt="logo icon" />
                  </div>
                  {this.state.VerificationEmailSent ? (
                    <div>
                      <div className="card-title text-center py-3">
                        Verification Code
                      </div>
                      <form
                        onSubmit={(event) => {
                          this.Register(event);
                        }}
                      >
                        <div className="form-group">
                          <div className="position-relative has-icon-right">
                            <input
                              type="text"
                              value={this.state.VerificationCode}
                              onChange={(event) =>
                                this.setState({
                                  VerificationCode: event.target.value,
                                })
                              }
                              className="form-control"
                              placeholder="Verification Code"
                            />
                            <div className="form-control-position">
                              <Mail></Mail>
                            </div>
                          </div>
                          {/* <span className="error">{!this.state.emailValidate&&this.state.emailMsg}</span> */}
                          <span className="error">
                            {this.state.emptyVerificationCodeMsg}
                          </span>
                        </div>

                        <button
                          type="submit"
                          className="create-btn"
                          style={{ fontWeight: "bold", letterSpacing: 1 }}
                        >
                          {/* <div>
               {(this.state.VerificationEmailSent) ? "Verify Code" : "Sign up"}
             </div> */}
                          Verify Code
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div>
                      <div className="card-title text-center py-3">Sign Up</div>
                      <form
                        onSubmit={(event) => {
                          this.onSubmit(event);
                        }}
                      >
                        <div className="form-group">
                          <label htmlFor="EmailId" className="sr-only">
                            Email
                          </label>
                          <div className="position-relative has-icon-right">
                            <input
                              ref={(elem) => (this.textInput = elem)}
                              type="text"
                              autoComplete="one-time-code"
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
                              <Mail size={18}></Mail>
                            </div>
                          </div>
                          <span className="error">
                            {!this.state.emailValidate && this.state.emailMsg}
                          </span>
                        </div>
                        <div className="form-group">
                          <label htmlFor="Password" className="sr-only">
                            Password
                          </label>
                          <div className="position-relative has-icon-right">
                            <input
                              autoComplete="one-time-code"
                              onChange={(event) =>
                                this.validatePassword(event.target.value)
                              }
                              type={
                                this.state.hiddenPassword ? "password" : "text"
                              }
                              className="form-control input-shadow"
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
                          </div>
                          <span className="error">
                            {!this.state.passwordValidate &&
                              this.state.passwordMsg}
                          </span>
                        </div>
                        <div className="form-group">
                          <label htmlFor="ConfirmPassword" className="sr-only">
                            Confirm Password
                          </label>
                          <div className="position-relative has-icon-right">
                            <input
                              value={this.setState.Password}
                              onChange={(event) =>
                                this.validatePasswordConfirmation(
                                  event.target.value
                                )
                              }
                              type={
                                this.state.hiddenConfirmPassword
                                  ? "password"
                                  : "text"
                              }
                              className="form-control input-shadow"
                              placeholder="Confirm Password"
                            />
                            <div className="form-control-position">
                              {/* <i className="icon-lock"></i> */}
                              <span onClick={this.toggleShow1}>
                                {this.state.hiddenConfirmPassword === true ? (
                                  <EyeOff size={18} style={{ color: "#fff" }} />
                                ) : (
                                  <Eye size={18} style={{ color: "#fff" }} />
                                )}
                              </span>
                            </div>
                          </div>
                          <span className="error">
                            {!this.state.passwordCompareValidate &&
                              this.state.passwordCompareMsg}
                          </span>
                        </div>
                        <span className="error">
                          {this.state.emptyFieldMsg}
                        </span>
                        <div
                          className="form-group"
                          style={{ textAlign: "center", marginTop: 15 }}
                        >
                          <div style={{ color: "#fff" }}>
                            Register as:{" "}
                            <label className="radio-inline">
                              <input
                                type="Radio"
                                name="type"
                                value="Customer"
                                onChange={(e) => {
                                  this.ChangeIsMerchant(e.target.value);
                                }}
                                checked={!this.state.IsMerchant}
                              />{" "}
                              Customer
                            </label>{" "}
                        
                          </div>
                        </div>

                        <div className="form-group">
                          <span className="error">{this.state.privacyMsg}</span>

                          <div className="icheck-material-white">
                            <input
                              type="checkbox"
                              id="user-checkbox"
                              checked=""
                              name="privacy"
                              checked={this.state.privacyIsChecked}
                              onChange={(e) => {
                                this.setState({
                                  privacyMsg: null,
                                  privacyIsChecked: e.target.checked,
                                });
                              }}
                            />
                            <label htmlFor="user-checkbox">
                              <a
                                target="_blank"
                                href="https://www.quant.network/privacy-policy"
                              >
                                I Agree With Terms & Conditions
                              </a>
                            </label>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="create-btn"
                          style={{ fontWeight: "bold", letterSpacing: 1 }}
                        >
                          Sign up
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
              {this.state.VerificationEmailSent ? (
                <p
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    padding: "0px 7px",
                  }}
                >
                  In case you haven't received email, check your spam or resend
                  email.
                </p>
              ) : (
                <p></p>
              )}
              <div className="card-footer text-center py-3">
                <p
                  className="text-warning mb-0"
                  style={{ fontSize: 15, fontWeight: "bold" }}
                >
                  Already have an account?{" "}
                  <Link to="/SignIn" style={{ color: "#fff" }}>
                    {" "}
                    Sign In here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <VerifyMnemonics password={this.state.password} email={this.state.email} />
        )}
      </>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
