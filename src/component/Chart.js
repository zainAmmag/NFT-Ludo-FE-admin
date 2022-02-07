import React from 'react';
// import React, { useState, ComponentProps } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import Chart from './component/OverView'
import { Bar , Line , Pie , Doughnut} from "react-chartjs-2";
import { PieChart } from 'react-minimal-pie-chart';


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedSlice: {
        label: "",
        value: 0
      },
      labelWidth: 0
    };
  }
  WalletBalance = curr => {
    if (this.props.data.Wallets !== undefined) {
      for (const wallet of this.props.data.Wallets) {
        if (wallet.WalletType == this.props.WalletType||wallet.WalletType=="FIAT") {
          if (curr == wallet.Currency) {
            return " "+wallet.Balance.toFixed(8)+" ";
          }
        }
      }
    }
    return " 0 ";
  };


  render(){

    const { labelWidth, selectedSlice } = this.state;
    const { label, value } = selectedSlice;
    let displayLabel = '';
    let displayValue = 0;
    let maxUSDVslue = 0;
    let tempdata = [];
    
     //const deviceWidth = Dimensions.get("window").width;
     if (this.props.data.Currencies !== undefined) {
      for (const curr of this.props.data.Currencies) {
        for (const wallet of this.props.data.Wallets) {
          if (curr.ThreeDigitName == wallet.Currency) {
            if (wallet.WalletType == this.props.WalletType||wallet.WalletType=="FIAT") {
              let tempUsdValue = curr.Rate * wallet.Balance;
              if (maxUSDVslue < tempUsdValue) {
                maxUSDVslue = tempUsdValue;
                displayLabel = curr.ThreeDigitName;
                displayValue = wallet.Balance;
              }
              tempdata.push({
                key: wallet.Currency,
                value: wallet.Balance * curr.Rate,
                svg: { fill: curr.Color },
                arc: {
                  outerRadius: label === curr.ThreeDigitName ? 120 + "%" : 110 + "%",
                  padAngle: label === curr.ThreeDigitName ? 0.007 : 0
                },
                
              });
            }

          }
        }
      }
    }


    return(
<div>
  {/* <div className="App">
      <header className="App-header"> */}
        
        {/* <Chart chartData = {this.state.chartData} location='Massachusetts' legendPosition="bottom"/> */}
      {/* </header>
    </div> */}
    

    <div style={{ justifyContent: "center", flex: 1 }}>
        {(maxUSDVslue>0)?(<Doughnut
        />
       
  ):<div style={{  justifyContent: 'center',
  alignItems: 'center',}}><img alt="chart"
  src={require("../Assets/images/EmptyChart.png")}
  
/></div>}
   </div>
   </div>
     ) }
}


export default App;
