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
import { Search, ShoppingCart, MapPin, ChevronRight, ChevronLeft } from 'react-feather';

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

class subCategory extends React.Component {
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
            <form action="/action_page.php" style={{ display: "flex" }}>
              <select className="searchCategory" style={{ padding: 5 }}>
                <option>ALL</option>
                <option>111</option>
                <option>111</option>
                <option>111</option>
                <option>111</option>
              </select>
              <input type="text" placeholder="Search" name="search" style={{ width: "100%" }} className="searchInput" />
              <div className="form-control-position">
                <span ><Search size={25} style={{ color: "#fff", marginRight: 20 }} /></span>
              </div>
            </form>
          </div>
          <div className="col-md-1"><h6>Returns <br />& Orders</h6></div>
          <div className="col-md-1">
            <i className="fa fa-shopping-cart" aria-hidden="true" style={{ fontSize: 50, color: "#fff" }}></i>
            <span className='badge badge-warning' id='lblCartCount'>0 </span>
          </div>
          <div className="col-md-1"></div>
        </div>


        <div className="card">
          <div className="row" style={{ padding: "10px" }}>
            <div className="col-md-2" style={{ display: "Flex", color: "#fff", justifyContent: "center" }} ><MapPin size={38} /><p style={{ fontSize: 13, marginBottom: 0, padding: "0px 5px" }}>Delivery to <br /><strong>Pakistan</strong></p></div>
            <div className="col-md-1"><p style={{ marginBottom: 0, fontSize: 14, marginTop: 7 }}>Today's Deals</p></div>
            <div className="col-md-2" style={{ textAlign: "center" }}><p style={{ marginBottom: 0, fontSize: 14, marginTop: 7 }}>Customer Service</p></div>
            <div className="col-md-1"><p style={{ marginBottom: 0, fontSize: 14, marginTop: 7 }}>Gift Cards</p></div>
            <div className="col-md-1"><p style={{ marginBottom: 0, fontSize: 14, marginTop: 7 }}>Registry</p></div>
            <div className="col-md-1"><p style={{ marginBottom: 0, fontSize: 14, marginTop: 7 }}>Sell</p></div>
            <div className="col-md-1"></div>
            <div className="col-md-3"><h6 style={{ fontSize: 14, color: "#fff", marginTop: 13 }}>Quant Wallet response to Covid-19</h6></div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="card" style={{ margin: "0px 2px" }}>
              <img className="productImage" src={require("../Assets/images/rBVaR1uqB8OAfT61AACFtZqb-TM704.jpg")}/>
            <ul className="smallProductRow">
              <li><img className="smallProductImage" src={require("../Assets/images/rBVaR1uqB8OAfT61AACFtZqb-TM704.jpg")} /></li>
              <li><img className="smallProductImage" src={require("../Assets/images/rBVaR1uqB8OAfT61AACFtZqb-TM704.jpg")} /></li>
              <li><img className="smallProductImage" src={require("../Assets/images/rBVaR1uqB8OAfT61AACFtZqb-TM704.jpg")} /></li>
              <li><img className="smallProductImage" src={require("../Assets/images/rBVaR1uqB8OAfT61AACFtZqb-TM704.jpg")} /></li>
              <li><img className="smallProductImage" src={require("../Assets/images/rBVaR1uqB8OAfT61AACFtZqb-TM704.jpg")} /></li>

            </ul>
            </div>

          </div>
          <div className="col-md-6"  >
            <div className="card" style={{ margin: "0px 2px" }, { padding: "10px 20px" }}>
              <h5>
                AmazonBasics Lightning to USB A Cable for iPhone and iPad - 6 Feet (1.8 Meters) - 2 Pack - White
          </h5>
              <span style={{ color: "#019cfe" }}>Brand:AmazonBasics</span>
              <div><span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <i className="fa fa-chevron-down" aria-hidden="true" style={{ color: "white", fontSize: "smaller" }}></i>

                <span style={{ color: "#019cfe", marginLeft: 30 }}>37,097 ratings |</span>
                <span style={{ color: "#019cfe" }}> 358 answered questions</span>
              </div>
              <div style={{ display: "flex" }}>
                <p className="choice">Amazon's Choice</p>
                <p style={{ fontSize: 13, margin: "auto 0" }}>for "<span style={{ color: "#019cfe" }}> hdmi lightening cable adapter </span> "iphone</p>
              </div>
              <hr />
              <div style={{ display: "flex" }}>
                <h6 style={{ width: 60, margin: "auto 0px" }}>Price:  </h6><p style={{ fontSize: 15, marginBottom: 0 }}><span style={{ color: "rgb(250, 191, 1)" }}>$17.99</span> + $75.55 Shipping & Import Fees Deposit to Pakistan Details</p>

