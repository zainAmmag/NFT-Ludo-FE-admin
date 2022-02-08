// import React from "react";
// import { SendHttpRequest } from "./utility";
// import {
//   BaseUrl,
//   AuthenticationTokenId,
//   ImageBaseUrl,
//   BaseUrlGet,
// } from "../Constants/BusinessManager";
// import swal from "sweetalert";
// import { Calendar, CheckSquare, Edit, Eye,MinusCircle } from "react-feather";
// import Modal from "react-bootstrap/Modal";
// import { Button } from "react-bootstrap";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from "react-datepicker";
// import { setIsLoaderActive } from "../actions/index";
// // import {Loader} from './Loader'
// import Loader from "../component/shared/loader";
// import { getToken } from "../Utils/Utils";
// import { Link } from "react-router-dom";
// // import { BaseUrl } from "../Constants/BusinessManager";
// // import BaseURL from '../component/BaseURL'
// import axios from "axios";
// const mapStateToProps = (state) => {
//   return {};
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
//   };
// };
// class MenageAccount extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       getUsers:null,
//       dataSource: null,
//       ImageModal: false,
//       imageUrl: "",
//       gridView: true,
//       tableData: [],
//       blockstatus: true,
//       tableHead: ["Inv #", "Amount", "Detail", "Date"],
//       descriptionModel: false,
//       periodModal: false,
//       AccountDetail: {},
//       // DOB: new Date(),
//       // kycVerified: true,
//       calender: {
//         showFromDate: "",
//         showToDate: "",
//       },
//       Rate: 0,
//       SelectedProject: null,
//       CurrencyName: "",
//     };
//   }
//   async componentDidMount() {
//     this.props.setIsLoaderActive(true);
     
//     try {
//       let t = getToken();
//       var data = await SendHttpRequest(
//         BaseUrl + "v1/Pool/GetAllPoolsAdmin",
//         {},
//         "GET"
//       );

//       const meta = [
//         {
//             id:'1',
//           username: 'Muzahib',
//           walletaddress: 'pk329087',
//           balance: 'Bitcoin',
//           phonenumber:'0987654',
//           status:'verified',
//           OnlineStatus :'block',
//           Blockstatus:false,
//           verifiedstatus:false
//         }, {
//             id:'2',
//             username: 'Muzahib',
//             walletaddress: 'pk329087',
//             balance: 'Ethereum',
//             phonenumber:'0987654',
//             status:'verified',
//             OnlineStatus :'unblock',
//             Blockstatus:false,
//             verifiedstatus:false
//           },
//       ]
//           for(let i=0;i<meta.length;i++)
//           {
//               localStorage.setItem("id"+meta[i].id,meta[i].username);
//           }
//           console.log(localStorage.getItem("id1"));
//       if (data.isSuccess == true) {
//            console.log(...data.data)
//         this.setState({ tableData: meta });
//         this.props.setIsLoaderActive(false);
//       } else {
//         throw new Error("Something went wrong, try to relogin");
//       }
//     } 
//     catch (error) {
//       console.log(error);
//       this.props.setIsLoaderActive(false);
//       return swal({
//         icon: "error",
//         text: "Something went wrong, try to relogin",
//       });
//     }
//   }

