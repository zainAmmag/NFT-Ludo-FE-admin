import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import swal from "sweetalert";
import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import SharedLayout from "../component/shared/SharedLayout";
export const connectMetaMaskaction = async () => {
    
    if (window.ethereum) {
        const provider = await detectEthereumProvider();
        if (provider !== window.ethereum) {
            window.web3 = new Web3(provider);
        } else {
            window.web3 = new Web3(window.ethereum);
        }

        return new Promise((resolve,reject)=>{
            window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then(async () => 
            {
                console.log("metamsk",window.ethereum.selectedAddress)
                const chainId = window.ethereum.chainId;
                localStorage.setItem("chainidofconnectedmetamask",chainId);
                console.log("blockchain",chainId)
                const accounts = await window.web3.eth.getAccounts();
                const balance = await window.web3.eth.getBalance(accounts[0])
                localStorage.setItem("balanceofmetamass",balance)
                localStorage.setItem("adminwalletaddresstobesame",window.ethereum.selectedAddress)
                localStorage.setItem("metamaskconnected",true)       
                resolve({chainId,accounts,balance})
          
            })
            .catch((error) => {
                localStorage.setItem("metamaskconnected",false)
                console.log("this is metamask error",error)
                reject(error)
            })
        })

    }
    
};
