import React from "react";
import defaultImg from "../../src/Assets/images/default.png";
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
import Modal from "react-bootstrap/Modal";

import { bindActionCreators } from "redux";

import { setIsLoaderActive } from "../actions/index";
import FavoriteIcon from '@material-ui/icons/Favorite';
import {
  BaseUrl,
  BaseUrl1,

} from "../Constants/BusinessManager";

import { Search,Heart } from "react-feather";
import { Button } from "bootstrap";
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
      collectiondata: [],
      NFtData: [],
      ImageModal: false,
      categoryname: "",
      IsTickerHovered: false,
      categoryNumber: 0,
      price: 0,
      Search: "",
      Search1: "",
      Blockchaindata: [
        {
          chainID: 97,
          name: "Binance Smart Chain",
          shortName: "BNB",
        },
      ],
      BaseCurrency: 0,
      RenderFinished: false,
      NftcollectionId: 0,
      FN: "No data available",
      BO: null,
      favcount:0,
      favourateNFT:[],
      startslice:0,
      endSlice:8,
      vnomore:true,
    };
  }
  async GetNFTS() {
    console.log("collectiondata", localStorage.getItem("CollectionDetail"))
    try {
      const data = await SendHttpRequest(
        BaseUrl + "/Amin/GetMyAllAdminNfts?PageSize=0&CurrentPage=0",
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
  async GetFavourateNFtcount(temp) {
    try {
      const data = await SendHttpRequest(
        BaseUrl1 + "/GetFavouriteNftCount?nftId=" + temp, {},
        "GET"
      );
      if (data.isSuccess == true) {
        console.log("View muhazibCount" + data.data)
        this.setState({favcount:data.data})
        return data.data
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
    this.GetNFTS();
    this.props.setIsLoaderActive(true);
    this.GEtmyfavourateNft()
  }
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
    mapSlice=()=>{
             let temp1=this.state.startslice
             let temp2=this.state.endSlice
             if(this.state.vnomore==false) return
              if(this.state.NFtData.length<temp2+8)
                   {
                    temp2=this.state.endSlice-this.state.NFtData.length
                    this.setState({endSlice:temp2})
                    this.setState({vnomore:false}); return
                   } 
            this.setState({endSlice:temp2+8})   
            };
  removeuser = () => {
    console.log("dadaad", this.state.Search1.length);
    if (this.state.Search1.length == 1)
      this.setState({ Search: "" })

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
  async addfavourateNFt() {
    try {
      const data = await SendHttpRequest(
        BaseUrl1 + "/AddFavouriteNft", { nftId: this.state.nftDATA.id, nftAddress: " " },
        "POST"
      );
      if (data.isSuccess == true) {
        
      }
    } catch (error) {

      return;
    }
  }
  async removefavouratenft() {
    try {
      const data = await SendHttpRequest(
        BaseUrl1 + "/RemoveFavouriteNft", { nftId: this.state.nftDATA.id, nftAddress: " " },
        "PUT"
      );
      if (data.isSuccess == true) {
         
      }
    } catch (error) {

      return;
    }
  }
  render() {
    var arr = [];
    const handleClose1 = () => this.setState({ ImageModal: false });
    for (var i = 0; i < this.state.categoryNumber; i++) {
      arr.push(this.state.moviesData[this.state.categoryNumber1].Name);
    }
    return (
      <div className="container-fluid body-content" id="">
 <p style={{ whiteSpace: "nowrap", textAlign: "center" }}>
          <div className="search-panel">
            <input
              type="text"
              required
              placeholder="enter name to search"
              className="input-field1"
              name='search'
              value={this.state.Search}
              onChange={(data) => { this.Finduser(); this.setState({ Search: data.target.value });this.removeuser(); }}

            />
            <Search color="white" onClick={() => this.Finduser()} style={{ cursor: "pointer" }} />
          </div>
        </p>
        <div id="container" className="text-center">
          
          <Link to="/createNFT" className="Link create-list">  Create NFT  </Link>
        </div>
        <h1>NFT's:</h1>

        <div id="container">
          <Modal
            centered
            size="lg"
            show={this.state.ImageModal}
          >
            <Modal.Body>
              <div style={{ textAlign: "center" }} className="">
                <p> Price</p>
                <input
                  type="text"
                  required
                  placeholder="enter Price for one item[BNB] "
                  width={50}
                  className="input-field"
                  name='Price'
                  value={this.state.Price}
                  onChange={(data) => { this.setState({ Price: data.target.value }) }}
                />
              </div>
              <Modal.Footer>
                <button className='Modal-div-cancel-button' onClick={handleClose1} > OK </button>
              </Modal.Footer>
            </Modal.Body>

          </Modal>
          <div className="">
          <div className="row" >
          {
              this.state.Search.length == 0 ? (
                <>
            {this.state.NFtData.length > 0 ? (
              <>
                {
                  this.state.NFtData.slice(this.state.startslice, this.state.endSlice).map((playerData, k) => (
                    <>
                      <Col key={k} style={{ paddingTop: "15px" }}  lg={3} md={4}   style={{display:"flex",justifyContent:"center",marginTop:"20px"}}>
                      <Link to="/nftdetail1"
                       onClick={() => {
                        localStorage.setItem("NFTID", playerData.id)
                        localStorage.setItem("NftaccountId", playerData.accountId)
                       }}
                      >
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

                                  src={playerData.logoImage ? "http://198.187.28.244:7577/" + playerData.logoImage : defaultImg}
                                  alt="profileImage"
                                  className="NFT-immage3"
                                />
                              </div>
                              <h5 className="nft-heading">   {playerData.name + " "}</h5>
                              <p className="note"> Price {playerData.buyPrice + " "}  {this.state.Blockchaindata.find((item, index) => playerData.blockChainName == item.name).shortName + " "} </p>
                              <l>
                                <Link to="/nftdetail1">
                                  <a
                                      onClick={() => {
                                      localStorage.setItem("NFTID", playerData.id)
                                      localStorage.setItem("NftaccountId", playerData.accountId)

                                    }}
                                    className="view-all-btn"
                                  >
                                    Details
                                  </a>
                                </Link>
                                <Heart  onClick={()=>{ this.state.favourateNFT.filter((x) => x.nftTokenId == playerData.nftTokenId).length>0?this.removefavouratenft():this.addfavourateNFt(); } } color={ this.state.favourateNFT.filter((x) => x.nftTokenId == playerData.nftTokenId).length>0?"red":"black" } fill={this.state.favourateNFT.filter((x) => x.nftTokenId == playerData.nftTokenId).length>0?"red":"black"}  />  { ()=>{ this.GetFavourateNFtcount(playerData.id); }}
                               
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
              <div className="card" style={{ alignItems: "center", alignContent: "center", width: "100%" }}>
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
            )}</>)
            : (<>" "</>)}
                      
         {
              this.state.Search.length > 0 ? (
                <>
            {this.state.NFtData.filter((x) => x.name ?.toLowerCase().includes(this.state.Search.toLowerCase())).length > 0 ? (
              <>
                {
                  this.state.NFtData.filter((x) => x.name ?.toLowerCase().includes(this.state.Search.toLowerCase())).map((playerData, k) => (
                    <>
                      <Col key={k} style={{ paddingTop: "15px" }}  lg={3} md={4}   style={{display:"flex",justifyContent:"center",marginTop:"20px"}}>
                      <Link to="/nftdetail1"
                       onClick={() => {
                        localStorage.setItem("NFTID", playerData.id)
                        localStorage.setItem("NftaccountId", playerData.accountId)
                       }}
                      >
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

                                  src={playerData.logoImage ? "http://198.187.28.244:7577/" + playerData.logoImage : defaultImg}
                                  alt="profileImage"
                                  className="NFT-immage3"
                                />
                              </div>
                              <h5 className="nft-heading">   {playerData.name + " "}</h5>
                              <p className="note"> Price {playerData.buyPrice + " "}  {this.state.Blockchaindata.find((item, index) => playerData.blockChainName == item.name).shortName + " "} </p>
                              <l>

                                <Link to="/nftdetail1">
                                  <a
                                    onClick={() => {
                                      localStorage.setItem("NFTID", playerData.id)
                                      localStorage.setItem("NftaccountId", playerData.accountId)

                                    }}
                                    className="view-all-btn"
                                  >
                                    Details
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
              <div className="card" style={{ alignItems: "center", alignContent: "center", width: "100%" }}>
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
            )}</>)
            : (<>" "</>)}
          </div>
          </div>
        </div>
        <div id="container" className="text-center" style={{marginLeft:"0"}}>
                                     <button   onClick={()=> this.mapSlice() }   className="Link create-list" style={{ width:"10%",fontSize:'17px'}}> Load More </button >
                                     {!this.state.vnomore && (
            <div style={{ color: "#F61C04" }}>No More Data To Load</div>
          )}  
                                   </div>
       </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionDetail);
