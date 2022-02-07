import React, { Component } from "react";
import Iframe from "react-iframe";
import { TradeUrl, AuthenticationTokenId } from "../Constants/BusinessManager";
import $ from "jquery";
import { connect } from 'react-redux'
import {setIsLoaderActive} from '../actions/index'
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";



const mapDispatchToProps= (dispatch)=>
{
  return { setIsLoaderActive:bindActionCreators(setIsLoaderActive,dispatch) }
}


class ProExchange extends Component {
  constructor(props) {
    super(props)
    var t = localStorage.getItem(AuthenticationTokenId);
    let url = TradeUrl + "app/index?room=pro-web&token=" + t;
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
      if (data.messageType==="ChangeRoomPro") {
        this.props.setIsLoaderActive(true);
        var t = localStorage.getItem(AuthenticationTokenId);
        let url = TradeUrl + "Market/ProWeb?symbol=" + data.message+"&token="+t;
        this.setState({url:url});
      }
      if (data.messageType==="Redirect") {
        this.props.history.push("/Overview");
      }
    //   if (event.data.hasOwnProperty("FrameHeight")) {

    //     $("#pro iframe").css("height", event.data.FrameHeight+"px !important");        
    // }
      
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
      <div className="container-fluid body-content" style={{"display":(this.props.show?(""):("none")),"textAlign":"center","verticalAlign":"middle",padding:0}}  >
        {this.state.nativeLoading&&<><h1>Loading Exchange please wait</h1><span style={{color:"white",fontSize:22,cursor:"pointer"}} onClick={()=>{
          this.props.history.push("/Overview");
        }}>Go Back to Wallet</span></>}
        
        <Iframe
        onLoad={()=>{
          this.setState({nativeLoading:false});
          //this.props.setIsLoaderActive(true)
        }}
        
          loading="lazy"
          importance="high"
          url={this.state.url}
          sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation"
          width="100%"
          overflow="scroll"
          frameBorder={0}
          height="1000px"
          
        />
      </div>
    );
  }
}
export default connect(null,mapDispatchToProps)(withRouter(ProExchange))