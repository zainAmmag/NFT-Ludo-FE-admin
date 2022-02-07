import React from "react";
import Dropzone from "react-dropzone";
import { BaseUrl, AuthenticationTokenId } from "../Constants/BusinessManager";
import { SendHttpRequest } from "./utility";
import QRCodes from "qrcode.react";
import swal from "sweetalert";

import { setIsLoaderActive } from "../actions/index";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import ShareInvoice from "./ShareInvoice";

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
  };
};
const mapStateToProps = (state) => {
  return {
    Wallets: state.Wallets,
    Defaults: state.Defaults,
  };
};

class WalaGate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      base64: "",
      AmountToSend: "",
      InvoiceDescription: "",
      MerchantKey: "",
      QrPrinted: false,
    };
  }
  async generateQR(event) {
    event.preventDefault();
    const { InvoiceDescription, AmountToSend } = this.state;

    this.setState({ MerchantKey: "", QrPrinted: false });
    //filter: currency selection check
    if (this.props.Defaults.DefaultCurrencyId) {
      if (this.props.Defaults.DefaultCurrencyId === "")
        return swal({
          icon: "error",
          text: "Please Select a default currency from the settings",
        });
    } else {
      return swal({
        icon: "error",
        text: "Please Select a default currency from the settings",
      });
    }
    if (this.props.Token === "") {
      return swal({
        icon: "error",
        text: "Something went wrong, try re-login",
      });
    } else if (AmountToSend === "") {
      return swal({
        icon: "error",
        title: "Oops...",
        text: "Please enter amount to send!",
      });
    } else if (AmountToSend.match(/^-{0,1}\d+$/)) {
      //valid integer (positive or negative)
    } else if (AmountToSend.match(/^\d+\.\d+$/)) {
      //valid float
    } else {
      return swal({
        icon: "error",
        title: "Oops...",
        text: "Please enter a valid Amount!",
      });
    }
    if (parseFloat(AmountToSend) <= 0) {
      return swal({
        icon: "error",
        title: "Oops...",
        text: "Amount should be greater then zero",
      });
    }
    try {
      this.props.setIsLoaderActive(true);
      let t = localStorage.getItem(AuthenticationTokenId);
      let b = this.state.base64 !== "" ? this.state.base64.split(",")[1] : "";
      var result = await SendHttpRequest(
        BaseUrl + "GenerateInvoice",
        {
          Token: t,
          CurrencyId: this.props.Defaults.DefaultCurrencyId,
          Amount: AmountToSend,
          InvoiceDescription: InvoiceDescription,
          InvoiceImageString: b,
        },
        "POST"
      );
      if (result.Success === true) {
        this.setState({
          MerchantKey: result.Data,
          QrPrinted: true,
        });
        this.props.setIsLoaderActive(false);
      } else {
        throw new Error("error");
      }
    } catch (error) {
      this.props.setIsLoaderActive(false);
      return swal({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong, try later or re-login",
      });
    }
  }
  validateAmount = async (text) => {
    if (text) {
      if (text.indexOf(".") == 0) {
        text = "0" + text;
      }
      let parsed = parseFloat(text);
      if (parsed != text) {
        return false;
      }
    }
    await this.setState({ AmountToSend: text });
  };
  onPreviewDrop = (files) => {
    if (files !== [] && files.length > 0) {
      var reader = new FileReader();
      reader.onload = function (e) {
        this.setState({
          base64: e.target.result,
        });
      }.bind(this);
      reader.readAsDataURL(files[0]);
      this.setState({
        files: files,
      });
    }
  };
  render() {
    const previewStyle = {
      display: "inline",
      width: "100%",
      height: "auto",
    };
    let currency = "";
    if (this.props.Wallets.Currencies) {
      this.props.Wallets.Currencies.forEach((element) => {
        return element.CurrencyId.toString() ===
          this.props.Defaults.DefaultCurrencyId.toString()
          ? (currency = element.ThreeDigitName)
          : "";
      });
    }
    return (
      <div>
        <div className="col-sm-9">
          <h2 className="invoiceHeading">INVOICE</h2>
        </div>
        <div className="col-sm-3"></div>
        <div className="container-fluid body-content mx-auto">
          <div className="card">
            {/* <h2 className="invoiceHeading ml-5">Invoice</h2> */}
            <div className="row invoice-form">
              {!this.state.QrPrinted ? (
                <div className="mx-auto col-md-8 col-sm-8 col-lg-8">
                   <form onSubmit={(event)=>{this.generateQR(event)}}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="invoice"
                      onChange={(e) => {
                        this.setState({ InvoiceDescription: e.target.value });
                      }}
                      className="form-control"
                      placeholder="Invoice Description"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="amount"
                      value={this.state.AmountToSend}
                      onChange={(e) => {
                        return this.validateAmount(e.target.value);
                      }}
                      className="form-control"
                      placeholder="Amount"
                    />
                  </div>
                  <label>Attach invoice photo</label>

                  <Dropzone
                    onDropAccepted={this.onPreviewDrop.bind(this)}
                    accept=".png"
                    maxSize={2000000}
                    onDropRejected={(files) => {
                      swal({
                        icon: "error",
                        text:
                          "file must be of format .png and size less then 2MB",
                      });
                    }}
                    multiple={false}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div
                          {...getRootProps()}
                          style={{
                            background: "lightGrey",
                            borderWidth: 2,
                            borderColor: "white",
                            borderStyle: "dashed",
                            borderRadius: 5,
                            width: "100%",
                            height: 90,
                            display: "flex",
                            alignContent: "center",
                            textAlign: "center",
                          }}
                        >
                          <div
                            className="mx-auto"
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <input {...getInputProps()} />
                            <p>
                              Drag and drop or click to{" "}
                              {this.state.base64 === ""
                                ? "select a image to upload."
                                : "change upload image."}
                            </p>
                          </div>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                  <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 form-group">
                      <button
                        // onClick={() => {
                        //   this.generateQR();
                        // }}
                        className="generateQrButton"
                      >
                        Generate Invoice QR
                      </button>
                    </div>
                    <div className="col-md-3"></div>
                  </div>
                  </form>
                  {this.state.files.length > 0 ? (
                    <div>
                      <div style={{ color: "white" }}> Your invoice:</div>
                      <div>
                        {
                          <img
                            alt=""
                            style={previewStyle}
                            src={this.state.base64}
                          />
                        }
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div
                      className="form-group"
                      style={{ width: "fit-content" }}
                    >
                      <div
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to create new invoice Qr?"
                            )
                          ) {
                            this.setState({
                              MerchantKey: "",
                              QrPrinted: false,
                              AmountToSend: "",
                              InvoiceDescription: "",
                            });
                          } else {
                          }
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <i className="fa fa-arrow-left"></i> Go back
                      </div>
                    </div>
                  </div>
                  <div className="mx-auto col-md-8 col-sm-8 col-lg-8 pb-5">
                    <label>Amount:</label>{" "}
                    <h4 style={{ color: "white" }}>
                      {this.state.AmountToSend} {currency}
                    </h4>
                    <hr />
                    <br />
                    <label>Description:</label>{" "}
                    <h4 style={{ color: "white" }}>
                      {this.state.InvoiceDescription}
                    </h4>
                    <hr />
                    <br />
                    <h4 style={{ color: "white" }}>
                      Scan this qr from payWala app to Pay
                    </h4>
                    <div
                      className="mx-auto mt-5 mb-5"
                      style={{ width: "fit-content" }}
                    >
                      <QRCodes
                        value={JSON.stringify({
                          MerchantInvoiceId: this.state.MerchantKey,
                        })}
                        size={200}
                      ></QRCodes>
                    </div>
                    <div
                      className="form-group mx-auto"
                      style={{ width: "fit-content" }}
                    >
                      <ShareInvoice
                        InvoiceId={this.state.MerchantKey}
                        Amount={this.state.AmountToSend}
                        Currency={currency}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WalaGate);
