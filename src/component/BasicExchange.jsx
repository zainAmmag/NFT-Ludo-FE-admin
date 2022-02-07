import React, { Component } from "react";
import Iframe from "react-iframe";
import { TradeUrl, AuthenticationTokenId } from "../Constants/BusinessManager";
import $ from "jquery";
import { connect } from 'react-redux'
import {setIsLoaderActive} from '../actions/index'
import { bindActionCreators } from "redux";



const mapDispatchToProps= (dispatch)=>
{
  return { setIsLoaderActive:bindActionCreators(setIsLoaderActive,dispatch) }
}


class BasicExchange extends Component {
  constructor(props) {
    super(props)
    var t = localStorage.getItem(AuthenticationTokenId);
    let url = TradeUrl + "app/index?room=basic-web&token=" + t;
    this.state = {
       show:true,
       url:url,
       nativeLoading:true,
    }
  }
  handleIframeMessages(event){
    try {
      
      const data = JSON.parse(event.data)
      if (data.messageType==='loader') {
        this.props.setIsLoaderActive(data.state); 
      }
      if (data.messageType==="ChangeRoomBasic") {
        this.props.setIsLoaderActive(true);
        var t = localStorage.getItem(AuthenticationTokenId);
        let url = TradeUrl + "Market/SymbolWeb?symbol=" + data.message+"&token="+t;
        this.setState({url:url});
      }
     

    }
    catch(error){

    }
    
  }
  componentDidMount() {
    window.addEventListener("message",this.handleIframeMessages.bind(this))
    //this.props.setIsLoaderActive(true);
  }
  componentWillUnmount(){
    window.removeEventListener("message",this.handleIframeMessages.bind(this));
    this.props.setIsLoaderActive(false);
  }
  render() {
    return (
      <div className="container-fluid body-content" style={{display:this.props.show?"":"none","paddingRight": "0px !important",
      "paddingLeft": "0px !important"}}  id="">
        {this.state.nativeLoading&&<><h1>Loading Exchange please wait</h1></>}
        
        <Iframe
        onLoad={()=>{
          this.setState({nativeLoading:false});
          //this.props.setIsLoaderActive(true)
        }}
        referrerPolicy= "origin-when-cross-origin" 
          loading="eager"
          importance="high"
          url={this.state.url}
          sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation"
          width="100%"
          overflow="scroll"
          frameBorder={0}
          height="700px"
          
        />
      </div>
    );
  }
}
export default connect(null,mapDispatchToProps)(BasicExchange)