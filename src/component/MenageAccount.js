import React from "react";
import { SendHttpRequest } from "./utility";
import {
  BaseUrl,
} from "../Constants/BusinessManager";
import swal from "sweetalert";
import { CheckSquare, Eye, MinusCircle } from "react-feather";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "react-datepicker/dist/react-datepicker.css";
import { setIsLoaderActive } from "../actions/index";
import TablePagination from "@material-ui/core/TablePagination"
import { getToken } from "../Utils/Utils";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import { Search } from "react-feather";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
  };
};
class MenageAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      split: "",
      Search: "",
      Search1: "",
      page: 0,
      tableData: [],
      blockstatus: true,
    };
  }
  async updateuserblockstatus(id, status, status2) {
    if (status == "Active") status = true
    if (status == "Deactive") status = false
    try {
      const data = await SendHttpRequest(
        BaseUrl + "/Amin/UpdateAccountStatus",
        {
          accountId: id,
          accountType: status,
          accountVerified: status2
        },
        "PUT"
      );

      if (data.isSuccess) { console.log(data.data) }
    }
    catch (error) {
      // localStorage.clear();
      this.props.setIsLoaderActive(false);
      return;
    }


    try {
      let t = getToken();
      var data = await SendHttpRequest(
        BaseUrl + "/Amin/GetAllAccounts?PageSize=0&CurrentPage=0",
        {},
        "GET"
      );
      if (data.isSuccess) {
        this.setState({ tableData: data.data });
      }
      else {
        throw new Error("Something went wrong, try to relogin");
      }
    }
    catch (error) {
      console.log(error);
      return swal({
        icon: "error",
        text: "Something went wrong, try to relogin",
      });
    }
  }
  async componentDidMount() {
    this.props.setIsLoaderActive(true);

    try {
      let t = getToken();
      var data = await SendHttpRequest(
        BaseUrl + "/Amin/GetAllAccounts",
        {},
        "GET"
      );
      if (data.isSuccess) {
        this.setState({ tableData: data.data });
        console.log("data", this.state.tableData);
        this.props.setIsLoaderActive(false);
      }
      else {
        throw new Error("Something went wrong, try to relogin");
      }
    }
    catch (error) {
      console.log(error);
      this.props.setIsLoaderActive(false);
      return swal({
        icon: "error",
        text: "Something went wrong, try to relogin",
      });
    }
  }
  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage })
  };
  Finduser = () => {

    var temp = this.state.Search1;
    //  temp=this.state.tableData.find ((item, index) => item.username == this.state.search)
    this.setState({ Search: temp })
  };
  
  removeuser = () => {
    console.log("dadaad",this.state.Search1.length);
                    if(this.state.Search1.length==1)
                    this.setState({Search:""})
  
       };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-xl-12 col-12 order-2 order-lg-2 order-xl-1">
            <div className="card p-t-30">
              <h1 style={{ textAlign: "center" }}>Manage Account</h1>
              <p style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                <div className="search-panel">
                  <input
                    type="text" required placeholder="enter name to search"
                    className="input-field1" name='search'
                    value={this.state.Search1} onChange={(data) => { this.setState({ Search1: data.target.value });this.removeuser()  }} />
                  <Search color="white" onClick={() => this.Finduser()} style={{ cursor: "pointer" }} />
                </div>
              </p>

              {
                this.state.Search.length == 0 ? (
                  <>  {
                    this.state.tableData.length > 0 ? (
                      <div style={{ padding: 10 }}>
                        <TableContainer component={Paper} className="Text-white">
                          <Table
                            className="table table-striped [table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl AccountStatement Text-white"
                            style={{ textAlign: "center", color: "white" }}
                          >
                            <TableHead className="Text-white">
                              <TableRow style={{ color: "#fff" }}>
                                <TableCell className="Text-white">Username</TableCell>
                                <TableCell className="Text-white">Wallet-Address</TableCell>
                                <TableCell className="Text-white">Creation-DAte</TableCell>
                                <TableCell className="Text-white">Email</TableCell>
                                <TableCell className="Text-white">Status</TableCell>
                                <TableCell className="Text-white">OnlineStatus</TableCell>
                                <TableCell className="Text-white">Action</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody style={{ color: "#fff" }} className="Text-white">
                              {this.state.tableData &&
                                this.state.tableData.length > 0 &&
                                this.state.tableData
                                  .slice(this.state.page * 5, this.state.page * 5 + 5)
                                  .map((value, index) => {
                                    return (
                                      <TableRow key={index} className="Text-white">
                                        {/* {console.log(value)} */}

                                        <TableCell className="Text-white">{value.username}</TableCell>
                                        <TableCell className="Text-white">   {value.address.slice(0, 9) + '...'} </TableCell>
                                        <TableCell className="Text-white">{value.createdAt.slice(0, 10)}</TableCell>
                                        <TableCell className="Text-white">{value.email == null ? value.email : value.email.slice(1, 3) + '...' + value.email.slice(-10)} </TableCell>
                                        <TableCell className="Text-white">
                                          {value.isVerfiedAccount ? 'Verified' : 'Unverified'}
                                        </TableCell>
                                        <TableCell className="Text-white">
                                          {value.accountStatus == "Active" ? 'UnBlock' : 'Block'}
                                        </TableCell>

                                        <TableCell className="Text-white">
                                          <button
                                            style={{ padding: 8, background: 'transparent', border: 0 }}
                                            onClick={() => {
                                              if (value.accountStatus == "Active") { this.updateuserblockstatus(value.id, false, value.isVerfiedAccount); }
                                              else { this.updateuserblockstatus(value.id, true, value.isVerfiedAccount); }

                                            }}
                                            title="Block"
                                          >

                                            <MinusCircle
                                              color={value.accountStatus == "Active" ? 'white' : 'red'}
                                              size={16}
                                            />
                                          </button>
                                          <button
                                            title="Verify"
                                            style={{ padding: 8, background: 'transparent', border: 0 }}
                                            onClick={() => {
                                              if (value.isVerfiedAccount)
                                                this.updateuserblockstatus(value.id, value.accountStatus, false);
                                              else {
                                                this.updateuserblockstatus(value.id, value.accountStatus, true);
                                              }
                                            }}
                                          >

                                            <CheckSquare
                                              color={value.isVerfiedAccount ? 'green' : 'white'}
                                              size={16}
                                            />
                                          </button>


                                          <Link to="/userDetail">
                                            <button
                                              style={{ padding: 8, background: 'transparent', border: 0 }}
                                              onClick={() => {
                                                console.log(localStorage.getItem('useraddress'))

                                                localStorage.setItem("profileImage", value.profileImage ? value.profileImage : "Null")
                                                localStorage.setItem("address", value.address ? value.address : ' ')
                                                localStorage.setItem("email", value.email ? value.email : ' ')
                                                localStorage.setItem("username", value.username ? value.username : ' ')
                                                localStorage.setItem("bio", value.bio ? value.bio : ' ')
                                                localStorage.setItem("twitterLink", value.twitterLink ? value.twitterLink : ' ')
                                                localStorage.setItem("instagramLink", value.instagramLink ? value.instagramLink : ' ')
                                                localStorage.setItem("isVerfiedAccount", value.isVerfiedAccount ? value.isVerfiedAccount : ' ')
                                                localStorage.setItem("UserID", value.id);
                                              }}
                                              title="Detail"
                                            >
                                              <Eye
                                                className="ml-2"
                                                color="white"
                                                size={16}
                                              />
                                            </button>

                                          </Link>

                                        </TableCell>
                                      </TableRow>
                                    );
                                  })}
                            </TableBody>
                          </Table>
                          <div className="Text-white1" >
                            <TablePagination
                              component="div"
                              count={this.state.tableData.length}
                              rowsPerPage={5}
                              page={this.state.page}
                              onChangePage={this.handleChangePage}
                            /></div>

                        </TableContainer>


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
                          No Record Found
                        </p>
                      </div>
                    )
                  } </>)
                  : (<>" "</>)}

              {
                  this.state.Search.length > 0 ? (
                    <>  {
                      this.state.tableData .filter((x) => x.username == this.state.Search).length > 0 ? (
                        <div style={{ padding: 10 }}>
                          <TableContainer component={Paper} className="Text-white">
                            <Table
                              className="table table-striped [table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl AccountStatement Text-white"
                              style={{ textAlign: "center", color: "white" }}
                            >
                              <TableHead className="Text-white">
                                <TableRow style={{ color: "#fff" }}>
                                  <TableCell className="Text-white">Username</TableCell>
                                  <TableCell className="Text-white">Wallet-Address</TableCell>
                                  <TableCell className="Text-white">Creation-DAte</TableCell>
                                  <TableCell className="Text-white">Email</TableCell>
                                  <TableCell className="Text-white">Status</TableCell>
                                  <TableCell className="Text-white">OnlineStatus</TableCell>
                                  <TableCell className="Text-white">Action</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody style={{ color: "#fff" }} className="Text-white">
                                {this.state.tableData &&
                                  this.state.tableData.length > 0 &&
                                  this.state.tableData
                                  .filter((x) => x.username == this.state.Search)
                                    .map((value, index) => {
                                      return (
                                        <TableRow key={index} className="Text-white">
                                          {/* {console.log(value)} */}
  
                                          <TableCell className="Text-white">{value.username}</TableCell>
                                          <TableCell className="Text-white">   {value.address.slice(0, 9) + '...'} </TableCell>
                                          <TableCell className="Text-white">{value.createdAt.slice(0, 10)}</TableCell>
                                          <TableCell className="Text-white">{value.email == null ? value.email : value.email.slice(1, 3) + '...' + value.email.slice(-10)} </TableCell>
                                          <TableCell className="Text-white">
                                            {value.isVerfiedAccount ? 'Verified' : 'Unverified'}
                                          </TableCell>
                                          <TableCell className="Text-white">
                                            {value.accountStatus == "Active" ? 'UnBlock' : 'Block'}
                                          </TableCell>
  
                                          <TableCell className="Text-white">
                                            <button
                                              style={{ padding: 8, background: 'transparent', border: 0 }}
                                              onClick={() => {
                                                if (value.accountStatus == "Active") { this.updateuserblockstatus(value.id, false, value.isVerfiedAccount); }
                                                else { this.updateuserblockstatus(value.id, true, value.isVerfiedAccount); }
  
                                              }}
                                              title="Block"
                                            >
  
                                              <MinusCircle
                                                color={value.accountStatus == "Active" ? 'white' : 'red'}
                                                size={16}
                                              />
                                            </button>
                                            <button
                                              title="Verify"
                                              style={{ padding: 8, background: 'transparent', border: 0 }}
                                              onClick={() => {
                                                if (value.isVerfiedAccount)
                                                  this.updateuserblockstatus(value.id, value.accountStatus, false);
                                                else {
                                                  this.updateuserblockstatus(value.id, value.accountStatus, true);
                                                }
                                              }}
                                            >
  
                                              <CheckSquare
                                                color={value.isVerfiedAccount ? 'green' : 'white'}
                                                size={16}
                                              />
                                            </button>
  
  
                                            <Link to="/userDetail">
                                              <button
                                                style={{ padding: 8, background: 'transparent', border: 0 }}
                                                onClick={() => {
                                                  console.log(localStorage.getItem('useraddress'))
  
                                                  localStorage.setItem("profileImage", value.profileImage ? value.profileImage : "Null")
                                                  localStorage.setItem("address", value.address ? value.address : ' ')
                                                  localStorage.setItem("email", value.email ? value.email : ' ')
                                                  localStorage.setItem("username", value.username ? value.username : ' ')
                                                  localStorage.setItem("bio", value.bio ? value.bio : ' ')
                                                  localStorage.setItem("twitterLink", value.twitterLink ? value.twitterLink : ' ')
                                                  localStorage.setItem("instagramLink", value.instagramLink ? value.instagramLink : ' ')
                                                  localStorage.setItem("isVerfiedAccount", value.isVerfiedAccount ? value.isVerfiedAccount : ' ')
                                                  localStorage.setItem("UserID", value.id);
                                                }}
                                                title="Detail"
                                              >
                                                <Eye
                                                  className="ml-2"
                                                  color="white"
                                                  size={16}
                                                />
                                              </button>
  
                                            </Link>
  
                                          </TableCell>
                                        </TableRow>
                                      );
                                    })}
                              </TableBody>
                            </Table>
                            <div className="Text-white1" >
                              <TablePagination
                                component="div"
                                count={this.state.tableData.length}
                                rowsPerPage={5}
                                page={this.state.page}
                                onChangePage={this.handleChangePage}
                              /></div>
  
                          </TableContainer>
  
  
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
                            No Record Found
                          </p>
                        </div>
                      )
                    } </>)
                    : (<>" "</>)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MenageAccount);
