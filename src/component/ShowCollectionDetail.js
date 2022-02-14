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
      collectiondata:[],
      NFtData:[],
      categoryname: "",
      IsTickerHovered: false,
      categoryNumber: 0 ,
      BaseCurrency: 0,
      RenderFinished: false,
      NftcollectionId:0,
      FN: "No data available",
      BO: null,
    };
  }
  async GetcollectionbyId(collectionId)
  {
      console.log("collectiondata",localStorage.getItem("CollectionDetail"))
    try {
      const data = await SendHttpRequest(
        BaseUrl1 + "/GetNftCollectionById?CollectionId="+localStorage.getItem("CollectionDetail"),
        {},
        "GET"
      );
      if (data.isSuccess) 
      {  
        console.log("Collection data"+ data.message);
         console.log(data.data);
         this.setState({collectiondata:data.data })
         console.log("Collection data1",this.state.collectiondata);
         console.log("Collection data2",this.state.collectiondata);
         
         
         console.log("naeandianuioand",localStorage.getItem("profileImage"))
     
      } else 
      {
        console.log("data"+ data.message)
      }
    } catch (error) 
    {
      return;
    }
}   
async GetNFTbycollectionId(collectionId)
{
    console.log("danananak112",this.state.NftcollectionId);
    this.props.setIsLoaderActive(true);
    try {

        const data = await SendHttpRequest(
          BaseUrl + "/Amin/GetAllNftsByCollectionId?collectionId="+localStorage.getItem("CollectionDetail")+"&PageSize=0&CurrentPage=0",
          {},
          "GET"
        );
        if (data.isSuccess) 
        {  
            this.props.setIsLoaderActive(false);
          console.log("NFT data"+ data.message);
           console.log(...data.data);
           this.setState({NFtData: data.data })
        }  else {
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
  this.GetcollectionbyId();
  this.GetNFTbycollectionId();
}
  render() {
    var arr=[] ;
    for (var i = 0; i < this.state.categoryNumber; i++) 
    {
        arr.push(this.state.moviesData[this.state.categoryNumber1].Name);
    }
    return (
      <div className="container-fluid body-content" id="">
        <div className="collectiondetail">
       
        
             {   
                  <div style={{
                    width: "100%",
                    height:'200px'
                  }}>
                <img
                   src={ "http://198.187.28.244:7577/"+this.state.collectiondata.bannerImage}
                  alt="profileImage"   
                  style={{
                    width: "100%",
                    height:'100%' }}/>
                <img
                src={"http://198.187.28.244:7577/"+this.state.collectiondata.logoImage}
                alt="profileImage"
                className="logostyle"/>
                  <div style={{width:"80%",textAlign:"center",paddingLeft:'20%' }}>
                      <h3>{this.state.collectiondata.name} </h3>
                        <p>
                            {this.state.collectiondata.description}
                        </p>
                        
                        <Link to="/EditCollection">
                                 
                        <button className="Collection-nft-create"> Edit Collection   </button>
                        
                        </Link>

                      <div className="pt-2"></div>
                        <Link to="/createNFT">
                        <button className="Collection-nft-create">Create NFT   </button>
                        </Link>
                        </div>
          </div>    

              }
            
        </div>
        <div className="pt-5"></div>
        <h1>NFT's:</h1>
        <div id="container">
          <div className="row">
            {this.state.NFtData.length > 0 ? (
              <>         
                {    
                this.state.NFtData.map((playerData, k) => (
                  <>
                    <Col key={k} style={{ paddingTop: "15px" }} md={2} lg={4} >
                      <div
                        className="card2NFT">
                        <div >
                          <div className="panal">
                                <img
                                  src={"http://198.187.28.244:7577/"+playerData.image }
                                  alt="profileImage"
                                  className="NFT-immage-NFT"
                                 />

                             <div className="">
                                      <img
                                       src={"http://198.187.28.244:7577/"+playerData.logoImage}
                                       alt="profileImage"
                                      className="NFT-immage3"
                                      />
                               </div>
                               <h5 className="nft-heading">  price</h5>  
                               <p className="note"> Price { playerData.buyPrice+" "}NB </p>   
                               <l> 

                                 <Link to="/nftdetail">                                
                                 <a
                                     onClick={() =>{
                                      localStorage.setItem("NFTID",playerData.id)
                                      localStorage.setItem("NftaccountId",playerData.accountId)
                                      
                                      }}
                                    className="view-all-btn"
                                  >
                                    Detail 
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
              <div className="card" style={{ alignItems: "center", alignContent: "center",width:"100%" }}>
                <p
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

export default 
connect(mapStateToProps, mapDispatchToProps)(CollectionDetail);
