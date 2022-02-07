import React, { Component } from "react";
import Raphael from "raphael";
import $ from "jquery";
// import "morris.js/morris.css";
// import "morris.js/morris.js";

class PaywalaChart extends Component {
  constructor(props) {
    super(props);
    window.Raphael = Raphael;
    
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  shouldComponentUpdate(nextProps, nextStates) {
    if (this.browsersChart.segments) {
      for (let i = 0; i < this.browsersChart.segments.length; i++) {
        this.browsersChart.segments[i].handlers["hover"] = [];
      }
    }
    if (JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data)||JSON.stringify(nextProps.BaseCurrency) !== JSON.stringify(this.props.BaseCurrency)) {
      return true;
    } else return false;
  }
  browsersChart = {};
  render() {
    let maxUSDValue = 0;
    let data = [];
    let color = [];
    let Index = 0;
    let IndexSelected = -1;
    let ChangeToThis = "";
    //console.log(this.props.CurrentCurrency);
    try {
      if (this.props.data.Currencies !== undefined) {
        for (const curr of this.props.data.Currencies) {
          for (const wallet of this.props.data.Wallets) {
            if (curr.ThreeDigitName === wallet.Currency) {
              if (
                wallet.WalletType === this.props.WalletType ||
                wallet.WalletType === "FIAT"
              ) {
                let tempUsdValue = curr.Rate * wallet.Balance;
                if (this.props.CurrentCurrency === "") {
                  if (maxUSDValue < tempUsdValue) {
                    maxUSDValue = tempUsdValue;
                    if (tempUsdValue > 0) IndexSelected = Index;
                    ChangeToThis = curr.ThreeDigitName;
                  }
                } else {
                  if (this.props.CurrentCurrency === curr.ThreeDigitName) {
                    IndexSelected = Index;
                    ChangeToThis = curr.ThreeDigitName;
                  }
                }

                if (wallet.Balance === 0) {
                  continue;
                }
                Index += 1;
                data.push({ value: tempUsdValue, label: curr.ThreeDigitName });
                color.push(curr.Color);
              }
            }
          }
        }
const getFiatValue=(value)=>{
  let rate=1;
  for (const item of this.props.data.Currencies) {
    if (item.ThreeDigitName===this.props.BaseCurrency.Name) {
      rate=item.Rate
    }
  }
  return this.props.BaseCurrency.symbol+" " +(value/rate).toFixed(3);
}
        setTimeout(() => {
          try {
            $("#donut-PaywalaChart").html("");
            this.browsersChart = window.Morris.Donut({
              element: "donut-PaywalaChart",
              data: data,
              formatter: function (value, data) {
                return this.props.BaseCurrency!==null? getFiatValue(value):"$ "+value.toFixed(3);
              }.bind(this),
              colors: color,
              resize: true,
              labelColor: "#ffffff",
              hideHover: true,
            }).on("click", function (i, row) {
              change(i, row);
            });
            for (let i = 0; i < this.browsersChart.segments.length; i++) {
              this.browsersChart.segments[i].handlers["hover"] = [];
            }
            const change = (i, row) => {
              
              this.browsersChart.select(i);
              if (this.props.CurrentCurrency !== row.label) {
                this.props.ChangeCurrent(row.label);
              }
              
            };

            for (let i = 0; i < this.browsersChart.segments.length; i++) {
              this.browsersChart.segments[i].handlers["hover"] = [];
            }
            this.browsersChart.select(IndexSelected);
            if (ChangeToThis !== this.props.CurrentCurrency) {
              this.props.ChangeCurrent(ChangeToThis);
            }
          } catch (error) {
            //console.log(error.message);
          }
        }, 500);
      }
    } catch (error) {
      //console.log(error.message);
    }

    return (
      <div 
      style={{flex:1, flexDirection:"column", display:"flex","textAlign":"center"}}>
        {IndexSelected === -1 && (
          <img alt="chart" src={require("../Assets/images/EmptyChart.png")} />
        )}
        <span
          style={{  "height":"467px","textAlign":"center", display: IndexSelected === -1 ? "none" : "flex" }}
          id="donut-PaywalaChart"
        ></span>
      </div>
    );
  }
  WalletBalance = (curr) => {
    if (this.props.data.Wallets !== undefined) {
      for (const wallet of this.props.data.Wallets) {
        if (
          wallet.WalletType === this.props.WalletType ||
          wallet.WalletType === "FIAT"
        ) {
          if (curr === wallet.Currency) {
            return wallet.Balance.toFixed(8);
          }
        }
      }
    }
    return "0";
  };
}
export default PaywalaChart;
