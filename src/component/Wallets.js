import React from "react";
import EthereumLogo from "../Assets/images/eth_logo.png";
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

class Wallets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: "",
      currentCurrency: "ETH",
      token: "",
      Wallet: "",
      QWallet: "",
      Currency: "",
      toAddress: "",
      AmountToSend: "",
      SendPage: true,
      Fiat: false,
      imgUrl: "",
      copyButton: "Copy",
      buttonColor: false
    };
  }
  UserWallets = [];
  isFirst = true;
  validateAddress = async (text) => {
    await this.setState({ toAddress: text.target.value });
  };
  validateAmount = async (text) => {
    if (text) {
      if (text.indexOf(" ") > -1) {
        return false;
      }
      if (text.indexOf(".") === 0) {
        text = "0" + text;
      }
      try {
        let parsed = parseFloat(text);
        if (parsed != text) {
          return false;
        }
      } catch (error) {
        return false;
      }
    }
    await this.setState({ AmountToSend: text });
  };
  copyCodeToClipboard = () => {
    const el = this.textArea;
    debugger;
    el.select();
    document.execCommand("copy");
    this.setState({ 
        copyButton: "Copied",
        buttonColor: true
    });
  };
  componentDidUpdate() {
    this.renderCurrencies();
  }
  async componentDidMount() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const c = params.get("c");
    if (c) {
      if (c.trim() !== "" || c.trim() !== null) {
        this.setState({ currentCurrency: c }, () => {
          this.setCurrentWallet();
        });
      } else {
        this.setCurrentWallet();
      }
    } else {
      this.setCurrentWallet();
    }
  }
  async setCurrentWallet() {
    if (this.props.Wallets.Wallets) {
      this.props.setIsLoaderActive(true);
      this.props.Wallets.Currencies.forEach(async (Currency, index) => {
        if (Currency.ThreeDigitName === this.state.currentCurrency) {
          this.setState({
            Currency: Currency,
            imgUrl: Currency.ImgURL,
            Fiat: Currency.IsFiat,
          });
        }
      });
      let _wallet = "",
        _QWallet = "";
      this.props.Wallets.Wallets.forEach(async (wallet, index) => {
        if (wallet.Currency === this.state.currentCurrency) {
          if (wallet.WalletType === "FUNDING") {
            _wallet = wallet;
            await this.setState({ Wallet: wallet });
          } else {
            _QWallet = wallet;
            await this.setState({ QWallet: wallet });
          }
        }
      });
      try {
        if (_wallet === "" && _QWallet === "") {
          const { currentCurrency } = this.state;
          let t = localStorage.getItem(AuthenticationTokenId);
          let IsMerchant = localStorage.getItem(UserTypeTokenId);
          var data = await SendHttpRequest(
            BaseUrl + "GenerateNewWalletAddress",
            { token: t, currency: currentCurrency, IsMerchant: IsMerchant },
            "POST"
          );
          this.props.setIsLoaderActive(false);
          if (data.Success == true) {
            data.Data.forEach((value, index) => {
              if (value.WalletType == "FUNDING") {
                this.setState({ Wallet: value });
                var newobj = this.props.Wallets;

                newobj.Wallets.push(value);
                this.props.addWallets(newobj);
              } else {
                this.setState({ QWallet: value });
                var qnewobj = this.props.Wallets;

                qnewobj.Wallets.push(value);
                this.props.addWallets(qnewobj);
              }
            });
            return;
          } else {
            throw new Error(JSON.stringify(data));
          }
        } else {
          return this.props.setIsLoaderActive(false);
        }
      } catch (error) {
        this.props.setIsLoaderActive(false);
        return swal({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong, try again later",
        });
      }
    }
  }
  GetCurrentCurrencyWallet = (elem) => {
    this.props.Wallets.Wallets.forEach(async (wallet, index) => {
      if (wallet.Currency === elem) {
        if (wallet.WalletType === "FUNDING") {
          await this.setState({ Wallet: wallet });
        } else {
          await this.setState({ QWallet: wallet });
        }
      }
    });
  };
  Send = async () => {
    let token = localStorage.getItem(AuthenticationTokenId);
    let { currentCurrency, toAddress, AmountToSend } = this.state;

    if (toAddress == "") {
      return swal({
        icon: "error",
        title: "Oops...",
        text: "Please enter wallet address!",
      });
    }
    if (
      AmountToSend == undefined ||
      AmountToSend == null ||
      AmountToSend == "" ||
      parseFloat(AmountToSend) <= 0
    ) {
      return swal({
        icon: "error",
        title: "Oops...",
        text: "Please enter amount to send!",
      });
    } else {
      this.props.setIsLoaderActive(true);
      try {
        var data = await SendHttpRequest(
          BaseUrl + "Withdraw",
          {
            Token: token,
            Currency: currentCurrency,
            Address: toAddress,
            Amount: this.state.AmountToSend,
          },
          "POST"
        );
        if (data.Success == true) {
          this.props.setIsLoaderActive(false);
          return swal({
            icon: "success",
            text: "Transaction processed!",
          });
        } else {
          this.props.setIsLoaderActive(false);
          if (
            (data.Exception + "").includes("string") ||
            (data.Exception + "").includes("Hex")
          ) {
            return swal({
              icon: "error",
              text:
                "Something went wrong,check Address or/and available Balance and try again",
            });
          } else {
            return swal({
              icon: "error",
              text: "Something went wrong,check Address",
            });
          }
        }
      } catch (error) {
        swal({
          icon: "error",
          text:
            "Something went wrong,check Address or/and available Balance and try again",
        });
        return;
      }
    }
  };
  SendPage = () => {
    return (
      <div
        style={{
          flex: 0.6,
          alignItems: "center",
          padding: 20,
          width: "85%",
          margin: "auto",
        }}
      >
        <div>
          <div style={{ flexDirection: "row" }}>
            <div style={{ marginTop: 13, marginLeft: 15 }}></div>
          </div>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="address"
            onChange={(text) => {
              this.validateAddress(text);
            }}
            className="form-control"
            placeholder="Address"
            required=""
          />
        </div>
        <div className="form-group">
          <input
            name="amount"
            type="text"
            onChange={(el) => {
              this.validateAmount(el.target.value);
            }}
            value={this.state.AmountToSend}
            className="form-control"
            placeholder="Amount"
            required=""
          />
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 form-group">
            <button
              className="sendButton"
              onClick={() => {
                this.Send();
              }}
            >
              Send
            </button>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    );
  };
  ReceivePage = () => {
    return (
      <div
        style={{
          flex: 0.6,
          padding: "0px 15px",
          alignItems: "center",
          width: "85%",
          margin: "auto",
        }}
      >
        <div style={{ alignItems: "center" }}>
          <QRCodes value={this.state.Wallet.WalletAddress} />

          <input
            className="form-control"
            style={{ fontSize: 15, marginTop: 25 }}
            ref={(textarea) => (this.textArea = textarea)}
            value={this.state.Wallet.WalletAddress}
          />
          <div style={{ margin: 14 }}>
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6 form-group">
                <button
                  className={!this.state.buttonColor?"copyButton" : "copiedButton"}
                  onClick={() => this.copyCodeToClipboard()}
                >
                  {this.state.copyButton}
                </button>
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  WalletBalance = (curr) => {
    for (const wallet of this.props.Wallets.Wallets) {
      if (
        curr === wallet.Currency &&
        (wallet.WalletType === "QUICKPAY" || wallet.WalletType === "FIAT")
      ) {
        return <span>{wallet.Balance.toFixed(8) + " " + wallet.Currency}</span>;
      }
    }
    return <span>{"0 " + curr}</span>;
  };

  renderCurrencies = () => {
    let IsMerchant = localStorage.getItem(UserTypeTokenId);
    let __UserWallets = [];
    this.props.Wallets &&
      this.props.Wallets.Currencies &&
      this.props.Wallets.Currencies.forEach((element, index) => {
        if (IsMerchant) {
          if (IsMerchant !== "true" && element.IsFiat === true) {
          } else {
            
            __UserWallets.push(
              <div key={index}>
                <div
                  className="walletRIghtSideBar"
                  onClick={() => {
                    this.setCurrency(element);
                  }}
                >
                  <img className=" mr-3 rounded-circle" src={element.ImgURL} alt="CurrencyImage" />
                  <h5>
                    {element.FullName}
                    <br />
                    ({element.ThreeDigitName})
                  </h5>
                </div>
                <hr style={{ margin: "0" }} />
              </div>
            );
          }
        }
      });
    this.UserWallets = __UserWallets;
    if (
      this.props.Wallets &&
      this.props.Wallets.Currencies &&
      this.props.Wallets.Currencies
    ) {
      if (this.isFirst) {
        if (this.state.currentCurrency === "ETH") {
          this.setFirstCurrency(
            this.props.Wallets &&
              this.props.Wallets.Currencies &&
              this.props.Wallets.Currencies
          );
        }

        this.isFirst = false;
      }
    }
  };

  setCurrency = async (elem) => {
    this.setState(
      { imgUrl: elem.ImgURL, currentCurrency: elem.ThreeDigitName },
      () => {
        this.setCurrentWallet();
      }
    );
    //this.GetCurrentCurrencyWallet(elem.ThreeDigitName);
  };

  setFirstCurrency = (data) => {
    if (data !== undefined) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].ThreeDigitName === "ETH") {
          this.setCurrency(data[i]);
        }
      }
    }
  };

  render() {
    return (
      <div className="row pt-2 pb-2">
        <div className="col-sm-9">
          <h2 className="page-title">WALLET</h2>
        </div>
        <div className="col-sm-3"></div>
        <div className="col-lg-8" style={{ textAlign: "center" }}>
          <div className="card" style={{ height: 500 }}>
            {this.state.imgUrl ? (
              <img src={this.state.imgUrl} className="currencyIcon" />
            ) : (
              <p></p>
            )}
            <h3 className="h3Heading">
              {this.WalletQuickPayBalance(this.state.currentCurrency)}
            </h3>
            {this.state.QWallet.WalletType === "FIAT" ? (
              <div ></div>
            ) : (
              <Tabs>
                <div className="SendReceiveTabs">
                  <TabLink
                  style={{ background:this.state.SendPage
                    ? "#AF8500"
                    : "#fabf01",
                    borderTopLeftRadius: 50,
                    borderBottomLeftRadius: 50,
                  }}
                    className="nav-item tabsButton"
                    to="send"
                    onClick={() => {
                      this.setState({ SendPage: true });
                    }}
                  >
                    SEND
                  </TabLink>
                  <TabLink
                  style={{ background:!this.state.SendPage
                    ? "#AF8500"
                    : "#fabf01",
                    borderBottomRightRadius: 50,
                    borderTopRightRadius: 50,
                  }}
                    className="nav-item tabsButton"
                    to="receive"
                    onClick={() => {
                      this.setState({ SendPage: false });
                    }}
                  >
                    RECEIVE
                  </TabLink>
                </div>
              </Tabs>
            )}
            {this.state.QWallet.WalletType === "FIAT" ? (
              <div></div>
            ) : this.state.SendPage ? (
              <this.SendPage />
            ) : (
              <this.ReceivePage />
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card currencyCard">{this.UserWallets}</div>
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

  WalletBalance = (curr) => {
    if (this.props.Wallets.Wallets) {
      for (const wallet of this.props.Wallets.Wallets) {
        if (curr == wallet.Currency) {
          if (wallet.WalletType == "FUNDING")
            return <p>{wallet.Balance + " " + wallet.Currency}</p>;
        }
      }
    }
    return <p>{"0 " + curr}</p>;
  };
  WalletQuickPayBalance = (curr) => {
    if (this.props.Wallets.Wallets) {
      for (const wallet of this.props.Wallets.Wallets) {
        if (curr == wallet.Currency) {
          if (wallet.WalletType != "FUNDING")
            return <p><b>{wallet.Currency+" "+wallet.Balance.toFixed(8) }</b></p>;
        }
      }
    }
    return <p><b>{curr+" 0.00000000"}</b></p>;
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Wallets);
