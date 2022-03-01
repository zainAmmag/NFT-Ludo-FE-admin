import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import swal from "sweetalert";

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
                localStorage.setItem("chainidofconnectedmetamask",chainId);
                console.log("blockchain",chainId)
                const accounts = await window.web3.eth.getAccounts();
                const balance = await window.web3.eth.getBalance(accounts[0])
                resolve({chainId,accounts,balance})
                if(chainId!="0x61")
                {
                    swal({
                        icon: "error",
                        text: "Selected Metamask is not supported",
                      });
                }
            })
            .catch((error) => {
                console.log("this is metamask error",error)
                reject(error)
            })

        })

    }
    
};
