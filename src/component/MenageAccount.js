import React from "react";
import { SendHttpRequest } from "./utility";
import {
  BaseUrl,
  AuthenticationTokenId,
  ImageBaseUrl,
  BaseUrlGet,
} from "../Constants/BusinessManager";
import swal from "sweetalert";
import { Calendar, CheckSquare, Edit, Eye,MinusCircle } from "react-feather";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { setIsLoaderActive } from "../actions/index";
// import {Loader} from './Loader'
import Loader from "../component/shared/loader";
import TablePagination from "@material-ui/core/TablePagination"
import { getToken } from "../Utils/Utils";
import { Link } from "react-router-dom";
// import { BaseUrl } from "../Constants/BusinessManager";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import { data } from "jquery";
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
      getUsers:null,
      dataSource: null,
      ImageModal: false,
      imageUrl: "",
      split:"",
     page:0,
      gridView: true,
      tableData: [],
      blockstatus: true,
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
  }
  async updateuserblockstatus(id,status,status2)
  {
      if(status=="Active") status=true
      if(status=="Deactive") status=false
       try 
       {
          const data = await SendHttpRequest(
          BaseUrl + "/Amin/UpdateAccountStatus",
          {  accountId: id,
             accountType: status,
           accountVerified: status2
          },
          "PUT"
        ); 
      
      if(data.isSuccess){console.log(data.data) }
    }
         catch (error) {
        localStorage.clear();
        this.props.setIsLoaderActive(false);
        return;
      }
        
       
   this.componentDidMount();
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
      
      const meta = [
        {
            id:'1',
          username: 'Muzahib',
          walletaddress: 'pk329087',
          balance: 'Bitcoin',
          phonenumber:'0987654',
          status:'verified',
          OnlineStatus :'block',
          Blockstatus:false,
          verifiedstatus:false
        }, {
            id:'2',
            username: 'Muzahib',
            walletaddress: 'pk329087',
            balance: 'Ethereum',
            phonenumber:'0987654',
            status:'verified',
            OnlineStatus :'unblock',
            Blockstatus:false,
            verifiedstatus:false
          },
      ]
          for(let i=0;i<meta.length;i++)
          {
              localStorage.setItem("id"+meta[i].id,meta[i].username);
          }
          console.log(localStorage.getItem("id1"));
      if (data.isSuccess) 
      {
        this.setState({ tableData: data.data });
        console.log("data",this.state.tableData);
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
    this.setState({page:newPage})
  };
    render() {  
      
     return (
      <div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-xl-12 col-12 order-2 order-lg-2 order-xl-1">
            <div className="card">
                  <h1 style={{textAlign:"center"}}>Manage Account </h1>
              {this.state.tableData.length > 0 ? (
                <div style={{ padding: 10 }}>
                    <TableContainer component={Paper} className="Text-white">
                  <Table
                    className="table table-striped table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl AccountStatement Text-white"
                    style={{ textAlign: "center",color:"white" }}
                  >
                   <TableHead className="Text-white">
                    <TableRow style={{ color: "#fff" }}>
                    <TableCell className="Text-white">Username</TableCell>
                    <TableCell className="Text-white">Walletaddress</TableCell>
                    <TableCell className="Text-white">CreatedAt</TableCell>
                    <TableCell className="Text-white">Time</TableCell>
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
                        .slice(this.state.page * 5, this.state.page * 5  + 5)
                          .map((value, index) => {
                            return (
                              <TableRow key={index}  className="Text-white">
                                                                {/* {console.log(value)} */}

                                <TableCell className="Text-white">{value.username}</TableCell> 
                                <TableCell className="Text-white">   {   value.address.slice(0,9)+ '...' } </TableCell>
                                <TableCell className="Text-white">{value.createdAt.slice(0,10)}</TableCell> 
                                <TableCell className="Text-white">{value.createdAt.slice(11,19)}</TableCell> 
                                <TableCell className="Text-white">{ value.email==null? value.email :value.email.slice(1,3)+'...'+value.email.slice(-10)  } </TableCell>
                                <TableCell className="Text-white">
                                  { value.isVerfiedAccount ? 'Verified' : 'Unverified'}
                                  </TableCell>
                                <TableCell className="Text-white">  
                                  {value.accountStatus=="Active" ? 'UnBlock' : 'Block' }
                                  </TableCell>
                               
                                <TableCell className="Text-white">
                                <button
                                    style={{ padding: 8, background: 'transparent', border: 0 }}
                                    onClick={() => { 
                                      if(value.accountStatus=="Active")
                                        {this.updateuserblockstatus(value.id,false,value.isVerfiedAccount );}
                                       else
                                         {this.updateuserblockstatus(value.id,true,value.isVerfiedAccount ); }
                                        
                                    }}
                                >
                                  
                                     <MinusCircle
                                    color={value.accountStatus=="Active" ? 'white': 'red'}
                                    size={16}
                                     />
                                </button>
                                <button
                                    style={{ padding: 8, background: 'transparent', border: 0 }}
                                    onClick={() =>{
                                      if(value.isVerfiedAccount) 
                                       this.updateuserblockstatus(value.id,value.accountStatus,false );
                                      else{ 
                                        this.updateuserblockstatus(value.id,value.accountStatus,true ); 
                                      }  } }
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
                                           localStorage.setItem("profileImage",value.profileImage)
                                           localStorage.setItem("address",value.address)
                                           localStorage.setItem("email",value.email)
                                           
                                           localStorage.setItem("username",value.username)
                                           localStorage.setItem("bio",value.bio)
                                           localStorage.setItem("twitterLink",value.twitterLink)
                                           localStorage.setItem("instagramLink",value.instagramLink)
                                           localStorage.setItem("isVerfiedAccount",value.isVerfiedAccount)
                                          localStorage.setItem("UserID",47);
                                         } }
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
                    No Projects
                  </p>
                </div>
              )}
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
export default connect(mapStateToProps, mapDispatchToProps)(MenageAccount);
