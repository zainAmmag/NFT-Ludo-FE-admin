import axios from 'axios';
import React, { useState } from "react";
import '../../src/Assets/css/custom.css';
import { Button } from 'bootstrap';
import avatar from '../Assets/images/avatar.png'
import {
    BaseUrl,
  } from "../Constants/BusinessManager";
  import { SendHttpRequest } from "../component/utility";
  
  import { connect } from "react-redux";
  import swal from "sweetalert";
   
import { bindActionCreators } from "redux";
import { setIsLoaderActive } from "../actions/index";
  
import Modal from "react-bootstrap/Modal";

const mapStateToProps = (state) => {
    return {};
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
    };
  };
class CreateNt extends React.Component {

    constructor() {
        super()
        this.state = {
            // selectedFile: null,
            Name:"",
             TokenId:"",           
             ContractAddress:"",
             ExternalLink:"",
             Description:"",
            Unlockablecontent:false,
          Unlockablecontentnote:"",
          SesitiveData:false,
              Supply:0,
            Feetransitiondata:"", 
            CategoryId:0,
           CurrencyId:0,
           CollectionId:0,
           BlockChainname_:"",
            Price:0,
            ChainId:0,
            NftProperties:[],
            NftLevels:[],
            ImageModal:false,
            NftStats:[],
            Image:{},
            ImagePreview:{},
            Blockchaindata:[],
            CategoryData:[],
            Currencydata:[],
            SelectedBlockchain:[],
            falsemessage:"",
            successmessage:"",
            errormessage:"",
        };
      
    }
    componentDidMount() {
        this.submit()
    }  
async CategoriesIdd()
{
    try {
        const data = await SendHttpRequest(
          BaseUrl + "/Amin/GetMyAllCollections?PageSize=0&CurrentPage=0",
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
        // ();localStorage.clear
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
            // localStorage.clear();
            return;
          }   
    }
async componentDidMount() 
{
       this.BlockchainNames();
       this.CategoriesIdd();
       this.CurrencyIdget();
    console.log(localStorage.getItem("TokenofAdminsigned"))
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
         
          console.log("block",this.state.BlockChainname_)
          console.log("chain",this.state.ChainId)          
          console.log("categoty",this.state.CategoryId)
          console.log("curency",this.state.CurrencyId)
          this.setState({falsemessage:""})
          this.setState({successmessage:""})
          this.setState({errormessage:""})
        var bodyFormData = new FormData();
        bodyFormData.append("Name",this.state.Name);
        bodyFormData.append("TokenId",this.state.TokenId);
        bodyFormData.append("ContractAddress",this.state.ContractAddress);
        bodyFormData.append("ExternalLink", this.state.ExternalLink);
        bodyFormData.append("Description", this.state.Description);
        bodyFormData.append("UnlockableContent",this.state.Unlockablecontent);
        bodyFormData.append("UnlockableContentNote",this.state.Unlockablecontentnote);
        bodyFormData.append("SensitiveContent",this.state.SesitiveData);
        bodyFormData.append("Supply",this.state.Supply);
        bodyFormData.append("FeeTransactionHash",this.state.Feetransitiondata);
        bodyFormData.append("CurrencyId", this.state.CurrencyId);
        bodyFormData.append("CollectionId",this.state.CategoryId);
        bodyFormData.append("BlockChainName", this.state.BlockChainname_);
        bodyFormData.append("Price", this.state.Price);
        bodyFormData.append("ChainId", this.state.ChainId);
        bodyFormData.append("FeaturedImage", this.state.FeaturedImage);
        bodyFormData.append("NftProperties", this.state.NftProperties);
        bodyFormData.append("NftLevels", this.state.NftLevels);
        bodyFormData.append("NftStats", this.state.NftStats);
        bodyFormData.append("Image", this.state.Image);
        if(this.state.CurrencyId==0||this.state.CategoryId==0||this.state.chainID==0)
        {
            this.setState({ ImageModal: true })
            this.setState({errormessage:"Fill Form Correctly"})
        }
        else{
            this.props.setIsLoaderActive(true);
        axios({
            method:"POST",
            url:"http://198.187.28.244:7577/api/v1/Nft/AddNft",

            data:bodyFormData,
            headers:{
                accept: "text/plain",
                "Content-Type": "multipart/form-data",
                Authorization:"Bearer "+localStorage.getItem("TokenofAdminsigned"),
               
            }
        }).then((response)=>{
            this.props.setIsLoaderActive(false);
            this.setState({ ImageModal: true })
            console.log(response.data.message);
            console.log("daadd"+response.statusText);
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
        }) }
    }

     uploadPicture = (e) => {
        this.setState({Image:e.target.files[0]}) 
        this.setState({ImagePreview:URL.createObjectURL(e.target.files[0])})
        };
    FindBlockchainName(data)
       {
             

        var temp="";
       temp= this.state.Blockchaindata.find((item, index) => item.chainID == data).name
         console.log("sass",data);
            console.log("sass",temp);
            this.setState({BlockChainname_:temp})
      }

    render() {
        const handleClose1 = () => this.setState({ImageModal:false});
        return (
            <div className="row">
             <div className="flex2-1">
            <div className='container'>
                <h1 className='f-Heading'>Create NFT</h1>

                <div style={{marginLeft:"5%"}}>
                <div className='container-fluid-1 col-sm-12 col-lg-12 '>
                    <p style={{ cursor: "pointer", marginTop: "-3%" }}>
                        Banner Image
                    </p>
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
                    <div className='upload-section '>
                        <input type="file" onChange={this.uploadPicture} className="inputSec" />
                    </div>
                </div>
                              </div>
                              <div className='pt-4'></div>
              
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
                        <p>Collection</p>
                        <select className='dropDown' name='Category' onChange={(data)=>{ console.log("dmkdsmmsd",this.state.BlockChainname_); this.setState ({CategoryId:data.target.value} ) ;     } }>
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
                        <p>Price</p>
                        <input
                            type="text"
                            required
                            placeholder="enter Price for one item[BNB] "
                            width={100}
                            className="input-field"
                            name='Price'
                            value={this.state.Price}
                            onChange={(data)=>{this.setState({Price:data.target.value})}}
                        />
                    </div>

                    <div className='input-fields'>
                        <p>Blockchain</p>
                        <select className='dropDown' name='BlockChainName' onChange={(data)=>{this.FindBlockchainName(data.target.value);  this.setState ({ChainId:data.target.value} ) ;     } }>
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
                    <div style={{ display: "flex" }}>
                        <button className='btnStyle' onClick={()=>{this.submit()}}>Create NFT</button>
                        <button className='btnStyle'  onClick={()=>{this.clearall()}}>Clear</button>
                    </div>
                </div>
            </div></div>
                                <div className="flex3">
                               
                    <div className="pt-2"></div>
                   
                    <div className="pt-2"></div>

                    <div className='prevItem2'>
                        <p style={{ cursor: "pointer"}}>
                           Image Preview
                        </p>
                        <div style={{height:"55%"}}>
                       
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
                                </div>
             );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateNt);