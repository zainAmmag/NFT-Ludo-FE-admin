import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setIsLoaderActive } from "../actions/index";
import swal from "sweetalert";
import { SendHttpRequest } from "./utility";
import QRCodes from "qrcode.react";
import {
  BaseUrl,
  AuthenticationTokenId,
  ImageBaseUrl,
  DefaultCurrencyTokenId,
} from "../Constants/BusinessManager";
import { data } from "jquery";

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
  };
}

class PayWalaScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      massData: [],
      selectedData: null,
    };
  }

  async componentDidMount() {
    try {
      this.props.setIsLoaderActive(true);
      var t = localStorage.getItem(AuthenticationTokenId);
      var response = await SendHttpRequest(
        BaseUrl + "GetSharedInvoices",
        { Token: t },
        "POST"
      );
      if (response.Success === true) {
        this.setState({ massData: response.Data });
        if (response.Data.length > 0) {
          const search = this.props.location.search;
          const params = new URLSearchParams(search);
          const c = params.get("SI");
          if (c) {
            if (c.trim() !== "" || c.trim() !== null) {
              let qSeletected=false;let index=0;
              for (const item of response.Data) {
                if (item.SharedInvoiceId.toString()===c.trim()) {
                  this.setState({ selectedData: response.Data[index] });
                  qSeletected=true;
                  break;
                }
                index+=1;
              }
              if (!qSeletected) {
                this.setState({ selectedData: response.Data[0] });
              }
            } else {
              this.setState({ selectedData: response.Data[0] });
            }
          }else{
            this.setState({ selectedData: response.Data[0] });
          }
        }
        this.props.setIsLoaderActive(false);
      } else {
        throw new Error("s");
      }
    } catch (error) {
      this.props.setIsLoaderActive(false);
      return swal({ icon: "error", text: "System error, try again later" });
    }
  }
  render() {
    return (
      <div className="row">
        <div className="col-sm-9">
          <h2 className="LABEL_WALLET ">payWala</h2>
        </div>
        <div className="col-sm-3"></div>
        <div className="col-lg-8" style={{ textAlign: "center" }}>
          <div className="card" style={{ height: "72%" }}>
            <p></p>
            {this.state.massData &&
            this.state.massData.length > 0 &&
            this.state.selectedData ? (
              <>
                <h3 className="h3Heading">
                  Amount to pay:{" "}
                  {this.state.selectedData.Amount &&
                    this.state.selectedData.Amount}{" "}
                  {this.state.selectedData.Currency &&
                    this.state.selectedData.Currency}
                </h3>
                <br />
                <h6>
                  From:{" "}
                  {this.state.selectedData.VendarEmail &&
                    this.state.selectedData.VendarEmail}
                </h6>
                <br />
                {this.state.selectedData &&
                this.state.selectedData.InvoiceDescription.length > 0 ? (
                  <>
                    <h6>Description:</h6>
                    <p>{this.state.selectedData.InvoiceDescription}</p>
                  </>
                ) : null}
                {this.state.selectedData &&
                this.state.selectedData.InvoiceImageURL.length > 0 ? (
                  <img
                    alt="invoice"
                    src={ImageBaseUrl + this.state.selectedData.InvoiceImageURL}
                  />
                ) : null}
                <div
                  className="form-group mx-auto"
                  style={{ width: "fit-content" }}
                >
                  <button
                    onClick={async () => {
                      if (
                        window.confirm(
                          "Are you sure you want to Pay this invoice?"
                        )
                      ) {
                        await this.QuickPay();
                      }
                    }}
                    className="generateQrButton"
                  >
                    Pay invoice
                  </button>
                </div>
                <br />
                <h6>Or pay from mobile app:</h6>
                <div className="mx-auto mb-5" style={{ width: "fit-content" }}>
                  <QRCodes
                    value={JSON.stringify({
                      MerchantInvoiceId: this.state.selectedData.InvoiceId,
                    })}
                    size={200}
                  ></QRCodes>
                </div>
              </>
            ) : (
              <h1>No Shared Invoices</h1>
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card currencyCard">
            <h6>Shared Invoices (recent)</h6>
            <div>
              {this.state.massData &&
                this.state.massData.map((item, index) => {
                  return (
                    <>
                      <div
                        className="walletRIghtSideBar"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          this.setState({ selectedData: item });
                        }}
                      >
                        <h4>
                          {item.Amount} {item.Currency}
                        </h4>

                        <h6>from: {item.VendarEmail}</h6>
                      </div>
                      <hr style={{ margin: "0" }} />
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
  QuickPay = async () => {
    try {
      this.props.setIsLoaderActive(true);
      var InvoiceId = this.state.selectedData.InvoiceId;
      var DefaultCurrencyId = localStorage.getItem(DefaultCurrencyTokenId);
      let t = localStorage.getItem(AuthenticationTokenId);
      var data = await SendHttpRequest(
        BaseUrl + "QuickPayToken",
        {
          Token: t,
          InvoiceId: InvoiceId,
          DefaultCurrencyId: DefaultCurrencyId,
        },
        "POST"
      );
      if (data.Success) {
        this.props.setIsLoaderActive(false);
        return swal({
          icon: "success",
          title: "Paid!",
          text: "Invoice Paid successfully",
        });
      } else {
        throw new Error(data.Exception);
      }
    } catch (error) {
      this.props.setIsLoaderActive(false);
      return swal({ icon: "error", text: error.message });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PayWalaScreen);