//   // componentDidMount(){
//   //   axios({
//   //     method:"get",
//   //     url:`${BaseURL}/api/v1/Amin/GetAllAccounts`,
//   //     headers:{
//   //       accept: "text/plain",
//   //     }
//   //   }).then((response) => {
//   //     this.setState({
//   //       getUsers:response.data.data
//   //     })
//   //   })
//   //   .catch((error)=>{
//   //     console.log('hdsfhdw' , error);
//   //   })
//   // }
//     render() {
//     return (
//       <div>
//         <div className="row">
//           <div className="col-lg-12 col-md-12 col-xl-12 col-12 order-2 order-lg-2 order-xl-1">
//             <div className="card">
//                   <h1 style={{textAlign:"center"}}>Manage Account </h1>
//               {this.state.tableData.length > 0 ? (
//                 <div style={{ padding: 10 }}>
//                   <table
//                     className="table table-striped table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl AccountStatement"
//                     style={{ textAlign: "center" }}
//                   >
//                     <thead>
//                       <tr style={{ color: "#fff" }}>
//                         <th>Username</th>
//                         <th>Walletaddress</th>
//                         <th>Bio</th>
//                         <th>Phonenumber</th>
//                         <th>Status</th>
//                         <th>OnlineStatus</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody style={{ color: "#fff" }}>
//                       {this.state.tableData &&
//                         this.state.tableData.length > 0 &&
//                         this.state.tableData
//                           .sort((a, b) => b.id - a.id)
//                           .map((value, index) => {
//                             return (
//                               <tr key={index} >
//                                 {/* {console.log(value)} */}

//                                 <td> {value.username}</td>
//                                 <td>{value.walletaddress}</td>
//                                 <td>{value.balance}</td>
//                                 <td>{value.phonenumber}</td>
//                                 <td>
//                                   {value.verifiedstatus ? 'Verified' : 'Unverified'}
//                                 </td>
//                                 <td>   
//                                   {value.Blockstatus ? 'Block' : 'UnBlock' }
//                                 </td>
                               
//                                 <td>
//                                 <button
//                                     style={{ padding: 8, background: 'transparent', border: 0 }}
//                                     onClick={() => { if(value.Blockstatus){console.log("block"); this.setState({ blockstatus:false});value.Blockstatus=false}else{console.log("unblock"); this.setState({ blockstatus:true});value.Blockstatus=true}} }
//                                 >
                                  
//                                      <MinusCircle
//                                     color={value.Blockstatus ? 'red' : 'white'}
//                                     size={16}
//                                      />
//                                 </button>
//                                 <button
//                                     style={{ padding: 8, background: 'transparent', border: 0 }}
//                                     onClick={() => { if(value.verifiedstatus){this.setState({ blockstatus:false});value.verifiedstatus=false}else{console.log("unblock"); this.setState({ blockstatus:true});value.verifiedstatus=true}} }
//                                 >
                                  
//                                      <CheckSquare
//                                     color={value.verifiedstatus ? 'white' : 'green'}
//                                     size={16}
//                                      />
//                                 </button>
                         
                                    
//                                 <Link to="/userDetail">
//                                   <Eye
//                                     className="ml-2"
//                                     color="white"
//                                     size={16}
//                                   /> 
//                                 </Link>
                                 
//                                 </td>
//                               </tr>
//                             );
//                           })}
//                     </tbody>
//                   </table>
//                 </div>
//               ) : (
//                 <div style={{ alignItems: "center", alignContent: "center" }}>
//                   <p
//                     style={{
//                       textAlign: "center",
//                       color: "white",
//                       fontSize: 20,
//                     }}
//                   >
//                     No Projects
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// const styles = {
//   container: {
//     flex: 1,
//   },
//   convertButton: {
//     backgroundColor: "#000",
//     borderWidth: 1,
//     borderColor: "#000",
//     color: "#fff",
//     paddingHorizontal: 80,
//     paddingVertical: 10,
//     overflow: "hidden",
//     borderRadius: 5,
//   },
//   card: {
//     marginBottom: 20,
//     height: 250,
//     padding: 5,
//     backgroundColor: "#323C4D",
//     flexDirection: "column",
//     color: "white",
//   },
//   font: {
//     fontSize: 18,
//     color: "white",
//     padding: 5,
//   },
//   font2: {
//     fontSize: 15,
//     color: "white",
//     padding: 5,
//   },
//   searchTextInput: {
//     borderWidth: 5,
//     backgroundColor: "#fff",
//     borderColor: "#fff",
//     // paddingHorizontal: 5,
//     marginHorizontal: 1,
//     marginVertical: 2,
//     overflow: "hidden",
//     alignSelf: "center",
//   },
//   searchButton: {
//     borderWidth: 1,
//     borderColor: "#000",
//     backgroundColor: "#000",
//     color: "#fff",
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     textAlign: "center",
//   },
//   head: { backgroundColor: "#455269", paddingVertical: 10 },
//   text: { marginVertical: 3, color: "#fff" },
//   row: { flexDirection: "row", paddingVertical: 10 },
//   btn: {
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     marginHorizontal: 5,
//     backgroundColor: "#78B7BB",
//     borderRadius: 2,
//   },
//   btnText: { textAlign: "center", color: "#fff" },
//   buttonCloseModal: {
//     borderWidth: 1,
//     borderColor: "#fff",
//     backgroundColor: "#fff",
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     textAlign: "center",
//   },
// };
// export default connect(mapStateToProps, mapDispatchToProps)(MenageAccount);















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
import { getToken } from "../Utils/Utils";
import { Link } from "react-router-dom";
// import { BaseUrl } from "../Constants/BusinessManager";
// import BaseURL from '../component/BaseURL'
import axios from "axios";
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
      gridView: true,
      tableData: [],
      blockstatus: true,
      tableHead: ["Inv #", "Amount", "Detail", "Date"],
      descriptionModel: false,
      periodModal: false,
      AccountDetail: {},
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
      
       try 
       {
          const data = await SendHttpRequest(
          BaseUrl + "UpdateAccountStatus",
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
      var data = await SendHttpRequest(
        BaseUrl + "/Amin/GetAllAccounts",
        {},
        "GET"
      );
     
      if (data.isSuccess) 
      {
        this.setState({ tableData: data.data });
        console.log("data",this.state.tableData);
        this.props.setIsLoaderActive(false);
      } 
      else {

        return swal({
            icon: "error",
            text: "Something went wrong, try to relogin",
          });
        throw new Error("Something went wrong, try to relogin");
      }
 
      this.props.setIsLoaderActive(false);

    
  }

    render() {
      
     return (
      <div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-xl-12 col-12 order-2 order-lg-2 order-xl-1">
            <div className="card">
                  <h1 style={{textAlign:"center"}}>Manage Account </h1>
              {this.state.tableData.length > 0 ? (
                <div style={{ padding: 10 }}>
                  <table
                    className="table table-striped table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl AccountStatement"
                    style={{ textAlign: "center" }}
                  >
                    <thead>
                      <tr style={{ color: "#fff" }}>
                        <th>Username</th>
                        <th>Walletaddress</th>
                        <th>CreatedAt</th>
                        <th>Time</th> 
                        <th>Email</th>
                        <th>Status</th>
                        <th>OnlineStatus</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody style={{ color: "#fff" }}>
                      {this.state.tableData &&
                        this.state.tableData.length > 0 &&
                        this.state.tableData
                          .sort((a, b) => b.id - a.id)
                          .map((value, index) => {
                            return (
                              <tr key={index} >
                                {/* {console.log(value)} */}

                                <td> {value.username}</td>
                                <td>   {   value.address.slice(0,9)+ '...' } </td>
                                <td>{value.createdAt.slice(0,10)}</td> 
                                <td>{value.createdAt.slice(11,19)}</td> 
                                <td>{ value.email==null? value.email :value.email.slice(1,3)+'...'+value.email.slice(-10)  }</td>
                                <td>
                                  { value.isVerfiedAccount ? 'Verified' : 'Unverified'}
                                </td>
                                <td>   
                                  {value.accountStatus=="Active" ? 'UnBlock' : 'Block' }
                                </td>
                               
                                <td>
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
                                      this.updateuserblockstatus(value.id,value.accountStatus,true );
                                      else{ 
                                        this.updateuserblockstatus(value.id,value.accountStatus,false ); 
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
                                    onClick={() => {console.log(localStorage.getItem('useraddress'))    } }
                                >
                                  <Eye
                                    className="ml-2"
                                    color="white"
                                    size={16}
                                  /> 
                                  </button>
                                  
                                </Link>
                                 
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

