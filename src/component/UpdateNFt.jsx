import axios from 'axios';
import React, { useState } from "react";
import '../../src/Assets/css/custom.css';
import { Button } from 'bootstrap';
import avatar from '../Assets/images/avatar.png'
import {
    BaseUrl,    BaseUrl1,
  } from "../Constants/BusinessManager";
  import { SendHttpRequest } from "../component/utility";
  
  import { connect } from "react-redux";
  import swal from "sweetalert";
  import Switch from 'react-bootstrap/esm/Switch'; 
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
class UpdateNFT extends React.Component {

    constructor() {
        super()
        this.state = {
            // selectedFile: null,
            Name1:"",
             TokenId1:"",           
             ContractAddress1:"",
             ExternalLink1:"",
             Description1:"",
            Unlockablecontent1:false,
          Unlockablecontentnote1:"",
          
          SesitiveData1:false,
              Supply1:0,
            Feetransitiondata1:"", 
            CategoryId1:0,
           CurrencyId1:0,
           CollectionId1:0,
           BlockChainname_1:"",
            Price1:0,
            ChainId1:0,
            NftProperties1:[],
            NftLevels1:[],
            ImageModal1:false,
            defaultcollctionname:"",
            defaultcurrencyname:"",
            defaultpaymentnname:"",
            NftStats1:[],
            Image1:{},
            freezedata:false,
            ImagePreview:{},
            Blockchaindata1:[],
            CategoryData1:[],
            Currencydata1:[],
            SelectedBlockchain1:[],
            falsemessage:"",
            successmessage:"",
            errormessage:"",
            PrevNftdata:[],
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
           this.setState({CategoryData1: data.data })         
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
           this.setState({Currencydata1: data.data })    
       
        } else 
        {
          console.log("data"+ data.message);
        }
      } catch (error) {
        // ();localStorage.clear
        return;
      }   
  

}
async GetSelectedNft()

