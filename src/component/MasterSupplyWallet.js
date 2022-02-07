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
      Address: "",
      AmountToSend: "",
      SendPage: true,
      Fiat: false,
      imgUrl: "",
      copyButton: "Copy",
      buttonColor: false,
    };
  }

  copyCodeToClipboard = () => {
    const el = this.textArea;
    el.select();
    document.execCommand("copy");
    this.setState({
      copyButton: "Copied",
      buttonColor: true,
    });
  };
  async componentDidMount() {
    this.props.setIsLoaderActive(true);

    try {
      var data = await SendHttpRequest(
        BaseUrl + "v1/MasterWallet/GetAddressForTokenSupply",
        {},
        "GET"
      );
      if (data.isSuccess == true) {
        this.setState({ Address: data.data});
        this.props.setIsLoaderActive(false);
      } else {
        throw new Error("Something went wrong, try to re-login");
      }
    } catch (error) {
      this.props.setIsLoaderActive(false);
      return swal({
        icon: "error",
        text: "Something went wrong, try to re-login",
      });
    }
  }

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
          <QRCodes value={this.state.Address} />

          <input
            className="form-control"
            style={{ fontSize: 15, marginTop: 25 }}
            ref={(textarea) => (this.textArea = textarea)}
            value={this.state.Address}
          />
          <div style={{ margin: 14 }}>
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6 form-group">
                <button
                  className={
                    !this.state.buttonColor ? "copyButton" : "copiedButton"
                  }
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

  render() {
    return (
      <div className="row pt-2 pb-2">
        <div className="col-sm-9">
          <h2 className="page-title">Master Supply Wallet</h2>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12" style={{ textAlign: "center" }}>
          <div className="card" style={{ height: 500 }}>
            <h3 className="h3Heading">{}</h3>

            <this.ReceivePage />
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Wallets);
