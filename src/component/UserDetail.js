import React from "react";
import { Link } from "react-router-dom";
import Ticker from "react-ticker";
import { Card, Row, Col, Container } from "react-bootstrap";
import { connect } from "react-redux";
import profilePic from "../Assets/images/profilePic.png";
import nft from "../Assets/images/nft.jpg";
import "../Assets/css/custom.css";

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
      categoryNumber: 0 ,
      BaseCurrency: 0,
      RenderFinished: false,

      FN: "No data available",
      BO: null,
    };
  }
  async componentDidMount() {
    const meta = [
      {
        name: " Recent Transactions",
      },
      {
        name: "Upcoming Payments",
      },
      {
        name: "Upcoming Payments",
      },
      {
        name: "Upcoming Payments",
      },
      {
        name: "Upcoming Payments",
      },
    ];

    const category = [
      {
        Name: "Movies",
        Number: "5",
      },
      {
        Name: "Games",
        Number: "10",
      },
      {
        Name: "Music",
        Number: "15",
      },
      {
        Name: "Art",
        Number: "10",
      },
    ];

    this.setState({ moviesData: category });
    this.setState({ tableData: meta });
  }
  render() {
    var arr=[] ;
    for (var i = 0; i < this.state.categoryNumber; i++) 
    {
        arr.push(this.state.moviesData[this.state.categoryNumber1].Name);
    }
    console.log("this is array",arr)
    return (
      <div className="container-fluid body-content" id="">
        <div className="row" style={{ height: "362px" }}>
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
                              color:"white"
                            }}
                            onClick={() => {
                              this.setState({ categoryNumber: value.Number });
                              this.setState({ categoryNumber1: index});
                              
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
                {    
                arr.map((playerData, k) => (
                  <>
                    <Col key={k} style={{ paddingTop: "15px" }} md={2} lg={4}>
                      <div
                        className="card buysellcard "
                        style={{
                          width: "350px",
                          margin: "0px 20px",
                          paddingTop: "20px",
                        }}
                      >
                        <div id="container">
                          <h3> {this.state.moviesData[this.state.categoryNumber1].Name}</h3>
                          <div className="panal">
                            <img
                              src={nft}
                              alt="profileImage"
                              className="NFT-immage"
                            />
                            <span className="head" style={{ fontSize: "20px" }}>
                              Equilibrium #3429
                            </span>
                            <span className="note">
                              Our Equilibrium collection promotes balance and
                              calm.
                            </span>
                            <p className="note1">
                              <svg
                                width="11"
                                height="18"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11 10.216 5.5 18 0 10.216l5.5 3.263 5.5-3.262ZM5.5 0l5.496 9.169L5.5 12.43 0 9.17 5.5 0Z"
                                  fill="#00FFF8"
                                />{" "}
                              </svg>{" "}
                              0.041 ETH
                            </p>
                            <p className="time">
                              <svg
                                width="17"
                                height="17"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8.305 2.007a6.667 6.667 0 1 0 0 13.334 6.667 6.667 0 0 0 0-13.334Zm2.667 7.334H8.305a.667.667 0 0 1-.667-.667V6.007a.667.667 0 0 1 1.334 0v2h2a.667.667 0 0 1 0 1.334Z"
                                  fill="#8BACD9"
                                />
                              </svg>
                              3 days left
                              <hr />
                            </p>
                            <p className="time">
                              Created By{" "}
                              <l style={{ fontWeight: "bold" }}> Muzahib </l>{" "}
                            </p>
                          </div>
                        </div>
                      </div>{" "}
                    </Col>
                  </>
                ))}
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
        </div>
      </div>
    );
  }
}

export default UserDetail;
