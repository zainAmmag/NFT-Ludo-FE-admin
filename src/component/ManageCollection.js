import React from "react";
import { Link } from "react-router-dom";
import { SocialIcon } from 'react-social-icons';
import defaultImg from "../../src/Assets/images/default.png";
import { Col } from "react-bootstrap";
import profilePic from "../Assets/images/profilePic.png";
import { Carousel } from 'react-responsive-carousel';
import "../Assets/css/custom.css";
import Email from "@material-ui/icons/Email"
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWalletSharp'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { SendHttpRequest } from "../component/utility";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { connect } from "react-redux";
import swal from "sweetalert";
import { Search } from "react-feather";

import { setIsLoaderActive } from "../actions/index";

import { bindActionCreators } from "redux";

import {
  BaseUrl,
  
  BaseUrl1,
} from "../Constants/BusinessManager";
import SharedLayout from "./shared/SharedLayout";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
  };
};
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CurrentCurrency: "",
      ComponentChart: null,
      tableData: [],
      collectiondata: [],
      NFtData: [],
      categoryname: "",
      Search: "",
      Search1: "",
      IsTickerHovered: false,
      categoryNumber: 0,
      BaseCurrency: 0,
      favourateNFT:[],
      RenderFinished: false,
      FN: "No data available",
      BO: null,
      startslice:0,
      endSlice:8,
      vnomore:true,
    };
  }
  async componentDidMount() {
    this.props.setIsLoaderActive(true);
    try {
      const data = await SendHttpRequest(
        BaseUrl + "/Nft/GetMyAllCollections?PageSize=0&CurrentPage=0",
        {},
        "GET"
      );
      if (data.isSuccess) {
        console.log("data" + data.message);
        this.props.setIsLoaderActive(false);
        console.log(...data.data);
        this.setState({ collectiondata: data.data })
        console.log("naeandianuioand", localStorage.getItem("profileImage"))

      } else {
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
  mapSlice=()=>{
    let temp1=this.state.startslice
    let temp2=this.state.endSlice
    if(this.state.vnomore==false) return
     if(this.state.NFtData.length<temp2+8)
          {
           this.setState({vnomore:false}); 
          } 
   this.setState({endSlice:temp2+8})   
   };
  Finduser = () => {
    if(this.state.vnomore==false)
    {
       this.setState({endSlice:8})
       this.setState({vnomore:true})
    }  
    console.log("called")
    console.log(this.state.tableData.filter((x) => x.name ?.toLowerCase().includes(this.state.Search1.toLowerCase())) )
        // console.log("Present")
        // else
        // console.log("not Present")
        
    // return;
    var temp = this.state.Search1;
  //  temp=this.state.tableData.find ((item, index) => item.username == this.state.search)
    this.setState({ Search: temp })
  };
 
  async GEtmyfavourateNft() {
    try {
      const data = await SendHttpRequest(
        BaseUrl1 + "/GetMyFavouriteNft", {},
        "GET"
      );
      if (data.isSuccess == true) {
        this.setState({ favourateNFT: data.data })
        if (this.state.favourateNFT.filter((x) => x.nftTokenId == this.state.nftDATA.nftTokenId).length > 0) {
          this.setState({ favourate: true })
          console.log("nft is in favourate ")
        }
        else
        {
          this.setState({ favourate:false })
         
        }
          console.log("nft is not favourate ")
      }
    } catch (error) {

      return;
    }
  }
  removeuser = () => {
    console.log("dadaad", this.state.Search1.length);
    if (this.state.Search1.length == 1)
      this.setState({ Search: "" })

  };
  render() {
    var arr = [];
    for (var i = 0; i < this.state.categoryNumber; i++) {
      arr.push(this.state.moviesData[this.state.categoryNumber1].Name);
    }

    return (
      <div className="container-fluid body-content" id="">
 

        <h1>Collections :</h1>
        <p style={{ whiteSpace: "nowrap", textAlign: "center" }}>
          <div className="search-panel">
            <input
              type="text"
              required
              placeholder="enter name to search"
              className="input-field1"
              name='search'
              value={this.state.Search}
              onChange={(data) => { this.Finduser();this.setState({ Search: data.target.value });this.removeuser();  }}

            />
            <Search color="white" onClick={() => this.Finduser()} style={{ cursor: "pointer" }} />
          </div>
        </p>
        <div id="container" className="text-center">
          <Link to="/createNFT" className="Link create-list">  Create NFT  </Link>
          <Link to="/CreateCollection" className="Link create-list">Create Collection </Link>
          <div className="row row12">
            {
              this.state.Search.length == 0 ? (
                <>  {this.state.collectiondata.length > 0 ? (
                  <>
                    {
                      this.state.collectiondata.slice(this.state.startslice, this.state.endSlice).map((playerData, k) => {
                        return (
                          <>


                            <Col key={k} style={{ paddingTop: "15px" }} md={4} lg={3
                            } style={{display:"flex",justifyContent:"center",marginTop:"20px"}} >
                               <Link to="/ShowCollectionDetail"
                                       
                                          onClick={() => {
                                            localStorage.setItem("CollectionDetail", playerData.id)

                                          }}>   
                                       
                              <div
                                className="card2NFT">
                                <div >
                                  <div className="panal">

                                    <img
                                      src={playerData.bannerImage? "http://198.187.28.244:7577/" + playerData.featuredImage: defaultImg}
                                      alt="profileImage"
                                      className="NFT-immage-NFT"
                                     
                                    />
                                    <div className="">
                                      <img
                                        src={playerData.logoImage? "http://198.187.28.244:7577/" + playerData.logoImage: defaultImg}
                                        alt="profileImage"
                                        className="NFT-immage3"
                                      />
                                    </div>
                                    <h5 className="nft-heading">   {playerData.name + " "}</h5>
                                    <l>
                                      <Link to="/ShowCollectionDetail">
                                        <a
                                          onClick={() => {
                                            localStorage.setItem("CollectionDetail", playerData.id)

                                          }}
                                          className="view-all-btn"
                                        >
                                          Details
                                        </a>
                                      </Link>
                                    </l>
                                  </div>
                                </div>
                              </div>{" "}
                              </Link> 
                            </Col>


                          </>
                        )
                      })}
                  </>
                ) : (
                  <div style={{ alignItems: "center", alignContent: "center" }}>
                    <p
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 20,
                      }}
                    >
                      No Collection
                    </p>
                  </div>
                )}</>)
                : (<>" "</>)}
                {
                  this.state.Search.length > 0 ? (
                    <>  {this.state.collectiondata.filter((x) => x.name ?.toLowerCase().includes(this.state.Search.toLowerCase())).length > 0  ? (
                      <>
                        {
                          this.state.collectiondata.filter((x) => x.name ?.toLowerCase().includes(this.state.Search.toLowerCase())).map((playerData, k) => {
                            return (
                              <>
                                <Col key={k} style={{ paddingTop: "15px" }} md={4} lg={3
                                } style={{display:"flex",justifyContent:"center",marginTop:"20px"}} >
                                  <Link to="/ShowCollectionDetail"
                                       
                                       onClick={() => {
                                         localStorage.setItem("CollectionDetail", playerData.id)

                                       }}>   
                                  <div
                                    className="card2NFT">
                                    <div >
                                      <div className="panal">
    
                                        <img
                                          src={playerData.bannerImage? "http://198.187.28.244:7577/" + playerData.featuredImage: defaultImg}
                                          alt="profileImage"
                                          className="NFT-immage-NFT"
                                          onClick={() => {
                                            this.props.setIsLoaderActive(true);
                                            this.GetNFTbycollectionId(playerData.id)
                                          }}
                                        />
                                        <div className="">
                                          <img
                                            src={playerData.logoImage? "http://198.187.28.244:7577/" + playerData.logoImage: defaultImg}
                                            alt="profileImage"
                                            className="NFT-immage3"
                                          />
                                        </div>
                                        <h5 className="nft-heading">   {playerData.name + " "}</h5>
                                        <l>
                                          <Link to="/ShowCollectionDetail">
                                            <a
                                              onClick={() => {
                                                localStorage.setItem("CollectionDetail", playerData.id)
    
                                              }}
                                              className="view-all-btn"
                                            >
                                              Details
                                            </a>
                                          </Link>
                                        </l>
                                      </div>
                                    </div>
                                  </div>{" "}
                                  </Link>
                                </Col>
    
    
                              </>
                            )
                          })}
                      </>
                    ) : (
                      <div style={{ alignItems: "center", alignContent: "center" }}>
                        <p
                          style={{
                            textAlign: "center",
                            color: "white",
                            fontSize: 20,
                          }}
                        >
                          No Collection
                        </p>
                      </div>
                    )}</>)
                    : (<>" "</>)}



          </div>
        </div>
        { this.state.collectiondata.length>8?   
        <div id="container" className="text-center" style={{marginLeft:"0"}}>                          
             <button   onClick={()=> this.mapSlice() }   className="Link create-list" style={{ width:"10%",fontSize:'17px'}}> Load More </button >
                                     {!this.state.vnomore && (
            <div style={{ color: "#F61C04" }}>No More Data To Load</div>
          )}  
                                   </div>:
                                   <div id="container" className="text-center" style={{marginLeft:"0"}}>                          
                                                         </div>
                }
       
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
