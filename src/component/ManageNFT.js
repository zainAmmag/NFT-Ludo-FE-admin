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
import Modal from "react-bootstrap/Modal";

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
      collectiondata: [],
      NFtData: [],
      ImageModal: false,
      categoryname: "",
      IsTickerHovered: false,
      categoryNumber: 0,
      price: 0,
      Blockchaindata:[
        {
            chainID: 97,
            name:"Binance Smart Chain",
            shortName:"BNB",
        },
    ],
      BaseCurrency: 0,
      RenderFinished: false,
      NftcollectionId: 0,
      FN: "No data available",
      BO: null,
    };
  }
  async GetNFTS() {
    console.log("collectiondata", localStorage.getItem("CollectionDetail"))
    try {
      const data = await SendHttpRequest(
        BaseUrl + "/Amin/GetMyAllAdminNfts",
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
  }
  render() {
    var arr = [];
    const handleClose1 = () => this.setState({ ImageModal: false });
    for (var i = 0; i < this.state.categoryNumber; i++) {
      arr.push(this.state.moviesData[this.state.categoryNumber1].Name);
    }
    return (          
      <div className="container-fluid body-content" id="">
            
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
            </Modal.Body>
            <Modal.Footer>
              <button className='Modal-div-cancel-button' onClick={handleClose1} > OK </button>
            </Modal.Footer>
          </Modal>

          <div className="row">
            {this.state.NFtData.length > 0 ? (
              <>
                {
                  this.state.NFtData.map((playerData, k) => (
                    <>
                      <Col key={k} style={{ paddingTop: "15px" }} md={4} lg={3
                      } sm={1}  >
                        <div
                          className="card2NFT">
                          <div >
                            <div className="panal">
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
                              <p className="note"> Price {playerData.buyPrice + " "}  { this.state.Blockchaindata.find((item, index) => playerData.blockChainName == item.name).shortName + " "} </p>
                              <l>

                                <Link to="/nftdetail">
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
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionDetail);
