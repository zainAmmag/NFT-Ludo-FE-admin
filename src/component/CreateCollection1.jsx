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
            Name:"",
            ExternalLink:"",
            Description:"",
            Price:0,
            BlockChainName:0,
            UrlL:"",
            DiscordLink:"",
            TwitterLink:"",
            InstagramLink:"",
            MediumLink:"",
            TLink:"",
            PercentageFee:0,
            CategoryId:0,
            ChainId:0,
            ImageModal:false,
            CurrencyId:"",
            SensitveContent:false,
            LogoImage:{},
            WebsiteLink:"",
            FeaturedImage:{},
            BannerImage:{},
            BannerPreview:{},
            LogoPreview:{},   
            FeatPreview:{},
            Blockchaindata:[],
            CategoryData:[],
            Currencydata:[],
            modalVisible: false,
            falsemessage:"",
            successmessage:"",
            errormessage:"",
        };
    }
    componentDidMount() {
        this.submit()
        this.HandelChange()
    }
   
    
async CategoriesIdd()
{
    try {
        const data = await SendHttpRequest(
          BaseUrl + "/Nft/GetNftCollectionCategories",
          {},
          "GET"
        );
        if (data.isSuccess) 
        {  
           console.log(...data.data);
           this.setState({CategoryData: data.data })         
        } else 
        {
          console.log("data"+ data.message);
        }
      } catch (error) {
       
        return;
      }   

}

async CurrencyIdget()
{
    try {
        const data = await SendHttpRequest(
          BaseUrl + "/BlockChain/GetAllCurrency",
          {},
          "GET"
        );
        if (data.isSuccess) 
        {  
           console.log(...data.data);
           this.setState({Currencydata: data.data })         
        } else 
        {
          console.log("data"+ data.message);
        }
      } catch (error) {
       
        return;
      }   

}
async BlockchainNames()
    {
        try {
            const data = await SendHttpRequest(
              BaseUrl + "/BlockChain/GetAllBlockChain",
              {},
              "GET"
            );
            if (data.isSuccess) 
            {  
               console.log(...data.data);
               this.setState({Blockchaindata: data.data })         
            } else 
            {
              console.log("data"+ data.message);
            }
          } catch (error) {
          
            return;
          }   
    }
