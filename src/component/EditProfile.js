import React from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import swal from "sweetalert";
import {
  BaseUrl,
  AuthenticationTokenId,
  UserTypeTokenId,
  UserProfileTokenId,
  ImageBaseUrl,
  UserAuthTokenId,
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
import { ProfileImageChange } from "./ProfileImageChange";
// import avator from "../Assets/images/profilePic.png";
const mapStateToProps = (state) => {
  return {
    Wallets: state.Wallets,
    Token: state.Token,
    QRCode: state.QRCode,
    Focused: state.Focused,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addWallets: bindActionCreators(addWallets, dispatch),
    setFocused: bindActionCreators(setFocused, dispatch),
    setToken: bindActionCreators(setToken, dispatch),
    setQR: bindActionCreators(setQR, dispatch),
    setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
  };
};
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  loader(t) {
    this.props.setIsLoaderActive(t);
  }
  render() {
    const modalCloseButton = {
      backgroundColor: "#fabf01",
      border: "none",
      padding: "6px 60px",
    };

    var TwoFA = localStorage.getItem(UserAuthTokenId);
    return (
      <div className="row pt-2 pb-2">
        <div className="container-fluid body-content mx-auto">
          <div className="row">
            <div className=" col-lg-12 ">
              <div className="card">
                <div
                  className="media align-items-center"
                  style={{ padding: "30px 0" }}>
                  <ProfileImageChange loader={this.loader.bind(this)} />
                  <div className="col-lg-4">
                    <h6 id="userEmail"></h6>
                    <p id="Lastlogin" style={{ fontWeight: "bold" }}>
                      <span className="LOGIN_IP">Last login</span>{" "}
                      <span style={{ fontWeight: "bold" }} className="MAC_ADD">
                        IP Address
                      </span>
                      : <span id="ip">No Address Found</span>{" "}
                    </p>
                  </div>
                  <div className="col-lg-6 hidden-xs">
                    <div className="row">
                      <div className="col-lg-4 ">
                        <p>
                          <span className="WITHDRAE_LIMIT">
                            24h Withdrawal Limit
                          </span>
                          ：2BTC
                        </p>
                        <span
                          className="icon icon-diamond"
                          style={{ fontSize: 20 }}></span>
                        <span style={{ fontSize: 20 }}>Lv.1</span>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <span className="WITHDRAE_LIMIT">
                            24h Withdrawal Limit
                          </span>
                          ：100BTC
                        </p>
                        <span
                          className="icon icon-diamond"
                          style={{ fontSize: 20 }}></span>
                        <span style={{ fontSize: 20 }}>Lv.2</span>
                      </div>
                      <div className="col-lg-4">
                        <p>
                          <span className="HIGHER_LIMIT">Higher Limit :</span>
                        </p>
                        <br />
                        <span
                          className="icon icon-diamond"
                          style={{ fontSize: 20 }}></span>
                        <span style={{ fontSize: 20 }}>Lv.3</span>
                      </div>
                    </div>
                    <div className="divide5"></div>
                    <div className="progress-wrapper" style={{ height: 5 }}>
                      <div className="progress mb-4" style={{ height: 5 }}>
                        <div
                          className="progress-bar bg-warning progress-bar-striped progress-bar-animated"
                          id="progressbar"
                          style={{ width: "50%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className=" col-lg-12 ">
              <div className="card">
                <div className="card-body">
                  <div className="divide25"></div>
                  <div
                    className="media align-items-center"
                    style={{ padding: "30px 0" }}>
                    <div
                      className="media-body text-left"
                      style={{ display: "inline-flex" }}>
                      <h5 className="text-whites mb-0" style={{ width: 230 }}>
                        <img
                          alt="lock"
                          className=""
                          style={{ width: "35%", paddingRight: 14 }}
                          src={require("../Assets/Icons/lock.png")}
                        />
                        <span className="CHANGE_PASS">Change Password</span>
                      </h5>
                    </div>
                    <Link to="/ChangePassword">
                      <button className="btn btn-light btn-block waves-effect">
                        <span className="CHANGE" style={{ paddingLeft: 5 }}>
                          Change
                        </span>
                      </button>
                    </Link>
                  </div>
                  <div className="divide25"></div>
                  <hr />

                  <div
                    className="media align-items-center"
                    style={{ padding: "30px 0" }}>
                    <div
                      className="media-body text-left"
                      style={{ display: "inline-flex" }}>
                      <h5 className="text-white mb-0" style={{ width: 250 }}>
                        <img
                          alt="google2FA"
                          className=""
                          style={{ width: "33%", paddingRight: 14 }}
                          src={require("../Assets/Icons/google.png")}
                        />
                        <span className="LABEL_GOOGLEAUTH">
                          Google Authentication
                        </span>
                      </h5>
                    </div>
                    <Link to="/TwoFactorAuthentication">
                      <button className="btn btn-light btn-block waves-effect">
                        <span className="ENABLE" style={{ paddingLeft: 5 }}>
                          {TwoFA === "true" ? (
                            <>
                              <i
                                style={{ color: "green" }}
                                className="fa fa-check"></i>{" "}
                              ENABLED
                            </>
                          ) : (
                            <>ENABLE</>
                          )}
                        </span>
                      </button>
                    </Link>
                  </div>
                  <div className="divide25"></div>
                </div>
              </div>
            </div>

            <div className=" col-lg-12 ">
              <div className="card">
                <div className="card-body">
                  <div className="divide25"></div>
                  <div className="col-sm-9">
                    <h2 className="page-title">DEVICE MANAGEMENT</h2>
                  </div>
                  <hr />
                  <div className="table-responsive">
                    <div className="col-sm-12 mt-3">
                      <table
                        id="displayTable"
                        className="table table-bordered dataTable"
                        role="grid"
                        aria-describedby="default-datatable_info">
                        <thead>
                          <tr role="row" style={{ color: "#fff" }}>
                            <th
                              tabIndex="0"
                              aria-controls="default-datatable"
                              rowSpan="1"
                              colSpan="1"
                              style={{ width: 103 }}>
                              <span className="MAC_ADD">IP Address</span>
                            </th>
                            <th
                              tabIndex="0"
                              aria-controls="default-datatable"
                              rowSpan="1"
                              colSpan="1"
                              aria-label="Name: activate to sort column descending"
                              style={{ width: 139 }}>
                              <span className="EMAIL_ADDRESS">
                                Email Address
                              </span>
                            </th>
                            <th
                              tabIndex="0"
                              aria-controls="default-datatable"
                              rowSpan="1"
                              colSpan="1"
                              style={{ width: 103 }}>
                              <span className="LABEL_PLATFORM">Platform</span>
                            </th>
                            <th
                              tabIndex="0"
                              aria-controls="default-datatable"
                              rowSpan="1"
                              colSpan="1"
                              style={{ width: 113 }}>
                              {" "}
                              <span className="LABEL_DATE">Date</span> (UTC)
                            </th>
                          </tr>
                        </thead>
                        <tbody></tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
