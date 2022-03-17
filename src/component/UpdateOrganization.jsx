import React, { Component, useEffect, useState } from "react";
import Swal from 'sweetalert2'
import {
  BaseUrl,
} from "../Constants/BusinessManager";
import { SendHttpRequest } from "../component/utility";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setIsLoaderActive } from "../actions/index";

import { useHistory } from "react-router-dom";
import SharedLayout from "./shared/SharedLayout";
export default function UpdateOrganization() {
  useEffect(()=>{
    GetOrganoizationData()
  },[])
  const dispatch = useDispatch();
  const [Name, setName] = useState("")
  const [Image, setImage] = useState("")
  const [ImagePreview, setImagePreview] = useState({})
  const [Imageset, setImageset] = useState(false)
  const [ImageModal, setImageModal] = useState(false)
  const [Email,setEmail]=useState("");
  const [Address,setAddress]=useState("");
  const [uploaded,setuploaded]=useState(true)
  const History=useHistory();
  const [WalletAddress,setWalletAddress]=useState("");
  const [Amount1,setAmount1]=useState(null)
  const [YourSiteLink,setYourSiteLink]=useState("")
  const [block,setblock]=useState(false)
  const [Namevalidation,setNamevalidation]=useState(true)
  const [Emailvalidation,setEmailvalidation]=useState(true)
  const [WalletAddressvalidation,setWalletAddressvalidation]=useState(true)
  const [Amountvalidation,setAmountvalidation]=useState(true)
  const [YourSiteLinkvalidation,setYourSiteLinkvalidation]=useState(true)
  const [Imagevalidation,setImagevalidation]=useState(true)
  const GetOrganoizationData = async () => {

    dispatch(setIsLoaderActive(true));
    try {
        const data = await SendHttpRequest(
            BaseUrl + "/Organization/GetOrganizationById?OrganizationId=" + localStorage.getItem("OrganizationId"),
            {},
            "GET"
        );
        if (data.isSuccess) 
        { 
          setImage(data.data.logoImage)
          if(data.data.logoImage)
                      setImageset(true)
          setName(data.data.name)
          setAddress(data.data.address)
          setEmail(data.data.email)
          setYourSiteLink(data.data.yourSiteLink) 
          setAmount1(data.data.amountInPercent.toString())
          setWalletAddress(data.data.walletAddress)
          setblock(data.data.isBlock)
          
    dispatch(setIsLoaderActive(false));
          
        } 
        else {
          dispatch(setIsLoaderActive(false));
         }
    } catch (error) {
      dispatch(setIsLoaderActive(false));
        return;
    }
}
function checkvalidationss()
{
  let count=0;
  const name = /^[a-zA-Z0-9_ ]*$/;
  var email = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  var wallet = /^0x[a-fA-F0-9]{40}$/g;
  var Pricea =/^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/;
  if(Imageset==false){setImagevalidation(false); count++}
 if(Name?.match(name)&&Name.length>0){setNamevalidation(true);}
 else {  setNamevalidation(false);count++}
 if(Email?.match(email)&&Email.length>0) setEmailvalidation(true)
 else {setEmailvalidation(false);count++}
 if(WalletAddress?.match(wallet)) setWalletAddressvalidation(true)
 else {setWalletAddressvalidation(false); count++ }
 if(Amount1.match(Pricea)&& Amount1>=0&&Amount1<=100 ) setAmountvalidation(true)
 else{ setAmountvalidation(false);count++ }
  if(urlPatternValidation(YourSiteLink)) setYourSiteLinkvalidation(true)
 else {setYourSiteLinkvalidation (false); count++ }
 return count;
}
const urlPatternValidation = URL => {

  if(URL=="") return true
  
  if(URL==null) return true
  const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
   
  return regex.test(URL);
};

  function CreateBlog()
  { if(checkvalidationss()>0) return 
       var bodyFormData = new FormData();
    bodyFormData.append("Name", Name);
    bodyFormData.append("Address",Address);
    bodyFormData.append("IsBlock",block);
    bodyFormData.append("Email",Email);
    bodyFormData.append("WalletAddress", WalletAddress);
    bodyFormData.append("AmountInPercent", Amount1);
    bodyFormData.append("LogoImage", Image);
    bodyFormData.append("YourSiteLink",YourSiteLink);
    dispatch(setIsLoaderActive(true));
    axios({
      method: "PUt",
      url: "https://api.fineoriginal.com/api/v1/Organization/UpdateOrganization?OrganizationId="+localStorage.getItem("OrganizationId"),

      data: bodyFormData,
      headers: {
          accept: "text/plain",
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("TokenofAdminsigneD"),
      }
  }).then((response) => {
    dispatch(setIsLoaderActive(false));
    if(response.data.message=="Data successfully updated")
    {
        Swal.fire({
        position: 'center',
        icon: 'success',
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500
   })
   History.push("/ManageOrganization")
   }
      else
        Swal.fire({
        position: 'center',
        icon: 'error',
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500
        })
        }).catch((e) => {
            dispatch(setIsLoaderActive(false));
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "error",
                showConfirmButton: false,
                timer: 1500
              })
          })
  }
  function Submitdata()
  {
      CreateBlog()  
  }
  function uploadPicture1 (e) {
    console.log(e.target.files[0])
    setImage(e.target.files[0])
   setImagePreview( URL.createObjectURL(e.target.files[0]))
      setImageset(true)
      setuploaded(false)
    };
  return (
    <>
    <SharedLayout>
    <div className="container">
      <div className="row">
        <div className='col-md-12'> <h1 className='f-Heading'>Update Organization</h1>
        
                                     <Modal
                                    centered
                                    size="sm"
                                    show={ImageModal}
                                
                                >
                                    <Modal.Body style={{textAlign:"center",height:"50%"}}>
                                    {
                                       uploaded?
                                  
                                    <img
                                    src={"https://api.fineoriginal.com/"+Image}
                                    style={{width:"100%" }  }
                                                                       />     
                                       : 
                                       <img
                                    src={ImagePreview}
                                    style={{width:"100%" }  }
                                                                       />     
                                   }
                               <button  onClick={()=>setImageModal(false)}> Close </button>                     
                                 </Modal.Body>
                                    <Modal.Footer>
                                       
                                    </Modal.Footer>
                                </Modal>
        <div className="col-md-12">
            <div className='input-fields'>
              <p>Logo Image</p>
              <input type="file" name="uploadfile" id="img" onChange={uploadPicture1} accept=".png, .jpg, .jpeg" style={{display:"none"}}/>
                            <label className='custom-input-field pt-2' style={{whiteSpace:"nowrap"}}>
                               <button  className="custom-input-button" ><label  for="img" className="input-field-custom-label"> Choose File </label></button> 
                                <l className="custom-input-label">{Image.toString().slice(-10)}</l> 
                                </label>
                            
              {Imageset?  <button onClick={()=>setImageModal(true)}>Preview Image </button> :" "  }
            </div>
          </div>
          <div className="col-md-12">
            <div className='input-fields'>
            <p>Name</p>
                                             <input
                                        type="text"
                                        required
                                        placeholder="Name"
                                        width={100}
                                        className="input-field"
                                        name='ExternalLink'
                                        value={Name}
                                        onChange={(e)=>setName(e.target.value) }
                                    />
               {Namevalidation?<></>:<div style={{ color: "#F61C04" }}>Name is not valid.</div>}

            </div>
          </div>
          <div className="col-md-12">
            <div className='input-fields'>
              <p>Email</p>

              <input
                                        type="text"
                                        required
                                        placeholder="Email"
                                        width={100}
                                        className="input-field"
                                        name='Tags'
                                        value={Email}
                                        onChange={(e)=>setEmail(e.target.value) }
                                       
                                    />
                                     {Emailvalidation?<></>:<div style={{ color: "#F61C04" }}>Email is not valid.</div>}
        
             
          
            </div>
          </div>
          <div className="col-md-12">
            <div className='input-fields'>
              <p>Address</p>

              <input
                                        type="text"
                                        required
                                        placeholder="Address"
                                        width={100}
                                        className="input-field"
                                        name='Tags'
                                        value={Address}
                                        onChange={(e)=>setAddress(e.target.value) }
                                       
                                    />
             
          
            </div>
          </div>
          <div className="col-md-12">
            <div className='input-fields'>
            <p>Walllet Address</p>
                                 <input
                                        type="text"
                                        required
                                        placeholder="WalletAddress"
                                        width={100}
                                        className="input-field"
                                          name='Tags'
                                          value={WalletAddress}
                                          onChange={(e)=>setWalletAddress(e.target.value) }
                                       
                                    />
                                                            {WalletAddressvalidation?<></>:<div style={{ color: "#F61C04" }}>Walletaddress is not valid.</div>}
                              
   
            </div>
          </div>
          <div className="col-md-12">
            <div className='input-fields'>
            <p>Amount</p>
                                 <input
                                        type="text"
                                        required
                                        placeholder="AmountInPercent"
                                        width={100}
                                        className="input-field"
                                        name='Amount'
                                        value={Amount1}
                                         onChange={(e)=>setAmount1(e.target.value) }
                                       
                                    />
                                       {Amountvalidation?<></>:<div style={{ color: "#F61C04" }}>Amount is not valid.</div>}
      
            </div>
          </div> <div className="col-md-12">
            <div className='input-fields'>
            <p>Your Site Link</p>
                                 <input
                                         type="text"
                                        required
                                        placeholder="YourSiteLink"
                                        width={100}
                                        className="input-field"
                                        name='YourSiteLink'
                                        value={YourSiteLink}
                                        onChange={(e)=>setYourSiteLink(e.target.value) }
                                       />
                                          {YourSiteLinkvalidation?<></>:<div style={{ color: "#F61C04" }}>Amount is not valid.</div>}
      
            </div>
          </div>
          <div className='col-lg-12 col-md-12 col-sm-12'>
                        <div style={{ display: "flex" }}>
                            <button className='create-list' onClick={Submitdata}>Update Organization</button>   
                        </div>
                    </div>
          
                               
        </div></div></div>
        </SharedLayout>
    </>

  );
}