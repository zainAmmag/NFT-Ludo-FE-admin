import React from "react";
import { Link } from "react-router-dom";

import { BaseCurrencies, ImageBaseUrl, UserProfileTokenId } from "../Constants/BusinessManager";
import serverImage from "../Assets/Icons/server.png";
import avator from "../Assets/images/profilePic.png";
import PaywalaChart from "./PaywalaChart";
import { connect } from "react-redux";
import { setIsLoaderActive } from "../actions/index";
import { bindActionCreators } from "redux";
import BuySellChart from "./BuySellChart";
import Ticker from "react-ticker";
import $ from "jquery";
//import {GetBaseCurrency} from './utility'

// import PieChart from './PieChart';

const mapStateToProps = (state) => {
  return {
    Wallets: state.Wallets,
    Focused: state.Focused,
    Token: state.Token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
  };
};

class OverView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CurrentCurrency: "",
      ComponentChart: null,
      IsTickerHovered: false,
      BaseCurrency: null,
      RenderFinished: false,
      FN: "No data available",
      BO: null,
    };
  }
  GetBaseCurrency = async () => {
    var BaseCurrencyString = localStorage.getItem("BaseCurrency");
    if (!BaseCurrencyString || BaseCurrencyString === "") {
      let _objCurr = {
        Name: "USD",
        Image: require("../Assets/Icons/Currencies/USD.png"),
        symbol: "$",
      };
      localStorage.setItem("BaseCurrency", JSON.stringify(_objCurr));
      this.setState({ BaseCurrency: _objCurr });
    } else {
      this.setState({ BaseCurrency: JSON.parse(BaseCurrencyString) });
    }
  };
  componentDidMount() {
    this.setState({
      ComponentChart: (
        <BuySellChart
          CurrentCurrency={this.state.CurrentCurrency}
        ></BuySellChart>
      ),
      RenderFinished: true,
    });
    this.GetBaseCurrency();
  }
  ChangeCurrent(curr) {
    let FN = "No data available";
    let BO = null;
    for (const item of this.props.Wallets.Currencies) {
      if (curr === item.ThreeDigitName) {
        FN = item.FullName;
        for (const itemW of this.props.Wallets.Wallets) {
          if (curr === itemW.Currency) {
            BO = itemW.Balance;
          }
          //console.log(this.props.Wallets.Payments);
        }
      }
    }

    this.setState({ CurrentCurrency: curr,FN:FN,BO:BO.toFixed(8), ComponentChart: null });
    this.setState({
      ComponentChart: <BuySellChart CurrentCurrency={curr}></BuySellChart>,
    });
  }
  getAccumulative() {
    let TotalInFIAT = 0;
    if (this.props.Wallets.Currencies !== undefined) {
      for (const curr of this.props.Wallets.Currencies) {
        for (const wallet of this.props.Wallets.Wallets) {
          if (curr.ThreeDigitName === wallet.Currency) {
            if (
              wallet.WalletType === "QUICKPAY" ||
              wallet.WalletType === "FIAT"
            ) {
              TotalInFIAT += wallet.Balance * curr.Rate;
            }
          }
        }
      }
    }
    let DefaultCurr = "$";
    let RateCurr = 1;
    if (this.state.BaseCurrency) {
      DefaultCurr = this.state.BaseCurrency.symbol;
      if (this.props.Wallets.Currencies) {
        for (const iterator of this.props.Wallets.Currencies) {
          if (this.state.BaseCurrency.Name === iterator.ThreeDigitName) {
            RateCurr = iterator.Rate;
          }
        }
      }
      TotalInFIAT = TotalInFIAT / RateCurr;
    }
    return DefaultCurr + " " + TotalInFIAT.toFixed(2).toString();
  }
  render() {
    var user = JSON.parse(localStorage.getItem(UserProfileTokenId));
    if (this.state.RenderFinished) {
      var BaseCurrencyString = localStorage.getItem("BaseCurrency");
      if (!BaseCurrencyString || BaseCurrencyString === "") {
        this.GetBaseCurrency();
      } else {
        if (JSON.stringify(this.state.BaseCurrency) !== BaseCurrencyString) {
          this.GetBaseCurrency();
        }
      }
      var BC = BaseCurrencies.map((value, index) => {
        return (
          <li
            style={{
              backgroundColor: "#000",
              color: "#fff",
              cursor: "pointer",
            }}
            key={index}
            onClick={() => {
              localStorage.setItem("BaseCurrency", JSON.stringify(value));
              this.setState({ BaseCurrency: value });
              $(".exchange-currency").toggle();
            }}
          >
            {value.Name}
          </li>
        );
      });
    }
    return (
      <div className="container-fluid body-content" id="">
        <div className="row">
          <div
            className="col-md-12 col-sm-12 col-xs-12 col-lg-6"
            style={{ display: "flex" }}
          >
            <div className="card" style={{ flex: 1 }}>
              <div
                style={{
                  padding: ".75rem 1.25rem",
                  marginBottom: "0",
                  background: "transparent",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "#ffffff",
                }}
              >
                {" "}
              </div>
              {this.props.Wallets.Wallets && (
                <>
                  <PaywalaChart
                    BaseCurrency={this.state.BaseCurrency}
                    CurrentCurrency={this.state.CurrentCurrency}
                    ChangeCurrent={this.ChangeCurrent.bind(this)}
                    WalletType="QUICKPAY"
                    data={this.props.Wallets}
                  />
                  <div style={{ "textAlign": "center" }}>
              <h3>{this.state.BO}{" "}{this.state.FN}</h3>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-xs-12 col-lg-3 rightCards">
            <div className="card accumulativeCard">
              <div className="card-body accumulativeCardBody">
                <div className="div1">
                  <h5 id="accumulativeTotal">{this.getAccumulative()}</h5>
                  <span className="">Accumulative Total</span>
                </div>
                <div className="div2">
                  <img
                    onClick={() => {
                      $(".exchange-currency").toggle();
                    }}
                    alt="dollar"
                    src={
                      this.state.BaseCurrency && this.state.BaseCurrency.Image
                    }
                    width="55"
                    style={{ margin: 4 }}
                  />
                  <ul
                    className="exchange-currency"
                    style={{
                      display: "none",
                      listStyle: "none",
                      border: "1px solid",
                      position: "absolute",
                      backgroundColor: "#3a3a3a",
                      margin: "0px 0px 0px 0px",
                      padding: "2px",
                      width: "60px",
                      zIndex: "999",
                    }}
                  >
                    {BC}
                  </ul>
                </div>
              </div>
            </div>

            <div className="card buySellCard">
              <div id="container" className="mr-4 ml-4">
                Buy and sell comparison
                {this.state.ComponentChart}
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-xs-12  col-lg-3 rightCards">
            <div className="card recentCard">
              <div className="card-body recentcardBody">
                <div className="div1" style={{ margin: "22px 0" }}>
                  <h5 className="" id="recentTransact">
                    <span className="recent-transaction">
                      Recent Transaction
                    </span>
                  </h5>
                </div>
                <div className="div2" style={{ float: "right" }}>
                  <img
                    src={serverImage}
                    alt="server"
                    width="55"
                    style={{ margin: 4 }}
                  />
                </div>
              </div>
            </div>
            <div className="card profileCard">
              <div className="LABEL_USER card-header">Profile</div>
              <div className="card-body">
              <div
          className=""
          style={{
            width: "199px",
            height: "199px",
            display: "flex",
            overflow: "hidden",
            position: "relative",
            fontSize: "1.25rem",
            alignItems: "center",
            flexShrink: "0",
            lineHeight: "1",
            userSelect: "none",
            borderRadius: "50%",
            justifyContent: "center",
          }}
          
        >
          <img
            src={
              user
                ? !user.ProfileImage || user.ProfileImage === ""
                  ? require("../Assets/images/profilePic.png")
                  : ImageBaseUrl + user.ProfileImage
                : require("../Assets/images/profilePic.png")
            }
            alt="profileImage"
            data-toggle="modal"
            data-target="#modal-animation-14"
            style={{
              color: "transparent",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              textAlign: "center",
              textIndent: "10000px",
            }}
          />
        </div>
                <div className="divide30"></div>
                <div className="progress-wrapper">
                  <div className="progress mb-4" style={{ height: 10 }}>
                    <div
                      className="progress-bar bg-success progress-bar-striped progress-bar-animated"
                      style={{ width: "30%" }}
                    ></div>
                  </div>
                </div>
                <h5
                  className="LABEL_YOUR_PROFILE"
                  style={{ fontSize: 16, textAlign: "center" }}
                >
                  Your Profile is 35% completed
                </h5>
                <Link to="/Profile">
                  <button
                    type="button"
                    className="btn btn-light btn-block waves-effect"
                  >
                    <i className="fa fa fa-male"></i>
                    <span
                      className="BTN_EDT_PROFILE"
                      style={{ paddingLeft: 5 }}
                    >
                      Edit Profile
                    </span>
                  </button>
                </Link>
                <div className="divide5"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: "30px" }}>
          <Ticker
            speed={this.props.Wallets.Currencies ? 10 : 10000}
            move={!this.state.IsTickerHovered}
          >
            {() => {
              if (this.props.Wallets.Currencies) {
                var WalletArray = [];
                for (const curr of this.props.Wallets.Currencies) {
                  for (const Wallet of this.props.Wallets.Wallets) {
                    if (Wallet.Currency === curr.ThreeDigitName) {
                      if (
                        Wallet.WalletType === "QUICKPAY" ||
                        Wallet.WalletType === "FIAT"
                      ) {
                        WalletArray.push(
                          <li
                            key={curr.ThreeDigitName}
                            onClick={() => {
                              this.props.history.push(
                                "/Wallets?c=" + curr.ThreeDigitName
                              );
                            }}
                            style={{
                              display: "inline-block",
                              listStyle: "none",
                              cursor: "pointer",
                            }}
                          >
                            <div
                              className="item"
                              style={{
                                float: "left",
                                width: "300px",
                                margin: " 0 5px",
                              }}
                            >
                              <p
                                style={{
                                  fontWeight: "bold",
                                  textAlign: "center",
                                  fontSize: "20px",
                                  letterSpacing: "2px",
                                }}
                              >
                                {curr.FullName}
                              </p>
                              <hr
                                style={{ border: "2px solid " + curr.Color }}
                              />
                              <p
                                style={{
                                  marginTop: "1rem",
                                  textAlign: "center",
                                  fontWeight: " bold",
                                  fontSize: "18px",
                                }}
                              >
                                {Wallet.Balance.toFixed(8) +
                                  " " +
                                  curr.ThreeDigitName}
                              </p>
                            </div>
                          </li>
                        );
                      }
                    }
                  }
                }
                return (
                  <ul
                    onMouseOver={() => this.setState({ IsTickerHovered: true })}
                    onMouseOut={() => this.setState({ IsTickerHovered: false })}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {WalletArray}
                  </ul>
                );
              } else {
                return <div style={{ opacity: 0 }}>W W W</div>;
              }
            }}
          </Ticker>
          
        </div>
      
        <div className=" col-lg-12 ">
              <div className="card">
                <div className="card-body">
                  <div className="divide25"></div>
                  <div className="col-sm-9">
                    <h2 className="page-title">Recent Transaction</h2>
                  </div>
                  <hr />
                  <div className="table-responsive">
                    <div className="col-sm-12 mt-3">
                      <table
                        id="displayTable"
                        className="table table-bordered dataTable"
                        role="grid"
                        aria-describedby="default-datatable_info"
                      >
                        <thead>
                          <tr role="row" style={{ color: "#fff" }}>
                            <th
                              tabIndex="0"
                              aria-controls="default-datatable"
                              rowSpan="1"
                              colSpan="1"
                            >
                              <span className="">Date</span>  (UTC)
                            </th>
                            <th
                              tabIndex="0"
                              aria-controls="default-datatable"
                              rowSpan="1"
                              colSpan="1"
                              aria-label="Name: activate to sort column descending"
                              style={{textAlign:"center"}}
                            >
                              <span className="">Currency</span>
                            </th>
                            <th
                              tabIndex="0"
                              aria-controls="default-datatable"
                              rowSpan="1"
                              colSpan="1"
                              style={{textAlign:"center"}}
                            >
                              <span className="">Amount</span>
                            </th>
                            <th
                              tabIndex="0"
                              aria-controls="default-datatable"
                              rowSpan="1"
                              colSpan="1"
                              style={{textAlign:"center"}}
                            >
                              {" "}
                              <span className="">Payment Type</span> 
                            </th>
                            <th
                              tabIndex="0"
                              aria-controls="default-datatable"
                              rowSpan="1"
                              colSpan="1"
                              style={{textAlign:"center"}}
                            >
                              {" "}
                              <span className="">Payment Status</span> 
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                        {this.props.Wallets && this.props.Wallets.Payments && this.props.Wallets.Payments.map((item, key) => {
        return (
            <tr key={key} style={{color:"#fff"}}>
                <td>{item.PaymentDate}</td>
             <td style={{textAlign:"center"}}>{item.Currency}</td>
             <td style={{textAlign:"center"}}>{item.Amount}</td>
             <td style={{textAlign:"center"}}>{item.PaymentType}</td>
             <td style={{textAlign:"center"}}>{item.PaymentStatus}</td>
            </tr>
        )
    })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                <br></br>
                <div className="row" style={{justifyContent:"center"}}>
                <Link to="/RecentTransaction">
                  <button
                    type="button"
                    className="btn btn-light btn-block waves-effect"
                  >
                    <span
                      className="BTN_EDT_PROFILE"
                      style={{ paddingLeft: 5 }}
                    >
                      View All
                    </span>
                  </button>
                </Link>
                </div>
                  
                
                </div>
              </div>
            </div>
      
      
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OverView);
