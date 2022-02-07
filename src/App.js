import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
 return(
        <div className="wrapper">
        <div className="main card">
            <img src="~/Assets/images/iconm.png" width="100" />
            <div className="left-inner-addon input-container">
                <i className="fa fa-envelope left"></i>
                <input type="email" className="form-control" placeholder="Email" />
            </div>
            <div className="left-inner-addon input-container">
                <i className="fa fa-lock left"></i>
                <input type="password" className="form-control" placeholder="Password" />
                <i className="fa fa-eye-slash right"></i>
            </div>
            <div className="left-inner-addon input-container">
                <i className="fa fa-lock left"></i>
                <input type="password" className="form-control" placeholder="Confirm Password" />
                <i className="fa fa-eye-slash right"></i>
            </div>
            <div className="text1">
                <a href=""> Already have an account ? Sign In</a>
            </div>
            <div className="text2">
                <input  type="checkbox"/>
                <label>
                    I agree with Privacy Policy
                </label>
            </div>
            <div>
                <button className="create-btn">Create Account</button>
            </div>
        </div>
    </div>
    );
 }

export default App;
