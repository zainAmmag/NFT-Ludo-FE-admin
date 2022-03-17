import React from "react";
import { SendHttpRequest } from "./utility";
import {
    BaseUrl,
} from "../Constants/BusinessManager";
import swal from "sweetalert";
import { Edit, Eye, Minus, MinusCircle, X } from "react-feather";
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
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';
import Swal from "sweetalert2";
import SharedLayout from "./shared/SharedLayout";
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
            lastcopy: "",
            copied: false,
        };
    }
    async componentDidMount() {
        
        this.props.setIsLoaderActive(true);
        await this.GetOrganizationData();
        this.props.setIsLoaderActive(false);
    }
    async GetOrganizationData() {
        try {
            let t = getToken();
            var data = await SendHttpRequest(
                BaseUrl + "/Organization/GetAllOrganizationAdmin?PageSize=0&CurrentPage=0",
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
            
            return swal({
                icon: "error",
                text: "Something went wrong, try to relogin",
            });
        }
    }
    async RemoveOrganization(organization)
    {   
        this.props.setIsLoaderActive(true);
        try {
            let t = getToken();
            var data = await SendHttpRequest(
                BaseUrl + "/Organization/RemoveOrganization?OrganizationId="+organization,
                {},
                "PUT"
            );
            if (data.isSuccess) {
                this.GetOrganizationData()
                this.props.setIsLoaderActive(false);
            }
            else {
                this.props.setIsLoaderActive(false);
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
    removeuser = () => {
        console.log("dadaad", this.state.Search1.length);
        console.log("Search1+", this.state.Search1);
        console.log("Search+", this.state.Search);
         if (this.state.Search1.length == 1){
    
         
          this.setState({ Search: "" })
          console.log("ajnbdanbadd",this.state.Search.length )
        }
        };
        Finduser = () => {
    
            console.log("called")
            console.log(this.state.tableData.filter((x) => x.username?.toLowerCase().includes(this.state.Search1.toLowerCase())) )
            var temp = this.state.Search1;
            this.setState({ Search: temp })
          };
          
    async Updateorganization(organization)
    {   this.props.setIsLoaderActive(true);
        console.log(organization)
        var bodyFormData = new FormData();
        bodyFormData.append("Name",organization.name);
        bodyFormData.append("Address",organization.address);
        bodyFormData.append("IsBlock",organization.isBlock?'false':'true');
        bodyFormData.append("Email", organization.email);
        bodyFormData.append("WalletAddress", organization.walletAddress);
        bodyFormData.append("AmountInPercent", organization.profitAmount);
        bodyFormData.append("LogoImage",organization.logoImage);
        bodyFormData.append("YourSiteLink",organization.yourSiteLink);
        axios({ 
          method: "PUT",
          url: "https://api.fineoriginal.com/api/v1/Organization/UpdateOrganization?OrganizationId="+organization.id,
    
          data: bodyFormData,
          headers: {
              accept: "text/plain",
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("TokenofAdminsigneD"),
          }
      }).then((response) => {
        this.props.setIsLoaderActive(false);
          console.log(response.data.message); 
          this.GetOrganizationData()
            }).catch((e) => {
                this.props.setIsLoaderActive(false);
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: e,
                    showConfirmButton: false,
                    timer: 1500
                  })
              })
    }

   
    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage })
    };

    render() {
        return (
            <>
            <SharedLayout>
                
            <div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-xl-12 col-12 order-2 order-lg-2 order-xl-1">
                        <div className="card p-t-30">
                            <h1 style={{ textAlign: "center" }}>Manage Organization</h1>
                            <div id="container" className="text-center">
                                <Link to="/CreateOrganization" className="Link create-list">  Add Organization  </Link>
                            </div>
                            <p style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                                <div className="search-panel">
                                    <input
                                        type="text" required placeholder="enter name to search"
                                        className="input-field1" name='search'
                                        value={this.state.Search} onChange={(data) => { this.Finduser(); this.setState({ Search: data.target.value }); this.removeuser(); }} />
                                    <Search color="white" onClick={() => this.Finduser()} style={{ cursor: "pointer" }} />
                                </div>
                            </p>

                            {
                                this.state.Search.length >= 0 ? (
                                    <>  {
                                        this.state.tableData.filter((x) => x.name?.toLowerCase().includes(this.state.Search.toLowerCase())).length > 0 ? (
                                            <div style={{ padding: 10 }}>
                                                <TableContainer component={Paper} className="Text-white">
                                                    <Table
                                                        className="table table-striped [table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl AccountStatement Text-white"
                                                        style={{ textAlign: "center", color: "white" }}
                                                    >
                                                        <TableHead className="Text-white">
                                                            <TableRow style={{ color: "#fff" }}>
                                                                <TableCell className="Text-white">Image</TableCell>
                                                                <TableCell className="Text-white">Name</TableCell>
                                                                <TableCell className="Text-white">Address</TableCell>
                                                                <TableCell className="Text-white">Email</TableCell>
                                                                <TableCell className="Text-white">WalletAddress</TableCell>
                                                                <TableCell className="Text-white">Block-Status</TableCell>
                                                                
                                                                <TableCell className="Text-white">Action</TableCell>
                                                                
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody style={{ color: "#fff" }} className="Text-white">
                                                            {this.state.tableData &&
                                                                this.state.tableData.length > 0 &&
                                                                this.state.tableData.filter((x) => x.name?.toLowerCase().includes(this.state.Search.toLowerCase())).slice(this.state.page * 5, this.state.page * 5 + 5)
                                                                    .map((value, index) => {

                                                                        return (
                                                                            <TableRow key={index} className="Text-white">
                                                                                {/* {console.log(value)} */}
                                                                                {/* {this.state.copied ? <span style={{ fontSize: 12, marginLeft: '1%' }}>Copied.</span> : null} */}
                                                                                <TableCell className="Text-white">
                                                                                    <img
                                                                                        src={"https://api.fineoriginal.com/" + value.logoImage}
                                                                                        //src={profilePic}
                                                                                        alt="profileImage"
                                                                                        data-toggle="modal"
                                                                                        data-target="#modal-animation-14"
                                                                                        style={{
                                                                                            maxHeight: '64px',
                                                                                            maxWidth: '52px',
                                                                                            minHeight: '64px',
                                                                                            minWidth: '52px'
                                                                                        }}
                                                                                    />

                                                                                </TableCell>
                                                                                <TableCell className="Text-white" >{value.name}</TableCell>

                                                                                <TableCell className="Text-white">{value.address}</TableCell>
                                                                                <TableCell className="Text-white">{value.email}</TableCell>
                                                                                <CopyToClipboard text={value.walletAddress} 
                                                                                              onCopy={() => this.setState({ lastcopy: value.walletAddress })  }      >
                                                                                <TableCell className="Text-white" title={this.state.lastcopy===value.walletAddress?"copied":value.walletAddress } style={{cursor:"pointer"}}>{value.walletAddress.slice(1, 5) + '...' + value.walletAddress.slice(- 5)}</TableCell>
                                                                                </CopyToClipboard>
                                                                                <TableCell className="Text-white">{value.isBlock?"Block":"UnBlock"}</TableCell>
                                                                                
                                                                             
                                                                                <TableCell className="Text-white">
                                                                                        <button
                                                                                            style={{ padding: 8, background: 'transparent', border: 0 }}
                                                                                            onClick={() => {
                                                                                                
                                                                                              this.Updateorganization(value)
                                                        
                                                                                            }}
                                                                                            title="Block"
                                                                                        >
                                                                                            <MinusCircle
                                                                                                className="ml-2"
                                                                                                color={value.isBlock?'red':'white'}
                                                                                                size={16}
                                                                                            />
                                                                                        </button>
                                                                                    <Link to="/UpdateOrganization">
                                                                                        <button
                                                                                            style={{ padding: 8, background: 'transparent', border: 0 }}
                                                                                            onClick={() => {
                                                                                                localStorage.setItem("OrganizationId",value.id)
                                                                                            }}
                                                                                            title="Edit"
                                                                                        >
                                                                                            <Edit
                                                                                                color='white'
                                                                                                size={16}
                                                                                            />
                                                                                        </button>
                                                                                    </Link>
                                                                                    <button
                                                                                        style={{ padding: 8, background: 'transparent', border: 0 }}
                                                                                        onClick={() => {
                                                                                           this.RemoveOrganization(value.id)
                                                                                        }}
                                                                                        title="Delete"
                                                                                    >
                                                                                        <X
                                                                                            color='white'
                                                                                            size={16}
                                                                                        />
                                                                                    </button>
                                                                                   
                                                                                   
                                                                                   
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
            </SharedLayout>
            </>
            
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MenageAccount);
