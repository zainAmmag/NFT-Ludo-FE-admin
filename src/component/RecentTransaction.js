import React from "react";
import { SendHttpRequest } from "./utility";
import {
  BaseUrl,
  AuthenticationTokenId,
  ImageBaseUrl,
} from "../Constants/BusinessManager";
import swal from "sweetalert";
import { Calendar } from "react-feather";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { setIsLoaderActive } from "../actions/index";
// import {Loader} from './Loader'
import Loader from "../component/shared/loader";

const mapStateToProps = (state) => {
  return {
    Token: state.Token,
    Wallets:state.Wallets
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
  };
};
class RecentTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
      dataSource: null,
      ImageModal: false,
      imageUrl: "",
      // showFromDate: false,
      // showToDate: false,
      // from: '',
      // to: '',
      gridView: true,
      tableData: [],
      tableHead: ["Inv #", "Amount", "Detail", "Date"],
      descriptionModel: false,
      periodModal: false,
      AccountDetail: {},
      // DOB: new Date(),
      // kycVerified: true,
      calender: {
        showFromDate: "",
        showToDate: "",
      },
      Rate:0,
      CurrencyName:""
    };
  }

  populateTableData(data) {
    let _tableData = [];
    for (let i = 0; i < data.length; i++) {
      let _d = new Date(data[i].DateTime);
      let date = _d.getFullYear() + "/" + _d.getMonth() + "/" + _d.getDay();
      _tableData.push(JSON.stringify(data[i]));
    }
    //console.log(_tableData)
    return _tableData;
  }

  async componentDidMount() {
    this.props.setIsLoaderActive(true);

    try {
      let t = localStorage.getItem(AuthenticationTokenId);
      var data = await SendHttpRequest(
        BaseUrl + "GetRecentPayment",
        { Token: t },
        "POST"
      );
      if (data.Success) {
        if (data.Data === "") {
          
          this.props.setIsLoaderActive(false)
        } else {
          let d = this.populateTableData(data.Data);
          this.setState({
            dataSource: data.Data,
            
            tableData: d,
            AccountDetail: data.AccountDetail,
          });
          
        }
        return;
      } else {
        throw new Error("Something went wrong try again later");
      }
    } catch (error) {
      this.props.setIsLoaderActive(false)
      return swal({
        icon:"error",
        text:"Something went wrong please try later"});
    }
  }

  searchInvoiceByFilter = async () => {
    try {
      if (
        this.state.calender.showFromDate == null ||
        this.state.calender.showFromDate == ""
      ) {
        swal("From date is required");
        return;
      }
      if (
        this.state.calender.showToDate == null ||
        this.state.calender.showToDate == ""
      ) {
        swal("To date is required");
        return;
      }

      this.props.setIsLoaderActive(true);

      let t = localStorage.getItem(AuthenticationTokenId);
      var data = await SendHttpRequest(
        BaseUrl + "GetRecentPaymentByFilter",
        {
          Token: t,
          From: this.state.calender.showFromDate,
          To: this.state.calender.showToDate,
        },
        "POST"
      );
      if (data.Success) {
        if (data.Data === "") {
          this.setState({
            dataSource: data.Data.PaymentModel,
            from: "",
            to: "",
            
            tableData: [],
            periodModal: false,
          });
          this.props.setIsLoaderActive(false)
        } else {
          let d = this.populateTableData(data.Data.PaymentModel);

          this.setState({
            dataSource: data.Data.PaymentModel,
            
            from: "",
            to: "",
            tableData: d,
            periodModal: false,
          });
          
        }
        return;
      } else {
        throw new Error("Something went wrong try again later");
      }
    } catch (error) {
      this.props.setIsLoaderActive(false)
      return swal({ icon: "error", text: "Something went wrong" });
    }
  };
  GetBaseCurrency(){
    if(this.props.Wallets.Currencies)
    {
      let baseCur=JSON.parse(localStorage.getItem("BaseCurrency"));
      for (const curr of this.props.Wallets.Currencies) {
        if (baseCur.Name===curr.ThreeDigitName) {
          this.setState({Rate:curr.Rate,CurrencyName:curr.ThreeDigitName});
        }
      }
    }
  }
  render() {
    if (this.state.Rate===0) { 
      this.GetBaseCurrency();
    }
    return (
      <div>
        {this.state.periodModal === true ? (
          <div
            style={{
              position: "absolute",
              flex: 1,
              zIndex: 99999,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                padding: 20,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "#fff",
                backgroundColor: "#323C4D",
                alignSelf: "center",
                zIndex: 99999,
              }}
            >
              <div style={{ alignItems: "center" }}>
                <p style={{ color: "#fff", fontSize: 18 }}>SELECT PERIOD</p>
              </div>
              <p
                onClick={() => {
                  this.setState({ showFromDate: true });
                }}
                className="searchTextInput"
              >
                <Calendar />{" "}
                {this.state.from !== "" ? this.state.from : "From Date"}
              </p>
              <p
                onClick={() => {
                  this.setState({ showToDate: true });
                }}
                className="searchTextInput"
              >
                <Calendar /> {this.state.to !== "" ? this.state.to : "To Date"}
              </p>

              <div style={{ flexDirection: "row", marginTop: 30 }}>
                <div style={{ flex: 2 }}>
                  <button
                    onClick={() => {
                      this.searchInvoiceByFilter();
                    }}
                  >
                    <p className="searchButton">Search</p>
                  </button>
                </div>
                <div style={{ flex: 1 }}>
                  <button
                    onClick={() => {
                      this.setState({ periodModal: false });
                    }}
                  >
                    <p className="buttonCloseModal">Close</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        
        <Modal isVisible={this.state.ImageModal}>
          <div style={{ flex: 1 }}>
            <button
              onClick={() => {
                this.setState({ ImageModal: false });
              }}
              title="Close"
            />
            <img
            alt=""
              style={{
                width: "100%",
                resizeMode: "center",
                height: "100%",
              }}
              src={{ uri: this.state.imageUrl }}
            />
          </div>
        </Modal>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-xl-8 col-12 order-2 order-lg-2 order-xl-1">
            <div className="card">
              {this.state.tableData.length > 0 ? (
                <div style={{ padding: 10 }}>
                  <table
                    className="table table-striped table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl AccountStatement"
                    style={{ textAlign: "center" }}
                  >
                    <thead>
                      <tr style={{ color: "#fff" }}>
                        <th>Payment #</th>
                        <th>Amount</th>
                        <th>Currency</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody style={{ color: "#fff" }}>
                      {this.state.dataSource.map((value, index)=>{
                        if (this.state.dataSource.length-1===index) {
                          this.props.setIsLoaderActive(false)
                        }
                        var date = new Date(value.PaymentDate);
                        var PaymentDate =
                          date.getMonth() +
                          1 +
                          "/" +
                          date.getDate() +
                          "/" +
                          date.getFullYear();
                        return (
                          <tr key={index}>
                            <td>{value.PaymentId}</td>
                            <td>{value.Amount}</td>
                            <td>{value.Currency}</td>
                            <td>{PaymentDate}</td>
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
                    No Recent Transactions
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-xl-4 col-12 order-1 order-lg-1 order-xl-2">
            <div className="card">
              <div style={{ padding: 10 }}>
                <h4 style={{ color: "#fff", marginBottom: 0 }}>
                  {this.state.AccountDetail.FullName}
                </h4>
                <h6 style={{ color: "#fff", marginBottom: 0 }}>
                  {this.state.AccountDetail.Email}
                </h6>
              </div>
              <hr></hr>
              <div className="row" style={{ marginBottom: "1rem" }}>
                <div
                  className="col-md-6 col-lg-6 col-sm-6"
                  style={{ textAlign: "center" }}
                >
                  <p style={{ color: "#fff", marginBottom: 0 }}>
                    Available Balance
                  </p>
                </div>
                <div
                  className="col-md-6 col-lg-6 col-sm-6"
                  style={{ textAlign: "center" }}
                >
                  <p style={{ color: "#fff", marginBottom: 0 }}>
                    
                  {this.state.AccountDetail.TotalBalance > 0 ? (parseFloat(this.state.AccountDetail.TotalBalance)/this.state.Rate).toFixed(3) : 0} {this.state.CurrencyName}
                    {/* USD{" "}
                    {parseFloat(this.state.AccountDetail.TotalBalance).toFixed(
                      3
                    ) */}
                    
                  </p>
                </div>
              </div>
              <hr></hr>
              <div className="row" style={{ marginBottom: "1rem" }}>
                <div
                  className="col-md-6 col-lg-6 col-sm-6"
                  style={{ textAlign: "center" }}
                >
                  <p style={{ color: "#fff", marginBottom: 0 }}>
                    Current Balance
                  </p>
                </div>
                <div
                  className="col-md-6 col-lg-6 col-sm-6"
                  style={{ textAlign: "center" }}
                >
                  <p style={{ color: "#fff", marginBottom: 0 }}>
                    {/* USD{" "}
                    {parseFloat(this.state.AccountDetail.TotalBalance).toFixed(
                      3
                    )} */}
                    
                  {this.state.AccountDetail.TotalBalance > 0 ? (parseFloat(this.state.AccountDetail.TotalBalance)/this.state.Rate).toFixed(3) : 0} {this.state.CurrencyName}
                  </p>
                </div>
              </div>
              <hr></hr>
              <div className="row" style={{ marginBottom: "1rem" }}>
                <div className="col-md-6 col-lg-6 col-sm-6">
                  <p
                    style={{
                      color: "#fff",
                      marginBottom: 0,
                      padding: 10,
                      fontSize: 24,
                    }}
                  >
                    Select Period
                  </p>
                </div>
              </div>
              <div className="form-group" style={{ padding: "0px 10px" }}>
                <label htmlFor="FromDate">From Date:</label>
                <DatePicker
                  className="form-control"
                  placeholderText="From Date"
                  onChange={(date) => {
                    this.setState({
                      calender: { ...this.state.calender, showFromDate: date },
                    });
                  }}
                  onClick={() => {
                    this.setState({ showFromDate: true });
                  }}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  maxDate={new Date()}
                  selected={this.state.calender.showFromDate}
                >
                  {this.state.from !== "" ? this.state.from : "From Date"}
                </DatePicker>
              </div>
              <div className="form-group" style={{ padding: "0px 10px" }}>
                <label htmlFor="ToDate">To Date:</label>
                <DatePicker
                  className="form-control"
                  placeholderText="To Date"
                  onChange={(date) => {
                    this.setState({
                      calender: { ...this.state.calender, showToDate: date },
                    });
                  }}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  maxDate={new Date()}
                  selected={this.state.calender.showToDate}
                ></DatePicker>
              </div>
              <div style={{ textAlign: "right", padding: 10 }}>
                <button
                  style={{
                    background: "black",
                    border: "none",
                    color: "#fff",
                    padding: 7,
                    borderRadius: 20,
                    width: 80,
                  }}
                  onClick={() => {
                    this.searchInvoiceByFilter();
                  }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const styles = {
  container: {
    flex: 1,
  },
  convertButton: {
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#000",
    color: "#fff",
    paddingHorizontal: 80,
    paddingVertical: 10,
    overflow: "hidden",
    borderRadius: 5,
  },
  card: {
    marginBottom: 20,
    height: 250,
    padding: 5,
    backgroundColor: "#323C4D",
    flexDirection: "column",
    color: "white",
  },
  font: {
    fontSize: 18,
    color: "white",
    padding: 5,
  },
  font2: {
    fontSize: 15,
    color: "white",
    padding: 5,
  },
  searchTextInput: {
    borderWidth: 5,
    backgroundColor: "#fff",
    borderColor: "#fff",
    // paddingHorizontal: 5,
    marginHorizontal: 1,
    marginVertical: 2,
    overflow: "hidden",
    alignSelf: "center",
  },
  searchButton: {
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#000",
    color: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    textAlign: "center",
  },
  head: { backgroundColor: "#455269", paddingVertical: 10 },
  text: { marginVertical: 3, color: "#fff" },
  row: { flexDirection: "row", paddingVertical: 10 },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    backgroundColor: "#78B7BB",
    borderRadius: 2,
  },
  btnText: { textAlign: "center", color: "#fff" },
  buttonCloseModal: {
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    textAlign: "center",
  },
};
export default connect(mapStateToProps, mapDispatchToProps)(RecentTransaction);
