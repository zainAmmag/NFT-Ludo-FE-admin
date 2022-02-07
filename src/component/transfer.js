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

class Transfer extends React.Component {
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
      buttonColor: false,
      assetObj: {
        Contract: {
          AnyReceiverAddress: true,
          AssetAlies: "",
          ContractAddress: "",
          ContractID: 0,
          ContractPrivateKey: "",
          ContractStatus: "",
          ContractTimestamp: "",
          ExectAmount: 4,
          IsPaymentReceived: false,
          OwnerAddress: "",
          PaymentReceiveAddress: "",
        },
        CurrentlyActive: true,
        HouseAreaInSqMeter: "",
        HouseBathRooms: "",
        HouseBedRooms: "",
        HouseDetails: "",
        HouseDrawingRoom: "",
        HouseLiving: "",
        HouseLocation: "",
        HouseNearestPark: "",
        HouseOwnerName: "",
        IsPlot: true,
        LandAssetAlias: "",
        LandAssetIcon: "",
        LandAssetName: "",
        LandAssetOldOwnerAddress: "",
        LandAssetOwnerAddress: "",
        LandAssetParentHash: "",
        LandAssetStatus: "",
        LandAssetTimeStamp: "",
        LandAssetTxHash: "",
        LandAssetVerificationCount: "33",
        LandAssetVerificationTime: "",
        PlotAreaInSqMeter: "",
        PlotLocation: "",
        PlotOwnerName: "",
      },
      show: false,
      amount: 0,
      receiverAddress: ''
    };
  }

  componentDidMount() {
    try {

      const { data } = this.props.location;
      if (!data) {
        throw new Error("go back");
      }
      this.setState({ assetObj: data });
      let obj = this.state.assetObj;
      console.log(data);
    } catch (error) {
      this.props.history.push('/Asset');
    }
  }
  toggle = () => this.setState((currentState) => ({ show: !currentState.show }));


  UserAssets = [];
  isFirst = true;
  // renderAssets = () => {
  //   let IsMerchant = localStorage.getItem(UserTypeTokenId);
  //   let __UserAssets = [];
  //   this.props.Wallets &&
  //     this.props.Wallets.Currencies &&
  //     this.props.Wallets.Currencies.forEach((element, index) => {
  //       if (IsMerchant) {
  //         if (IsMerchant !== "true" && element.IsFiat === true) {
  //         } else {

  //           __UserAssets.push(
  //             <div key={index}>
  //               <div
  //                 className="walletRIghtSideBar"
  //                 onClick={() => {
  //                   this.setCurrency(element);
  //                 }}
  //               >
  //                 <img className=" mr-3 rounded-circle" src={element.ImgURL} alt="CurrencyImage" />
  //                 <h5>
  //                   {element.FullName}
  //                   <br />
  //                   ({element.ThreeDigitName})
  //                 </h5>
  //               </div>
  //               <hr style={{ margin: "0" }} />
  //             </div>
  //           );
  //         }
  //       }
  //     });
  //   this.UserAssets = __UserAssets;
  //   if (
  //     this.props.Wallets &&
  //     this.props.Wallets.Currencies &&
  //     this.props.Wallets.Currencies
  //   ) {
  //     if (this.isFirst) {
  //       if (this.state.currentCurrency === "ETH") {
  //         this.setFirstCurrency(
  //           this.props.Wallets &&
  //             this.props.Wallets.Currencies &&
  //             this.props.Wallets.Currencies
  //         );
  //       }

  //       this.isFirst = false;
  //     }
  //   }
  // };



  contractForm = async () => {
    swal({
      title: "Are you sure you want to generate contract?",
      text: "Once click will not be revoked.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((val) => {
      if (val) {
        let t = localStorage.getItem(AuthenticationTokenId);
        let obj = {
          token: t,
          Mnemonics: '',
          ReceiverAddress: this.state.receiverAddress,
          Amount: this.state.amount,
          Alias: this.state.assetObj.LandAssetAlias,
          AssetName: this.state.assetObj.LandAssetName
        };
        let res = SendHttpRequest(BaseUrl + 'CreateContract',
          obj
          , 'POST');
        if (res.Success === true) {
          swal({
            title: "Contract generated successfully",
            icon: "info",
            buttons: false,
            dangerMode: false,
          })
        }
        else {

        }
      }
    });
    // .then(function (willDelete) {
    //     if (willDelete) {
    //         let mnemonics = '';
    //         let receiverAddress = $('#receiver_address').val();
    //         let amount = $('#amount').val();
    //         let alias = $('#alias').val();
    //         let assetName = $('#asset_name').val();
    //         var _res = window.external.CreateAssetContract(mnemonics, receiverAddress, alias, parseFloat(amount), assetName);
    //         let res = JSON.parse(_res);
    //         if (res.Success === true) {
    //             swal("contract is successfully created.", {
    //                 icon: "success",
    //             });
    //             setTimeout(() => { window.location.reload(); }, 1000);
    //         } else {
    //             swal({
    //                 title: "Error",
    //                 text: res.Exception
    //             });
    //         }
    //     } else {

    //     }
    // });
  };

  render() {
    return (
      <div className="row pt-2 pb-2">
        <div className="col-sm-9">
          <h2 className="page-title">ASSETS</h2>
        </div>
        <div className="col-sm-3"></div>
        <div className="col-lg-12" style={{ textAlign: "center" }}>
          <div className="card" style={{ padding: 15 }}>
            <div class="row" style={{ textAlign: "left" }}>
              <div class="col-md-12">
                <div class="form-group">
                  <label for="Address" class="LABEL_ADDRESS">  Asset Transaction Hash : </label>
                  <div class="form-control" id="landAssetTransactionHash"> {this.state.assetObj.LandAssetTxHash}</div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label for="Address" class="LABEL_ADDRESS">  Asset Parent Hash : </label>
                  <div class="form-control" id="landAssetParentHash"> {this.state.assetObj.LandAssetParentHash}</div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label for="Address" class="LABEL_ADDRESS">  Asset Owner Address : </label>
                  <div class="form-control" id="landAssetOwnerAddress"> {this.state.assetObj.LandAssetOwnerAddress}</div>
                </div>
              </div>
            </div>
            <div class="row" style={{ textAlign: "left" }}>
              <div class="col-md-4">
                <div class="form-group">
                  <label for="Address" class="LABEL_ADDRESS">  Asset Name : </label>
                  <div class="form-control" id="landAssetName">{this.state.assetObj.LandAssetName}</div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label for="Address" class="LABEL_ADDRESS">  Asset Alias : </label>
                  <div class="form-control" id="landAssetAlias"> {this.state.assetObj.LandAssetAlias}</div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label for="Address" class="LABEL_ADDRESS">  Asset Status : </label>
                  <div class="form-control" id="landAssetStatus"> {this.state.assetObj.LandAssetStatus}</div>
                </div>
              </div>
            </div>
            <div id="Send" class="w3-container w3-display-container city">
              <div class="row" id="plot_data" style={{ textAlign: "left" }}>
                <div class="col-md-12"><h4>LAND INFORMATION</h4></div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="Address" class="LABEL_ADDRESS">  Owner Name </label>
                    <div class="form-control" id="plotOwnerName"> {this.state.assetObj.PlotOwnerName}</div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label for="Address" class="LABEL_ADDRESS">  Area (Sqr/m): </label>
                    <div class="form-control" id="plotArea"> {this.state.assetObj.PlotAreaInSqMeter}</div>
                  </div>
                </div>
                <div class="col-md-9">
                  <div class="form-group">
                    <label for="Address" class="LABEL_ADDRESS">  Location : </label>
                    <div class="form-control" id="plotLocation"> {this.state.assetObj.PlotLocation}</div>
                  </div>
                </div>
              </div>

            </div>
            <div id="Recieve" class="w3-container w3-display-container city" style={{ height: "auto" }}>
              <div class="row" id="house_data" style={{ textAlign: "left" }}>
                <div class="col-md-12">
                  <h4>HOUSE INFORMATION</h4>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="Address" class="LABEL_ADDRESS">  Owner Name </label>
                    <div class="form-control" id="houseOwnerName"> {this.state.assetObj.HouseOwnerName}</div>
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="form-group">
                    <label for="Address" class="LABEL_ADDRESS">  Location : </label>
                    <div class="form-control" id="houseLocation"> {this.state.assetObj.HouseLocation}</div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="Address" class="LABEL_ADDRESS">  Area (Sqr/m): </label>
                    <div class="form-control" id="houseArea"> {this.state.assetObj.HouseAreaInSqMeter}</div>
                  </div>
                </div>


                <div class="col-md-3">
                  <div class="form-group">
                    <label for="Address" class="LABEL_ADDRESS">  Bed Rooms : </label>
                    <div class="form-control" id="houseBedroom"> {this.state.assetObj.HouseBedRooms}</div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label for="Address" class="LABEL_ADDRESS">  Bath Rooms : </label>
                    <div class="form-control" id="houseBathroom"> {this.state.assetObj.HouseBathRooms}</div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label for="Address" class="LABEL_ADDRESS">  Living : </label>
                    <div class="form-control" id="houseLiving"> {this.state.assetObj.HouseLiving}</div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label for="Address" class="LABEL_ADDRESS">  Drawing Rooms : </label>
                    <div class="form-control" id="houseDrawingroom">{this.state.assetObj.HouseDrawingRoom}</div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="Address" class="LABEL_ADDRESS">  Details : </label>
                    <div class="form-control" id="houseDetail"> {this.state.assetObj.HouseDetails}</div>
                  </div>
                </div>

              </div>
            </div>
            <div id="contract_panel" style={{ textAlign: "left", display: this.state.assetObj.Contract !== undefined && this.state.assetObj.Contract !== null && this.state.assetObj.Contract.ContractID > 0 ? 'block' : 'none' }}>
              {/* <div id="contract_panel" style={{ textAlign: "left", display: 'block' }}> */}
              <div class="row">
                <div class="col-md-12"><h4>CONTRACT INFORMATION</h4></div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="Address" class="LABEL_ADDRESS">  Contract address </label>
                    <div class="form-control" id="contract_address"> {this.state.assetObj.Contract.ContractAddress}</div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="Address" class="LABEL_ADDRESS">  Owner address </label>
                    <div class="form-control" id="contract_owner_address">{this.state.assetObj.Contract.OwnerAddress}</div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="Address" class="LABEL_ADDRESS">  Receiver address </label>
                    <div class="form-control" id="contract_receiver_address"> {this.state.assetObj.Contract.PaymentReceiveAddress}</div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="Address" class="LABEL_ADDRESS">  Alias </label>
                    <div class="form-control" id="contract_alias"> {this.state.assetObj.Contract.AssetAlies}</div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="Address" class="LABEL_ADDRESS">  Contract status </label>
                    <div class="form-control" id="contract_status"> {this.state.assetObj.Contract.ContractStatus}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="divise20"></div>
            <div style={{ textAlign: "center" }}>
              {/* <Link to={{pathname:"/TransferForm"}}>
                                                                    <button id="contract_transfer" class="btn btn-outline-info">Transfer</button>

                    
                    </Link>  */}
              {
                (this.state.assetObj.Contract != null && this.state.assetObj.Contract != undefined && this.state.assetObj.Contract.ContractID > 0 ?
                  null
                  :
                  (
                    <button onClick={this.toggle} id="contract_transfer" class="btn btn-outline-info">Transfer</button>
                  ))
              }



            </div>
            {this.state.show &&
              <div id="transfer" style={{ textAlign: "left" }}>
                <form action="#" method="post" id="contractForm"
                  onSubmit={(e) => { e.preventDefault(); this.contractForm(); }}
                >
                  <div class="form-group">
                    <label for="Address" class="LABEL_ADDRESS">  Alias : </label>
                    <input type="text" id="alias" name="alias" value={this.state.assetObj.LandAssetAlias} readOnly class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="Address" class="LABEL_ADDRESS">  Asset Name : </label>
                    <input type="text" id="asset_name" name="asset_name" value={this.state.assetObj.LandAssetName} readOnly class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="Address" class="LABEL_ADDRESS">  Receiver Address : </label>
                    <input type="text" id="receiver_address" name="receiver_address" onChange={(e) => { this.setState({ receiverAddress: e.target.value }) }} class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="Address" class="LABEL_ADDRESS"> Amount : </label>
                    <input type="number" id="amount" name="amount" onChange={(e) => { this.setState({ amount: e.target.value }) }} class="form-control" />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <button type="submit" class="btn btn-primary">Create Asset Contract</button>
                    <button type="button" id="contract_form_cancel" class="btn btn-danger">Cancel</button>
                  </div>
                </form>
              </div>
            }

          </div>
        </div>
        {/* <div className="col-lg-4">
          <div className="card currencyCard"></div>
        </div> */}


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
            return <p><b>{wallet.Currency + " " + wallet.Balance.toFixed(8)}</b></p>;
        }
      }
    }
    return <p><b>{curr + " 0.00000000"}</b></p>;
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Transfer);
