import React from "react";
import Dropzone from "react-dropzone";
import { BaseUrl, AuthenticationTokenId, WHCCoinUrl } from "../Constants/BusinessManager";
import { SendHttpRequest } from "./utility";
import QRCodes from "qrcode.react";
import swal from "sweetalert";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ShareInvoice from "./ShareInvoice";
import { Search, ShoppingCart, MapPin, ChevronRight, ChevronLeft } from 'react-feather';
import { Button, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import {
  addWallets,
  setFocused,
  setToken,
  setQR,
  setIsLoaderActive,
} from "../actions/index";
const mapDispatchToProps = (dispatch) => {
  return {
    addWallets: bindActionCreators(addWallets, dispatch),
    setFocused: bindActionCreators(setFocused, dispatch),
    setToken: bindActionCreators(setToken, dispatch),
    setQR: bindActionCreators(setQR, dispatch),
    setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
  };
};
const mapStateToProps = (state) => {
  return {
    Wallets: state.Wallets,
    Token: state.Token,
    QRCode: state.QRCode,
    Focused: state.Focused,
  };
};
class Asset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHide: false,
      assets: [],
      AssetData: null,
      currentAsset: "",
      RenderFinished: false,
      res: ""
    }
  }
  getWHCAddress() {
    let walletAddress = "";
    // for (let index = 0; index < this.props.Wallets.Wallets.length; index++)
    this.props.Wallets &&
      this.props.Wallets.Wallets && this.props.Wallets.Wallets.forEach((element, index) => {
        // const element = this.props.Wallets.Wallets[index];
        if (element.Currency === "WHC" && element.WalletType == "QUICKPAY") {
          walletAddress = element.WalletAddress;
        }
      });
    return walletAddress;
  }
  async componentDidMount() {
    this.props.setIsLoaderActive(true);

    this.checkAsset();

  }
  TimeOutId = null;
  checkAsset = async () => {
    let walletAddress = this.getWHCAddress();
    if (walletAddress === "") {
      if (this.TimeOutId !== null) {
        clearTimeout(this.TimeOutId);
      }
      this.TimeOutId = setTimeout(() => {
        this.checkAsset();
      }, 500);
    } else {

      let res = await SendHttpRequest(WHCCoinUrl + 'GetLandAssets?id=' + walletAddress, {}, 'get');
      this.setState({ assets: res });
      this.props.setIsLoaderActive(false);

    }
  }


  handleModalShowHide() {
    this.setState({ showHide: !this.state.showHide })
  }
  render() {
    return (
      <div className="assetPage">
        {
          this.state.assets.length > 0
            ?
            <div className="card ">
              <div className=" row assetRow">
                {this.state.assets.map(item => (
                  <div className="col-sm-12 col-md-12 col-lg-3 column3" style={{ backgroundColor: "#00000033" }}>
                    <h6 style={{ color: "#fff", fontSize: 20, padding: 15 }}>{item.LandAssetName}</h6>
                    <div className="row assetImageRow">
                      <img className="" src={require("../Assets/Icons/asset-icon.png")} alt="First slide" style={{ margin: "auto", width: "40%" }} />

                    </div>
                    <div style={{ textAlign: "left" }}>
                      <Link to={{ pathname: "/Transfer", data: item }}>
                        <button className="transferButton">
                          <span>Show details</span></button>
                      </Link>   </div>

                  </div>
                )
                )}

              </div>
            </div>
            :
            <div className="noAsset">No Asset Available</div>
        }

      </div>)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Asset);