import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "react-datepicker/dist/react-datepicker.css";
import { setIsLoaderActive } from "../actions/index";
import Loader from "../component/shared/loader";
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
  };
};
class RecentTransaction extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      
    <h1 style={{textAlign:"center"}}>DashBoard</h1>
      
      );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RecentTransaction);
