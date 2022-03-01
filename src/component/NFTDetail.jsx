import React from "react";
import { SendHttpRequest } from "./utility";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWalletSharp';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Copy } from "react-feather";
import {
  BaseUrl1,
  AuthenticationTokenId,
  ImageBaseUrl,
  BaseUrlGet,
} from "../Constants/BusinessManager";
import swal from "sweetalert";
import { approveContract } from './metamask'

import { Calendar, CheckSquare, Edit, Eye, Heart, MinusCircle } from "react-feather";
import Modal from "react-bootstrap/Modal";
import { Button, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "react-datepicker/dist/react-datepicker.css";
import "../Assets/css/custom.css";
import DatePicker from "react-datepicker";
import { setIsLoaderActive } from "../actions/index";

// import {Loader} from './Loader'
import Loader from "../component/shared/loader";

import { getToken } from "../Utils/Utils";
import { Link } from "react-router-dom";
// import { BaseUrl } from "../Constants/BusinessManager";
import axios from "axios";
import { data } from "jquery";
const mapStateToProps = (state) => {
  return {};
};
const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
  };
};
class NFTDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getUsers: null,
      dataSource: null,
      ImageModal: false,
      imageUrl: "",
      split: "",
      gridView: true,
      tableData: [],
      nftDATA: [],
      toslice: null,
      blockstatus: true,
      tableHead: ["Inv #", "Amount", "Detail", "Date"],
      descriptionModel: false,
      periodModal: false,
      Price: 0,
      AccountDetail: {},
      // DOB: new Date(),
      // kycVerified: true,
      calender: {
        showFromDate: "",
        showToDate: "",
      },
      Rate: 0,
      vprice: true,
      nftproperties: [],
      favourate: false,
      vprice0: true,
      favcount: 0,
      SelectedProject: null,
      CurrencyName: "",
      favourateNFT: [],
    };
  }
  async getnft() {
    try {
      const data = await SendHttpRequest(
        BaseUrl1 + "/GetNftMarketById?nftId=" + localStorage.getItem("NFTID") + "&accountId=" + localStorage.getItem("NftaccountId"),
        {},
        "GET"
      );
      if (data.isSuccess) {

        console.log("daaddadadta" + data.message);
        console.log(data.data);
        this.setState({ nftDATA: data.data })
        this.setState({ Price: this.state.nftDATA.buyPrice })
        this.setState({ nftproperties: this.state.nftDATA.nftProperties })
      } else {
        console.log("data" + data.message);
      }
    } catch (error) {
      // localStorage.clear();
      return;
    }

  }

  async AddNftView() {
    try {
      const data = await SendHttpRequest(
        BaseUrl1 + "/AddViewNft?NftId=" + localStorage.getItem("NFTID"),
        {},
        "POST"
      );
      if (data.isSuccess) {

        console.log("daaddadadta" + data.message);
      } else {
        console.log("data" + data.message);
      }
    } catch (error) {
      // localStorage.clear();
      return;
    }
  }
  async GetFavourateNFtcount() {
    try {
      const data = await SendHttpRequest(
        BaseUrl1 + "/GetFavouriteNftCount?nftId=" + localStorage.getItem("NFTID"), {},
        "GET"
      );
      if (data.isSuccess == true) {
        console.log("View muhazibCount" + data.data)
        this.setState({ favcount: data.data })
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
        await   this.GetFavourateNFtcount();
        await this.GEtmyfavourateNft()
        await  this.getnft();
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
        await   this.GetFavourateNFtcount();
        await this.GEtmyfavourateNft()
        await  this.getnft();
      }
    } catch (error) {

      return;
    }
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
  async componentDidMount() {
    this.props.setIsLoaderActive(true);
    await  this.getnft();
    await this.AddNftView();
    await   this.GetFavourateNFtcount();
    await this.GEtmyfavourateNft()
    
    this.props.setIsLoaderActive(false);
  }
  // componentDidMount(){
  //   console.log("dgfsgrrsfhgdgfsgrrsfhg" + this.state);
  // }
  async sellNft(nftTokenId, contractAddress, id) {
    const price = /^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/;
    const temp = this.state.Price.toString();
    if (!temp?.match(price)) { this.setState({ vprice: false }); return; }
    if (this.state.Price == 0) { this.setState({ vprice0: false }); return; }
    this.setState({ ImageModal: false })
    this.props.setIsLoaderActive(true);
    console.log("payddddddddddddddlkoad", nftTokenId, contractAddress);

    axios({
      method: "GET",
      url: "http://198.187.28.244:7577/api/v1/Nft/GetMarketNftAddress",
      headers: {
        accept: "text/plain",
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("TokenofAdminsigned"),

      }
    }).then((response) => {
      console.log("payddddddddddddddlkoad", this.state);

      const payload = {
        approved: response?.data.data,
        tokenId: nftTokenId,
      };
      const payloadMarket = {
        nftContractId: contractAddress,
        tokenId: nftTokenId,
        price: this.state.Price,
        // marketAddress: resAddress
      };
      console.log("paylkoad", payload);
      console.log("payloadMarket", payloadMarket);

      approveContract(payload, contractAddress, payloadMarket).then((res) => {
        console.log("hashhhhhhhhhhhhhh", res.res.hash, res.response.hash);
        delay(12000).then(async () => {
          var postBody = {
            nftId: id,
            price: this.state.Price,
            approvalTransactionHash: res.response.hash,
            openOrderTransactionHash: res.res.hash
          }
          axios({
            method: "POST",
            url: "http://198.187.28.244:7577/api/v1/Amin/SellNftMarket",
            data: postBody,
            headers: {
              // accept: "text/plain",
              // "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("TokenofAdminsigned"),

            }
          }).then((response) => {

            console.log("LETS GO BRO", response);

            this.props.setIsLoaderActive(false);
            this.getnft();

          }).catch((e) => {
            this.props.setIsLoaderActive(false);
            console.log("ererer", e);

          })
        })

      }).catch((e) => {
        this.props.setIsLoaderActive(false);
        console.log("err", e);
      })
    })
  }

  render() {

    return (
      <>
        <div className="row">
          <div className="col-lg-4 col-md-12 col-sm-12">
            <img src={"http://198.187.28.244:7577/" + this.state.nftDATA.image} alt="profileImage" className="NFT-immage-NFT1 detail-img" />
            <div className="pt-4" />
            <div className="detail-card">
              <h3>Details</h3>
              <p><b>Contract Address</b> {this.state.nftDATA.contractAddress}
                {" "}
                <CopyToClipboard text={localStorage.getItem("address")}
                  onCopy={() => this.setState({ copied: true })}>
                  <Copy style={{ cursor: "pointer" }} />
                </CopyToClipboard >

              </p>
              <p><b>Token IDv</b> {this.state.nftDATA.id}</p>
              <p><b>Token Standard</b> BEP-20</p>
            </div>
            <div className="detail-card">
              <h3>Properties:</h3>
              {
                this.state.nftproperties.length > 0 ? (
                  this.state.nftproperties.map((value, index) => {
                    return (
                      <div className="Properties" >
                        <p>{value.name}</p>
                        <p>{value.type}</p>
                      </div>
                    )
                  })

                ) :
                  (
                    <p>No Property to Show </p>
                  )
              }

            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="Nft-user-detail">
              <h3>{this.state.nftDATA.name}</h3>
              <p>By:{this.state.nftDATA.creatorName}</p>


              <p style={{ fontWeight: "bold" }}> {this.state.nftDATA.collectionName} </p>
              <p >Price:{this.state.nftDATA.bidInitialMinimumAmount ? this.state.nftDATA.bidInitialMaximumAmount : this.state.nftDATA.buyPrice} </p>
              <p><Eye />{" "}{this.state.nftDATA.viewCount} <Heart style={{cursor:"pointer"}} onClick={()=> { this.state.favourate?this.removefavouratenft():this.addfavourateNFt(); } } color={this.state.favourate?"red":"black"} fill={this.state.favourate?"red":"black"}  /> {" "}{this.state.favcount}     </p>
            </div>
            <div className="detail-card">

              <h3>Description</h3>

              {this.state.nftDATA.description}
              {/* Created By{this.state.nftDATA.creatorName} */}
              {/* {this.state.nftDATA.nftDATA.Price} */}

              <div className="full-div" style={{ textAlign: "end" }}>
                {this.state.nftDATA.isMinted ? (
                  <>
                    {this.state.nftDATA.staus !== "ReadyForSell" && this.state.nftDATA.isAdminNft ? (
                      <Button
                        className="collection-button"
                        style={{ borderRadius: "20px", fontSize: '20px', fontWeight: "bolder", }}
                        onClick={() => {
                          this.setState({ ImageModal: true })
                          //  this.state.ImageModal ==true? "Are you sure to sell Nft " :""
                        }}
                      >
                        Sell NFT
                      </Button>
                    ) : (
                      <p>
                        NFT sent to marketplace
                      </p>
                    )}
                  </>
                ) : (
                  <>

                    {this.state.nftDATA.isAdminNft && (
                      <Link to="/UpdateNFt" className="reg-btn blue"  >  <Button
                        className="collection-button"
                        style={{ borderRadius: "20px", fontSize: '20px', fontWeight: "bolder", }}
                        onClick={() => {
                          localStorage.setItem("Updatenftid", this.state.nftDATA.id)
                          localStorage.setItem("Updatenftaccountid", this.state.nftDATA.accountId)
                        }}
                      >
                        Update</Button>
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
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
                    className="input-field1"
                    name='Price'
                    value={this.state.Price}
                    onChange={(data) => { this.setState({ Price: data.target.value }) }}
                  />
                  {!this.state.vprice && (
                    <div style={{ color: "#F61C04" }}>Price is not valid.</div>
                  )}
                  {!this.state.vprice0 && (
                    <div style={{ color: "#F61C04" }}>Price cannot be 0.</div>
                  )}
                </div>
                <Modal.Footer>
                  <button className='Modal-div-cancel-button' onClick={() => this.sellNft(this.state.nftDATA.nftTokenId, this.state.nftDATA.contractAddress, this.state.nftDATA.id)} > OK </button>
                  <button className='Modal-div-cancel-button' onClick={() => this.setState({ ImageModal: false })} > cancel </button>

                </Modal.Footer>
              </Modal.Body>

            </Modal>
            <div className="detail-card">
              <h3> Listing </h3>
              <table

                className="table table-striped table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl AccountStatement"
                style={{ textAlign: "center", color: "white" }}
              >
                <thead>
                  <tr>
                    <th>Price</th>
                    <th>Us Price</th>
                    <th>Expiration</th>
                    <th>Form</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="detail-card">
              <h3 > Offers </h3>
              <table
                className="table table-striped table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl AccountStatement"
                style={{ textAlign: "center", color: "white" }}
              >
                <thead>
                  <tr>
                    <th>Price</th>
                    <th>UsD</th>
                    <th>Expiration</th>
                    <th>Form</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 col-sm-12">
            <div className="detail-card1">
              <div className="Nfy-time">
                0
                <br />
                Days<br />
                <div className="pt-3" />
                0 <br />
                Minutes
                <br />

                <div className="pt-3" />
                0
                <br />
                Hours
                <br />

                <div className="pt-3" />
                0
                <br />
                Seconds
                <br />
                <div className="pt-3" />
              </div>
            </div>

          </div>
        </div>
      </>
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
export default connect(mapStateToProps, mapDispatchToProps)(NFTDetail);
