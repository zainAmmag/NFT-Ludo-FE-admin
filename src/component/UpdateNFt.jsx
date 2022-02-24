import axios from 'axios';
import React, { useState } from "react";
import '../../src/Assets/css/custom.css';
import { Link } from 'react-router-dom';
import { Button } from 'bootstrap';
import avatar from '../Assets/images/avatar.png'
import { mint } from './metamask'
// import { signMessage, mint, sellNftMarket, buyNftMarket, cancelNft, openForAuction, acceptBid} from "decentralized-marketplace";
import {
  BaseUrl, BaseUrl1,
} from "../Constants/BusinessManager";
import { SendHttpRequest } from "../component/utility";

import { connect, useDispatch, useSelector } from "react-redux";

import swal from "sweetalert";
import Switch from 'react-bootstrap/esm/Switch';
import { bindActionCreators } from "redux";
import { setIsLoaderActive } from "../actions/index";

import {
  Modal,
  Row,
  Col,
  Form as Formm,
} from "react-bootstrap";



const mapStateToProps = (state) => {
  return { walletAddress: state.metamaskData };
};
const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));


const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
  };
};
// const walletDataSelector = useSelector(state => state?.metamaskData)
// const dispatch = useDispatch()
class UpdateNFT extends React.Component {

  constructor() {
    super()
    this.state = {
      // selectedFile: null,
      Name1: "",
      TokenId1: "",
      ContractAddress1: "",
      ExternalLink1: "",
      Description1: "",
      Unlockablecontent1: false,
      Unlockablecontentnote1: "",

      SesitiveData1: false,
      Supply1: 0,
      Feetransitiondata1: "",
      CategoryId1: 0,
      CurrencyId1: 9,
      CollectionId1: 0,
      BlockChainname_1: "",
      Price1: 0,
      ChainId1: 97,
      NftProperties1: [],
      NftLevels1: [],
      ImageModal1: false,
      defaultcollctionname: "",
      defaultcurrencyname: "",
      defaultpaymentnname: "",
      NftStats1: [],
      Image1: {},
      freezedata: false,
      isSwitchOn: false,
      ImagePreview: {},
      Blockchaindata1: [],
      CategoryData1: [],
      Currencydata1: [
        {
          blockchainId: 2,
          canUpdate: true,
          currencyType: "Token",
          decimals: 18,
          id: 9,
          image: null,
          name: "BNB",
          rateInUSD: 528.7,
          shortName: "BNB",
          smartContractAddress: "0x9Ce7B893A8aBe688803121e1bcCc68D069C01f51",
          uuid: "793b259c-532d-4dff-a51c-06d609c64b63",
        },
          ],
      SelectedBlockchain1: [],
      falsemessage: "",
      successmessage: "",
      errormessage: "",
      PrevNftdata: [],

    };

  }
  componentDidMount() {
    this.submit()
  }
  async CategoriesIdd() {
    try {
      const data = await SendHttpRequest(
        BaseUrl + "/Amin/GetMyAllCollections?PageSize=0&CurrentPage=0",
        {},
        "GET"
      );
      if (data.isSuccess) {
        console.log(...data.data);
        this.setState({ CategoryData1: data.data })
      } else {
        console.log("data" + data.message);
      }
    } catch (error) {

      return;
    }
  }

  async GetSelectedNft() {
    var temp = "";
    var tempnum = 0;
    var tempbool = false;
    console.log("nftid", localStorage.getItem("Updatenftid"))

    console.log("nftaccountid", localStorage.getItem("Updatenftaccountid"))
    try {
      const data = await SendHttpRequest(
        BaseUrl1 + "/GetNftMarketById?nftId=" + localStorage.getItem("Updatenftid") + "&accountId=" + localStorage.getItem("Updatenftaccountid"),
        {},
        "GET"
      );
      if (data.isSuccess) {
        
        console.log("Collection data" + data.message);
        console.log(data.data);
        this.setState({ PrevNftdata: data.data })
        console.log("PrevNftdata", this.state.PrevNftdata);
        console.log("Edit Collection " + data.data.name);
        console.log("Collection data1", this.state.collectiondata);
        console.log("Collection data2", this.state.collectiondata);
        temp = this.state.PrevNftdata.name;
        this.setState({ Name1: temp })
        tempnum = this.state.PrevNftdata.nftTokenId;
        this.setState({ TokenId1: tempnum })
        temp = this.state.PrevNftdata.externalLink;
        this.setState({ ExternalLink1: temp })
        temp = this.state.PrevNftdata.description;
        this.setState({ Description1: temp })
        tempbool = this.state.PrevNftdata.unlockableContent;
        this.setState({ unlockableContent1: tempbool })
        temp = this.state.PrevNftdata.unlockableContentNote;
        this.setState({ unlockableContentNote1: temp })
        tempbool = this.state.PrevNftdata.sensitiveContent;
        this.setState({ SesitiveData1: tempbool })
        tempnum = this.state.PrevNftdata.supply;
        this.setState({ Supply1: tempnum })
        tempnum = this.state.PrevNftdata.currencyId;
        this.setState({ currencyId1: tempnum })
        console.log("currencyId1:", tempnum)

        console.log("currencyId2:", this.state.currencyId1)
        // this.findcurrencyid()
        tempnum = this.state.PrevNftdata.collectionId;
        this.setState({ collectionId1: tempnum })
        temp = this.state.PrevNftdata.blockChainName
        this.setState({ defaultcurrencyname: temp })
        tempnum = this.state.PrevNftdata.buyPrice;
        this.setState({ Price: tempnum })
        temp = this.state.PrevNftdata.image
        this.setState({ image1: temp })
        this.setState({ ImagePreview: "http://198.187.28.244:7577/" + temp })
        temp = this.state.PrevNftdata.collectionName
        this.setState({ defaultcollctionname: temp })
        temp = this.state.PrevNftdata.contractAddress
        this.setState({ ContractAddress1: temp })
        console.log("zazzaazazaz",this.state.CurrencyId1 )
        this.setState({defaultpaymentnname: this.state.Currencydata1.find((item, index) => item.id == this.state.PrevNftdata.currencyId).name})
        console.log("dsddddsdsdd",this.state.defaultpaymentnname)
      }
      else {
        console.log("data" + data.message)
      }
    } catch (error) {
      return;
    }
  }
  async componentDidMount() {
    this.GetSelectedNft();
    this.findcurrencyid();
    console.log(localStorage.getItem("TokenofAdminsigned"))
  }
  findchainid = () => {

    var temp = 0;
    temp = this.state.Blockchaindata1.find((item, index) => item.name == this.state.defaultcurrencyname).chainID
    this.setState({ ChainId1: temp })

  }
  async findcurrencyid() {

    console.log("zazzaazazaz", this.state.CurrencyId1)
    var temp = [];
    temp = this.state.Currencydata1.find((item, index) => item.id == this.state.CurrencyId1)
    console.log("sssa", this.state.Currencydata1.find((item, index) => item.id == this.state.CurrencyId1))

  }
  clearall = (data) => {
    this.setState({ Name: "" })
    this.setState({ ExternalLink: "" })
    this.setState({ Description: "" })
    this.setState({ Price: "" })
    this.setState({ DiscordLink: "" })
    this.setState({ TwitterLink: "" })
    this.setState({ InstagramLink: "" })
    this.setState({ TLink: "" })
    this.setState({ MediumLink: "" })
  }
  submit = (data) => {
  
    this.props.setIsLoaderActive(true);
    console.log("block", this.state.BlockChainname_)
    console.log("chain", this.state.ChainId)
    console.log("categoty", this.state.CategoryId)
    console.log("curency", this.state.CurrencyId)
    this.setState({ falsemessage: "" })
    this.setState({ successmessage: "" })
    this.setState({ errormessage: "" })
    var bodyFormData = new FormData();
    console.log("state.CurrencyId1",this.state.PrevNftdata.currencyId)
         console.log("state.CategoryId1",this.state.PrevNftdata.collectionId)
         console.log("state.chainID1",)

    bodyFormData.append("NftId", localStorage.getItem("Updatenftid"));
    bodyFormData.append("Name", this.state.Name1);
    bodyFormData.append("TokenId", this.state.TokenId1);
    bodyFormData.append("ExternalLink", this.state.ExternalLink1);
    bodyFormData.append("Description", this.state.Description1);
    bodyFormData.append("UnlockableContent", this.state.Unlockablecontent1);
    bodyFormData.append("UnlockableContentNote", this.state.Unlockablecontentnote1);
    bodyFormData.append("SensitiveContent", this.state.SesitiveData1);
    bodyFormData.append("Supply", this.state.Supply1);
    bodyFormData.append("CurrencyId", this.state.PrevNftdata.currencyId);
    bodyFormData.append("CollectionId", this.state.PrevNftdata.collectionId);
    bodyFormData.append("BlockChainName", this.state .defaultcurrencyname);
    bodyFormData.append("Price", this.state.Price1);
    bodyFormData.append("ChainId",  this.state.Blockchaindata1.find((item, index) => item.name == this.state.defaultcurrencyname).chainID);
    bodyFormData.append("FreezeData", this.state.freezedata);
    bodyFormData.append("Image", this.state.Image1);
    console.log("WHYYY BRO", this.state.isSwitchOn);
    if (this.state.isSwitchOn === true) {
      const payload = [
        {
          to: this.props.walletAddress.accounts[0],
          uri: this.props.walletAddress.accounts[0],
          tokenId: this.state.TokenId1,
        },
      ];
      console.log("PAYLOADD".payload)

      mint(payload, this.state.ContractAddress1).then(async (res) => {
        console.log("responseeeeeee", res)
        bodyFormData.append("FeeTransactionHash", res.hash);
        var postBody = {
          nftId: localStorage.getItem("Updatenftid"),
          transactionHash: res.hash,
        };
        console.log("postBodypostBodypostBodypostBody", postBody)
        delay(12000).then(async () => {
          axios({
            method: "PUT",
            url: "http://198.187.28.244:7577/api/v1/Amin/EditNft",
    
            data: bodyFormData,
            headers: {
              accept: "text/plain",
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("TokenofAdminsigned"),
    
            }
          }).then(async(response) => {
            axios({
              method: "POST",
              url: `http://198.187.28.244:7577/api/v1/Amin/FreezeNft`,
      
              data: postBody,
              headers: {
                // accept: "text/plain",
                // "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + localStorage.getItem("TokenofAdminsigned"),
      
              }
            }).then((resdata) => {
                  console.log("res updateeeeee", resdata)
                  this.setState({ ImageModal: true })
                  this.props.setIsLoaderActive(false);
                  return this.props.history.push("/nftdetail");
                  this.setState({ errormessage: "NFT updated successfully" })
                }).catch((e) => {
                  this.props.setIsLoaderActive(false);
                  console.log("errorrrrrrrrrrrrr updateeeeee", e)
  
                })
            }).catch((e)=>{
              this.props.setIsLoaderActive(false);
              console.log("eeeee updateeeeee", e)
  
            })
        })
        


      }).catch((e) => {
        console.log("errrr", e)
      })
    }

    // if (this.state.CurrencyId1 == 0 || this.state.collectionId1 == 0 || this.state.chainID1 == 0) {
    //   this.setState({ ImageModal: true })
    //   console.log("to check" + this.state.CurrencyId1, this.state.collectionId1, this.state.ChainId1)
    //   this.setState({ errormessage: "Fill Form Correctly" })
    // }
    else {
      console.log("not update")
      this.props.setIsLoaderActive(true);
      axios({
        method: "PUT",
        url: "http://198.187.28.244:7577/api/v1/Amin/EditNft",

        data: bodyFormData,
        headers: {
          accept: "text/plain",
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("TokenofAdminsigned"),

        }
      }).then((response) => {
        this.props.setIsLoaderActive(false);
        this.setState({ ImageModal: true })
        console.log(response.data.message);
        console.log("daadd" + response.statusText);
        if (response.data.message == "Data successfully added") {
          this.setState({ successmessage: response.data.message })
        }
        else {
          this.setState({ errormessage: response.data.message })
        }
        // console.log(");
      }).catch((e) => {
        console.log("errorrrrr", e)
      })
    }
  }
  uploadPicture = (e) => {
    this.setState({ Image: e.target.files[0] })
    this.setState({ ImagePreview: URL.createObjectURL(e.target.files[0]) })
  };
  FindBlockchainName(data) {


    var temp = "";
    temp = this.state.Blockchaindata1.find((item, index) => item.chainID == data).name
    console.log("sass", data);
    console.log("sass", temp);
    this.setState({ BlockChainname_1: temp })
  }

