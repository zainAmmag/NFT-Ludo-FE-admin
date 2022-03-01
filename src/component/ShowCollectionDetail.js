import React from "react";
import { Link } from "react-router-dom";
import { SocialIcon } from 'react-social-icons';
import { Col } from "react-bootstrap";
import profilePic from "../Assets/images/profilePic.png";
import "../Assets/css/custom.css";
import Email from "@material-ui/icons/Email"
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWalletSharp'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { SendHttpRequest } from "../component/utility";
import { connect } from "react-redux";
import swal from "sweetalert";
import { Search,Heart } from "react-feather";


import { bindActionCreators } from "redux";

import { setIsLoaderActive } from "../actions/index";
import FavoriteIcon from '@material-ui/icons/Favorite';
import {
  BaseUrl,
  BaseUrl1,

} from "../Constants/BusinessManager";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
  };
};
class CollectionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CurrentCurrency: "",
      ComponentChart: null,
      tableData: [],
      Search: "",
      Search1: "",
      collectiondata: [],
      NFtData: [],
      categoryname: "",
      IsTickerHovered: false,
      categoryNumber: 0,
      BaseCurrency: 0,
      RenderFinished: false,
      NftcollectionId: 0,
      FN: "No data available",
      search: "",
      BO: null,
      favourateNFT:[],
    };
  }
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
  async GetcollectionbyId(collectionId) {
    console.log("collectiondata", localStorage.getItem("CollectionDetail"))
    try {
      const data = await SendHttpRequest(
        BaseUrl1 + "/GetNftCollectionById?CollectionId=" + localStorage.getItem("CollectionDetail"),
        {},
        "GET"
      );
      if (data.isSuccess) {
        console.log("Collection data" + data.message);
        console.log(data.data);
        this.setState({ collectiondata: data.data })
        console.log("Collection data1", this.state.collectiondata);
        console.log("Collection data2", this.state.collectiondata);


        console.log("naeandianuioand", localStorage.getItem("profileImage"))

      } else {
        console.log("data" + data.message)
      }
    } catch (error) {
      return;
    }
  }
 
  async GetNFTbycollectionId(collectionId) {
    console.log("danananak112", this.state.NftcollectionId);
    this.props.setIsLoaderActive(true);
    try {

      const data = await SendHttpRequest(
        BaseUrl + "/Amin/GetAllNftsByCollectionId?collectionId=" + localStorage.getItem("CollectionDetail") + "&PageSize=0&CurrentPage=0",
        {},
        "GET"
      );
      if (data.isSuccess) {
        this.props.setIsLoaderActive(false);
        console.log("NFT data" + data.message);
        console.log(...data.data);
        this.setState({ NFtData: data.data })
      } else {
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
    this.GetcollectionbyId();
    this.GetNFTbycollectionId();
  }
  Finduser = () => {
    
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
      <div className="full-div">
        <div className="collectiondetail">
          {
            <div style={{
              width: "100%",
            }}>
              <img
                src={"http://198.187.28.244:7577/" + this.state.collectiondata.bannerImage}
                alt="profileImage"
                className="img-hght"
                style={{
                  width: "100%",
                }} />
              <img
                src={"http://198.187.28.244:7577/" + this.state.collectiondata.logoImage}
                alt="profileImage"
                className="logostyle" />
              <div style={{ width: "80%", textAlign: "center", paddingLeft: '20%' }}>
                <h3>{this.state.collectiondata.name} </h3>
                <p>
                  {this.state.collectiondata.description}
                </p>
                <p style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                  <div className="search-panel">
                    <input
                      type="text"
                      required
                      placeholder="enter name to search"
                      className="input-field1"
                      name='search'
                      value={this.state.Search}
                      onChange={(data) => { this.Finduser(); this.setState({ Search: data.target.value });this.removeuser();}}
                    />
                    <Search color="white" onClick={() => this.Finduser()} style={{ cursor: "pointer" }} />
                  </div>
                </p>
                <Link to="/EditCollection">
                  <button className="create-list"> Edit Collection   </button>
                </Link>
                <Link to="/createNFT">
                  <button className="create-list">Create NFT   </button>
                </Link>
              </div>
            </div>
          }
        </div>
        <div className="pt-2"></div>
        <h1>NFT's:</h1>
        <div className=" container full-div mb-txt-center" >
          <div className="row"  >
            {
              this.state.Search.length == 0 ? (
                <>  {
                  this.state.NFtData.length > 0 ? (
                    <>
                      {
                        this.state.NFtData.map((playerData, k) => (
                          <>
                            <Col key={k} style={{ paddingTop: "15px" }} md={6} lg={3} >
                            <Link to="/nftdetail2"
                             onClick={() => {
                              localStorage.setItem("NFTID", playerData.id)
                              localStorage.setItem("NftaccountId", playerData.accountId)

                            }}>
                                                            <div
                                className="card2NFT">
                                <div >
                                  <div className="panel">
                                    <img
                                      src={"http://198.187.28.244:7577/" + playerData.image}
                                      alt="profileImage"
                                      className="NFT-immage-NFT"
                                    />

                                    <div className="">
                                      <img
                                        src={"http://198.187.28.244:7577/" + playerData.logoImage}
                                        alt="profileImage"
                                        className="NFT-immage3"
                                      />
                                    </div>
                                    <h5 className="nft-heading">   {playerData.name + " "}</h5>
                                    <p className="note"> Price {playerData.buyPrice + " "}BNB </p>

                                    <l>

                                      <Link to="/nftdetail2">
                                        <a
                                          onClick={() => {
                                            localStorage.setItem("NFTID", playerData.id)
                                            localStorage.setItem("NftaccountId", playerData.accountId)

                                          }}
                                          className="view-all-btn"
                                        >
                                          Detail
                                        </a>
                                      </Link>
                                      <Heart  onClick={()=>{ this.state.favourateNFT.filter((x) => x.nftTokenId == playerData.nftTokenId).length>0?this.removefavouratenft():this.addfavourateNFt(); } } color={ this.state.favourateNFT.filter((x) => x.nftTokenId == playerData.nftTokenId).length>0?"red":"black" } fill={this.state.favourateNFT.filter((x) => x.nftTokenId == playerData.nftTokenId).length>0?"red":"black"}  />
                                    </l>

                                  </div>
                                </div>
                              </div>{" "}
                              
</Link>
                            </Col>
                          </>
                        ))}
                    </>
                  ) : (
                    <div className="card" style={{ alignItems: "center", alignContent: "center", width: "100%", marginTop: '100px' }}>
                      <p
                        className="margin-ud"
                        style={{
                          textAlign: "center",
                          color: "white",
                          fontSize: 20,
                        }}
                      >
                        <h2>   No NFT To Show  </h2>
                      </p>
                    </div>
                  )} </>)
                : (<>" "</>)}



         {
              this.state.Search.length > 0 ? (
                <>  {
                  this.state.NFtData.filter((x) => x.name ?.toLowerCase().includes(this.state.Search.toLowerCase())).length > 0  ? (
                    <>
                      {
                        this.state.NFtData.filter((x) => x.name ?.toLowerCase().includes(this.state.Search.toLowerCase())).map((playerData, k) => (
                          <>
                            <Col key={k} style={{ paddingTop: "15px" }} md={6} lg={3}  >
                            <Link to="/nftdetail2"
                             onClick={() => {
                              localStorage.setItem("NFTID", playerData.id)
                              localStorage.setItem("NftaccountId", playerData.accountId)

                            }}>
                              
                              <div
                                className="card2NFT">
                                <div >
                                  <div className="panel">
                                    <img
                                      src={"http://198.187.28.244:7577/" + playerData.image}
                                      alt="profileImage"
                                      className="NFT-immage-NFT"
                                    />

                                    <div className="">
                                      <img
                                        src={"http://198.187.28.244:7577/" + playerData.logoImage}
                                        alt="profileImage"
                                        className="NFT-immage3"
                                      />
                                    </div>
                                    <h5 className="nft-heading">   {playerData.name + " "}</h5>
                                    <p className="note"> Price {playerData.buyPrice + " "}BNB </p>

                                    <l>

                                      <Link to="/nftdetail2">
                                        <a
                                          onClick={() => {
                                            localStorage.setItem("NFTID", playerData.id)
                                            localStorage.setItem("NftaccountId", playerData.accountId)

                                          }}
                                          className="view-all-btn"
                                        >
                                          Detail
                                        </a>
                                      </Link>
                                      <Heart  onClick={()=>{ this.state.favourateNFT.filter((x) => x.nftTokenId == playerData.nftTokenId).length>0?this.removefavouratenft():this.addfavourateNFt(); } } color={ this.state.favourateNFT.filter((x) => x.nftTokenId == playerData.nftTokenId).length>0?"red":"black" } fill={this.state.favourateNFT.filter((x) => x.nftTokenId == playerData.nftTokenId).length>0?"red":"black"}  />
                                    </l>

                                  </div>
                                </div>
                              </div>{" "}
                              </Link>
                                                         </Col>
                          </>
                        ))}
                    </>
                  ) : (
                    <div className="card" style={{ alignItems: "center", alignContent: "center", width: "100%", marginTop: '100px' }}>
                      <p
                        className="margin-ud"
                        style={{
                          textAlign: "center",
                          color: "white",
                          fontSize: 20,
                        }}
                      >
                        <h2>   No NFT To Show  </h2>
                      </p>
                    </div>
                  )} </>)
                : (<>" "</>)}

          </div>
        </div>
      </div>
    );
  }
}

export default
  connect(mapStateToProps, mapDispatchToProps)(CollectionDetail);
