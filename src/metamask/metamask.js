import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

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
            .then(async () => {
                const chainId = window.ethereum.chainId;
                const accounts = await window.web3.eth.getAccounts();
                const balance = await window.web3.eth.getBalance(accounts[0])
                resolve({chainId,accounts,balance})
            })
            .catch((error) => {
                console.log("this is metamask error",error)
                reject(error)
            })

        })

    }
    
};
