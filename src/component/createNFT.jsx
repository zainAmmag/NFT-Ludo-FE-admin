import axios from 'axios';
import React, { useState } from "react";
import '../../src/Assets/css/custom.css';
import { Button } from 'bootstrap';
import avatar from '../Assets/images/avatar.png'
import { Link } from "react-router-dom";
import {
    BaseUrl,
} from "../Constants/BusinessManager";
import { SendHttpRequest } from "../component/utility";
import {
    Row,
    Col,
    Form as Formm,
  } from "react-bootstrap";
import { connect } from "react-redux";
import swal from "sweetalert";
import {PlusSquare,Crosshair} from "react-feather";
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
            Name: "",
            vname: true,
            TokenId: "",
            ContractAddress: "",
            ExternalLink: "",
            vExternalLink: true,
            Description: "",
            Unlockablecontent: false,
            Unlockablecontentnote: "",
            SesitiveData: false,
            Supply: 0,
            propertytyppe:"",
            propertyname:"",
            Feetransitiondata: "",
            CategoryId: 0,
            CurrencyId: 0,
            CollectionId: 0,
            BlockChainname_: "",
            Price: null,
            vprice: true,
            ChainId: 0,
            NftProperties: [],
            imageset: "",
            NftLevels: [],
            ImageModal: false,
            NftStats: [],
            Image: {},
            finalCreatedProperties:[],
            addPropertiesList:[{ name: "", type: "" },],
            ImagePreview: {},
            imageok: true,
            Blockchaindata: [
                {
                    chainID: 97,
                    name: "Binance Smart Chain"
                },
            ],
            CategoryData: [],
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
            SelectedBlockchain: [],
            falsemessage: "",
            modalVisible: false,
            successmessage: "",
            errormessage: "",
            nftModel: false,
            nftName: false,
            nftExternalLink: false,
            nftPrice: false,
            proprttydiv:false,
            nftpropertycount:0,
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
                this.setState({ CategoryData: data.data })
            } else {
                console.log("data" + data.message);
            }
        } catch (error) {

            return;
        }
    }

    async CurrencyIdget() {
        try {
            const data = await SendHttpRequest(
                BaseUrl + "/BlockChain/GetAllCurrency",
                {},
                "GET"
            );
            if (data.isSuccess) {
                console.log(...data.data);
                this.setState({ Currencydata: data.data })
            } else {
                console.log("data" + data.message);
            }
        } catch (error) {
            // ();localStorage.clear
            return;
        }

    }
    async BlockchainNames() {
        try {
            const data = await SendHttpRequest(
                BaseUrl + "/BlockChain/GetAllBlockChain",
                {},
                "GET"
            );
            if (data.isSuccess) {
                console.log(...data.data);
                this.setState({ Blockchaindata: data.data })
            } else {
                console.log("data" + data.message);
            }
        } catch (error) {
            // localStorage.clear();
            return;
        }
    }
    async componentDidMount() {
        this.CategoriesIdd();
    }
    urlPatternValidation = URL => {
        const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
         
        return regex.test(URL);
    };
   
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
        const name = /^[a-zA-Z0-9]*$/;
        const price= /^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/;
         const temp=this.state.Name
         const temp1=this.state.Price
        if (temp.match(name)) this.setState({vname:true})   
        if (!temp.match(name)) {this.setState({vname:false});return ;}
        if (this.urlPatternValidation(this.state.ExternalLink))  this.setState({vExternalLink:true})
        if (!this.urlPatternValidation(this.state.ExternalLink)) {this.setState({vExternalLink:false}); return; }
        if (temp1.match(price)) this.setState({vprice:true})
        if (!temp1.match(price))  { this.setState({vprice:false});return;}
        console.log("block", this.state.BlockChainname_)
        console.log("chain", this.state.ChainId)
        console.log("categoty", this.state.CategoryId)
        console.log("curency", this.state.CurrencyId)
        this.setState({ falsemessage: "" })
        this.setState({ successmessage: "" })
        this.setState({ errormessage: "" })
        if (!this.state.imageset) {
            this.setState({ imageok: false })
            return
        }
        else {
            this.setState({ imageok: true })
        }
        var bodyFormData = new FormData();
        this.props.setIsLoaderActive(true);

        bodyFormData.append("Name", this.state.Name);
        bodyFormData.append("TokenId", this.state.TokenId);
        bodyFormData.append("ContractAddress", this.state.ContractAddress);
        bodyFormData.append("ExternalLink", this.state.ExternalLink);
        bodyFormData.append("Description", this.state.Description);
        bodyFormData.append("UnlockableContent", this.state.Unlockablecontent);
        bodyFormData.append("UnlockableContentNote", this.state.Unlockablecontentnote);
        bodyFormData.append("SensitiveContent", this.state.SesitiveData);
        bodyFormData.append("Supply", this.state.Supply);
        bodyFormData.append("FeeTransactionHash", this.state.Feetransitiondata);
        bodyFormData.append("CurrencyId", this.state.CurrencyId);
        bodyFormData.append("CollectionId", this.state.CategoryId);
        bodyFormData.append("BlockChainName", this.state.BlockChainname_);
        bodyFormData.append("Price", this.state.Price);
        bodyFormData.append("ChainId", this.state.ChainId);
        bodyFormData.append("FeaturedImage", this.state.FeaturedImage);
        bodyFormData.append("NftProperties", this.state.NftProperties);
        bodyFormData.append("NftLevels", this.state.NftLevels);
        bodyFormData.append("NftStats", this.state.NftStats);
        bodyFormData.append("Image", this.state.Image);
        if (this.state.CurrencyId == 0 || this.state.CategoryId == 0 || this.state.chainID == 0) {
            this.setState({ ImageModal: true })
            this.setState({ errormessage: "Fill Form Correctly" })
        }
        else {
            this.props.setIsLoaderActive(true);
            axios({
                method: "POST",
                url: "http://198.187.28.244:7577/api/v1/Nft/AddNft",

                data: bodyFormData,
                headers: {
                    accept: "text/plain",
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + localStorage.getItem("TokenofAdminsigned"),

                }
            }).then((response) => {
                this.props.setIsLoaderActive(false);
                // this.setState({ ImageModal: true })
                console.log(response.data.message);
                
                console.log("daadd" + response.statusText);
                if (response.data.message == "Collection already exist") {
                    this.setState({ falsemessage: response.data.message })
                    this.setState({ ImageModal: true })
                }

                else if (response.data.message == "Data successfully added") {
                    this.setState({ nftModel: true })

                    this.setState({ successmessage: response.data.message })

                }
                else {
                    this.setState({ errormessage: response.data.message })
                }
                // console.log(");
            })
        }
    }

    uploadPicture = (e) => {
        this.setState({ Image: e.target.files[0] })
        this.setState({ imageset: 'set' })
        this.setState({ ImagePreview: URL.createObjectURL(e.target.files[0]) })
    };
    FindBlockchainName(data) {


        var temp = "";
        temp = this.state.Blockchaindata.find((item, index) => item.chainID == data).name
        console.log("sass", data);
        console.log("sass", temp);
        this.setState({ BlockChainname_: temp })
    };
    showproperty()
    {
       this.setState({proprttydiv:true})

    }; 
       savePropertiesList = () => {
        // console.log(addPropertiesList);
        // console.log("prooopertttieeeeess",addPropertiesList);
    
        const filter = this.state.addPropertiesList?.filter((item, index) => {
          return item?.name && item?.type;
        });
    
                this.state.addPropertiesList.push([...filter]);
        this.state.finalCreatedProperties.push([...filter]);
       
      };
      
     addMoreProperty = () => {
        this.state.addPropertiesList.push ( (prev) => {
       return [...prev, { name: "", type: "" }];
     } )
    }  
    maleCahngeHandler = (e, index) => {
        const itemToChange = this.state.addPropertiesList.find((item, i) => index === i);
        const ind = this.state.addPropertiesList.indexOf(itemToChange);
        this.state.addPropertiesList[ind].type = e.target.value;
        const data = [... this.state.addPropertiesList];
        console.log("itemToChange", data);
     this.state.addPropertiesList.push(data)
        // setAddPropertiesList(data);
      };
      
   characterCahngeHandler = (e, index) => {
    const itemToChange = this.state.addPropertiesList.find((item, i) => index === i);
    const ind = this.state.addPropertiesList.indexOf(itemToChange);
    this.state.addPropertiesList[ind].name = e.target.value;
    const data = [...this.state.addPropertiesList];
    console.log("itemToChange", data);
    this.state.addPropertiesList.push(data);
  };
 removeProperty = (index) => {

    if (this.state.addPropertiesList.length == 0) return;
    else {
      let filteredList = [...this.state.addPropertiesList.filter((item, i) => i != index)];
    //   this.state.addPropertiesList.push(data);
    }
  };
    

  hidemodal()
  {
      this.setState({proprttydiv:false})
  }
    render() 
    {
        const handleClose1 = () => this.setState({ ImageModal: false });
        const handleClose2 = () => {

            this.setState({ nftModel: false })
            return this.props.history.push("/ManageNFt");

        }

        return (
            <div className="container">
                <div className="row">
                    <div className='col-md-12'> <h1 className='f-Heading'>Create NFT</h1></div>
                    <div className="col-md-8 col-sm-12 col-lg-8">
                        <div className='row'>
                            <div className="col-md-12">

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
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button className='Modal-div-cancel-button' onClick={handleClose1} > OK </button>
                                    </Modal.Footer>
                                </Modal>
                            </div>

                            {/* create nft success model */}
                            {this.state.nftModel && (<>
                                <div className="col-md-12">

                                    <Modal
                                        centered
                                        size="lg"
                                        show={this.state.nftModel}
                                    >
                                        <Modal.Body>
                                            <div style={{ textAlign: "center" }} className="Modal-div">
                                                <div className='Modal-div-created'>
                                                    NFT Added successfully
                                                </div>


                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <button className='Modal-div-cancel-button' onClick={handleClose2} > OK </button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            </>)}

                            <div className="col-md-12">
                                <div className='input-fields'>
                                    <p>Name</p>

                                    <input
                                        type="text"
                                        required
                                        // placeholder="e.g 'Crypto Funk' "
                                        placeholder='Enter NFT Name'
                                        width={100}
                                        className="input-field"
                                        name='Name'
                                        value={this.state.Name}
                                        onChange={(data) => { this.setState({ Name: data.target.value }) }}
                                    />
                                    {!this.state.vname && (
                                      <div style={{ color: "#F61C04" }}>Name is not valid.</div>
                                 )}
                                </div>
                                <div className='input-fields'>
                                    <p>External Link</p>
                                    <input
                                        type="text"
                                        required
                                        placeholder="https://www.yoursite.com "
                                        width={100}
                                        className="input-field"
                                        name='ExternalLink'
                                        value={this.state.ExternalLink}
                                        onChange={(data) => { this.setState({ ExternalLink: data.target.value }) }}
                                    />
                                    {!this.state.vExternalLink && (
                                      <div style={{ color: "#F61C04" }}>Url is not valid.</div>
                                 )} 
                                     </div>
                                <div className='input-fields'>
                                    <p>Description</p>
                                    <input
                                        type="text"
                                        required
                                        placeholder="add limited Description' "
                                        width={100}
                                        className="description-field"
                                        name='Description'
                                        value={this.state.Description}
                                        onChange={(data) => { this.setState({ Description: data.target.value }) }}
                                    />
                                </div>
                                <div className='input-fields'>
                                    <p>Collection</p>
                                    <select className='dropDown' name='Category' onChange={(data) => { console.log("dmkdsmmsd", this.state.BlockChainname_); this.setState({ CategoryId: data.target.value }); }}>
                                        <option value="none" selected disabled hidden>Select Collection</option>
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
                                    <p>Properties</p>
                                    <span style={{color:"white" } }>
                                  Textual traits that show up as rectangles     
                                </span>  
                                <PlusSquare color='white' onClick={()=>this.showproperty()}/>
                                <Modal show={this.state.proprttydiv}  animation={true} centered>
            <Modal.Body className="modal-body-color">
              <Row style={{ paddingBottom: "5px" }}>
                <Col xs={1}></Col>
                <Col xs={5}>
                  <span
                    className="text-light text-dark"
                    style={{ fontWeight: "bold", color: "black" }}
                  >
                    Type
                  </span>
                </Col>
                <Col xs={5}>
                  <span
                    className="text-light text-dark"
                    style={{ fontWeight: "bold", color: "black" }}
                  >
                    Name
                  </span>
                </Col>
              </Row>
              <div
                style={{
                  maxHeight: "300px",
                  overflowY: "scroll",
                  overflowX: "hidden",
                }}
              >
                {this.state.addPropertiesList.map((item, index) => {
                  return (
                    <div
                      style={{
                        border: "1px solid #c7a7a7b9",
                        borderRadius: "4px",
                        // marginTop: "10px",
                      }}
                      key={index}
                    >
                      <Row style={{ height: "40px" }}>
                        <Col xs={1}>
                          <div
                            style={{
                              width: "25px",
                              height: "25px",
                              cursor: "pointer",
                              marginTop: "8px",
                            }}
                            onClick={() => {
                              this.removeProperty(index);
                            }}
                          >
                            <cross />
                          </div>
                        </Col>
                        <Col
                          xs={5}
                          style={{
                            borderRight: "1px solid #c7a7a7b9",
                            borderLeft: "1px solid #c7a7a7b9",
                            height: 40,
                          }}
                        >
                          <input
                            placeholder="Character"
                            type="text"
                            className="form-control"
                            value={item.name}
                            onChange={(e) => {
                                this.characterCahngeHandler(e, index);
                            }}
                            style={{
                              border: "none",
                              outline: "none",
                            }}
                          />
                        </Col>
                        <Col xs={5}>
                          <input
                            placeholder="Name"
                            onChange={(e) => {
                                this.maleCahngeHandler(e, index);
                            }}
                            className="form-control"
                            value={item.type}
                            type="text"
                            style={{
                              border: "none",
                              outline: "none",
                            }}
                          />
                        </Col>
                      </Row>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={()=>this.addMoreProperty()}
                style={{
                  padding: "10px",
                  border: "2px solid #308AFB",
                  color: "#308AFB",
                  fontWeight: "bold",
                  background: "transparent",
                  borderRadius: "6px",
                  marginTop: "12px",
                  cursor: "pointer",
                }}
              >
                Add more
              </button>
            </Modal.Body>
            <Modal.Footer className="modal-footer-color">
              <div style={{ textAlign: "center", width: "100%" }}>
                <button
                  style={{
                    background: "#308AFB",
                    color: "white",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "8px",
                  }}
                  onClick={()=>this.savePropertiesList()}
                >
                  Save
                </button>
              </div>
            </Modal.Footer>
               </Modal>

                                  {/* {
                                     this.state.nftpropertycount>0?
                                     (<> 
                                         {       
                                                <div className='rowjustift'>
                                                <p>TYPE</p>
                                                <input
                                                    type="number"
                                                    required
                                                    placeholder="enter Price for one item[BNB] "
                                                  
                                                    name='Price'
                                                    value={this.state.Price}
                                                    onChange={(data) => { this.setState({ Price: data.target.value }) }}
                                                />
                                                <p>Name</p>
                                                <input
                                                    type="number"
                                                    required
                                                    placeholder="enter Price for one item[BNB] "
                                              
                                                    name='Price'
                                                    value={this.state.Price}
                                                    onChange={(data) => { this.setState({ Price: data.target.value }) }}
                                                />
                                                 </div>
                                         }
                                         </>

                                     ):
                                     (
                                          <>
                                          No property added
                                          </>
                                     )
                                  }      */}
                                </div>
                                <div className='input-fields'>
                                    <p>Price</p>
                                    <input
                                        type="number"
                                        required
                                        placeholder="enter Price for one item[BNB] "
                                        width={100}
                                        className="input-field"
                                        name='Price'
                                        value={this.state.Price}
                                        onChange={(data) => { this.setState({ Price: data.target.value }) }}
                                    />
                                   {!this.state.vprice && (
                                      <div style={{ color: "#F61C04" }}>Price is not valid.</div>
                                 )}
                                     </div>
                                <div className='input-fields'>
                                    <p>Blockchain</p>
                                    <select className='dropDown' name='BlockChainName' onChange={(data) => { this.FindBlockchainName(data.target.value); this.setState({ ChainId: data.target.value }); }}>
                                        <option value="none" selected disabled hidden>Select Blockchain</option>
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
                                        <option value="none" selected disabled hidden>Select Payment token</option>
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
                                    <p>Contract Adress(optional)</p>
                                    <input
                                        type="text"
                                        required
                                        // placeholder="e.g 'Crypto Funk' "
                                        placeholder='Enter Contract Address'
                                        width={100}
                                        className="input-field"
                                        name='contract'
                                        value={this.state.ContractAddress}
                                        onChange={(data) => { this.setState({ ContractAddress: data.target.value }) }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-10 col-lg-4">
                        <div className="pt-2"></div>
                        <div className="pt-2"></div>
                        <div className='prevItem2'>
                            <p style={{ cursor: "pointer" }}>
                                Image Preview
                            </p>
                            <input type="file" onChange={this.uploadPicture} className='inputimage' />
                            <div className='prevItmImgSecs'>
                                <img
                                    src={this.state.imageset != "" ? this.state.ImagePreview : ' '}
                                    className=""
                                />
                            </div>
                            {!this.state.imageok && (
                                <div style={{ color: "#F61C04" }}>Please Select Image</div>
                            )}
                        </div>
                    </div>
                    <div className='col-lg-12 col-md-12 col-sm-12'>
                        <div style={{ display: "flex" }}>
                            <button className='create-list' onClick={() => { this.submit() }}>Create NFT</button>
                            <Link to="/ManageNFt"> <button className='create-list' onClick={() => { this.clearall() }}>Cancel</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateNt);