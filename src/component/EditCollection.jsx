import axios from 'axios';
import React, { useState } from "react";
import '../../src/Assets/css/custom.css';
import { Button } from 'bootstrap';
import avatar from '../Assets/images/avatar.png'
import {
    BaseUrl,
    BaseUrl1,
} from "../Constants/BusinessManager";
import { SendHttpRequest } from "../component/utility";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setIsLoaderActive } from "../actions/index";
import { Component } from 'react'
import { contains } from 'jquery';
import Modal from "react-bootstrap/Modal";
import { bindActionCreators } from "redux";

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
    };
};


class EditCollection extends React.Component {

    constructor() {
        super()
        this.state = {
            // selectedFile: null,
            // optionValue: "",
            Name: "",
            ExternalLink: "",
            Description: "",
            Price: 0,
            BlockChainName: 0,
            UrlL: "",
            DiscordLink: "",
            TwitterLink: "",
            InstagramLink: "",
            MediumLink: "",
            TLink: "",
            collectiondata: [],
            categoryname:"",
            Chainname:"",
            paymentname:"",
            PercentageFee: 0,
            CategoryId: 0,
            ChainId: 0,
            ImageModal: false,
            CurrencyId: "",
            SensitveContent: false,
            LogoImage: {},
            WebsiteLink: "",
            FeaturedImage: {},
            BannerImage: {},
            BannerPreview: {},
            LogoPreview: {},
            FeatPreview: {},
            Blockchaindata:[
                {
                    chainID: 97,
                    name:"Binance Smart Chain",  
                    shortName:"BNB",
                },
            ],
            CategoryData: [
                    {id: 1, name: 'Art'},
                    {id: 2, name: 'Music'},
                {id: 3, name: 'Photography'},
            {id: 4, name: 'Utility'},
                {id: 5, name: 'Virtual Worlds'},
            {id: 6, name: 'Trading Cards'},   
            {id: 7, name: 'Collectibles'},
            {id: 8, name: 'Domain Names'},
            {id: 9, name: 'Sports'}
                ],
            Currencydata: [
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
            URL: "",
    isTrueVal: false,
            modalVisible: false,
            falsemessage: "",
            successmessage: "",
            errormessage: "",
        };
    }
   

    async GetCollection() {
        var temp = "";
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
                console.log("Edit Collection " + data.data.name);
                console.log("Collection data1", this.state.collectiondata);
                console.log("Collection data2", this.state.collectiondata);
                temp = this.state.collectiondata.name;
                this.setState({ Name: temp })
                temp = this.state.collectiondata.url;
                this.setState({ ExternalLink: temp })
                temp = this.state.collectiondata.description;
                this.setState({ Description: temp })
                temp = this.state.collectiondata.percentageFee;
                this.setState({ Price: temp })
                temp = this.state.collectiondata.discordLink;
                this.setState({ DiscordLink: temp })
                temp = this.state.collectiondata.twitterLink;
                this.setState({ TwitterLink: temp })
                temp = this.state.collectiondata.instagramLink;
                this.setState({ InstagramLink: temp })
                temp = this.state.collectiondata.tLink;
                this.setState({ TLink: temp })
                temp = this.state.collectiondata.mediumLink;
                this.setState({ MediumLink: temp })
                temp = this.state.collectiondata.bannerImage;
                this.setState({ BannerImage: temp })
                this.setState({ BannerPreview: "http://198.187.28.244:7577/" + temp })
                temp = this.state.collectiondata.logoImage;
                this.setState({ LogoImage: temp })
                this.setState({ LogoPreview: "http://198.187.28.244:7577/" + temp })
                this.setState({ featuredImage: temp })
                temp = this.state.collectiondata.featuredImage;
                this.setState({ FeatPreview: "http://198.187.28.244:7577/" + temp })
                this.setState({ categoryname:  this.state.CategoryData.find((item, index) => item.id == this.state.collectiondata.categoryId).name})
                this.setState({ BlockChainName:   this.state.Blockchaindata.find((item, index) => item.chainID == this.state.collectiondata.chainID).name})
                this.setState({ paymentname:  this.state.Currencydata.find((item, index) => item.id == this.state.collectiondata.currencyId).name})
                 if(this.state.categoryname!=""&&this.state.BlockChainName!=""&&this.state.paymentname!="") 
                 this.props.setIsLoaderActive(false);
                          
            } else {
                console.log("data" + data.message)
            }
        } catch (error) {
            return;
        }

    }
    async CategoriesIdd() {
        
        try {
            const data = await SendHttpRequest(
                BaseUrl + "/Nft/GetNftCollectionCategories",
                {},
                "GET"
            );
            if (data.isSuccess) {
                console.log(data.data);
                this.setState({ CategoryData: data.data })
            } else {
                console.log("data" + data.message);
            }
        } catch (error) {
            // localStorage.clear();
            return;
        }

    }
    async componentDidMount() {
        this.props.setIsLoaderActive(true);
       
        this.GetCollection();
         this.setState({ ImageModal: false });
    }
    clearall = () => {
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
        console.log(this.state.BlockChainName)
        console.log(this.state.CategoryId)
        console.log(this.state.CurrencyId)
        this.setState({ falsemessage: "" })
        this.setState({ successmessage: "" })
        this.setState({ errormessage: "" })
       
        var bodyFormData = new FormData();
        bodyFormData.append("Name", this.state.Name);
        bodyFormData.append("Url", this.state.ExternalLink);
        bodyFormData.append("Description", this.state.Description);
        bodyFormData.append("WebsiteLink", this.state.WebsiteLink);
        bodyFormData.append("DiscordLink", this.state.DiscordLink);
        bodyFormData.append("TwitterLink", this.state.TwitterLink);
        bodyFormData.append("InstagramLink", this.state.InstagramLink);
        bodyFormData.append("MediumLink", this.state.MediumLink);
        bodyFormData.append("TLink", this.state.TLink);
        bodyFormData.append("PercentageFee", this.state.PercentageFee);
        bodyFormData.append("CategoryId", this.state.CategoryId);
        bodyFormData.append("ChainId",this.state.collectiondata.chainID);
        bodyFormData.append("CurrencyId",this.state.collectiondata.currencyId);
        bodyFormData.append("SensitveContent", this.state.SensitveContent);
        bodyFormData.append("LogoImage", this.state.LogoImage);
        bodyFormData.append("FeaturedImage", this.state.FeaturedImage);
        bodyFormData.append("BannerImage", this.state.BannerImage);

        axios({
            method: "PUT",
            url: "http://198.187.28.244:7577/api/v1/Nft/UpdateNftCollection?collectionId=" + localStorage.getItem("CollectionDetail"),

            data: bodyFormData,
            headers: {
                accept: "text/plain",
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + localStorage.getItem("TokenofAdminsigned"),

            }
        }).then((response) => {

            this.setState({ ImageModal: true })
            console.log(response.data.message);
            if (response.data.message == "Collection already exist") {
                this.setState({ falsemessage: response.data.message })
                
            }
            else if (response.data.message == "Data successfully Updated") {
                
                this.setState({ successmessage: response.data.message })
            }
            else {
                this.setState({ errormessage: response.data.message })
                // return this.props.history.push("/ShowCollectionDetail");
            }
            // console.log(");
        })
    }

    uploadPicture = (e) => {
        this.setState({ BannerImage: e.target.files[0] })
        this.setState({ BannerPreview: URL.createObjectURL(e.target.files[0]) })
    };
    LogoImageset = (e) => {
        this.setState({ LogoImage: e.target.files[0] })
        this.setState({ LogoPreview: URL.createObjectURL(e.target.files[0]) })
    };

    FeatureImageSet = (e) => {
        this.setState({ FeaturedImage: e.target.files[0] })
        this.setState({ FeatPreview: URL.createObjectURL(e.target.files[0]) })
    };
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }
    HandelChange = () => {
        this.setState({ ImageModal: false })
    }

    urlPatternValidation = URL => {
        const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');    
        return regex.test(URL);
      };
      changeUrl = event => {
        const { value } = event.target;
        const isTrueVal = !value || this.urlPatternValidation(value);
        this.setState({
          URL: value,
          isTrueVal
        });
      };
      onSubmit = () => {
        const { URL } = this.state;
        console.log("Here is the site url: ", URL);
      };
    render() {
        const handleClose1 = () => this.setState({ ImageModal: false });
        return (
            <>
                <div className='container'>
                    <div className="row">
                        <div className='col-md-12'>
                            <h1 className='f-Heading'>Edit Collection</h1>
                        </div>
                        <div className="col-md-8 col-sm-12 col-lg-8">
                           
                                <Modal
                                    centered
                                    size="lg"
                                    show={this.state.ImageModal}
                                >
                                    <Modal.Body >
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
                                    placeholder='Enter Collection Name'
                                    width={100}
                                    className="input-field"
                                    name='Name'
                                    value={this.state.Name}
                                    onChange={(data) => { this.setState({ Name: data.target.value }) }}
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
                                    value={this.state.ExternalLink}
                                    onChange={(data) => { this.setState({ ExternalLink: data.target.value }) }}
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
                                    value={this.state.Description}
                                    onChange={(data) => { this.setState({ Description: data.target.value }) }}
                                />
                            </div>
                            <div className='input-fields'>
                                <p>Category</p>
                                <select className='dropDown' name='Category' onChange={(data) => { this.setState({ CategoryId: data.target.value }); }}>
                                    <option value="none" selected disabled hidden>{this.state.categoryname}</option>
                                    {
                                        this.state.CategoryData.map((playerData, k) => {
                                            return (
                                                <option value={playerData.id}> {playerData.name}</option>
                                            );
                                        })
                                    }

                                </select>
                            </div>
                            <div className='input-fields'>
                                <p>Blockchain</p>
                                <select className='dropDown' name='BlockChainName' onChange={(data) => { this.setState({ BlockChainName: data.target.value }); }}>
                                    <option value="none" selected disabled hidden>{this.state.BlockChainName}</option>
                                    {
                                        this.state.Blockchaindata.map((playerData, k) => {
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
                                    <option value="none" selected disabled hidden>{this.state.paymentname}</option>
                                    {
                                        this.state.Currencydata.map((playerData, k) => {
                                            return (
                                                <option value={playerData.id}> {playerData.name}</option>
                                            );
                                        })
                                    }
                                </select>
                            </div>
                            <div className='input-fields'>
                                <p>Links </p >
                                <input
                                    type="text"
                                    required
                                    placeholder="www.Discord.com "
                                    width={100}
                                    className="input-field"
                                    name='Discord'
                                    value={this.state.DiscordLink}
                                    onChange={(data) => { this.setState({ DiscordLink: data.target.value }) }}
                                />
                            </div>
                            <div className='input-fields'>
                                <input
                                    type="text"
                                    required
                                    placeholder="www.Twitter.com "
                                    width={100}
                                    className="input-field"
                                    name='twitter'
                                    value={this.state.TwitterLink}
                                    onChange={(data) => { this.setState({ TwitterLink: data.target.value }) }}
                                />
                            </div>
                            <div className='input-fields'>
                                <input
                                    type="text"
                                    required
                                    placeholder="www.Instagram.com"
                                    width={100}
                                    className="input-field"
                                    name='instagram'
                                    value={this.state.InstagramLink}
                                    onChange={(data) => { this.setState({ InstagramLink: data.target.value }) }}
                                />
                            </div>
                            <div className='input-fields'>
                                <input
                                    type="text"
                                    required
                                    placeholder="www.TLink.com"
                                    width={100}
                                    className="input-field"
                                    name='tLink'
                                    value={this.state.TLink}
                                    onChange={(data) => { this.setState({ TLink: data.target.value }) }}
                                />
                            </div>
                            <div className='input-fields'>
                                <input
                                    type="text"
                                    required
                                    placeholder="www.MediumLink.com"
                                    width={100}
                                    className="input-field"
                                    name='mediumLink'
                                    value={this.state.MediumLink}
                                    onChange={(data) => { this.setState({ MediumLink: data.target.value }) }}
                                />
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-10 col-lg-4">
                            <div className="pt-2"></div>
                            <div className="pt-2"></div>
                            <div className='prevItem2'>
                                <p style={{ cursor: "pointer", textAlign: "center" }}>
                                    Logo Image
                                </p>
                                <input type="file" accept="image/*" onChange={this.LogoImageset} className="inputimage"/ >
                                <div style={{ height: "55%" }}>
                                    <div className='prevItmImgSec'>
                                        <img src={this.state.LogoPreview} alt="profileImage" className="avatar-immagelogo" />
                                    </div>
                                </div>
                            </div>
                            <div className="pt-2"></div>
                            <div className='prevItem2'>
                                <p style={{ cursor: "pointer", textAlign: "center" }}>
                                    Featured Image
                                </p>
                                <input type="file" accept="image/*" onChange={this.FeatureImageSet} className="inputimage" />
                                <div style={{ height: "55%" }}>
                                    <div className='prevItmImgSec'>
                                        <img src={this.state.FeatPreview} alt="profileImage" className="avatar-immage" />
                                    </div>
                                </div>
                            </div>
                            <div className="pt-2"></div>
                            <div className='prevItem'>
                                <p style={{ cursor: "pointer", textAlign: "center" }}>
                                    Banner Image
                                </p>
                                <input type="file" accept="image/*" onChange={this.uploadPicture} className="inputimage" />
                           
                                <div style={{ height: "55%" }}>

                                    <div className='prevItmImgSec'>
                                        <img
                                            src={this.state.BannerPreview}
                                            alt="profileImage"
                                            className="avatar-immage"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='col-md-12'>
                            <div style={{ display: "flex" }}>
                                <button className='create-list' onClick={() => { this.submit() }}>Update Collection</button>
                                <Link to="/manageCollection" >  <button className='create-list' onClick={() => { this.clearall() }}>Cancel</button>
                                  </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (EditCollection);
