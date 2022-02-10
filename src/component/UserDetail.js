import React from "react";
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import { SocialIcon } from 'react-social-icons';
import Ticker from "react-ticker";
import { Card, Row, Col, Container } from "react-bootstrap";
import { connect } from "react-redux";
import profilePic from "../Assets/images/profilePic.png";
import nft from "../Assets/images/nft.jpg";
import "../Assets/css/custom.css";
import TwitterIcon from '@material-ui/core/';
import Email from "@material-ui/icons/Email"
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWalletSharp'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { SendHttpRequest } from "../component/utility";
import FavoriteIcon from '@material-ui/icons/Favorite';
import {
  BaseUrl,
  AuthenticationToken,
  DefaultCurrencyTokenId,
  AuthenticationTokenId,
  UserTypeTokenId,
  UserAuthTokenId,
  UserProfileTokenId,
  LogoSmall,
} from "../Constants/BusinessManager";
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CurrentCurrency: "",
      ComponentChart: null,
      tableData: [],
      collectiondata: [],
      NFtData:[],
      categoryname: "",
      IsTickerHovered: false,
      categoryNumber: 0 ,
      BaseCurrency: 0,
      RenderFinished: false,

      FN: "No data available",
      BO: null,
    };
  }
  async GetNFTbycollectionId(collectionId)
  {
    try {
      const data = await SendHttpRequest(
        BaseUrl + "/Amin/GetAllNftsByCollectionId?collectionId="+collectionId,
        {},
        "GET"
      );
      if (data.isSuccess) 
      {  
        console.log("data"+ data.message);
         console.log(...data.data);
         this.setState({NFtData: data.data })
      } else 
      {
        console.log("data"+ data.message);
      }
    } catch (error) {
      localStorage.clear();
      return;
    }
  } 
  async componentDidMount() {
    try {
      const data = await SendHttpRequest(
        BaseUrl + "/Amin/GetMyAllCollectionsByUserId?userAccountId="+localStorage.getItem("UserID"),
        {},
        "GET"
      );
      if (data.isSuccess) 
      {  
        console.log("data"+ data.message);
         console.log(...data.data);
         this.setState({collectiondata: data.data })
     
      } else 
      {
        console.log("data"+ data.message);
      }
    } catch (error) {
      localStorage.clear();
      return;
    }
  
}
  render() {
    var arr=[] ;
    for (var i = 0; i < this.state.categoryNumber; i++) 
    {
        arr.push(this.state.moviesData[this.state.categoryNumber1].Name);
    }
   
    return (
      <div className="container-fluid body-content" id="">
        <div className="row" style={{ height: "362px" }}>
          <div className="card" style={{ flex: 1 }}>
            <div
              style={{
                padding: ".75rem 1.25rem",
                marginBottom: "0",
                background: "transparent",
                fontWeight: "600",
                fontSize: "14px",
                color: "#ffffff",
              }}
            >
              {" "}
            </div>
            <div style={{ textAlign: "center" }}>
              <h3>profile</h3>
            </div>
            <div className="row">
              <div
                className=""
                style={{
                  width: "199px",
                  height: "199px",
                  overflow: "hidden",
                  marginLeft: "2%",
                  position: "relative",
                  borderRadius: "50%",
                }}
              >

                <img
                   src={"http://198.187.28.244:7577/"+localStorage.getItem("profileImage")}
                  //src={profilePic}
                  alt="profileImage"
                  data-toggle="modal"
                  data-target="#modal-animation-14"
                  style={{
                    color: "transparent",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    textAlign: "center",
                    textIndent: "10000px",
                  }}
                />
              </div>
              <div
                className=""
                style={{
                  width: "70%",
                  height: "100%",
                  marginLeft: "2%",
                  position: "relative",
                }}
              >
                <div>0
                  <p> <PersonOutlineIcon /> {" "+localStorage.getItem("username")} </p>
                  <p> <Email />{" "+ localStorage.getItem("email") }</p>
                  <p> <AccountBalanceWalletIcon /> {"Wallet :"+localStorage.getItem("address") }</p>
                   
                  <p> <SocialIcon network="twitter" fgColor="black" bgColor="white"  style={{ height: 25, width: 25 }}/>
                        { " "+ localStorage.getItem("twitterLink") }</p>
                  <p> <SocialIcon network="instagram" fgColor="black" bgColor="white"  style={{ height: 25, width: 25 }}/>
                        {" "+localStorage.getItem("instagramLink") }</p>
                        <p>  {"Bio :"+localStorage.getItem("bio")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h1>Collections :</h1>
        <div id="container">
          <div className="row">
            {this.state.collectiondata.length > 0 ? (
              <>         
                {    
                  this.state.collectiondata.map((playerData, k) => (
                  <>
                    <Col key={k} style={{ paddingTop: "15px" }} md={2} lg={4} >
                      <div
                        className="card2">
                        <div >
                          <div className="panal">
                       
                                <img
                                  src={"http://198.187.28.244:7577/"+ playerData.logoImage}
                                  alt="profileImage"
                                  className="NFT-immage"
                                 />
                                  <button
                                    style={{ background: 'transparent',border:0}}
                                    onClick={() =>{this.GetNFTbycollectionId(26)}}>
                                 <img
                                  src={"http://198.187.28.244:7577/"+ playerData.bannerImage}
                                  alt="profileImage"
                                  className="NFT-banner-immage"
                                 />
                                 </button>
                                 <h5 style={{color:"black",paddingTop:"6%"}}>{playerData.name}</h5>
                          </div>
                        </div>
                      </div>{" "}
                    </Col>
                  </>
                ))}
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
            )}
            
          </div>
        </div>
        
        <h1>NFT's:</h1>
        <div id="container">
          <div className="row">
            {this.state.NFtData.length > 0 ? (
              <>         
                {    
                this.state.NFtData.map((playerData, k) => (
                  <>
                    <Col key={k} style={{ paddingTop: "15px" }} md={2} lg={4} >
                      <div
                        className="card2NFT">
                        <div >
                          <div className="panal">
                                <img
                                  src={"http://198.187.28.244:7577/"+playerData.bannerImage }
                                  alt="profileImage"
                                  className="NFT-immage-NFT"
                                 />

                             <div className="">
                                      <img
                                       src={"http://198.187.28.244:7577/"+playerData.logoImage}
                                       alt="profileImage"
                                      className="NFT-immage3"
                                      />
                               </div>
                               <h5 className="nft-heading">  price</h5>  
                               <p className="note"> Price { playerData.buyPrice+" "}NB </p>   
                               <l> 

                                 <Link to="/nftdetail">                                
                                 <a
                                     onClick={() =>{
                                      localStorage.setItem("NFTID",playerData.id)
                                      localStorage.setItem("NftaccountId",playerData.accountId)
                                      
                                      }}
                                    className="view-all-btn"
                                  >
                                    Detail 
                                  </a>
                                  </Link>
                                            <FavoriteIcon />   {playerData.ratings}
                                  </l>

                          </div>
                        </div>
                      </div>{" "}
                    </Col>
                  </>
                ))}
              </>
            ) : (
              <div className="card" style={{ alignItems: "center", alignContent: "center",width:"100%" }}>
                <p
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 20,
                  }}
                >
                   <h2>   No NFT To Show  </h2>
                </p>
              </div>
            )}
            )
          </div>
        </div>
      </div>
    );
  }
}

export default UserDetail;
