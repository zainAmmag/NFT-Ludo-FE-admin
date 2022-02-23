import React from "react";
import { Link } from "react-router-dom";
import { SocialIcon } from 'react-social-icons';

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
} from "../Constants/BusinessManager";

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
      RenderFinished: false,
      FN: "No data available",
      BO: null,
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
  Finduser = () => {

    var temp = this.state.Search1;
    //  temp=this.state.tableData.find ((item, index) => item.username == this.state.search)
    this.setState({ Search: temp })
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
              value={this.state.Search1}
              onChange={(data) => { this.setState({ Search1: data.target.value }) }}

            />
            <Search color="white" onClick={() => this.Finduser()} style={{ cursor: "pointer" }} />
          </div>
        </p>
        <div id="container" className="text-center">
          <Link to="/createNFT" className="Link create-list">  Create NFT  </Link>
          <Link to="/CreateCollection" className="Link create-list">Create Collection </Link>
          <div className="row">
            {
              this.state.Search.length == 0 ? (
                <>  {this.state.collectiondata.length > 0 ? (
                  <>
                    {
                      this.state.collectiondata.map((playerData, k) => {
                        return (
                          <>
                            <Col key={k} style={{ paddingTop: "15px" }} md={2} lg={3} >
                        
                                  <div className="panal1 card2">
                                    <div className="img-pnl">
                                      <img src={"http://198.187.28.244:7577/" + playerData.logoImage} className="NFT-immage" />
                                      <Link to="/ShowCollectionDetail">
                                        <button
                                          style={{ background: 'transparent', border: 0 }}
                                          onClick={() => { localStorage.setItem("CollectionDetail", playerData.id) }}
                                         >
                                          <img
                                            src={"http://198.187.28.244:7577/" + playerData.bannerImage}
                                            className="NFT-banner-immage"
                                           />
                                        
                                        </button>
                                      </Link>
                                    </div>
                                    <h5 style={{ color: "black", paddingTop: "6%" }}>{playerData.name}
                                    </h5>
                                  </div>
                            {" "}
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
            {this.state.collectiondata.length > 0 ? (
              <>

                {
                  this.state.collectiondata.filter((x) => x.name == this.state.Search).map((playerData, k) => {
                    return (
                      <>
                        <Col key={k} style={{ paddingTop: "15px" }} md={2} lg={3} >
                          <div
                            className="">
                            <div >
                              <div className="panal1 card2 ">

                                <img
                                  src={"http://198.187.28.244:7577/" + playerData.logoImage}
                                  alt="profileImage"
                                  className="NFT-immage"
                                />
                                <Link to="/ShowCollectionDetail">
                                  <button
                                    style={{ background: 'transparent', border: 0 }}
                                    onClick={() => { localStorage.setItem("CollectionDetail", playerData.id) }}
                                    className="NFT-banner-immage">
                                    <img
                                      src={"http://198.187.28.244:7577/" + playerData.bannerImage}
                                      alt="profileImage"
                                      style={{ width: '100%', height: '100%' }}
                                    />
                                  </button>
                                </Link>
                                <h5 style={{ color: "black", paddingTop: "6%" }}>{playerData.name}
                                </h5>
                              </div>
                            </div>
                          </div>{" "}
                        </Col>
                      </>
                    )
                  })}
              </>
            ) : (
              <>  </>
            )}



          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
