import React, { useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import swal from "sweetalert";
import { Lock, Mail, Eye, EyeOff } from "react-feather";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
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
  BaseUrl
} from "../Constants/BusinessManager";
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
      hiddenPassword: true,
      emptyFieldMsg: null,
      invalidLogin: "",
      data: {},
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
        BaseUrl + "/Amin/loginAdmin",
        { email: email, password: password },
        "POST"
      );
      // console.log(data)
      if (data.isSuccess == true) {
        SetUser(data.data.token, {
          name: data.data.userInfo.username,
          email: data.data.userInfo.email,
        });
        this.props.setIsLoaderActive(false);
        return this.props.history.push("/ProjectManagement");
      } else {
        this.props.setIsLoaderActive(false);
        this.setState({ invalidLogin: data?.message || "Invalid Login" });
      }
    } catch (error) {
      localStorage.clear();
      this.props.setIsLoaderActive(false);
      return;
    }
  };


  render() {
    return (
      <>

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
                      <Mail size={18} style={{ color: "#fff" }} />
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

          </div>
        </div>

      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
