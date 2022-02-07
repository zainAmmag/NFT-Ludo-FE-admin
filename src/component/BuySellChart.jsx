import React from "react";

import * as ReactDOM from "react-dom";
import * as Highcharts from "highcharts";
import $ from "jquery";
import {
  AuthenticationTokenId,
  BaseUrl,
  BaseUrlGet,
} from "../Constants/BusinessManager";
import { SendHttpRequest } from "../component/utility";
class BuySellChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ChartData: {},
      loading: true,
      IsData: false,
    };
    this._isMounted = true;
  }
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  async componentDidMount() {
    try {
      let t = localStorage.getItem(AuthenticationTokenId);

      let response = await SendHttpRequest(
        BaseUrlGet +
          "GetOverview/UpdateBuySellChart?currency=" +
          this.props.CurrentCurrency +
          "&token=" +
          t,
        {},
        "GET"
      );
      if (response.Success === true) {
        if (this._isMounted) {
          $(document).ready(function () {
            Highcharts.chart("BuySellChart", {
              title: {
                text: "",
              },
              chart: {
                marginLeft: 0,
                marginRight: 0,
                backgroundColor: "transparent",

                style: {
                  color: "#fff",
                },
              },

              legend: {
                itemHoverStyle:{
                    color:"#ffffff"
                },
                layout: "horizontal",
                itemStyle: {
                  color: "#fff",
                },
              },

              xAxis: {
                categories: response.Data.Categories,
                lineColor: "#fff",
                tickColor: "#fff",

                labels: {
                  style: {
                    color: "#fff",
                  },
                },
              },
              yAxis: {
                lineColor: "#fff",
                tickColor: "#fff",
                visible: true,
                labels: {
                  style: {
                    color: "#fff",
                  },
                },
                min: 0,
                title: {
                  enabled: true,
                  useHTML: true,
                  text: "Value",
                  style: {
                    visibility: "visible",
                  },
                },
              },

              labels: {
                items: [],
              },
              credits: {
                enabled: false,
              },
              series: [
                {
                  type: "column",
                  name: "Buy",
                  color: "#52d321",
                  data: [
                    { y: response.Data.Buy[0], color: "#52d321" },
                    { y: response.Data.Buy[1], color: "#52d321" },
                  ],
                },
                {
                  type: "column",
                  name: "Sell",
                  color: "#d70c0eb8",
                  data: [
                    { y: response.Data.Sell[0], color: "#d70c0eb8" },
                    { y: response.Data.Sell[1], color: "#d70c0eb8" },
                  ],
                },
              ],
            });
          });
        }
        if (
          response.Data.Buy[0] === 0 &&
          response.Data.Buy[1] === 0 &&
          response.Data.Sell[0] === 0 &&
          response.Data.Sell[1] === 0
        ) {
          if (this._isMounted) {
            this.setState({ loading: false, IsData: false });
          }
        } else {
          this.setState({ loading: false, IsData: true });
        }
      } else {
        if (this._isMounted) {
          this.setState({ loading: false, IsData: false });
        }
      }
    } catch (error) {}
  }
  render() {
    return (
      <>
        {this.state.loading === true && (
          <div style={{ maxHeight: 400, width: "100%" }}>
            <h3 style={{ color: "#fff" }}>Loading</h3>
          </div>
        )}

        <div
          style={{
            maxHeight: 400,
            width: "100%",
            display:
              this.state.loading === false && this.state.IsData === true
                ? ""
                : "none",
          }}
          id="BuySellChart"
        ></div>
        <div
          style={{
            maxHeight: 400,
            width: "100%",
            display:
              this.state.loading === false && this.state.IsData === false
                ? ""
                : "none",
          }}
        >
          <h3 style={{ color: "#fff" }}>No data found</h3>
        </div>
      </>
    );
  }
}

export default BuySellChart;
