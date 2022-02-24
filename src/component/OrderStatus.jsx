import React, { useEffect, useState, useReducer } from "react";
import { FaUserCircle } from "react-icons/fa";
import ordericon1 from "../Assets/images/order-icon-1.png";
import ordericon2 from "../Assets/images/order-icon-2.png";
import ordericon3 from "../Assets/images/order-icon-3.png";
import ordericon4 from "../Assets/images/order-icon-4.png";

import {
    Modal,
  
  } from "react-bootstrap";
  
import { useDispatch, useSelector } from "react-redux";
import { SendHttpRequest } from "./utility";

import {
    BaseUrl,
    AuthenticationTokenId,
    ImageBaseUrl,
    DefaultCurrencyTokenId,
} from "../Constants/BusinessManager";
import axios from "axios";
import { useLocation } from "react-router-dom";




const OrderStatus = function () {
    const [ProfileData, setprofiledata] = useState(false);
    const [status, setStatus] = useState(1)

    const orderStatus = { 1: "Order Processed", 2: "Order Shipped", 3: "Order On Route", 4: "Order Delivered", }
    const [ImageModal,SetImageModal] =useState(false);
    const [Tokenorder,SetTokenorder] =useState("");
       const [errormessage,seterrormessage]=useState("");
       const [errormessage1,seterrormessage1]=useState("");
    const location = useLocation()
    const { value } = location.state


    useEffect(() => {
        switch (value.orderStatus) {
            case "OrderPending":
                setStatus(1);
                break;
            case "OrderShipped":
                setStatus(2);
                break;
            case "OrderOnRoute":
                setStatus(3);
                break;
            case "OrderDelivered":
                setStatus(4);
                break;
        }

    }, [])





    const changeStatus = (statusNum) => {
               
        if(statusNum===2) 
       {  
        SetImageModal(true)
       }
       if(statusNum>status+1)
        {  
       return
       }
         else{ 
        var t = localStorage.getItem(AuthenticationTokenId);
        const data = {
            OrderId: value.nftOrderId,
            AccountId: value.ownerAccountId,
            NftId: value.nftId,
            Status: statusNum
                     }
  
        axios.put(
            BaseUrl + "/Amin/UpdateNftOrderStatus", data, {
            headers: {
                "authorization": "Barear " + t
            }
        }
        ).then((resp) => {
            setStatus(statusNum)
            console.log("this is response")
            console.log(resp)

        }).catch((error) => {
            console.log("this is error")
            console.log(error)

        })
    }

    }
    const cancel=()=>
   {
    SetImageModal(false)
    seterrormessage("")
   }
    const SubmitToken = () => {
       

            console.log("SubmitToken calld")
        if(Tokenorder=="")
        {          
                   seterrormessage("Fill The Field")
                   return;
        }
        SetImageModal(false)
        seterrormessage("")
            var t = localStorage.getItem(AuthenticationTokenId);
        const data = {
            OrderId: value.nftOrderId,
            AccountId: value.ownerAccountId,
            NftId: value.nftId,
            trackingURL:Tokenorder,
            Status: 2
                     }
  
        axios.put(
            BaseUrl + "/Amin/UpdateNftOrderStatus", data, {
            headers: {
                "authorization": "Barear " + t
            }
        }
        ).then((resp) => {
            setStatus(2)
            console.log("this is response")
            console.log(resp)

        }).catch((error) => {
            console.log("this is error")
            console.log(error)

        })
    }

    const OrderStatusItem = ({ statusNum, imgSrc }) => {
        return (
            <div
                className="col-3">
                <div className="row" style={{ display: "flex", alignItems: "center" }}>

                    <div className="col-6" style={{ display: "flex", alignItems: "center" }}>
                        <div>

                            <div className="text-center">
                                <div>
                                    <i className="fa fa-check" style={{
                                        backgroundColor: status >= statusNum ? "blue" : "#a9a6ad",
                                        borderRadius: "50%", padding: "6px", marginBottom: "10px", color: "white"
                                    }} />
                                </div>
                                <img src={imgSrc}
                                    // style={{height:"0px",width:"0px"}}
                                    onClick={() => {
                                        changeStatus(statusNum)

                                    }} style={{ cursor: "pointer" }} />
                            </div>

                        </div>
                        <div className="mt-4 ml-2">
                            <b>
                                {
                                    orderStatus[statusNum]
                                }
                            </b>

                        </div>
                    </div>
                    {
                        statusNum !== 4 ?
                            <div
                                className="col-6 mt-4 pl-2"
                                style={{
                                    height: "8px", backgroundColor: status > statusNum ? "blue" : "#a9a6ad",
                                    borderRadius: "6px"
                                }} /> : null
                    }

                </div>
            </div>
        )
    }


    return (
        <>
            <div className="container pb-16" >

                <div className="col-lg-12 col-sm-12 col-md-12 text-center">
               
                    <h4>{value.name}</h4>
                    <h4>{value.email}</h4>
                </div>

                <div>
                    <p>Order #{value.nftOrderId}</p>
                </div>
                <Modal
               centered
              size="sm"
              show={ImageModal}
              style={{left:'155px'}}
            >
              <Modal.Body>
                <div style={{ textAlign: "center" }} className="">
                     {errormessage1==""?<>
                  <p> Enter Tracking ID</p>
                  <input
                    type="text"
                    required
                    placeholder="Enter Tracking ID"
                    width={50}
                    className="input-field"
                    name='Price'
                    value={Tokenorder}
                    onChange={(data) => { SetTokenorder(data.target.value) }}
                  /></>:<>
                     {errormessage1}
                       </> }
                   <p style={{textAlign:"centered",color:"red"}}>{errormessage==""?'':errormessage}</p>
                </div>
                <Modal.Footer>
                
                <button className='Modal-div-cancel-button' onClick={()=>{SubmitToken()}} > OK </button>
                <button className='Modal-div-cancel-button' onClick={()=>{cancel()}} > cancel </button>
       
              </Modal.Footer>
              </Modal.Body>
         
            </Modal>
                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    backgroundColor: "#6d7fcc", padding: "20px", borderRadius: 10
                }}
                    className="row">
                    <OrderStatusItem statusNum={1} imgSrc={ordericon1} />
                    <OrderStatusItem statusNum={2} imgSrc={ordericon2}    /> 
                    <OrderStatusItem statusNum={3} imgSrc={ordericon3} />
                    <OrderStatusItem statusNum={4} imgSrc={ordericon4} />

                </div>

            </div>


        
        </>
    )
}

export default OrderStatus;


