import React from "react";
import { Link } from "react-router-dom";
import Ticker from "react-ticker";
import { Card, Row, Col, Container } from "react-bootstrap";
import { connect } from "react-redux";
import profilePic from "../Assets/images/profilePic.png";
// import nft from "../Assets/images/nft.jpg";
import "../Assets/css/custom.css";
// import YouTubeIcon from "@material-ui/icons/YouTube"
// import Twitter from "@material-ui/icons/Twitter"
// import Instagram from '@material-ui/icons/Instagram';
// import Telegram from "@material-ui/icons/Telegram";


class CreateCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CurrentCurrency: "",
            ComponentChart: null,
            tableData: [],
            IsTickerHovered: false,
            BaseCurrency: null,
            RenderFinished: false,

            FN: "No data available",
            BO: null,
        };
    }
    async componentDidMount() {
        const meta = [

            {
                name: " Recent Transactions"
            },
            {
                name: "Upcoming Payments"
            },
            {
                name: "Upcoming Payments"
            }

        ]
        this.setState({ tableData: meta });
    }
    render() {
        return (
            <div style={{ width: '70%', paddingLeft: '15%' }} >
                <h1 style={{ textAlign: "center", color: "black" }}>Create  your Customize </h1>
            
            </div>
        );
    }
}

export default CreateCollection;

