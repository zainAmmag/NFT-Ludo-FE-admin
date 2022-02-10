import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "react-datepicker/dist/react-datepicker.css";
import { setIsLoaderActive } from "../actions/index";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";


const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
  };
};
class ManagerOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-xl-12 col-12 order-2 order-lg-2 order-xl-1">
            <div className="card">
                <div style={{ padding: 10 }}>
                  <h1 style={{textAlign:"center"}}>Order Details</h1>

                  <Button> <Link to="/orderDetail">Track</Link></Button>
                  <table
                    className="table table-striped table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl AccountStatement"
                    style={{ textAlign: "center" }}
                  >
                    <thead>
                      <tr style={{ color: "#fff" }}>
                        <th>NFT Orders</th>
                        <th>UserName</th>
                        <th>Created</th>
                        <th>Phone Number</th>
                        <th>Order Status</th>
                        {/* <th>Action</th> */}
                      </tr>
                    </thead>
                    <tbody style={{ color: "#fff" }}>

                    </tbody>
                  </table>
                </div>
          
            </div>
          </div>
        </div>
      </div>
    );
  }
}export default connect(mapStateToProps, mapDispatchToProps)(ManagerOrder);