              </div>

              <p style={{ fontSize: 15 }}>Available at a lower price from other sellers that may not offer free prime shipping</p>
              <div style={{ display: "flex" }}>
                <h6 style={{ width: 60, margin: "auto 0px" }}>Color:  </h6><p style={{ fontSize: 15, marginBottom: 0 }}>White</p>
                
              </div>
              <ul className="colorRow">
              <li><img className="colorImage" src={require("../Assets/images/rBVaR1uqB8OAfT61AACFtZqb-TM704.jpg")} /></li>
              <li><img className="colorImage" src={require("../Assets/images/rBVaR1uqB8OAfT61AACFtZqb-TM704.jpg")} /></li>
              <li><img className="colorImage" src={require("../Assets/images/rBVaR1uqB8OAfT61AACFtZqb-TM704.jpg")} /></li>
              <li><img className="colorImage" src={require("../Assets/images/rBVaR1uqB8OAfT61AACFtZqb-TM704.jpg")} /></li>
              <li><img className="colorImage" src={require("../Assets/images/rBVaR1uqB8OAfT61AACFtZqb-TM704.jpg")} /></li>

            </ul>
              <div style={{ display: "flex" }}>
                <h6 style={{ width: 60, margin: "auto 0px" }}>Size:  </h6><p style={{ fontSize: 15, marginBottom: 0 }}>1 - Pack</p>
              </div>
              <ul className="sizeRow">
              <li>
                </li>
              <li>
                </li>
              <li>
                </li>
              <li>
                </li>
              <li>
                </li>

            </ul>
              <div style={{ display: "flex" }}>
                <h6 style={{ width: 60, margin: "auto 0px" }}>Style:  </h6><p style={{ fontSize: 15, marginBottom: 0 }}>6 - Foot</p>
              </div>
              <ul className="styleRow">
              <li>
                3-Foot
                </li>
              <li>
                4-Foot
                </li>
              <li>
                6-Foot
                </li>
              <li>
                10-Foot
                </li>
             

            </ul>
              <div style={{ display: "flex" }}>
                <h6 style={{ width: 100, margin: "auto 0px" }}>Pattern Name:  </h6><p style={{ fontSize: 15, marginBottom: 0 }}>Cable</p>
              </div>

              <ul className="categoryList">
                <li>
                  Apple MFi certified charging and syncing cable for your Apple devices
              </li>
                <li>Apple MFi certification ensures complete charge and sync compatibility with iPhone XS / XS Max / XR / X / 8 Plus / 8 / 7 Plus / 7 / 6s Plus / 6s / 6 Plus / 6 / 5s / 5c / 5 / iPad Pro / iPad Air / Air 2 / iPad mini / mini 2 / mini 4 / iPad 4th gen / iPod Touch 5th gen / iPod nano 7th gen and Beats Pill+
</li>
              </ul>
            </div>
          </div>
          <div className="col-md-3" >
            <div className="card" >
<div style={{ margin: "0px 2px" ,padding: "10px 20px" }}>
              <label className="buyNowContainer">Buy Now:
  <input type="radio" checked="checked" name="radio" />
                <span className="checkmark"></span>

                <span style={{ color: "rgb(250, 191, 1)", float: "right" }}>$9.85</span>

              </label>

              <p style={{ fontSize: 13 }}>+ $69.92 Shipping & Import Fees Deposit to Pakistan <span style={{ color: "#019cfe" }}> Details</span></p>

              <h6>Arrives: July 29 - Aug 12</h6>
              <h5 style={{ color: "rgb(250, 191, 1)" }}>In Stock on July 30 , 2020.</h5>
              <h5>Order it now.</h5>
              <select name="cars" className="quantitySelect">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
              </select>
<br/>
              <button className="cartButton"><i className="fa fa-shopping-cart" aria-hidden="true" style={{ float: "left", fontSize: " xx-large" }}></i>
                <span>Add to Cart</span></button>
              <button className="cartButton"><i className="fa fa-play" aria-hidden="true" style={{ float: "left", fontSize: " xx-large" }}></i>
                <span>Buy Now</span></button>
              <p className="secureTransaction"><i className="fa fa-lock" aria-hidden="true" style={{ marginRight: 10 }}></i>
Secure Transaction</p>
              <h6>Ships from and sold by Amazon.com</h6>
              <label className="giftContainer">Add gift options
  <input type="checkbox" />
                <span className="checkmark2"></span>
              </label>
              <hr />
              <p className="deliverToPakistan"><i className="fa fa-map-marker" aria-hidden="true" style={{ marginRight: 10 }}></i>
Deliver to Pakistan</p>
</div>
<p className="buyUsed">Buy Used
<span style={{ float: "right" }}>$9.85</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(subCategory);