  render() {
    const handleClose1 = () => this.setState({ ImageModal: false });
    return (
      <div className='container'>
        <div className="row">
          <div className='col-md-12'>
            <h1 className='f-Heading'>Update NFT</h1>
          </div>
          <div className="col-md-8 col-sm-12 col-lg-8">
            <Modal
                centered
                size="lg"
                show={this.state.ImageModal}
              >
                <Modal.Body>
                  <div style={{ textAlign: "center" }} className="Modal-div">
                    <div className='Modal-div-notcreated'>
                      {this.state.falsemessage === "" ? "" : this.state.falsemessage}
                    </div>

                    <div className='Modal-div-created'>
                      {this.state.successmessage === "" ? "" : this.state.successmessage}
                    </div>
                    <div className='Modal-div-notcreated'>
                      {this.state.errormessage === "" ? "" : this.state.errormessage}
                    </div>

                  </div>
                  <Modal.Footer>
                  <button className='Modal-div-cancel-button' onClick={handleClose1} > OK </button>
                </Modal.Footer>
                </Modal.Body>
               
              </Modal>
          
            <div className='input-fields'>
              <p>Name</p>
              <input
                type="text"
                required
                // placeholder="e.g 'Crypto Funk' "
                placeholder='Enter Your Name'
                width={100}
                className="input-field"
                name='Name'
                value={this.state.Name1}
                onChange={(data) => { this.setState({ Name1: data.target.value }) }}
              />
            </div>
            <div className='input-fields'>
              <p>External Link</p>
              <input
                type="text"
                required
                placeholder="e.g 'https://www.yoursite.com/item/123' "
                width={100}
                className="input-field"
                name='ExternalLink'
                value={this.state.ExternalLink1}
                onChange={(data) => { this.setState({ ExternalLink1: data.target.value }) }}
              />
            </div>
            <div className='input-fields'>
              <p>Description</p>
              <input
                type="text"
                required
                placeholder="e.g 'this is very limited item' "
                width={100}
                className="description-field"
                name='Description'
                value={this.state.Description1}
                onChange={(data) => { this.setState({ Description1: data.target.value }) }}
              />
            </div>
            <div className='input-fields'>
              <p>Collection</p>
              <select className='dropDown' name='Category' onChange={(data) => { console.log("dmkdsmmsd", this.state.BlockChainname_); this.setState({ CategoryId: data.target.value }); }}>
                <option value="none" selected disabled hidden>{this.state.defaultcollctionname}</option>
                {
                  this.state.CategoryData1.map((playerData, k) => {
                    return (
                      <option value={playerData.id}> {playerData.name}</option>
                    );
                  })
                }
              </select>
            </div>
            <div className='input-fields'>
              <p>Price</p>
              <input
                type="text"
                required
                placeholder="enter Price for one item[BNB] "
                width={100}
                className="input-field"
                name='Price'
                value={this.state.Price1}
                onChange={(data) => { this.setState({ Price1: data.target.value }) }}
              />
            </div>
            <div className='input-fields'>
              <p>Blockchain</p>
              <select className='dropDown' name='BlockChainName' onChange={(data) => { this.FindBlockchainName(data.target.value); this.setState({ ChainId: data.target.value }); }}>
                <option value="none" selected disabled hidden>{this.state.defaultcurrencyname}</option>
                {
                  this.state.Blockchaindata1.map((playerData, k) => {
                    return (
                      <option value={playerData.chainID}> {playerData.name}</option>
                    );
                  })
                }
              </select>
            </div>
            <div className='input-fields'>
              <p>Payment tokens</p>
              <select className='dropDown' name='Payment' onChange={(data) => { this.setState({ CurrencyId: data.target.value }); }}>
                <option value="none" selected disabled hidden>{this.state.defaultpaymentnname}</option>

                {
                  this.state.Currencydata1.map((playerData, k) => {
                    return (
                      <option value={playerData.id}> {playerData.name}</option>

                    );
                  })
                }
              </select>
            </div>
            <div className='input-fields'>
              <p>Contract Adress</p>
              <input
                type="text"
                required
                // placeholder="e.g 'Crypto Funk' "
                placeholder='Enter Your Name'
                width={100}
                className="input-field"
                name='contract'
                disabled
                value={this.state.ContractAddress1}
                onChange={(data) => { this.setState({ ContractAddress1: data.target.value }) }}
              />
            </div>
            <p style={{ whiteSpace: 'nowrap' }} >    <h5 className="">Freeze metadata?</h5>
                <Formm>
                  <Formm.Switch
                    type="switch"
                    id="custom-switch"
                    label="Checking it will permanently freeze the metadata and can be sold on marketplace."
                    checked={this.state.isSwitchOn}
                    onChange={() => {
                    this.setState({isSwitchOn: !this.state.isSwitchOn})
                  }}
                  />
                </Formm></p>
             </div>
          <div className="col-md-4 col-sm-10 col-lg-4">
            <div className="pt-2"></div>
            <div className="pt-2"></div>
            <div className='prevItem2'>
              <p style={{ cursor: "pointer" }}>
                Image Preview
              </p>
              <input type="file" onChange={this.uploadPicture} className="inputimage"/>
              <div style={{ height: "55%" }}>

                <div className='prevItmImgSec'>
                  <img
                    src={this.state.ImagePreview}
                    alt="profileImage"
                    className="avatar-immage"
                  />

                </div>
              </div>

            </div>
          </div>
          <div className='col-md-12'>
            <div style={{ display: "flex" }}>
              <button className='create-list' onClick={() => { this.submit() }}>Update NFT</button>
             <Link to="nftdetail">  <button className='create-list' onClick={() => { this.clearall() }}>Cancel</button>
             </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdateNFT);