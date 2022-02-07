import React from "react";
import Dropzone from "react-dropzone";
import { BaseUrl, AuthenticationTokenId } from "../Constants/BusinessManager";
import { SendHttpRequest } from "./utility";
import QRCodes from "qrcode.react";
import swal from "sweetalert";
import { setIsLoaderActive } from "../actions/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ShareInvoice from "./ShareInvoice";
import {Search , ShoppingCart , MapPin , ChevronRight , ChevronLeft} from 'react-feather';

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
  };
};
const mapStateToProps = (state) => {
  return {
    Wallets: state.Wallets,
    Defaults: state.Defaults,
  };
};

class MarketPlace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      base64: "",
      AmountToSend: "",
      InvoiceDescription: "",
      MerchantKey: "",
      QrPrinted: false,
    };
  }
  render() {
    return (
      <div>
          <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-7" >
              <form action="/action_page.php" style={{display:"flex"}}>
                  <select className="searchCategory" style={{padding:5}}>
                      <option>ALL</option>
                      <option>111</option>
                      <option>111</option>
                      <option>111</option>
                      <option>111</option>

                  </select>
      <input type="text" placeholder="Search" name="search" style={{width:"100%"}} className="searchInput" />
      <div className="form-control-position">
                          <span ><Search size={25} style={{ color: "#fff", marginRight:20 }} /></span>
                        </div>
    </form>
              </div>
              <div className="col-md-1"><h6>Returns <br/>& Orders</h6></div>
              <div className="col-md-1">
                {/* <ShoppingCart size={35} style={{color:"#fff"}}/> */}
                <i class="fa fa-shopping-cart" aria-hidden="true" style={{fontSize:50 , color:"#fff"}}></i>
                <span class='badge badge-warning' id='lblCartCount'>0 </span>
                </div>
              <div className="col-md-1"></div>
          </div>
      
   
          <div className="card">
          <div className="row" style={{padding:"10px"}}>
            <div className="col-md-2" style={{display:"Flex" , color:"#fff" , justifyContent:"center"}} ><MapPin size={38}/><p style={{fontSize:13 , marginBottom:0 , padding:"0px 5px"}}>Delivery to <br/><strong>Pakistan</strong></p></div>
            <div className="col-md-1"><p style={{marginBottom:0 , fontSize:14, marginTop:7}}>Today's Deals</p></div>
            <div className="col-md-2" style={{textAlign:"center"}}><p style={{marginBottom:0 ,fontSize:14 , marginTop:7}}>Customer Service</p></div>
            <div className="col-md-1"><p style={{marginBottom:0,fontSize:14 , marginTop:7}}>Gift Cards</p></div>
            <div className="col-md-1"><p style={{marginBottom:0,fontSize:14 , marginTop:7}}>Registry</p></div>
            <div className="col-md-1"><p style={{marginBottom:0,fontSize:14 , marginTop:7}}>Sell</p></div>
            <div className="col-md-1"></div>
            <div className="col-md-3"><h6 style={{fontSize:14 , color:"#fff" , marginTop:13}}>Quant response to Covid-19</h6></div>
          </div>
      </div>
      <div className="card">

      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img className="d-block w-100" src={require("../Assets/images/Untitled-1.png")} alt="First slide" />
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src={require("../Assets/images/Untitled-3.png")} alt="Second slide" />
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span className="arrowLeft" aria-hidden="true"><ChevronLeft size={40} /></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span className="arrowRight" aria-hidden="true"><ChevronRight size={40} /></span>
    <span className="sr-only">Next</span>
  </a>
</div>


      </div>
      <div className="card">
        <div className="row categoriesRow">
          <div className="col-sm-12 col-md-12 col-lg-3 column3" style={{backgroundColor: "#00000033"}}>
            <h6 style={{color:"#fff", fontSize:20 , padding:15}}>Shop by Catogory</h6>
            <div className="row">
            <div className="col-6 col-2 categoryCard">
            <img className="categoryImage" src={require("../Assets/images/Laptop.png")} alt="First slide" />
            Computer and Accessories
            </div>
            <div className="col-6 col-2 categoryCard">
            <img className="categoryImage" src={require("../Assets/images/Videogames.png")} alt="First slide" />
            Video Games
            </div>
            </div>
            
            <div className="row mt-1">
            <div className="col-6 col-2 categoryCard">
            <img className="categoryImage" src={require("../Assets/images/Baby.png")} alt="First slide" />
            Baby
            </div>
            <div className="col-6 col-2 categoryCard">
            <img className="categoryImage" src={require("../Assets/images/Toys.png")} alt="First slide" />
            Toys & games
            </div>
            </div>
<div style={{textAlign:"left"}}> 
<button style={{background:"none" , border:"none" , color:"#fff"}}>Show more</button>
</div>
            
          </div>
          <div className="col-sm-12 col-md-12 col-lg-3 column3" >
            <h6 style={{color:"black", fontSize:20 , padding:15}}>Quant Basics</h6>
            <div className="row">
            <img className=""  alt="First slide" style={{margin:"auto" , width:"96%"}}/>

            </div>
            <div style={{textAlign:"left"}}> 
<button style={{background:"none" , border:"none" , color:"cornflowerblue"}}>Show more</button>
</div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-3 column3" >
            <h6 style={{color:"black", fontSize:20 , padding:15}}>Electronics</h6>
            <div className="row">
            <img className="" src={require("../Assets/images/Tools.png")} alt="First slide" style={{margin:"auto" , width:"96%"}}/>

            </div>
            <div style={{textAlign:"left"}}> 
<button style={{background:"none" , border:"none" , color:"cornflowerblue"}}>Show more</button>
</div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-3 column3">
            <h6 style={{color:"black", fontSize:20 , padding:15}}>Sign in for the best experience</h6>
            <button className="signInSecurely mt-2">Sign in securely</button>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MarketPlace);
