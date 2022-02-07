import React, { Component } from 'react';
import { AuthenticationTokenId, BaseUrl } from '../Constants/BusinessManager';
import { SendHttpRequest } from './utility';

class CurrentClientId extends Component {
    constructor(props) {
        super(props);
        this.state={
            isLoading:true,
            ClientId:""
        }
    }
    
    async componentDidMount()
    {
        try {
            let token=localStorage.getItem(AuthenticationTokenId);
            let response=await SendHttpRequest(BaseUrl+"GetClientId",{Token:token},"POST");
            if (response.Success===true) {
                this.setState({isLoading:false,ClientId:response.Data});
            }else
            {
                this.setState({isLoading:false,ClientId:response.Exception});
            }

        } catch (error) {
            this.setState({isLoading:false,ClientId:"System Error re-login"});
        }
    }
    render() {
        return (
            <>
                {this.state.isLoading && "Loading"}
        {!this.state.isLoading && this.state.ClientId}
            </>
        );
    }
}

export default CurrentClientId;