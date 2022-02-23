import React from "react";
import { SendHttpRequest } from "./utility";
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
      Price:0,
      AccountDetail: {},
      // DOB: new Date(),
      // kycVerified: true,
      calender: {
        showFromDate: "",
        showToDate: "",
      },
      Rate: 0,
      SelectedProject: null,
      CurrencyName: "",
    };
  }
  async getnft()
  {
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
      } else {
        console.log("data" + data.message);
      }
    } catch (error) {
      // localStorage.clear();
      return;
    }

  }
  async componentDidMount() {
    this.getnft();
  }
  // componentDidMount(){
  //   console.log("dgfsgrrsfhgdgfsgrrsfhg" + this.state);
  // }
  async sellNft(nftTokenId, contractAddress, id) {
              
        this.setState({ImageModal:false})
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

      approveContract(payload,contractAddress,payloadMarket).then((res)=>{
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

        }).catch((e)=>{
        console.log("ererer", e);

        })
      })
        
      }).catch((e)=>{
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
              <p><b>Contract Address</b> {this.state.nftDATA.contractAddress}</p>
              <p><b>Token</b> IDv213</p>
              <p><b>Token</b> Standard</p>
            </div>
            <div className="detail-card">
              <h3>Properties</h3>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="Nft-user-detail">
              <h3>{this.state.nftDATA.name}</h3>
              <p>By</p>
              <p>{this.state.nftDATA.creatorName}</p>
              
              

              <p style={{ fontWeight: "bold" }}> Funky 213 </p>
              <p >price:{this.state.nftDATA.bidInitialMinimumAmount ? this.state.nftDATA.bidInitialMaximumAmount : 0} </p>
              <p><Eye />{" "}{this.state.nftDATA.viewCount} <Heart /> {" "}{this.state.nftDATA.ratings}     </p>
            </div>
            <div className="detail-card">
              
              <h3>Description</h3>

              {this.state.nftDATA.description}
              {/* Created By{this.state.nftDATA.creatorName} */}
              {/* {this.state.nftDATA.nftDATA.Price} */}
              
             <div className="full-div" style={{textAlign:"end"}}>
              {this.state.nftDATA.isMinted ? (
                  <>
                  {this.state.nftDATA.staus !== "ReadyForSell" ? (
                  <Button
                    className="collection-button"
                    style={{ borderRadius: "20px", fontSize: '20px', fontWeight: "bolder", }}
                    onClick={() => {
                      this.setState({ ImageModal: true })
                    }}
                  >
                    Sell NFT
                  </Button>
                  ):(
                    <p>
                      NFT sent to marketplace
                    </p>
                  )}
                  </>
                ) : (
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
                    className="input-field"
                    name='Price'
                    value={this.state.Price}
                    onChange={(data) => { this.setState({ Price: data.target.value }) }}
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button className='Modal-div-cancel-button' onClick={()=>this.sellNft(this.state.nftDATA.nftTokenId, this.state.nftDATA.contractAddress, this.state.nftDATA.id)} > OK </button>
              </Modal.Footer>
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
