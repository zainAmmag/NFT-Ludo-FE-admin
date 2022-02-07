import React from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import {
  BaseUrl,
  AuthenticationTokenId,
  UserTypeTokenId,
} from "../Constants/BusinessManager";
import { connect } from "react-redux";
import { Tabs, TabLink, TabContent } from "react-tabs-redux";
import { bindActionCreators } from "redux";
import {
  addWallets,
  setFocused,
  setToken,
  setQR,
  setIsLoaderActive,
} from "../actions/index";
import QRCodes from "qrcode.react";
import { SendHttpRequest } from "../component/utility";
import { Lock, Mail, Key, Eye, EyeOff } from "react-feather";

const mapStateToProps = (state) => {
  return {
    Wallets: state.Wallets,
    Token: state.Token,
    QRCode: state.QRCode,
    Focused: state.Focused,
  };
};
var passwordValidator = require("password-validator");
const mapDispatchToProps = (dispatch) => {
  return {
    addWallets: bindActionCreators(addWallets, dispatch),
    setFocused: bindActionCreators(setFocused, dispatch),
    setToken: bindActionCreators(setToken, dispatch),
    setQR: bindActionCreators(setQR, dispatch),
    setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
  };
};
class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // NewPassword: false,
      oldPassword: "",
      newPassword: "",
      newConfirmPassword: "",
      passwordMsg: "",
      passwordValidate: "",
      // confirmPassword:"",
      passwordCompareValidate: "",
      passwordCompareMsg: "",
      hiddenoldPassword: true,
      hiddenPassword: true,
      hiddenConfirmPassword: true,
      emptyFieldMsg: null,
      codeMsg: null,
      oldPasswordMsg: ""
    };
    this.toggleShowOld = this.toggleShowOld.bind(this);
    this.toggleShowNew = this.toggleShowNew.bind(this);
    this.toggleShowConfirmPassword = this.toggleShowConfirmPassword(this);
  }

  toggleShowOld() {
    this.setState({ hiddenoldPassword: !this.state.hiddenoldPassword });
  }
  toggleShowNew() {
    this.setState({ hiddenPassword: !this.state.hiddenPassword });
  }
  toggleShowConfirmPassword() {
    this.setState({ hiddenConfirmPassword: !this.state.hiddenConfirmPassword });
  }
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

    var { newConfirmPassword } = this.state;

    var Errors = PasswordValidationSchema.validate(text, { list: true });
    if (!Errors.length) {
      this.setState({
        newPassword: text,
        passwordMsg: "",
        passwordValidate: true,
        emptyFieldMsg: "",
      });
    } else {
      let errorMessage = "";
      Errors.forEach((element) => {
        if (element == "min") {
          errorMessage += "• 8 minimum characters\n";
        }
        if (element == "uppercase") {
          errorMessage += "• at least 1 uppercase character\n";
        }
        if (element == "lowercase") {
          errorMessage += "• at least 1 lowercase character\n";
        }
        if (element == "digits") {
          errorMessage += "• at least 1 number\n";
        }
        if (element == "symbols") {
          errorMessage += "• at least 1 special character i.e. @, #, &\n";
        }
      });
      this.setState({
        passwordValidate: false,
        newPassword: text,
        passwordMsg: "Password must have:\n" + errorMessage,
        emptyFieldMsg: null,
      });
    }
    if (newConfirmPassword) {
      if (newConfirmPassword == text) {
        this.setState({
          passwordCompareValidate: true,
          passwordCompareMsg: "",
          emptyFieldMsg: null,
        });
      } else {
        this.setState({
          passwordCompareValidate: false,
          passwordCompareMsg: "Password did not match",
          emptyFieldMsg: null,
        });
      }
    }
  }
  //Validating password is same
  validatePasswordConfirmation(text) {
    const { passwordValidate, newPassword, newConfirmPassword } = this.state;
    if (passwordValidate) {
      if (text == newPassword) {
        this.setState({
          passwordCompareValidate: true,
          newConfirmPassword: text,
          passwordCompareMsg: "",
        });
      } else {
        this.setState({
          passwordCompareValidate: false,
          newConfirmPassword: text,
          passwordCompareMsg: "Password did not match",
        });
      }
    } else {
      this.setState({
        passwordCompareValidate: false,
        newConfirmPassword: text,
        passwordCompareMsg: "",
      });
    }
  }
  loader = (active) => {
    this.props.setIsLoaderActive(true);
  };
  onSubmit = async (event) => {
    event.preventDefault();
    const {
      oldPassword,
      newPassword,
      newConfirmPassword,
      passwordValidate,
      passwordCompareValidate,
    } = this.state;
    if (oldPassword == "" || newPassword == "" || newConfirmPassword == "") {
      return this.setState({ emptyFieldMsg: "Please fill all fields." });
    } else {
      this.setState({ emptyFieldMsg: null });
    }
    this.props.setIsLoaderActive(true);
    try {
      let t = localStorage.getItem(AuthenticationTokenId);
      const data = await SendHttpRequest(
        BaseUrl + "ChangePassword",
        { OldPassword: oldPassword, NewPassword: newPassword, Token: t },
        "POST"
      );

      if (data.Response === "OK") {
        this.props.setIsLoaderActive(false);
        this.setState({
          oldPassword: "",
          newPassword: "",
          newConfirmPassword: "",
          passwordMsg: "",
          passwordValidate: "",
          // confirmPassword:"",
          passwordCompareValidate: "",
          passwordCompareMsg: "",
          hiddenoldPassword: true,
          hiddenPassword: true,
          hiddenConfirmPassword: true,
          emptyFieldMsg: null,
          codeMsg: null,
          oldPasswordMsg: ""
        });
        swal({
          title: "done",
          icon: "success",
          text: "Password changed successfully",
        });
      } else {
        throw new Error(data.Response);
      }
    } catch (error) {
      this.props.setIsLoaderActive(false);
      this.setState({
        oldPasswordMsg: "Wrong Password",
      });
      // return swal({
      //   icon: "error",
      //   title: "Oops...",
      //   text: "Old Password in wrong",
      // });
    }
  };
  render() {
    return (
      <div className="row pt-2 pb-2">
        <div className="container-fluid body-content mx-auto">
          <div className="row">
            <div className="col-lg-12">
              <div className="card ">
                <div className="card-body">
                  <form onSubmit={(event) => {
                    if (this.state.newPassword === this.state.newConfirmPassword) {
                      this.onSubmit(event);
                    }
                  }}
                  >
                    <div className="form-group">
                      <label htmlFor="old_pass" className="mt-3">
                        Old Password
                    </label>
                      <div className="position-relative has-icon-right">
                        <input
                          id="old_pass"
                          className="form-control input-shadow valid0"
                          placeholder="Old Password"
                          value={this.state.oldPassword}
                          onChange={(event) => {
                            this.setState({ oldPassword: event.target.value });
                          }}
                          type={
                            this.state.hiddenoldPassword ? "password" : "text"
                          }
                          autoFocus
                        />
                        <span className="error">{this.state.oldPasswordMsg}</span>
                        <div className="form-control-position">
                          <span className="" onClick={this.toggleShowOld}>
                            {this.state.hiddenoldPassword === true ? (
                              <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                              )}
                          </span>
                        </div>
                      </div>

                      <label htmlFor="new_pass" className="mt-3">
                        New Password
                    </label>
                      <div className="position-relative has-icon-right">
                        <input

                          id="new_pass"
                          className="form-control input-shadow valid0"
                          placeholder="New Password"
                          value={this.state.newPassword}
                          onChange={(event) =>
                            this.validatePassword(event.target.value)
                          }
                          type={this.state.hiddenPassword ? "password" : "text"}
                        />
                        <div className="form-control-position">
                          <span className="" onClick={this.toggleShowNew}>
                            {this.state.hiddenPassword === true ? (
                              <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                              )}
                          </span>
                        </div>
                      </div>
                      <label
                        htmlFor="confirm_pass"
                        className="CONFIRM_PASSWORD mt-3"
                      >
                        Confirm Password
                    </label>
                      <div className="position-relative has-icon-right">
                        <input

                          id="confirm_pass"
                          className="form-control input-shadow valid0"
                          type={
                            this.state.hiddenConfirmPassword ? "password" : "text"
                          }
                          value={this.state.newConfirmPassword}
                          onChange={(event) =>
                            this.validatePasswordConfirmation(event.target.value)
                          }
                          placeholder="Confirm Password"
                        />
                        <div className="form-control-position">
                          <span
                            className="" onClick={this.toggleShowConfirmPassword}>
                            {this.state.hiddenConfirmPassword === true ? (
                              <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                              )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="error">{this.state.emptyFieldMsg}</span>
                    <div>
                      {this.state.passwordMsg.length > 0 && (
                        <span className="error">
                          {this.state.passwordMsg}
                        </span>
                      )}
                      {this.state.passwordCompareMsg.length > 0 && (
                        <span className="error">
                          {this.state.passwordCompareMsg}
                        </span>
                      )}
                    </div>
                    <div className="divide30"></div>
                    <div style={{ textAlign: "center" }}>
                      <button
                        type="submit"
                        className="create-btn "
                        style={{ fontWeight: "bold", letterSpacing: 1, width: "auto" }}
                      >
                        Continue
                  </button>
                    </div>



                  </form>
                </div>

                <div className="divide30"></div>
              </div>
              <div className="divide30"></div>
              <div className="divide30"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
