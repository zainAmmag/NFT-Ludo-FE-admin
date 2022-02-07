import React from "react";
import Logo from '../Assets/images/iconm.png';
import { Link , useHistory,withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import {  Lock , Mail , Key , Eye , EyeOff} from 'react-feather';
import { addWallets, setFocused, setToken, setIntervalStarted,setDefaults,setIsLoaderActive} from "../actions/index";
import { bindActionCreators } from "redux";

import {
    SendHttpRequest,
    SetAsyncStorage,
    DeleteAsyncStorage
  } from "../component/utility";
import {BaseUrl, AuthenticationToken} from '../Constants/BusinessManager';
import swal from 'sweetalert';

var passwordValidator = require('password-validator');
const mapStateToProps = state => {
    return { Wallets: state.Wallets, Focused: state.Focused, Token: state.Token };
  };
  const mapDispatchToProps = dispatch => {
    return {
      addWallets: bindActionCreators(addWallets, dispatch),
      setFocused: bindActionCreators(setFocused, dispatch),
      setToken: bindActionCreators(setToken, dispatch),
      setIsLoaderActive:bindActionCreators(setIsLoaderActive,dispatch)

    };
  };
class ForgetPassword extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
          email: "",
          emailValidate: true,
          emailMsg: "",
          loading: false,
          EmailSent: false,
          Code: "",
          NewPassword: false,
          password: "",
          passwordMsg: "",
          passwordValidate: "",
          confirmPassword:"",
          passwordCompareValidate: "",
          passwordCompareMsg: "",
          hiddenPassword:true,
          hiddenConfirmPassword: true,
          emptyFieldMsg:null,
          codeMsg:null,
          isFirst: true
          
        };
        this.toggleShow = this.toggleShow.bind(this);
        this.toggleShow1 = this.toggleShow1.bind(this);
        this.textInput = null;

      }
      toggleShow() {
        this.setState({ hiddenPassword: !this.state.hiddenPassword });
      }
      toggleShow1() {
        this.setState({ hiddenConfirmPassword: !this.state.hiddenConfirmPassword });
      }
      componentDidMount() {
        
          this.textInput.focus();
        }
       
      validateEmail(text) {
        if(this.state.isFirst === false){
        var alph = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    
        if (alph.test(text)) {
          
          this.setState({ emailValidate: true,emailMsg: "",email: text , emptyFieldMsg:null});
        } else {
          this.setState({ emailValidate: false, emailMsg: "•	Email is not valid\n" , emptyFieldMsg:null });
        }
      }
      else {
        this.setState({email: text})
      }
      }
      validatePassword(text) {
        var PasswordValidationSchema=new passwordValidator();
        PasswordValidationSchema
        .is().min(8)
        .is().max(36)
        .has().uppercase()
        .has().lowercase()
        .has().digits()
        .has().not().spaces()
        .has().symbols();
        
        var {confirmPassword}=this.state;
        var format = /^(?=.*\d)(?=.*[!@#.$%_^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        var Errors= PasswordValidationSchema.validate(text,{list:true});  
        if (!Errors.length) {
          this.setState({ passwordValidate: true, password: text, passwordMsg: "" , emptyFieldMsg : null });
        } else {
          let errorMessage="";
          Errors.forEach(element => {
            if(element=="min")
            {
              errorMessage+="• 8 minimum characters\n";
            }
            if(element=="uppercase")
            {
              errorMessage+="• at least 1 uppercase character\n";
            }
            if(element=="lowercase")
            {
              errorMessage+="• at least 1 lowercase character\n";
            }
            if(element=="digits")
            {
              errorMessage+="• at least 1 number\n";
            }
            if(element=="symbols")
            {
              errorMessage+="• at least 1 special character i.e. @, #, &\n";
            }
          });
          this.setState({ passwordValidate: false, password: "", passwordMsg: "Password must have:\n"+errorMessage  , emptyFieldMsg : null});
        }
        if(confirmPassword)
        {
          if (confirmPassword == text) {
            this.setState({ passwordCompareValidate: true, passwordCompareMsg: "" , emptyFieldMsg : null  });
          } else {
            this.setState({ passwordCompareValidate: false, passwordCompareMsg: "Password did not match" , emptyFieldMsg : null});
    
          }
        }
      }
      //Validating password is same
      validatePasswordConfirmation(text) {
        const { password, passwordValidate } = this.state;
        if (passwordValidate) {
          if (text == password) {
            this.setState({ passwordCompareValidate: true,confirmPassword:text,passwordCompareMsg: "" });
          } else {
            this.setState({ passwordCompareValidate: false,confirmPassword:text,passwordCompareMsg: "Password did not match" });
            
          }
        } else {
          this.setState({ passwordCompareValidate: false,confirmPassword:text,passwordCompareMsg: "" });
        }
      }
      loader = active => {
        // this.setState({ loading: active });
        this.props.setIsLoaderActive(true);       

        
      };
      static navigationOptions = {
        title: "Forgot Password",
        headerTransparent: true,
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "exo"
        }
      };
      onSubmitNewPassword = async (e) => {
        e.preventDefault();
        const {password,email,passwordValidate,passwordCompareValidate}=this.state;
        if(!passwordValidate||password==""||email=="" ||!passwordCompareValidate)
        {
          return this.setState({emptyFieldMsg:"Please fill all fields."});
        }
        else{
          this.setState({emptyFieldMsg:null})
        }
        this.props.setIsLoaderActive(true);
        try {
          const data = await SendHttpRequest(
            BaseUrl + "ResetPassword",
            { email: email,newPassword:password },
            "POST"
          );
         
          if (data.Success == true) {
            
            swal("done", "Password changed successfully")
            this.props.history.push('/SignIn')
            this.props.setIsLoaderActive(false);
            
            // , [
            //   {
            //     text: "Ok",
            //     onClick: async () => {
            //       this.loader(false);
            //     //   this.props.navigation.navigate(
            //     //     "Auth",
            //     //     {},
            //         this.props.history.push('/SignIn')
            //     //   );
            //     }
            //   }
            // ],{cancelable: false});
          } else {
            throw new Error(data.Exception);
          }
        } catch (error) {
          this.props.setIsLoaderActive(false);       
         return swal({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong, try again later'
         });
        }
      }
      onSubmitCode = async (event) => {
        event.preventDefault();
        const { email, Code } = this.state;
        if (email == "") {
          return ;
        }
        if (Code == "") {
          return this.setState({emptyFieldMsg:"Please fill all fields"});
        }else{
          this.setState({emptyFieldMsg:null})
        }
        this.props.setIsLoaderActive(true);    
        try {
          const data = await SendHttpRequest(
            BaseUrl + "SignUpCodeVerification",
            { email: email, code: Code },
            "POST"
          );
          if (data.Success == true) {
            this.props.setIsLoaderActive(false);
            this.setState({ NewPassword: true });
          } else {
            throw new Error(data.Exception);
          }
        } catch (error) {
               this.props.setIsLoaderActive(false);
          return this.setState({codeMsg:"Invalid Code"});
        }
      };
      onSubmit = async (event) => {
        debugger;
        event.preventDefault();
        const { email, emailValidate } = this.state;
        if (email == "") {
          return this.setState({emptyFieldMsg:"Please fill all fields."});
        }
        if (!emailValidate) {
          return this.setState({emailMsg:"Email is not valid"});
        }
    
        this.props.setIsLoaderActive(true);
        try {
          const data = await SendHttpRequest(
            BaseUrl + "SendForgotPasswordCode",
            { Email: email },
            "POST"
          );
          if (data.Success == true) {
            this.props.setIsLoaderActive(false);
            this.setState({ EmailSent: true });
          } else {
            throw new Error(data.Exception);
          }
        } catch (error) {
          this.props.setIsLoaderActive(false);
          this.setState({emailMsg:"Email is not registered"})
        }
      };


    render(){
        const iconStyling = {
          position:"absolute",
          display:"flex",
          margin:"9px 8px"
  }
  return(
    <div id="wrapper">
          <div className="card card-authentication1 mx-auto my-5">
            <div className="card-body">
 <div className="card-content p-2">
   <div className="text-center">
     <img src={Logo} width="100" alt="logo icon" />
   </div>
        </div>
            {!this.state.EmailSent && (
                <form onSubmit={event => {this.onSubmit(event);}}>
                <div className="card-title text-center py-3">Reset Password</div>                   

                <div className="form-group">
    <label htmlFor="EmailId" className="sr-only">Email</label>
     <div className="position-relative has-icon-right">
      <input type="text" autoComplete="one-time-code" onChange={event => this.validateEmail(event.target.value)}
              placeholder="Email" className="form-control input-shadow" placeholder="Email" 
              ref={elem => (this.textInput = elem)} 
              onBlur={()=>{this.setState({isFirst: false})}}
              />
      <div className="form-control-position">
                  <Mail size={18}></Mail>
      </div>
     </div>
    </div>
<span className="error">{this.state.emptyFieldMsg}</span>
<button
                type="submit" className="create-btn" style={{fontWeight:"bold",letterSpacing:1}}

                  >Submit</button>
                </form>
            )}
            {this.state.EmailSent && !this.state.NewPassword && (
                    <div>
                    <div className="card-title text-center py-3">Verification Code</div>                   
<form onSubmit={event => {this.onSubmitCode(event);}}>
                    <div className="form-group">
    <label htmlFor="EmailId" className="sr-only">Email</label>
     <div className="position-relative has-icon-right">
      <input type="text" autoComplete="one-time-code" onChange={event => this.setState({Code:event.target.value })}
              className="form-control input-shadow" placeholder="Enter code" />
      
     </div>

     <span className="error">{this.state.emptyFieldMsg || this.state.codeMsg}</span>

    </div>
    <button
                type="submit" className="create-btn" style={{fontWeight:"bold",letterSpacing:1}}

                  >Submit</button>
</form>
                </div>
            )}

             {this.state.NewPassword &&(
                        <div>
               <div className="card-title text-center py-3">Reset Password</div>                   
<form onSubmit={event => {this.onSubmitNewPassword(event);}}>
<div className="form-group">
     <div className="position-relative has-icon-right">
      <input autoComplete="one-time-code"
               onChange={event => this.validatePassword(event.target.value)}
               type={this.state.hiddenPassword ? "password" : "text"} className="form-control input-shadow" placeholder="Password" />
      <div className="form-control-position">
              <span className="" onClick={this.toggleShow}>{this.state.hiddenPassword === true ? <EyeOff size={18}/> : <Eye size={18}/> }</span>
      </div>
     </div>
    </div>
 


<div className="form-group">
     <div className="position-relative has-icon-right">
      <input  value={this.setState.Password}
                          onChange={event => this.validatePasswordConfirmation(event.target.value )}
                          type={this.state.hiddenConfirmPassword ? "password" : "text"} className="form-control input-shadow" placeholder="Confirm Password" />
      <div className="form-control-position">
        {/* <i className="icon-lock"></i> */}
                  <span className="" onClick={this.toggleShow1}>{this.state.hiddenConfirmPassword === true ? <EyeOff size={18}/> : <Eye size={18}/> }</span>
        </div>
        </div>
        </div>
        <button
                type="submit" className="create-btn" style={{fontWeight:"bold",letterSpacing:1}}

                  >Submit</button>
        </form>
        <span className="error">{this.state.emptyFieldMsg}</span>

                        </div>
            )}
            <div>
            {this.state.emailMsg.length > 0 && (
                  <span className="error">
                    {this.state.emailMsg}
                  </span>
                )}
                {this.state.passwordMsg.length > 0 && (
                  <span className="error">
                    {this.state.passwordMsg}
                  </span>
                )}
                 {this.state.passwordCompareMsg.length > 0 && (
                  <span className="error">
                    {this.state.passwordCompareMsg}
                  </span>
                )}
            </div>
                {/* <button
                type="button" className="create-btn" style={{fontWeight:"bold",letterSpacing:1}}
                    onClick={() => {
                      if (this.state.NewPassword) {
                        this.onSubmitNewPassword();
                      } else {
                        if (this.state.EmailSent) {
                          this.onSubmitCode();
                        } else {
                          this.onSubmit();
                        }
                      }
                    }}
                    
                  > */}

                    {/* Submit
                  </button> */}
            
            </div>
            <div className="card-footer text-center py-3">
  <p className="text-warning mb-0" style={{fontSize:15,fontWeight:"bold"}}>Return to the <Link to="/SignIn" style={{color:"#fff"}}> Sign In</Link></p>
</div>
        </div>
    </div>

);
}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgetPassword));