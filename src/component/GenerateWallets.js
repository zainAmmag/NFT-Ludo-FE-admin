import React from "react";
import EthereumLogo from "../Assets/images/eth_logo.png"
import { Link } from "react-router-dom";
const GenerateWallets=() => { 
    return(
        <div className="container-fluid body-content" style={{marginTop:'7%'},{paddingLeft:'0 5%'},{paddingLeft:'19%'}} id="overviewContainer">
    <div className="card">
        <Link className="row walletTab" to="/SendReceive">
            <div className="col-md-1"><img src={EthereumLogo} alt="hello"/></div>
            <div className="col-md-5 currencyName"><h3>Ethereum</h3></div>
            <div className="col-md-5 amount"><h3>0.000000000ETH</h3></div>
            <div className="col-md-1 rightIcon"><i className="fa fa-chevron-right"></i></div>
        </Link>
    </div>
</div>
    )
}
export default GenerateWallets;