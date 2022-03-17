import React from "react";
import { SendHttpRequest } from "./utility";
import {
    BaseUrl,
} from "../Constants/BusinessManager";
import swal from "sweetalert";
import { Edit, Eye, MinusCircle,X } from "react-feather";
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
       await this.GetBlogData();
    }
    async GetBlogData() {
        this.props.setIsLoaderActive(true);
        try {
            let t = getToken();
            var data = await SendHttpRequest(
                BaseUrl + "/Blog/GetAllBlog?PageSize=0&CurrentPage=0",
                {},
                "GET"
            );
            if (data.isSuccess) {
                this.setState({ tableData: data.data.filter((x)=>x.isDeleted===false) });
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

    async DeleteBlog(blog) {
        this.props.setIsLoaderActive(true);
        try {
            let t = getToken();
            var data = await SendHttpRequest(
                BaseUrl + "/Blog/RemoveBlog?blogId="+blog,
                {},
                "put"
            );
            if (data.isSuccess) {
               console.log("Blog Deleted Succesfully")
               this.GetBlogData();
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

        console.log("called")
        console.log("console",this.state.tableData.filter((x) => x.title?.toLowerCase().includes(this.state.Search.toLowerCase())))
        var temp = this.state.Search1;
        this.setState({ Search: temp })
    };

    removeuser = () => {
        console.log("dadaad", this.state.Search1.length);
        console.log("Search1+", this.state.Search1);
        console.log("Search+", this.state.Search);
        if (this.state.Search1.length == 1) {


            this.setState({ Search: "" })
            console.log("ajnbdanbadd", this.state.Search.length)
        }
    };

    render() {
        return (
            <>

                        <SharedLayout>
            <div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-xl-12 col-12 order-2 order-lg-2 order-xl-1">
                        <div className="card p-t-30">
                            <h1 style={{ textAlign: "center" }}>Manage Blogs</h1>
                            <div id="container" className="text-center">
                                <Link to="/AddBlog" className="Link create-list">  Add Blog  </Link>
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
this.state.tableData.length > 0 ? (
<div style={{ padding: 10 }}>
<TableContainer component={Paper} className="Text-white">
<Table
className="table table-striped [table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl AccountStatement Text-white"
style={{ textAlign: "center", color: "white" }}
>
<TableHead className="Text-white">
    <TableRow style={{ color: "#fff" }}>
        <TableCell className="Text-white">Image</TableCell>
        <TableCell className="Text-white">Title</TableCell>
        <TableCell className="Text-white">Creation-DAte</TableCell>
        <TableCell className="Text-white">Action</TableCell>
    </TableRow>
</TableHead>
<TableBody style={{ color: "#fff" }} className="Text-white">
    {this.state.tableData &&
        this.state.tableData.filter((x) => x.title?.toLowerCase().includes(this.state.Search.toLowerCase())).length > 0 &&
        this.state.tableData.filter((x) => x.title?.toLowerCase().includes(this.state.Search.toLowerCase())).slice(this.state.page * 5, this.state.page * 5 + 5)
            .map((value, index) => {

                 return (
                    <TableRow key={index} className="Text-white">
                        {/* {console.log(value)} */}
                        {/* {this.state.copied ? <span style={{ fontSize: 12, marginLeft: '1%' }}>Copied.</span> : null} */}
                        <TableCell className="Text-white">
                            <img
                                src={"https://api.fineoriginal.com/" + value.image}
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
                            <TableCell className="Text-white" title={this.state.lastcopy == value.address ? "Copied" : "click to copy"} style={{ cursor: "pointer" }}>{value.title}</TableCell>
                        
                        {/* {this.state.copied ? <title>Copied.</title> : null} */}
                        <TableCell className="Text-white">{value.createtdDate.slice(0,10)}</TableCell>
                        <TableCell className="Text-white">
                            <Link to="/editblog">
                            <button
                                    style={{ padding: 8, background: 'transparent', border: 0 }}
                                    onClick={() => {
                                              localStorage.setItem("blogslugUrl",value.slugUrl)
                                          }} 
                                    title="Detail"
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
                                     this.DeleteBlog(value.id)      
                                    }} 
                                    title="Delete"
                                >
                            <X
                                color='white'
                                size={16}
                            />
                              </button>
                              <Link to="/BlogDetail">
                                <button
                                    style={{ padding: 8, background: 'transparent', border: 0 }}
                                    onClick={() => {
                                        localStorage.setItem("blogslugUrl",value.slugUrl)
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
</SharedLayout>     
 </>
);

}
}
export default connect(mapStateToProps, mapDispatchToProps)(MenageAccount);
