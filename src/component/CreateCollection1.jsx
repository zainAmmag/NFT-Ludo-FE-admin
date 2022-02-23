import axios from 'axios';
import React, { useState } from "react";
import '../../src/Assets/css/custom.css';
import { Button } from 'bootstrap';
import avatar from '../Assets/images/avatar.png'
import {
    BaseUrl,
} from "../Constants/BusinessManager";
import { SendHttpRequest } from "../component/utility";
import { setIsLoaderActive } from "../actions/index";
import { Component } from 'react'
import { contains } from 'jquery';
import Modal from "react-bootstrap/Modal";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import swal from "sweetalert";


import { bindActionCreators } from "redux";

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
    };
};


class CreateCollection extends React.Component {

    constructor() {
        super()
        this.state = {
            // selectedFile: null,
            // optionValue: "",
            Name: "",
            Nameok:true,
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
            PercentageFee: 0,
            CategoryId: 0,
            ChainId: 0,
            ImageModal: false,
            CurrencyId: "",
            SensitveContent: false,
            LogoImage: {},
            WebsiteLink: "",
            FeaturedImage: {},
            discordok:true,
            mediumLinkok:true,
            BannerImage: {},
            BannerPreview: {},
            LogoPreview: {},
            FeatPreview: {},
            Blockchaindata:[
                {
                    chainID: 97,
                    name:"Binance Smart Chain"
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
            logoimageset:"",
            featureimageset:"",
             bannerimageset:"",
             URL: "",
             isTrueVal: false,
             twitterok:true,
            modalVisible: false,
            falsemessage: "",
            instagramok:true,
            tLinkok:true,
            successmessage: "",
            errormessage: "",
        };
    }
    async componentDidMount() {

        console.log(localStorage.getItem("TokenofAdminsigned"))
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
        if(this.state.DiscordLink!=""){
        if(!this.urlPatternValidation(this.state.DiscordLink)) 
         this.setState({discordok:false})
       else
         this.setState({discordok:true}) }
    if(this.state.TwitterLink!=""){
    if(!this.urlPatternValidation(this.state.TwitterLink)) 
    this.setState({twitterok:false})
    else
    this.setState({twitterok:true})
    }
    if(this.state.InstagramLink!=""){
    if(!this.urlPatternValidation(this.state.InstagramLink)) 
    this.setState({instagramok:false})
    else
    this.setState({instagramok:true})
    }
    if(this.state.MediumLink!=""){
    if(!this.urlPatternValidation(this.state.MediumLink)) 
    this.setState({mediumLinkok:false})
    else
    this.setState({mediumLinkok:true})
    }
    if(this.state.TLink!=""){
    if(!this.urlPatternValidation(this.state.TLink)) 
    this.setState({tLinkok:false})
      else
    this.setState({tLinkok:true})
    }  
    if(this.state.Name!="")
    {
        if(!this.namevalidation(this.state.Name)) 
        this.setState({Nameok:false})
          else
        this.setState({Nameok:true})
    }    
        if(this.state.discordok&&this.state.twitterok&&this.state.instagramok&&this.state.tLinkok&&this.state.mediumLinkok&&this.state.Nameok)
          {
            this.setState({ falsemessage: "" })
            this.setState({ successmessage: "" })
            this.setState({ errormessage: "" })
            //   this.HandleOpen();
            var bodyFormData = new FormData();
            bodyFormData.append("Name", this.state.Name);
            bodyFormData.append("Url", this.state.UrlL);
            bodyFormData.append("Description", this.state.Description);
            bodyFormData.append("WebsiteLink", this.state.WebsiteLink);
            bodyFormData.append("DiscordLink", this.state.DiscordLink);
            bodyFormData.append("TwitterLink", this.state.TwitterLink);
            bodyFormData.append("InstagramLink", this.state.InstagramLink);
            bodyFormData.append("MediumLink", this.state.MediumLink);
            bodyFormData.append("TLink", this.state.TLink);
            bodyFormData.append("PercentageFee", this.state.PercentageFee);
            bodyFormData.append("CategoryId", this.state.CategoryId);
            bodyFormData.append("ChainId", this.state.BlockChainName);
            bodyFormData.append("CurrencyId", this.state.CurrencyId);
            bodyFormData.append("SensitveContent", this.state.SensitveContent);
            bodyFormData.append("LogoImage", this.state.LogoImage);
            bodyFormData.append("FeaturedImage", this.state.FeaturedImage);
            bodyFormData.append("BannerImage", this.state.BannerImage);
    
            axios({
                method: "POST",
                url: "http://198.187.28.244:7577/api/v1/Amin/AddAdminNftCollection",
    
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
                else if (response.data.message == "Data successfully added") {
                    
                    return this.props.history.push("/manageCollection");
                     this.setState({ successmessage: response.data.message })
                }
                else {
                    this.setState({ errormessage: response.data.message })
                }
                // console.log(");
            })
          }
          console.log("data is not ok")
          return
        console.log(this.state.CategoryId)
        console.log(this.state.CurrencyId)
     
    }



    LogoImageset = (e) => {
          this.setState({
            logoimageset:"set",  
          })
        this.setState({ LogoImage: e.target.files[0] })
        this.setState({ LogoPreview: URL.createObjectURL(e.target.files[0]) })
    };
    uploadPicture = (e) => {
        this.setState({
            bannerimageset:"set",  
          })
        this.setState({ BannerImage: e.target.files[0] })
        this.setState({ BannerPreview: URL.createObjectURL(e.target.files[0]) })
    };


    FeatureImageSet = (e) => {
        this.setState({
            featureimageset:"set",  
          })
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
      namevalidation = name =>
     {
        const regex = new RegExp('^[ a-zA-Z\-\’]+$'); 
        return regex.test(name);   
     } 
     
    render() {
        const handleClose1 = () => this.setState({ ImageModal: false });
        return (
            <>
                <div className='container'>
                    <div className="row">
                        <div className='col-lg-12'>
                            <h1 className='f-Heading'>Create Collection</h1>
                        </div>
                        <div className="col-md-8 col-sm-12 col-lg-8">
                           
                                <Modal centered size="lg" show={this.state.ImageModal}>
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
 
                                            <button className='Modal-div-cancel-button' onClick={handleClose1} > OK </button>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                    </Modal.Footer>
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
                                {!this.state.Nameok && (
            <div style={{ color: "#F61C04" }}>Name contains only Alphabets</div>
          )}
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
                                    <option value="none" selected disabled hidden>Select as an Option</option>
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
                                    <option value="none" selected disabled hidden>Select as an Option</option>
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
                                    <option value="none" selected disabled hidden>Select  as an Option</option>
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
                                        {!this.state.discordok && (
                 <div style={{ color: "#F61C04" }}>URL is not valid.</div>
                                           )}
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
                                     {!this.state.twitterok && (
            <div style={{ color: "#F61C04" }}>URL is not valid.</div>
          )}
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
                                   {!this.state.instagramok && (
            <div style={{ color: "#F61C04" }}>URL is not valid.</div>
          )}
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
                                   {!this.state.tLinkok && (
            <div style={{ color: "#F61C04" }}>URL is not valid.</div>
          )}
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
                                   {!this.state.mediumLinkok && (
            <div style={{ color: "#F61C04" }}>URL is not valid.</div>
          )}
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-10 col-lg-4">
                            <div className="pt-2"></div>
                            <div className="pt-2"></div>
                            <div className='prevItem2'>
                                <p style={{ cursor: "pointer", textAlign: "center" }}>
                                    Logo Image
                                </p>
                                <input type="file" onChange={this.LogoImageset} className="inputimage" />
                                <div style={{ height: "55%" }}>
                                    <div className='prevItmImgSec' >
                                           { <img
                                            src={this.state.logoimageset?this.state.LogoPreview:' ' }
                                            className="avatar-immagelogo"
                                         /> }
                                    </div>
                                </div>
                            </div>
                            <div className="pt-2"></div>
                            <div className='prevItem2'>
                                <p style={{ cursor: "pointer", textAlign: "center" }}>
                                    Featured Image
                                </p>
                                <input type="file" onChange={this.FeatureImageSet} className="inputimage" />
                                <div style={{ height: "55%" }}>
                                    <div className='prevItmImgSec' >
                                        <img src={this.state.featureimageset?this.state.FeatPreview:' '} className="avatar-immage" />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2"></div>
                            <div className='prevItem'>
                                <p style={{ cursor: "pointer", textAlign: "center" }}>
                                    Banner Image
                                </p>
                                <input type="file" onChange={this.uploadPicture} className="inputimage" />
                                <div style={{ height: "55%" }}>

                                    <div className='prevItmImgSec'>
                                        <img src={this.state.bannerimageset?this.state.BannerPreview:' '}  className="avatar-immage" />
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="col-md-12 col-sm-12 col-lg-12">
                            <div style={{ display: "flex" }}>
                                <button className='create-list' onClick={() => { this.submit() }}>Create Collection</button>
                                <Link to="/manageCollection" >   <button className='create-list' onClick={() => { this.clearall() }}>Cancel</button> 
                                 </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default CreateCollection;
