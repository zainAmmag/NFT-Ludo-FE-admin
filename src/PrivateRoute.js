import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { AuthenticationTokenId, UserAuthTokenId } from "./Constants/BusinessManager";
import { getToken } from "./Utils/Utils";
const mapStateToProps = state => {
    return {
      Wallets: state.Wallets,
      Focused: state.Focused,
      Token: state.Token,
    };
  };
class PrivateRoute extends React.Component {
  render(){
    const { component: Component, ...rest }=this.props;
    let t=getToken();
    // var s=this.props.location;
    // if((s.pathname+"").includes("ref"))
    // {
    //   s.search=(s.pathname+"").split("?ref=")[1];
    //   s.pathname=""
    // }
  return (
    <Route
      {...rest}
      render={prop =>
        t&&t!==''? (
          <Component {...prop} />
        ) : (
          // <Redirect to={{pathname:"/SignIn?ref="+s.pathname+s.search }} />
          <Redirect to={{pathname:"/SignIn" }} />
        )
      }
    />
  );
    }
}
export default connect(mapStateToProps, null)(withRouter(PrivateRoute));
