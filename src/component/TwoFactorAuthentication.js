import React from "react";
import swal from "sweetalert";
import {
  BaseUrl,
  AuthenticationTokenId,
  UserAuthTokenId,
  UserProfileTokenId,
} from "../Constants/BusinessManager";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setIsLoaderActive } from "../actions/index";
import QRCodes from "qrcode.react";
import { SendHttpRequest } from "../component/utility";
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
  };
};
class TwoFactor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      QuestionList1: [],
      QuestionList2: [],
      QuestionList3: [],
      Answer1: { QuestionId: null, Answer: "" },
      Answer2: { QuestionId: null, Answer: "" },
      Answer3: { QuestionId: null, Answer: "" },
      TwoFAEnabled: false,
      Code: "",
      QRImageUrl: "",
    };
  }
  async LoadQuestions() {
    var QuestionsResponse = await SendHttpRequest(
      BaseUrl + "GetSecurityQuestions",
      {},
      "GET"
    );
    if (QuestionsResponse.Success) {
      let splitter = Math.ceil(QuestionsResponse.Data.length / 3);
      let firstpart = QuestionsResponse.Data.splice(splitter + splitter);
      let secondpart = QuestionsResponse.Data.splice(splitter);
      let thirdpart = QuestionsResponse.Data.splice(0);
      //console.log("=", firstpart, " =", secondpart, "= ", thirdpart);
      this.setState({
        QuestionList1: firstpart,
        QuestionList2: secondpart,
        QuestionList3: thirdpart,
      });
    } else {
      throw new Error("s");
    }
  }
  async LoadQRImageUrl(t) {
    var qrUrlResponse = await SendHttpRequest(
      BaseUrl + "GetQRCodeFor2FA",
      { Token: t },
      "POST"
    );
    if (qrUrlResponse.Success) {
      this.setState({ QRImageUrl: qrUrlResponse.Data.QRImageUrl });
    } else {
      throw new Error("s");
    }
  }
  async componentDidMount() {
    try {
      this.props.setIsLoaderActive(true);
      var t = localStorage.getItem(AuthenticationTokenId);
      var UserProfile = await SendHttpRequest(
        BaseUrl + "GetProfile",
        { Token: t },
        "POST"
      );
      if (UserProfile.Success) {
        this.setState({ TwoFAEnabled: UserProfile.Data.isTwoFactorEnabled });
        localStorage.setItem(
          UserAuthTokenId,
          UserProfile.Data.isTwoFactorEnabled
        );
        localStorage.setItem(
          UserProfileTokenId,
          JSON.stringify({
            ProfileImage: UserProfile.Data.ImageUrl,
            Email: UserProfile.Data.Email,
          })
        );
        if (!UserProfile.Data.isTwoFactorEnabled) {
          await this.LoadQRImageUrl(t);
          await this.LoadQuestions();
        }
        this.props.setIsLoaderActive(false);
      } else {
        throw new Error("s");
      }
    } catch (error) {
      this.props.setIsLoaderActive(false);
      return swal({
        icon: "error",
        text: "Something went wrong, please try to re- login",
      });
    }
  }
  async Enable2FA() {
    try {
      let { Answer1, Answer2, Answer3, Code } = this.state;
      console.log(Answer1, Answer2, Answer3, Code);
      if (Code === "") {
        return swal({
          icon: "warning",
          text:
            "Please enter code from Google Authenticator app after scanning the given QR with it.",
        });
      }
      if (
        !Answer1.QuestionId ||
        Answer1.QuestionId === "" ||
        Answer1.Answer === "" ||
        !Answer2.QuestionId ||
        Answer2.QuestionId === "" ||
        Answer2.Answer === "" ||
        !Answer3.QuestionId ||
        Answer3.QuestionId === "" ||
        Answer3.Answer === ""
      ) {
        return swal({
          icon: "warning",
          text:
            "Please select all three questions and answer everyone of them.",
        });
      }
      this.props.setIsLoaderActive(true);
      let t = localStorage.getItem(AuthenticationTokenId);
      var response = await SendHttpRequest(
        BaseUrl + "Enable2FAAuth",
        {
          Token: t,
          Code: Code,
          SecurityAns: [
            { questionId: Answer1.QuestionId, Answer: Answer1.Answer },
            { questionId: Answer2.QuestionId, Answer: Answer2.Answer },
            { questionId: Answer3.QuestionId, Answer: Answer3.Answer },
          ],
        },
        "POST"
      );
      if (response.Success) {
        localStorage.setItem(
          UserAuthTokenId,
          "true"
        );
        this.setState({TwoFAEnabled:true})
        swal({
          icon: "success",
          title: "Two factor authentication is Enabled",
        });
      } else {
        if (response.Exception === "Invalid Data") {
          swal({
            icon: "error",
            text: "Invalid Code entered",
          });
        } else {
          throw new Error("s");
        }
      }
      this.props.setIsLoaderActive(false);
    } catch (error) {
      this.props.setIsLoaderActive(false);
      return swal({
        icon: "error",
        text: "Something went wrong, please try to re- login",
      });
    }
  }
  render() {
    return (
      <div className="row pt-2 pb-2" style={{ padding: "0.9rem" }}>
        <div className="col-sm-9">
          <h2 className="page-title">TWO FACTOR AUTHENTICATION</h2>
        </div>
        <div className="card container body-content mx-auto">
          <br />
          <br />
          {this.state.TwoFAEnabled === true ? (
            <div>
              <div style={{ width: "100%", textAlign: "center" }}>
                {" "}
                <img
                  src={require("../Assets/images/2fa-security.png")}
                  alt="2fa"
                  style={{ width: "40%" }}
                />
              </div>{" "}
              <br />{" "}
              <h3 style={{ padding: "30px", textAlign: "center" }}>
                Two FA is enabled into your account.
              </h3>
            </div>
          ) : (
            <>
              <p style={{ textAlign: "center" }} className="PARAGRAPH_2FA">
                Two-factor authentication (2FA) greatly increases security by
                requiring both your password and another form of authentication.
                Exchange implements 2FA utilizing Google Authenticator.
                <span style={{ textAlign: "center" }}>
                  <br />
                  To enable this feature simply download Google Authenticator
                  app on your mobile device and scan the QRCode.{" "}
                </span>{" "}
                <br />
                <span style={{ textAlign: "center" }}>
                  Once you have linked the Authenticator with Exchange, enter
                  the 6 digit code provided.
                </span>
                <span id="test"></span>
              </p>
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6" style={{ textAlign: "center" }}>
                  <img
                    alt="QRImage"
                    style={{ width: 270, height: 270 }}
                    src={this.state.QRImageUrl}
                  />
                </div>
                <div className="col-md-3"></div>
              </div>
              <div className="row mt-3">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="code"
                    className="form-control"
                    placeholder="Enter Code"
                    onChange={(e) => {
                      this.setState({
                        Code: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="col-md-3"></div>
              </div>
              <div className="row mt-3">
                <div className="col-md-3"></div>
                <div className="col-md-6" style={{ textAlign: "center" }}>
                  <div className="form-group">
                    <label>Security Question 1</label>
                    <select
                      className="form-control"
                      value={this.state.Answer1.QuestionId}
                      onChange={(e) => {
                        this.setState({
                          Answer1: {
                            ...this.state.Answer1,
                            QuestionId: e.target.value,
                          },
                        });
                      }}
                    >
                      <option value="">Select Question</option>
                      {this.state.QuestionList1.map((value, index) => {
                        return (
                          <option value={value.Id}>{value.Question}</option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Answer</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Please enter your answer here."
                      onChange={(e) => {
                        this.setState({
                          Answer1: {
                            ...this.state.Answer1,
                            Answer: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Security Question 2</label>
                    <select
                      className="form-control"
                      value={this.state.Answer2.QuestionId}
                      onChange={(e) => {
                        this.setState({
                          Answer2: {
                            ...this.state.Answer2,
                            QuestionId: e.target.value,
                          },
                        });
                      }}
                    >
                      <option value="">Select Question</option>
                      {this.state.QuestionList2.map((value, index) => {
                        return (
                          <option value={value.Id}>{value.Question}</option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Answer</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Please enter your answer here."
                      onChange={(e) => {
                        this.setState({
                          Answer2: {
                            ...this.state.Answer2,
                            Answer: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Security Question 3</label>
                    <select
                      className="form-control"
                      value={this.state.Answer3.QuestionId}
                      onChange={(e) => {
                        this.setState({
                          Answer3: {
                            ...this.state.Answer3,
                            QuestionId: e.target.value,
                          },
                        });
                      }}
                    >
                      <option value="">Select Question</option>
                      {this.state.QuestionList3.map((value, index) => {
                        return (
                          <option value={value.Id}>{value.Question}</option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Answer</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Please enter your answer here."
                      onChange={(e) => {
                        this.setState({
                          Answer3: {
                            ...this.state.Answer3,
                            Answer: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <div className=" form-group">
                    <button
                      onClick={() => {
                        this.Enable2FA();
                      }}
                      className="sendButton"
                    >
                      Enable 2FA
                    </button>
                  </div>
                </div>
                <div className=" mb-6"></div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TwoFactor);
