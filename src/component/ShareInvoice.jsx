import React, { Component } from "react";
import $ from "jquery";
import "bootstrap";
import { connect } from "react-redux";
import { setIsLoaderActive } from "../actions";
import { bindActionCreators } from "redux";
import swal from "sweetalert";
import { SendHttpRequest } from "./utility";
import { BaseUrl, DomainName } from "../Constants/BusinessManager";

// function mapStateToProps(state) {
//     return {

//     };
// }

function mapDispatchToProps(dispatch) {
  return {
    setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
  };
}

class ShareInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ViaEmail: true,
      Email: "",
      ClientId: "",
      emailValidate: true,
      error: "",
      loading:false
    };
  }
  validateEmail(text) {
    var alph = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

    if (alph.test(text)) {
      this.setState({ emailValidate: true, Email: text });
    } else {
      this.setState({ emailValidate: false, Email: text });
    }
  }
  componentDidMount() {
    //Jquery section
    function alignModal() {
      var modalDialog = $(this).find(".modal-dialog");

      // Applying the top margin on modal dialog to align it vertically center
      modalDialog.css(
        "margin-top",
        Math.max(0, ($(window).height() - modalDialog.height()) / 2)
      );
    }
    // Align modal when it is displayed
    $(".modal").on("shown.bs.modal", alignModal);

    // Align modal when user resize the window
    $(window).on("resize", function () {
      $(".modal:visible").each(alignModal);
    });
  }
  ChangeVia(Value) {
    if (Value === "Email") {
      this.setState({ ViaEmail: true, ClientId: "" });
    } else {
      this.setState({ ViaEmail: false, Email: "" });
    }
  }
  async ShareInvoice() {
    try {
      if (this.state.ViaEmail) {
        if (this.state.Email.length === 0) {
          return this.setState({ error: "Please enter email" });
        }
        // if (!this.state.emailValidate) {
        //   return this.setState({
        //     error: "Please enter a email in a valid format",
        //   });
        // }
      } 
      let email="",clientId="";
      if (this.state.Email.includes("@")) {
        email=this.state.Email;
        clientId="";
      }else{
        email="";
        clientId=this.state.Email;
      }
      
      this.setState({ error: "Sharing please wait...",loading:true });
      //this.props.setIsLoaderActive(true);
      
      var response = await SendHttpRequest(
        BaseUrl + "ShareInvoice",
        {
          BaseUrl: DomainName,
          InvoiceId: this.props.InvoiceId,
          Email: email,
          ClientId: clientId,
        },
        "POST"
      );
      if (response.Success === true) {
        this.setState({ error: "",loading:false });
        $("#modal-animation-14").modal("hide");
        
        return swal({
          icon: "success",
          text: "Invoice Shared",
        });
      } else {
        if (response.Data.length > 0) {
          throw new Error(response.Data);
        } else {
          throw new Error("system error");
        }
      }
    } catch (error) {
      //this.props.setIsLoaderActive(false);
      return this.setState({ error: error.message,loading:false });
    }
  }
componentWillUnmount(){
  $(".modal").modal("hide");
}
  render() {
    return (
      <div>
        <button className="generateQrButton"
          onClick={() => {
            // $(".modal").css("display","block")
          }}
          data-toggle="modal"
          data-target="#modal-animation-14"
        >
          Share invoice via Email/ClientId
        </button>

        {/* Modal*/}
        <div
          className="modal popup"
          id="modal-animation-14"
          style={{ display: "none" }}
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div
              className="modal-content animated fadeInUp"
              style={{ background: "#000" }}
            >
              <div className="modal-header">
                <h5 className="modal-title">Share Invoice</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div
                  className=" form-group"
                  style={{ color: "#fff", display: "flex" }}
                >
                  <span className=" mx-auto">
                    Enter customer's email or clientID to share
                  </span>
                </div>

                <div
                  style={{ display: this.state.ViaEmail ? "" : "none" }}
                  className="form-group"
                >
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <div className="position-relative has-icon-right">
                    <input
                    autoComplete="one-time-code"
                      disabled={this.state.ViaEmail ? "" : "Disabled"}
                      name="email"
                      type="text"
                      className="form-control input-shadow"
                      onChange={(event) =>
                        this.setState({Email:event.target.value})
                      }
                      placeholder="Email or ClientID"
                      value={this.state.Email}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <p style={{ color: "red" }}>{this.state.error}</p>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                disabled={this.state.loading?"disabled":""}
                  type="button"
                  onClick={() => {
                    this.ShareInvoice();
                  }}
                  id="ShareInvoice"
                  className="btn btn-success"
                >
                  <i className="fa fa-check-square-o" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(ShareInvoice);
