import React , {useState} from "react";
import Logo from '../Assets/images/iconm.png';
import {BaseUrl, AuthenticationToken} from '../Constants/BusinessManager';

const VerificationCode = () => {
    let [SignUpCodeVerificationModel, setSignUpCodeVerificationModel] = useState({Code: "" });

    let SignUpCodeVerification = () => {
        fetch(BaseUrl + 'SignUpCodeVerification',
        {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authentication':'bearer '+AuthenticationToken  
            },
            body: JSON.stringify({Email: SignUpCodeVerificationModel.Email , Code: SignUpCodeVerificationModel.Code})
        }
        ).then(response => response.json()).then(data =>{
            if(data.Response != "OK"){
                alert(data.Response);
            }else{
                alert(data.Response);
            }
        })
    }
    return(
        <div className="wrapper verificationCard wrapperCard">
            <div className="main card col-md-6 col-lg-4 col-sm-9">
            <form onSubmit = {(event)=>{event.preventDefault();SignUpCodeVerification();}}>
                <img src={Logo} width="100" />

                <div className="label-div">
                    <label>Please enter verification code</label>
                </div>
                <div className="left-inner-addon input-container margin-t">
                    <i className="fa fa-key left"></i>
                    <input type="text" 
                     value={SignUpCodeVerification.Code}
                     onChange={event => setSignUpCodeVerificationModel({ ...SignUpCodeVerificationModel, Code: event.target.value })}
                    className="form-control" placeholder="Verification Code" />
                </div>

                <div className="container left-inner-addon">
                    <button className="create-btn"
                    type="submit"
                    >Submit</button>
                </div>
                </form>
            </div>
    </div>
    )
}
export default VerificationCode;