async componentDidMount() 
{
       this.BlockchainNames();
       this.CategoriesIdd();
       this.CurrencyIdget();
    console.log(localStorage.getItem("TokenofAdminsigned"))
    this.setState({ImageModal:false});
}
       clearall=()=>{
                   this.setState({Name:""})
                   this.setState({ExternalLink:""})
                   this.setState({Description:""})
                   this.setState({Price:""})
                   this.setState({DiscordLink:""})
                   this.setState({TwitterLink:""})
                   this.setState({InstagramLink:""})
                   this.setState({TLink:""})
                   this.setState({MediumLink:""})
            }
    submit =(data)=>{
          console.log(this.state.BlockChainName)
          
          console.log(this.state.CategoryId)
          console.log(this.state.CurrencyId)
          this.setState({falsemessage:""})
          this.setState({successmessage:""})
          this.setState({errormessage:""})
          //   this.HandleOpen();
        var bodyFormData = new FormData();
        bodyFormData.append("Name",this.state.Name);
        bodyFormData.append("Url",this.state.UrlL);
        bodyFormData.append("Description",this.state.Description);
        bodyFormData.append("WebsiteLink", this.state.WebsiteLink);
        bodyFormData.append("DiscordLink", this.state.DiscordLink);
        bodyFormData.append("TwitterLink",this.state.TwitterLink);
        bodyFormData.append("InstagramLink",this.state.InstagramLink);
        bodyFormData.append("MediumLink",this.state.MediumLink);
        bodyFormData.append("TLink",this.state.TLink);
        bodyFormData.append("PercentageFee",this.state.PercentageFee);
        bodyFormData.append("CategoryId", this.state.CategoryId);
        bodyFormData.append("ChainId",this.state.BlockChainName);
        bodyFormData.append("CurrencyId", this.state.CurrencyId);
        bodyFormData.append("SensitveContent", this.state.SensitveContent);
        bodyFormData.append("LogoImage", this.state.LogoImage);
        bodyFormData.append("FeaturedImage", this.state.FeaturedImage);
        bodyFormData.append("BannerImage", this.state.BannerImage);
     
        axios({
            method:"POST",
            url:"http://198.187.28.244:7577/api/v1/Amin/AddAdminNftCollection",

            data:bodyFormData,
            headers:{
                accept: "text/plain",
                "Content-Type": "multipart/form-data",
                Authorization:"Bearer "+localStorage.getItem("TokenofAdminsigned"),
               
            }
        }).then((response)=>{
            this.setState({ ImageModal: true })
            console.log(response.data.message);
           if(response.data.message=="Collection already exist")
              {
                  this.setState({falsemessage:response.data.message})

              }
            else if(response.data.message=="Data successfully added")
              {
                  this.setState({successmessage:response.data.message})
              }
              else
              {
                this.setState({errormessage:response.data.message})
              }
            // console.log(");
        })
    }



    LogoImageset = (e) => {
        this.setState({LogoImage:e.target.files[0]}) 
         this.setState({LogoPreview:URL.createObjectURL(e.target.files[0])})
        };
     uploadPicture = (e) => {
        this.setState({BannerImage:e.target.files[0]}) 
        this.setState({BannerPreview:URL.createObjectURL(e.target.files[0])})
        };
   
            
        FeatureImageSet = (e) => {
            this.setState({FeaturedImage:e.target.files[0]}) 
             this.setState({FeatPreview:URL.createObjectURL(e.target.files[0])})
            };
            setModalVisible = (visible) => {
                this.setState({ modalVisible: visible });
            }
            HandelChange=()=>{
                this.setState({ ImageModal: false })
            }
           

    render() {
        const handleClose1 = () => this.setState({ImageModal:false});
        return ( 
            <>
            <div className="row">
                
             <div className="flex2-1">

            <div className='container'>
                
                <h1 className='f-Heading'>Create Collection</h1>
                
                <div style={{marginLeft:"5%"}}>
                <div className='container-fluid-1 col-sm-12 col-lg-12 '>
                    <p style={{ cursor: "pointer", marginTop: "-5%" }}>
                        Logo Image
                    </p>
                    <div className='upload-section '>
                        <input type="file" onChange={this.LogoImageset} className="inputSec" />
                    </div>
                </div>
                </div>
                   <div className='pt-4'></div>
               

                <div style={{marginLeft:"5%"}}>
                <div className='container-fluid-1 col-sm-12 col-lg-12 '>
                    <p style={{ cursor: "pointer", marginTop: "-5%" }}>
                      Feature Image
                    </p>
                    <div className='upload-section '>
                        <input type="file" onChange={this.FeatureImageSet} className="inputSec" />
                    </div>
                </div>
                </div>

                <div className='pt-4'></div>
                <Modal
                centered
                size="lg"
                show={this.state.ImageModal}
                >
                <Modal.Body>
                          <div  style={{textAlign:"center"}} className="Modal-div">
                          <div className='Modal-div-notcreated'>
                            {this.state.falsemessage===""?"":this.state.falsemessage}
                    </div>
                    
                    <div className='Modal-div-created'>
                            {this.state.successmessage===""?"":this.state.successmessage}
                    </div>
                    <div className='Modal-div-notcreated'>
                            {this.state.errormessage===""?"":this.state.errormessage}
                    </div>

                          </div> 
                </Modal.Body>
                <Modal.Footer>
                      <button className='Modal-div-cancel-button' onClick={handleClose1} > OK </button>
               </Modal.Footer>
              </Modal>


              <div style={{marginLeft:"5%"}}>
                <div className='container-fluid-1 col-sm-12 col-lg-12 '>
                    <p style={{ cursor: "pointer", marginTop: "-5%" }}>
                        Banner Image
                    </p>
                    <div className='upload-section '>
                        <input type="file" onChange={this.uploadPicture} className="inputSec" />
                    </div>
                </div>
                  </div>



                <div className="col-md-12">
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
                            value={this.state.Name}
                            onChange={(data)=>{this.setState({Name:data.target.value})}}
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
                            onChange={(data)=>{this.setState({ExternalLink:data.target.value})}}
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
                            onChange={(data)=>{this.setState({Description:data.target.value})}}
                        />
                    </div>

                    <div className='input-fields'>
                        <p>Category</p>
                        <select className='dropDown' name='Category' onChange={(data)=>{ this.setState ({CategoryId:data.target.value} ) ;     } }>
                                <option value="none" selected disabled hidden>Select an Option</option>
                           {
                               this.state.CategoryData.map((playerData, k) => {
                                            return(
                                                <option value={playerData.id}> {playerData.name}</option>
                                                 );
                                       })          
                           }
                         
                        </select>
                    </div>

                    <hr style={{ width: "60%", marginLeft: "0%" }} />


                    <div className='input-fields'>
                        <p>Blockchain</p>
                        <select className='dropDown' name='BlockChainName' onChange={(data)=>{ this.setState ({BlockChainName:data.target.value} ) ;     } }>
                                <option value="none" selected disabled hidden>Select an Option</option>
                           {
                               this.state.Blockchaindata.map((playerData, k) => {
                                            return(
                                                <option value={playerData.chainID}> {playerData.name}</option>
                                                 );
                                       })          
                           }
                        </select>
                    </div>

                    <div className='input-fields'>
                        <p>Payment tokens</p>
                        <select className='dropDown' name='Payment' onChange={(data)=>{ this.setState ({CurrencyId:data.target.value} ) ;     } }>
                                <option value="none" selected disabled hidden>Select an Option</option>
                           {
                               this.state.Currencydata.map((playerData, k) => {
                                            return(
                                                <option value={playerData.id}> {playerData.name}</option>
                                                 );
                                       })          
                           }
                        </select>
                    </div>
                   
                    <p>Links </p >         
                <div className='input-fields'>
                        
                        <input
                            type="text"
                            required
                            placeholder="www.Discord.com "
                            width={100}
                            className="input-field"
                            name='Discord'
                            value={this.state.DiscordLink}
                            onChange={(data)=>{this.setState({DiscordLink:data.target.value})}}
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
                            onChange={(data)=>{this.setState({TwitterLink:data.target.value})}}
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
                            onChange={(data)=>{this.setState({InstagramLink:data.target.value})}}
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
                        onChange={(data)=>{this.setState({TLink:data.target.value})}}
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
                            onChange={(data)=>{this.setState({MediumLink:data.target.value})}}
                        />
                    </div>
                    <div style={{ display: "flex" }}>
                        <button className='btnStyle' onClick={()=>{this.submit()}}>Create Collection</button>
                        <button className='btnStyle'  onClick={()=>{this.clearall()}}>Cencel</button>
                    </div>
                </div>
            </div></div>
                                <div className="flex3">


                               


                    <div className='prevItem2'>
                        <p style={{ cursor: "pointer",textAlign:"center"}}>
                            Logo Image
                        </p>
                        <div style={{height:"55%"}}>
                       
                            <div className='prevItmImgSec'>
                            <img
                           src={this.state.LogoPreview}
                              alt="profileImage"
                              className="avatar-immage"
                            />
                     
                        </div>
                        </div>
                        
                    </div> 
                    <div className="pt-2"></div>


                    <div className='prevItem2'>
                        <p style={{ cursor: "pointer",textAlign:"center"}}>
                           Featured Image
                        </p>
                        <div style={{height:"55%"}}>
                       
                            <div className='prevItmImgSec'>
                            <img
                                src={this.state.FeatPreview}
                              alt="profileImage"
                              className="avatar-immage"
                            />
                       
                        </div>
                        </div>
                    </div>

                    <div className="pt-2"></div> 
                     <div className='prevItem'>
                        <p style={{ cursor: "pointer",textAlign:"center"}}>
                            Banner Image
                        </p>
                        <div style={{height:"55%"}}>
                       
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
                                </div> </>
             );
    }
}
export default CreateCollection;
