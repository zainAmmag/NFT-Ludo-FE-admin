import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setIsLoaderActive, setDefaults } from '../actions';
import { SendHttpRequest } from './utility';
import { BaseUrl, AuthenticationTokenId, DefaultCurrencyTokenId } from '../Constants/BusinessManager';
import swal from 'sweetalert';

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        setDefaults:bindActionCreators(setDefaults,dispatch),
        setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch)
    };
}

class SelectDefaultCurrency extends Component {
    render() {
        return (
            <div style={{cursor:"pointer"}} onClick={this.ChangeDefaultCurrencyhandler.bind(this)}>
                {this.props.children}
            </div>
        );
    }
    async ChangeDefaultCurrencyhandler(){
        if (this.props.Id) {
            if (!this.props.disabled) {
            try {
                this.props.started();
                this.props.setIsLoaderActive(true);
                let token=localStorage.getItem(AuthenticationTokenId);
                var response= await SendHttpRequest(BaseUrl+"ChangeDefaultCurrency",{
                    Token:token,
                    RequestValue:(this.props.Id+"")
                },"POST");
                if (response.Success===true) {
                    localStorage.setItem(DefaultCurrencyTokenId,this.props.Id+"");
                    this.props.setDefaults({
                        DefaultCurrencyId:this.props.Id
                    });
                    this.props.setIsLoaderActive(false);
                    swal({
                        icon: 'success',
                        title: 'Done',
                        text: 'Default currency successfully changed'
                    })
                } else {
                   throw new Error("failed to change currency");
                }
            } catch (error) {
                this.props.setIsLoaderActive(false);
                swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong, try to re-login'
                })
            }
        }
        }else{

        }
    }
}

export default connect(
    mapStateToProps,mapDispatchToProps
)(SelectDefaultCurrency);