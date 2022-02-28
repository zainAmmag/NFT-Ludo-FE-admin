import React from "react";
import './OrderDetail.css';

import { SendHttpRequest } from "./utility";
import {
  BaseUrl,
} from "../Constants/BusinessManager";
import { connect } from "react-redux";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { setIsLoaderActive } from "../actions/index";
import { bindActionCreators } from "redux";
import { CheckSquare, Eye, MinusCircle } from "react-feather";
import TablePagination from "@material-ui/core/TablePagination"
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Search } from "react-feather";


const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
  };
};

class OrderDetail extends React.Component {

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

  async componentDidMount() {
    this.props.setIsLoaderActive(true);
    try {
      var data = await SendHttpRequest(
        BaseUrl + "/Amin/GetAllOrderNft",
        {},
        "GET"
      );
      if (data.isSuccess) {
        console.log("data", data.data);

        this.props.setIsLoaderActive(false);
        this.setState({ tableData: data.data });
        console.log("data", data.message);

      }
      else {
        throw new Error("Something went wrong, try to relogin");
      }
    }
    catch (error) {
      this.props.setIsLoaderActive(false);
      console.log(error);
      return swal({
        icon: "error",
        text: "Something went wrong, try to relogin",
      });
    }
  }

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage })
  }
  Finduser = () => {
    
    console.log("called")
    console.log(this.state.tableData.filter((x) => x.username?.toLowerCase().includes(this.state.Search1.toLowerCase())) )
    var temp = this.state.Search1;
    this.setState({ Search: temp })
  };
 
  removeuser = () => {
    console.log("dadaad", this.state.Search1.length);
    console.log("Search1+", this.state.Search1);
    console.log("Search+", this.state.Search);
     if (this.state.Search1.length == 1){

     
      this.setState({ Search: "" })
      console.log("ajnbdanbadd",this.state.Search.length )
    }
    };
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-xl-12 col-12 order-2 order-lg-2 order-xl-1">
            <div className="card p-t-30">
              <h1 style={{ textAlign: "center" }}>Manage Order </h1>
              <p style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                <div className="search-panel">
                  <input
                    type="text"
                    required
                    placeholder="enter NFT name to search"
                    className="input-field1"
                    name='search'
                    value={this.state.Search}
                    onChange={(data) => { this.Finduser();this.setState({ Search: data.target.value });this.removeuser(); }}

                  />
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
                            className="table table-striped table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl AccountStatement Text-white"
                            style={{ textAlign: "center", color: "white" }}
                          >
                            <TableHead className="Text-white">
                              <TableRow style={{ color: "#fff" }}>
                              <TableCell className="Text-white">No</TableCell>
                                <TableCell className="Text-white">Nft Owner Name</TableCell>
                                <TableCell className="Text-white">NFT Name</TableCell>
              
                                <TableCell className="Text-white">Order Date</TableCell>
                                <TableCell className="Text-white">Order Time</TableCell>
                                <TableCell className="Text-white">Order Status</TableCell>
                                {/* <TableCell className="Text-white">Detail</TableCell> */}
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
                                            <TableCell className="Text-white">{this.state.page * 5+index+1 } </TableCell>
                                        <TableCell className="Text-white">{value.nftOwnerName}</TableCell>
                                        <TableCell className="Text-white">{value.nftName} </TableCell>
                                        <TableCell className="Text-white">{value.orderCreatedTime.slice(0, 10)}</TableCell>
                                        <TableCell className="Text-white">{value.orderCreatedTime.slice(11, 19)}</TableCell>
                                        <TableCell className="Text-white">{value.orderStatus} </TableCell>

                                        {/* <TableCell className="Text-white">
                                          {value.accountStatus == "Active" ? 'UnBlock' : 'Block'}
                                        </TableCell> */}

                                        <TableCell>
                                        <Link to={{
                                        pathname: "orderstatus",
                                        state: {
                                            value,
                                        }
                                    }}>
                                            <button
                                              style={{ padding: 8, background: 'transparent', border: 0 }}
                                              onClick={() => {
                                              }}
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
                          No Order Placed
                        </p>
                      </div>
                    )} </>)
                  : (<>" "</>)}


{
                this.state.Search.length > 0 ? (
                  <>  {
                    this.state.tableData.filter((x) => x.nftOwnerName?.toLowerCase().includes(this.state.Search.toLowerCase())).length > 0  ? (
                      <div style={{ padding: 10 }}>
                        <TableContainer component={Paper} className="Text-white">
                          <Table
                            className="table table-striped table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl AccountStatement Text-white"
                            style={{ textAlign: "center", color: "white" }}
                          >
                            <TableHead className="Text-white">
                              <TableRow style={{ color: "#fff" }}>
                              <TableCell className="Text-white">No</TableCell>
                                <TableCell className="Text-white">Nft Owner Name</TableCell>
                                <TableCell className="Text-white">NFT Name</TableCell>
              
                                <TableCell className="Text-white">Order Date</TableCell>
                                <TableCell className="Text-white">Order Time</TableCell>
                                <TableCell className="Text-white">Order Status</TableCell>
                                {/* <TableCell className="Text-white">Detail</TableCell> */}
                              </TableRow>
                            </TableHead>
                            <TableBody style={{ color: "#fff" }} className="Text-white">
                              {this.state.tableData &&
                                this.state.tableData.length > 0
                                &&
                                this.state.tableData
                                  .slice(this.state.page * 5, this.state.page * 5 + 5) &&
                                this.state.tableData.filter((x) => x.nftOwnerName?.toLowerCase().includes(this.state.Search.toLowerCase()))
                                  .map((value, index) => {
                                    return (
                                      <TableRow key={index} className="Text-white">
                                            <TableCell className="Text-white">{this.state.page * 5+index+1 } </TableCell>
                                        <TableCell className="Text-white">{value.nftOwnerName}</TableCell>
                                        <TableCell className="Text-white">{value.nftName} </TableCell>
                                        <TableCell className="Text-white">{value.orderCreatedTime.slice(0, 10)}</TableCell>
                                        <TableCell className="Text-white">{value.orderCreatedTime.slice(11, 19)}</TableCell>
                                        <TableCell className="Text-white">{value.orderStatus} </TableCell>

                                        {/* <TableCell className="Text-white">
                                          {value.accountStatus == "Active" ? 'UnBlock' : 'Block'}
                                        </TableCell> */}

                                        <TableCell>
                                        <Link to={{
                                        pathname: "orderstatus",
                                        state: {
                                            value,
                                        }
                                    }}>
                                            <button
                                              style={{ padding: 8, background: 'transparent', border: 0 }}
                                              onClick={() => {
                                              }}
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
                          No Order Placed
                        </p>
                      </div>
                    )} </>)
                  : (<>" "</>)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail) ;