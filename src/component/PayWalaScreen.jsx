import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setIsLoaderActive } from "../actions/index";
import swal from "sweetalert";
import { SendHttpRequest } from "./utility";
import QRCodes from "qrcode.react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import {
  BaseUrl,
  AuthenticationTokenId,
  ImageBaseUrl,
  DefaultCurrencyTokenId,
} from "../Constants/BusinessManager";
import $ from "jquery";

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
      massDataDiscarded: [],
      selectedData: null,
    };
  }
  async discardInvoice(invoiceID) {
    try {
      this.props.setIsLoaderActive(true);
      var t = localStorage.getItem(AuthenticationTokenId);
      var response = await SendHttpRequest(
        BaseUrl + "DiscardInvoice",
        { Token: t, RequestValue: invoiceID },
        "POST"
      );
      if (response.Success) {
        this.props.setIsLoaderActive(false);
        await swal({
          icon: "success",
          title: "discarded",
          text: "Invoice Discarded successfully",
        });
        this.fetchApi();
      } else {
        throw new Error(response.Exception);
      }
    } catch (error) {
      this.props.setIsLoaderActive(false);
      await swal({ icon: "error", text: error.message });
      this.fetchApi();
    }
  }
  async fetchApi() {
    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
    try {
      this.props.setIsLoaderActive(true);
      var t = localStorage.getItem(AuthenticationTokenId);
      var response = await SendHttpRequest(
        BaseUrl + "GetSharedInvoices",
        { Token: t },
        "POST"
      );
      if (response.Success === true) {
        let unpaidInvoice = [];
        let discardedInvoice = [];
        for (let SI of response.Data) {
          if (SI.SharedInvoiceStatus === "UNPAID") {
            unpaidInvoice.push(SI);
          } else if (SI.SharedInvoiceStatus === "DISCARDED") {
            discardedInvoice.push(SI);
          }
        }
        this.setState({
          massData: unpaidInvoice,
          massDataDiscarded: discardedInvoice,
        });
        this.props.setIsLoaderActive(false);
      } else {
        throw new Error("s");
      }
    } catch (error) {
      this.props.setIsLoaderActive(false);
      return swal({ icon: "error", text: "System error, try again later" });
    }
  }
  async componentDidMount() {
    await this.fetchApi();
    if (this.state.massData.length > 0) {
      const search = this.props.location.search;
      const params = new URLSearchParams(search);
      const c = params.get("SI");
      if (c) {
        if (c.trim() !== "" || c.trim() !== null) {
          let index = 0;
          for (const item of this.state.massData) {
            if (item.SharedInvoiceId.toString() === c.trim()) {
              this.setState({ selectedData: this.state.massData[index] });
              $(".modal").modal("show");
              break;
            }
            index += 1;
          }
        }
      }
    }
  }
  componentWillUnmount(){
    $(".modal").modal("hide");
  }
  render() {
    return (
      <div className="row pt-2 pb-2 ">
        <div className="col-sm-9">
          <h2 className="page-title">Unpaid invoices</h2>
        </div>
        <div className="col-md-12 col-lg-12">
          <div className="card">
            {this.state.massData.length > 0 ? (
              <div style={{ padding: 10 }}>
                <table
                  className="table table-striped table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl AccountStatement"
                  style={{ textAlign: "center" }}
                >
                  <thead>
                    <tr style={{ color: "#fff" }}>
                      <th>Date</th>
                      <th>Merchant name</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody style={{ color: "#fff" }}>
                    {this.state.massData.map((value, index) => {
                      var date = new Date(value.DateTime);
                      var InvoiceSharedDate =
                        date.getMonth() +
                        1 +
                        "/" +
                        date.getDate() +
                        "/" +
                        date.getFullYear();
                      return (
                        <tr key={index}>
                          <td>{InvoiceSharedDate}</td>
                          <td>{value.VendarEmail}</td>
                          <td
                            style={{
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              maxWidth: "100px",
                            }}
                          >
                            {value.InvoiceDescription}
                          </td>
                          <td>
                            {value.Amount} {value.Currency}
                          </td>
                          <td>
                            <OverlayTrigger
                              placement="top"
                              delay={{ show: 1, hide: 100 }}
                              overlay={(props) => {
                                return (
                                  <Tooltip id="button-tooltip" {...props}>
                                    View invoice
                                  </Tooltip>
                                );
                              }}
                            >
                              <i
                                onClick={() => {
                                  this.setState({ selectedData: value });
                                }}
                                className="fa fa-file-text-o mr-4"
                                style={{ cursor: "pointer" }}
                                data-toggle="modal"
                                data-target="#modelId"
                              >
                                <span
                                  style={{ width: "100%" }}
                                  data-toggle="tooltip"
                                  data-placement="top"
                                ></span>
                              </i>
                            </OverlayTrigger>
                            <OverlayTrigger
                              placement="top"
                              delay={{ show: 1, hide: 100 }}
                              overlay={(props) => {
                                return (
                                  <Tooltip id="button-tooltip" {...props}>
                                    Pay
                                  </Tooltip>
                                );
                              }}
                            >
                              <i
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "Are your sure you want to pay this invoice?"
                                    )
                                  ) {
                                    this.QuickPay(value.InvoiceId);
                                    this.fetchApi();
                                  }
                                }}
                                className="fa fa-money mr-4"
                                data-toggle="tooltip"
                                data-placement="top"
                              ></i>
                            </OverlayTrigger>
                            <OverlayTrigger
                              placement="top"
                              delay={{ show: 1, hide: 100 }}
                              overlay={(props) => {
                                return (
                                  <Tooltip id="button-tooltip" {...props}>
                                    Discard
                                  </Tooltip>
                                );
                              }}
                            >
                              <i
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  this.discardInvoice(value.InvoiceId);
                                }}
                                className="fa fa-times "
                                data-toggle="tooltip"
                                data-placement="top"
                              ></i>
                            </OverlayTrigger>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ alignItems: "center", alignContent: "center" }}>
                <p
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 20,
                  }}
                >
                  No shared invoices
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="col-sm-9">
          <h2 className="page-title">Discarded invoices</h2>
        </div>
        <div className="col-md-12 col-lg-12">
          <div className="card">
            {this.state.massDataDiscarded.length > 0 ? (
              <div style={{ padding: 10 }}>
                <table
                  className="table table-striped table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl AccountStatement"
                  style={{ textAlign: "center" }}
                >
                  <thead>
                    <tr style={{ color: "#fff" }}>
                      <th>Date</th>
                      <th>Merchant name</th>
                      <th>Description</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody style={{ color: "#fff" }}>
                    {this.state.massDataDiscarded.map(function (value, index) {
                      var date = new Date(value.DateTime);
                      var InvoiceSharedDate =
                        date.getMonth() +
                        1 +
                        "/" +
                        date.getDate() +
                        "/" +
                        date.getFullYear();
                      return (
                        <tr key={index}>
                          <td>{InvoiceSharedDate}</td>
                          <td>{value.VendarEmail}</td>
                          <td
                            style={{
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              maxWidth: "100px",
                            }}
                          >
                            {value.InvoiceDescription}
                          </td>
                          <td>
                            {value.Amount} {value.Currency}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ alignItems: "center", alignContent: "center" }}>
                <p
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 20,
                  }}
                >
                  No discarded invoices
                </p>
              </div>
            )}
          </div>
        </div>

        <div
          className="modal fade"
          id="modelId"
          tabindex="-1"
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Invoice</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
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
                        style={{ maxWidth: "467px" }}
                        src={
                          ImageBaseUrl + this.state.selectedData.InvoiceImageURL
                        }
                      />
                    ) : null}
                    <div
                      className="form-group mx-auto"
                      style={{ width: "fit-content" }}
                    >
                      <button
                        onClick={async () => {
                          $(".modal").modal("hide");
                          if (
                            window.confirm(
                              "Are you sure you want to Pay this invoice?"
                            )
                          ) {
                            await this.QuickPay(
                              this.state.selectedData.InvoiceId
                            );
                            this.fetchApi();
                          }
                        }}
                        className="generateQrButton"
                      >
                        Pay invoice
                      </button>
                    </div>
                    <br />
                    <h6>Or pay from mobile app:</h6>
                    <div
                      className="mx-auto mb-5"
                      style={{ width: "fit-content" }}
                    >
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
          </div>
        </div>
      </div>
    );
  }
  QuickPay = async (invoiceID) => {
    try {
      this.props.setIsLoaderActive(true);
      var InvoiceId = invoiceID;
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
