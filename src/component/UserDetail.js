import React from "react";
import { Link } from "react-router-dom";
import { SocialIcon } from 'react-social-icons';
import { Copy } from "react-feather";
import { Col } from "react-bootstrap";
import profilePic from "../Assets/images/profilePic.png";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import "../Assets/css/custom.css";
import Email from "@material-ui/icons/Email"
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWalletSharp'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { SendHttpRequest } from "../component/utility";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setIsLoaderActive } from "../actions/index";
import {
  BaseUrl,
} from "../Constants/BusinessManager";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      IsTickerHovered: false,
      categoryNumber: 0,
      BaseCurrency: 0,
      collectionset: false,
      RenderFinished: false,

      FN: "No data available",
      BO: null,
    };
  }
  async GetNFTbycollectionId(collectionId) {
    try {
      const data = await SendHttpRequest(
        BaseUrl + "/Amin/GetAllNftsByCollectionId?collectionId=" + collectionId,
        {},
        "GET"
      );
      if (data.isSuccess) {
        console.log("data" + data.message);
        console.log(...data.data);
        this.setState({ NFtData: data.data })
        this.setState({ collectionset: true })

        this.props.setIsLoaderActive(false);
      } else {
        console.log("data" + data.message);
      }
    } catch (error) {
      // localStorage.clear();
      return;
    }
  }
  async componentDidMount() {
    try {
      const data = await SendHttpRequest(
        BaseUrl + "/Amin/GetMyAllCollectionsByUserId?userAccountId=" + localStorage.getItem("UserID"),
        {},
        "GET"
      );
      if (data.isSuccess) {
        console.log("data" + data.message);
        console.log(...data.data);
        this.setState({ collectiondata: data.data })
        console.log("naeandianuioand", localStorage.getItem("profileImage"))

      } else {
        console.log("data" + data.message);
      }
    } catch (error) {
      // localStorage.clear();
      return;
    }

  }
  notify = () => toast("Copied");
  render() {
    var arr = [];
    for (var i = 0; i < this.state.categoryNumber; i++) {
      arr.push(this.state.moviesData[this.state.categoryNumber1].Name);
    }

    return (
      <div className="container-fluid body-content" id="">
         
        <div className="row">
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
              <h3>Profile</h3>
            </div>
            <div className="row">
              <div
                className="profile-img-pnl"
                style={{
                  overflow: "hidden",
                  position: "relative",
                  borderRadius: "50%",
                }}
              >

                <img
                  src={localStorage.getItem("profileImage") === "Null" ? profilePic : "http://198.187.28.244:7577/" + localStorage.getItem("profileImage")}
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
                className="profile-txt-pnl"
                style={{
                  position: "relative",
                }}
              >
                <div>
                  <p> <PersonOutlineIcon /> {" " + localStorage.getItem("username")} </p>
                  <p> <Email />{" " + localStorage.getItem("email")}</p>
                  <p> <AccountBalanceWalletIcon /> {localStorage.getItem("address")}
                    {" "}
                    <CopyToClipboard text={localStorage.getItem("address")}
                      onCopy={() => this.setState({ copied: true })}>
                      <Copy style={{cursor:"pointer"}}/>
                    </CopyToClipboard>
                    {this.state.copied ? <span style={{ fontSize: 12, marginLeft: '1%' }}>Copied.</span> : null}

                  </p>

                  <a href={localStorage.getItem("twitterLink")}>  <p className="links">  <SocialIcon network="twitter" fgColor="black" bgColor="white" style={{ height: 25, width: 25 }} />
                    {" " + localStorage.getItem("twitterLink")}</p> </a>

                    <a href={localStorage.getItem("instagramLink")}> <p className="links"> <SocialIcon network="instagram" fgColor="black" bgColor="white" style={{ height: 25, width: 25 }} />
                    {" " + localStorage.getItem("instagramLink")}</p> </a>

                  <p>  {"Bio: " + localStorage.getItem("bio")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h1>Collections :</h1>
        {/* <div id="container">
          <div className="row"> */}
        <div className="container">
          <div className="row">
            {this.state.collectiondata.length > 0 ? (
              <>
                {
                  this.state.collectiondata.map((playerData, k) => {
                    return (
                      <>
                        <Col key={k} style={{ paddingTop: "15px" }} md={4} lg={3} sm={1}>
                          <div
                            className="card2NFT">
                            <div >
                              <div className="panel">

                                <img
                                  src={"http://198.187.28.244:7577/" + playerData.featuredImage}
                                  alt="profileImage"
                                  className="NFT-immage-NFT"
                                  onClick={() => {
                                    this.props.setIsLoaderActive(true);
                                    this.GetNFTbycollectionId(playerData.id)
                                  }}
                                />


                                <div className="">
                                  <img
                                    src={"http://198.187.28.244:7577/" + playerData.logoImage}
                                    alt="profileImage"
                                    className="NFT-immage3"
                                  />
                                </div>
                                <h5 className="nft-heading">   {playerData.name + " "}</h5>
                                <l>
                                  <a
                                    onClick={() => {
                                      this.GetNFTbycollectionId(playerData.id)

                                    }}
                                    className="view-all-btn"
                                  >
                                    Details
                                  </a>
                                </l>
                              </div>
                            </div>
                          </div>{" "}
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
            )}
          </div>
        </div>
        {/* </div>
        </div> */}



        <h1>NFTs:</h1>
        {!this.state.collectionset ? (
          <div className="card" style={{ alignItems: "center", alignContent: "center", width: "100%" }}>
            <p
              className="margin-ud"
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 20,
              }}
            >
              <h2> Click on a Collection to view NFTs  </h2>
            </p>
          </div>
        ) : (
          <div className="container">
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

                                  <Link to="/nftdetail">
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
              )}

            </div>
          </div>
        )}
         
      </div>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
