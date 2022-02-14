import React from "react";
import { Link } from "react-router-dom";
import { SocialIcon } from 'react-social-icons';

import { Col } from "react-bootstrap";
import profilePic from "../Assets/images/profilePic.png";
import { Carousel } from 'react-responsive-carousel';
import "../Assets/css/custom.css";
import Email from "@material-ui/icons/Email"
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWalletSharp'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { SendHttpRequest } from "../component/utility";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { connect } from "react-redux";
import swal from "sweetalert";

import { setIsLoaderActive } from "../actions/index";

import { bindActionCreators } from "redux";

import {
  BaseUrl,
} from "../Constants/BusinessManager";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
  };
};
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CurrentCurrency: "",
      ComponentChart: null,
      tableData: [],
      collectiondata: [],
      NFtData:[],
      categoryname: "",
      IsTickerHovered: false,
      categoryNumber: 0 ,
      BaseCurrency: 0,
      RenderFinished: false,
      FN: "No data available",
      BO: null,
    };
  }
  async componentDidMount() {
    this.props.setIsLoaderActive(true);
    try {
      const data = await SendHttpRequest(
        BaseUrl + "/Nft/GetMyAllCollections?PageSize=0&CurrentPage=0",
        {},
        "GET"
      );
      if (data.isSuccess) 
      {  
        console.log("data"+ data.message);
        this.props.setIsLoaderActive(false);
         console.log(...data.data);
         this.setState({collectiondata: data.data })
         console.log("naeandianuioand",localStorage.getItem("profileImage"))
     
      }else {
        throw new Error("Something went wrong, try to relogin");
      }
    } 
    catch (error) {
      console.log(error);
      this.props.setIsLoaderActive(false);
      return swal({
        icon: "error",
        text: "Something went wrong, try to relogin",
      });
    }
  
}
  render() {
    var arr=[] ;
    for (var i = 0; i < this.state.categoryNumber; i++) 
    {
        arr.push(this.state.moviesData[this.state.categoryNumber1].Name);
    }
   
    return (
      <div className="container-fluid body-content" id="">
     

        <h1>Collections :</h1>
        <div id="container">
           <div className="row">  <Link to="/CreateCollection" className="Link"  >  <button className="collection-button" >Create Collection</button>  </Link>  </div>     
          <div className="row">
          
            {this.state.collectiondata.length > 0 ? (
              <>         
                {    
                  this.state.collectiondata.map((playerData, k) => {
                      return(
                      <>
                    <Col key={k} style={{ paddingTop: "15px" }} md={2} lg={4} >
                      <div
                        className="">
                        <div >
                          <div className="panal1 card2 ">
                       
                                <img
                                  src={ "http://198.187.28.244:7577/"+ playerData.logoImage  }
                                  alt="profileImage"
                                  className="NFT-immage"
                                 />
                                <Link to="/ShowCollectionDetail">  
                                  <button
                                    style={{ background: 'transparent',border:0}}
                                    onClick={() => {  localStorage.setItem("CollectionDetail",playerData.id) }} 
                                    className="NFT-banner-immage">
                                 <img
                                  src={"http://198.187.28.244:7577/"+ playerData.bannerImage}
                                  alt="profileImage"
                               style={{width:'100%',height:'100%'}}
                                 />
                                 </button>
                                 </Link> 
                                 <h5 style={{color:"black",paddingTop:"6%"}}>{playerData.name} 
                                 {playerData.id}</h5>
                          </div>
                        </div>
                      </div>{" "}
                    </Col>
                  </>
                   ) })}
              </>
            ) : (
              <div style={{ alignItems: "center", alignContent: "center" }}>
                <p
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 20,
                  }}
                >
                  No Collection 
                </p>
              </div>
            )}
            
          </div>
        </div>
      </div>
    );
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(UserDetail);
