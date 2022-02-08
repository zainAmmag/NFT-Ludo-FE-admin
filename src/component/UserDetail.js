import React from "react";
import { Link } from "react-router-dom";
import Ticker from "react-ticker";
import { Card, Row, Col, Container } from "react-bootstrap";
import { connect } from "react-redux";
import profilePic from "../Assets/images/profilePic.png";
import nft from "../Assets/images/nft.jpg";
import "../Assets/css/custom.css";
import { BaseUrl } from "../Constants/BusinessManager";
import { SendHttpRequest } from "./utility";
import { bindActionCreators } from "redux";
import { setIsLoaderActive } from "../actions";


const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
  };
};

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CurrentCurrency: "",
      ComponentChart: null,
      tableData: [],
      moviesData: [],
      categoryname: "",
      IsTickerHovered: false,
      categoryNumber: 0,
      BaseCurrency: 0,
      RenderFinished: false,

      FN: "No data available",
      BO: null,
    };
  }


  async componentDidMount() {
    this.props.setIsLoaderActive(true);
    const data = await SendHttpRequest(
      BaseUrl + "/Amin/GetMyAllCollectionsByUserId",
      {},
      "GET"
    );
    if (data.isSuccess == true) {
      this.props.setIsLoaderActive(false);
    } else {
      this.props.setIsLoaderActive(false);
    }

  }


  render() {
    // var arr = [];
    // for (var i = 0; i < this.state.categoryNumber; i++) {
    //   arr.push(this.state.moviesData[this.state.categoryNumber1].Name);
    // }
    // console.log("this is array", arr)
    return (
      <div className="container-fluid body-content" id="">

        {/* <div className="row" style={{ height: "362px" }}>
          <div className="card" style={{ flex: 1 }}>
            <div
              style={{
                padding: ".75rem 1.25rem",
                marginBottom: "0",
                background: "transparent",
                fontWeight: "600",
                fontSize: "14px",
                color: "#ffffff",
              }}
            >
              {" "}
            </div>
            <div style={{ textAlign: "center" }}>
              <h3>profile</h3>
            </div>
            <div className="row">
              <div
                className=""
                style={{
                  width: "199px",
                  height: "199px",
                  overflow: "hidden",
                  marginLeft: "2%",
                  position: "relative",
                  borderRadius: "50%",
                }}
              >
                <img
                  src={profilePic}
                  alt="profileImage"
                  data-toggle="modal"
                  data-target="#modal-animation-14"
                  style={{
                    color: "transparent",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    textAlign: "center",
                    textIndent: "10000px",
                  }}
                />
              </div>
              <div
                className=""
                style={{
                  width: "70%",
                  height: "100%",
                  marginLeft: "2%",
                  position: "relative",
                }}
              >
                <div>
                  <p> {localStorage.getItem("id1")} </p>
                  <p>Bitcoin Holder</p>
                  <p>Wallet Addess:------------ </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="row card"
          style={{
            marginTop: "30px",
            height: "100px",
            marginBottom: "30px",
            color: "white",
          }}
        >
          {this.state.moviesData.length > 0 ? (
            <table style={{ width: "100%", color: "white", marginTop: "2%" }}>
              <thead>
                <tr style={{ color: "#fff", textAlign: "center" }}>
                  {this.state.moviesData &&
                    this.state.moviesData.length > 0 &&
                    this.state.moviesData
                      .sort((a, b) => b.id - a.id)
                      .map((value, index) => {
                        return <th>{value.Name}</th>;
                      })}
                </tr>
              </thead>

              <tr style={{ textAlign: "center" }}>
                {this.state.moviesData &&
                  this.state.moviesData.length > 0 &&
                  this.state.moviesData
                    .sort((a, b) => b.id - a.id)
                    .map((value, index) => {
                      return (
                        <td style={{}}>
                          <button
                            style={{
                              padding: 8,
                              background: "transparent",
                              border: 0,
                              color: "white"
                            }}
                            onClick={() => {
                              this.setState({ categoryNumber: value.Number });
                              this.setState({ categoryNumber1: index });

                              console.log(this.state.categoryNumber)
                            }}
                          >
                            {value.Number}
                          </button>
                        </td>
                      );
                    })}
              </tr>
            </table>
          ) : (
            <div style={{ alignItems: "center", alignContent: "center" }}>
              <p
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 20,
                }}
              >
                No Projects
              </p>
            </div>
          )}
        </div>

        <div id="container">
          <div className="row">
            {this.state.categoryNumber > 0 ? (
              <>





              </>
            ) : (
              <div style={{ alignItems: "center", alignContent: "center" }}>
                <p
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 20,
                  }}
                >
                  No Collection
                </p>
              </div>
            )}
            )
          </div>
        </div> */}
      </div>
    );
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(UserDetail)