{
    //  /Nft/GetNftMarketById?nftId=10266&accountId=62
    var temp="";
    var tempnum=0;
    
    var tempbool=false;
    console.log("nftid",localStorage.getItem("Updatenftid"))
    
    console.log("nftaccountid",localStorage.getItem("Updatenftaccountid"))
    try {
        const data = await SendHttpRequest(
          BaseUrl1 + "/GetNftMarketById?nftId="+localStorage.getItem("Updatenftid")+"&accountId="+localStorage.getItem("Updatenftaccountid"),
          {},
          "GET"
        );
        if (data.isSuccess) 
        {  
    console.log("Collection data"+ data.message);
    console.log(data.data);
    this.setState({PrevNftdata:data.data })
    console.log("PrevNftdata",this.state.PrevNftdata);
    console.log("Edit Collection "+data.data.name);     
    console.log("Collection data1",this.state.collectiondata);
    console.log("Collection data2",this.state.collectiondata);
    temp=this.state.PrevNftdata.name;
    this.setState({Name1:temp})
     tempnum=this.state.PrevNftdata.nftTokenId;
    this.setState({TokenId1:tempnum})
    temp=this.state.PrevNftdata.externalLink;
    this.setState({ExternalLink1:temp})
    temp=this.state.PrevNftdata.description;
    this.setState({Description1:temp})
    tempbool=this.state.PrevNftdata.unlockableContent;
    this.setState({unlockableContent1:tempbool})
    temp=this.state.PrevNftdata.unlockableContentNote;
    this.setState({unlockableContentNote1:temp})
    tempbool=this.state.PrevNftdata.sensitiveContent;
    this.setState({SesitiveData1:tempbool})
    tempnum=this.state.PrevNftdata.supply;
    this.setState({Supply1:tempnum})
    tempnum=this.state.PrevNftdata.currencyId;
    this.setState({currencyId1:tempnum})
    console.log("currencyId1:",tempnum)
    
    console.log("currencyId2:",this.state.currencyId1)
    // this.findcurrencyid()
    tempnum=this.state.PrevNftdata.collectionId;
    this.setState({collectionId1:tempnum}) 
    temp=this.state.PrevNftdata.blockChainName
    this.setState({defaultcurrencyname:temp})
    tempnum=this.state.PrevNftdata.buyPrice;
    this.setState({Price:tempnum})
    temp=this.state.PrevNftdata.image
    this.setState({image1:temp})
    this.setState({ImagePreview:"http://198.187.28.244:7577/"+temp})
    temp=this.state.PrevNftdata.collectionName
    this.setState({defaultcollctionname:temp})
    temp=this.state.PrevNftdata.contractAddress
    this.setState({ContractAddress1:temp})
      }
       else 
        {
          console.log("data"+ data.message)
        }
      } catch (error) 
      {
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
               this.setState({Blockchaindata1: data.data })         
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
       this.GetSelectedNft();
    
    console.log(localStorage.getItem("TokenofAdminsigned"))
}
    findchainid=()=>
    {
        
        var temp=0;
       temp= this.state.Blockchaindata1.find((item, index) => item.name == this.state.defaultcurrencyname).chainID
            this.setState({ChainId1:temp})

    }
    findcurrencyid=()=>
    {    
           
        console.log("zazzaazazaz",this.state.CurrencyId1 )
        var temp=[];
        temp = this.state.Currencydata1.find((item, index) => item.id == this.state.CurrencyId1)
        console.log("sssa", this.state.Currencydata1.find((item, index) => item.id == this.state.CurrencyId1))
           
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
        bodyFormData.append("NftId",localStorage.getItem("Updatenftid"));
        bodyFormData.append("Name",this.state.Name1);
        bodyFormData.append("TokenId",this.state.TokenId1);
        bodyFormData.append("ExternalLink", this.state.ExternalLink1);
        bodyFormData.append("Description", this.state.Description1);
        bodyFormData.append("UnlockableContent",this.state.Unlockablecontent1);
        bodyFormData.append("UnlockableContentNote",this.state.Unlockablecontentnote1);
        bodyFormData.append("SensitiveContent",this.state.SesitiveData1);
        bodyFormData.append("Supply",this.state.Supply1);
        bodyFormData.append("CurrencyId", this.state.CurrencyId1);
        bodyFormData.append("CollectionId",this.state.collectionId1);
        bodyFormData.append("BlockChainName", this.state.defaultcurrencyname);
        bodyFormData.append("Price", this.state.Price1);
        bodyFormData.append("ChainId", this.state.ChainId1);
        bodyFormData.append("FreezeData", this.state.freezedata);
         bodyFormData.append("Image", this.state.Image1);
        if(this.state.CurrencyId1==0||this.state.CategoryId1==0||this.state.chainID1==0)
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
       temp= this.state.Blockchaindata1.find((item, index) => item.chainID == data).name
         console.log("sass",data);
            console.log("sass",temp);
            this.setState({BlockChainname_1:temp})
      }

    render() {
        const handleClose1 = () => this.setState({ImageModal:false});
        return (
            <div className="row">
             <div className="flex2-1">
            <div className='container'>
                <h1 className='f-Heading'>Update NFT</h1>

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
                            value={this.state.Name1}
                            onChange={(data)=>{this.setState({Name1:data.target.value})}}
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
                            onChange={(data)=>{this.setState({ExternalLink1:data.target.value})}}
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
                            onChange={(data)=>{this.setState({Description1:data.target.value})}}
                        />
                    </div>
                    <div className='input-fields'>
                        <p>Collection</p>
                        <select className='dropDown' name='Category' onChange={(data)=>{ console.log("dmkdsmmsd",this.state.BlockChainname_); this.setState ({CategoryId:data.target.value} ) ;     } }>
                        <option value="none" selected disabled hidden>{this.state.defaultcollctionname}</option>

                           { 
                           
                               this.state.CategoryData1.map((playerData, k) => {
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
                            value={this.state.Price1}
                            onChange={(data)=>{this.setState({Price1:data.target.value})}}
                        />
                    </div>

                    <div className='input-fields'>
                        <p>Blockchain</p>
                        <select className='dropDown' name='BlockChainName' onChange={(data)=>{this.FindBlockchainName(data.target.value);  this.setState ({ChainId:data.target.value} ) ;     } }>
                                <option value="none" selected disabled hidden>{this.state.defaultcurrencyname}</option>
                           {
                               this.state.Blockchaindata1.map((playerData, k) => {
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
                                <option value="none" selected disabled hidden>Select as an option</option>

                           {
                                       this.state.Currencydata1.map((playerData, k) => {
                                            return(
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
                            value={this.state.ContractAddress1}
                            onChange={(data)=>{this.setState({ContractAddress1:data.target.value})}}
                        />
                             </div>
                         <p style={{whiteSpace:'nowrap' }} >    <Switch  defaultChecked size="small" />  Freeze MetaData </p>
                    <div style={{ display: "flex" }}>
                        <button className='btnStyle' onClick={()=>{this.submit()}}>Update NFT</button>
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
export default connect(mapStateToProps, mapDispatchToProps)(UpdateNFT);