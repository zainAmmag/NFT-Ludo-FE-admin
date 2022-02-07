import React from "react";
import { SendHttpRequest } from "./utility";
import {
  BaseUrl,
  AuthenticationTokenId,
  ImageBaseUrl,
  BaseUrlGet,
} from "../Constants/BusinessManager";
import swal from "sweetalert";
import { Calendar, CheckSquare, Edit, Eye } from "react-feather";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { setIsLoaderActive } from "../actions/index";
// import {Loader} from './Loader'
import Loader from "../component/shared/loader";
import { getToken } from "../Utils/Utils";
import { Link } from "react-router-dom";
import moment from 'moment';
const mapStateToProps = (state) => {
  return {};
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
      Rate: 0,
      SelectedProject: null,
      CurrencyName: "",
    };
    this.UpdateStatus.bind(this);
    this.HandleOpen.bind(this);
  }
  async Submit(Id, Status) {
    try {
      this.props.setIsLoaderActive(true);
      var data = await SendHttpRequest(
        BaseUrl + "v1/Pool/UpdatePoolStatus",
        { ProjectId: Id, adminStatus: Status },
        "POST"
      );
      if (data.isSuccess == true) {
        swal({
          icon: "success",
          title: data.message,
        });

        this.setState({
          tableData: [
            ...this.state.tableData.filter((x) => x.id != Id),
            data.data,
          ],
        });
        this.props.setIsLoaderActive(false);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error);
      this.props.setIsLoaderActive(false);
      return swal({
        icon: "error",
        text: "Something went wrong, try to relogin",
      });
    }
  }
  async UpdateStatus(Id) {
    let p = this.state.tableData.find((x) => x.id == Id);
    if (!p) {
      return;
    }
    swal({
      title: "Approve or Reject?",
      text:
        "Once Approved, this project(" +
        p.projectName +
        ") will be listed to users",
      icon: "warning",
      closeOnClickOutside: false,
      buttons: {
        dismiss: {
          text: "Dismiss",
          value: false,
          visible: "dismiss",
          className: "",
          closeModal: true,
        },
        cancel: {
          text: "Reject",
          value: "Reject",
          visible: "cancel",
          className: "btn-warning",
          closeModal: true,
        },
        confirm: {
          text: "Approve",
          value: "Approve",
          visible: true,
          className: "btn-primary",
          closeModal: true,
        },
      },
      // dangerMode: true,
    }).then((isConfirm) => {
      console.log(isConfirm);
      if (isConfirm == "Approve") {
        this.Submit(Id, "Verified");
      } else if (isConfirm == "Reject") {
        this.Submit(Id, "Rejected");
      } else {
      }
    });
  }
  async componentDidMount() {
    this.props.setIsLoaderActive(true);

    try {
      let t = getToken();
      var data = await SendHttpRequest(
        BaseUrl + "v1/Pool/GetAllPoolsAdmin",
        {},
        "GET"
      );
      if (data.isSuccess == true) {
        this.setState({ tableData: [...data.data] });
        this.props.setIsLoaderActive(false);
      } else {
        throw new Error("Something went wrong, try to relogin");
      }
    } catch (error) {
      console.log(error);
      this.props.setIsLoaderActive(false);
      return swal({
        icon: "error",
        text: "Something went wrong, try to relogin",
      });
    }
  }
  HandleOpen(Id) {
     let p = this.state.tableData.find((x) => x.id == Id);
    // // if (!p) {

    // const createdAtDate = new Date(p?.createdAt);
    // const createdAtYear = new Intl.DateTimeFormat("en", {
    //   year: "numeric",
    // }).format(createdAtDate);
    // const createdAtMonth = new Intl.DateTimeFormat("en", {
    //   month: "numeric",
    // }).format(createdAtDate);
    // const createdAtDay = new Intl.DateTimeFormat("en", {
    //   day: "2-digit",
    // }).format(createdAtDate);
    // const createdAtConvertedDate = `${createdAtYear}-${createdAtMonth}-${createdAtDay}`;

    // //expected project date
    // const expectedDate = new Date(p?.createdAt);
    // const expectedYear = new Intl.DateTimeFormat("en", {
    //   year: "numeric",
    // }).format(expectedDate);
    // const expectedMonth = new Intl.DateTimeFormat("en", {
    //   month: "numeric",
    // }).format(expectedDate);
    // const expectedDay = new Intl.DateTimeFormat("en", {
    //   day: "2-digit",
    // }).format(expectedDate);
    // const expectedProjectDate = `${expectedYear}-${expectedMonth}-${expectedDay}`;

    // // console.log(liveProjectDate);
    // // setLiveDate(liveProjectDate)
    // const poolModified = {
    //   ...p,
    //   createdAt: createdAtConvertedDate,
    //   expectedLaunchDate: expectedProjectDate,
    // };
    // //   return;
    // // }
   this.setState({ SelectedProject: p, ImageModal: true });
  }
  render() {
    return (
      
    <h1 style={{textAlign:"center"}}>DashBoard</h1>
      
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
