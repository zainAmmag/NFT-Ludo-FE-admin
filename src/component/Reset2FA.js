import React, { useState } from "react";
import { Link, useHistory, withRouter, Redirect } from "react-router-dom";
import swal from "sweetalert";
import { Lock, Mail, Eye, EyeOff } from "react-feather";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import IsMerchant from "../component/ApplicationType";
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
  BaseUrl, UserAuthTokenId,
  
} from "../Constants/BusinessManager";
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
   
    setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
   
  };
};
class Reset2FA extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Answer: "",
      Question: {
        QuestionText: "",
        QuestionId: null,
      },
    };
  }

  async componentDidMount() {
    try {
      this.props.setIsLoaderActive(true);
      debugger
      var response=await SendHttpRequest(BaseUrl+"GetSecurityQuestions",{Token:this.props.token},"POST");
      if (response.Success) {
        this.setState({Question:{QuestionText:response.Data.Question,QuestionId:response.Data.Id}})
      }else{
        throw new Error("t");
      }
      this.props.setIsLoaderActive(false);
    } catch (error) {
      this.props.setIsLoaderActive(false);
      console.log(error)
      return swal({
        text: "Something went wrong try later",
        icon: "error",
      });
    }
  }
  async CheckQuestion() {
    try {
      if (!this.state.Answer||this.state.Answer==="") {
        return swal({
          text: "Enter your answer",
          icon: "warning",
      });
      }
      this.props.setIsLoaderActive(true);
      var response=await SendHttpRequest(BaseUrl+"VerifySecurityQuestion",{Id:this.state.Question.QuestionId,Answer:this.state.Answer,Token:this.props.token},"POST");
      if (response.Success) {
        if (response.Data) {
          this.props.onAuthorize(false);
          
        }else{
        return swal({
          text: "Incorrect answer",
          icon: "warning",
      });
        }
      }else{
        throw new Error("s")
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
                Disable Two factor authentication
              </div>
              <div className="form-group">
                <div className="position-relative has-icon-right">
                  <label>Answer following question:</label>
                  <label>{this.state.Question.QuestionText}</label>
                  <input
                    type="text"
                    placeholder="Answer"
                    className="form-control input-shadow"
                    onChange={(params) => {
                      this.setState({ Answer: params.target.value });
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
                  this.CheckQuestion();
                }}
              >
                Submit{" "}
              </button>
            </div>
          </div>

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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Reset2FA));
