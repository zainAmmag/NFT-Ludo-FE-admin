import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { UserAuthTokenId } from "./Constants/BusinessManager";
import { getToken } from "./Utils/Utils";
const mapStateToProps = state => {
    return {
      Wallets: state.Wallets,
      Focused: state.Focused,
      Token: state.Token,
    };
  };
class PublicRoute extends React.Component {
  render(){
    const { component: Component, ...rest }=this.props;
    let t=getToken();
  return (
    <Route
      {...rest}
      render={prop =>
        t&&t!==''? (
          <Redirect to="/SignIn"/>
          ) : (
            <Component {...prop} />
        )
      }
    />
  );
    }
}
export default connect(mapStateToProps, null)(PublicRoute);
