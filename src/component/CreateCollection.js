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
                <form style={{ paddingLeft: "15%" }} className="card">
                   
                    <label>
                        <p style={{ font: "bold" }} className="time1">Name</p>  <br />
                    </label>
                    <div className=" col-md-12 padding-0">
                        <input
                            type="text"
                            required
                            placeholder="e.g 'Crypto Funk' "
                            width={100}
                            style={{ backgroundColor: "white", color: "black", width: "366px" }}
                        />
                    </div>
                    <label>
                        <div className="pt-2"></div>
                        <p style={{ font: "bold" }} className="time1">URL</p>  <br />
                    </label>
                    <div className=" col-md-12 padding-0">
                        <input
                            type="text"
                            required
                            placeholder="e.g 'http;//google.com ' "
                            width={100}
                            style={{ backgroundColor: "white", color: "black", width: "366px" }}
                        />
                    </div>
                    <label>
                        <div className="pt-2"></div>

                        <p style={{ font: "bold" }} className="time1">Description</p>  <br />
                    </label>
                    <div className=" col-md-12 padding-0">
                        <input
                            type="text"
                            required
                            placeholder="e.g 'http;//google.com ' "
                            width={100}
                            style={{ backgroundColor: "white", color: "black", width: "366px" }}
                        />
                    </div>
                    <label>
                        <div className="pt-2"></div>

                        <p style={{ font: "bold" }} className="time1">Category</p>  <br />
                    </label>
                    <div className=" col-md-12 padding-0">
                        <select
                            type="text"
                            required
                            placeholder="e.g 'http;//google.com ' "
                            width={100}
                            style={{ backgroundColor: "rgb(255,255,255,0.3)", color: "black", width: "366px" }}
                        />
                    </div>
                    <label>
                        <div className="pt-2"></div>

                        <p style={{ font: "bold" }} className="time1">Links</p>  <br />
                    </label>
                    <div className=" col-md-12 padding-0">
                        <input
                            type="text"
                            required
                            placeholder="e.g 'http;//youtube.com' "
                            width={100}
                            style={{ backgroundColor: "white", color: "black", width: "366px" }}
                        />
                        <input
                            type="text"
                            required
                            placeholder="e.g 'http;//Discord.gg/your-account' "
                            width={100}
                            style={{ backgroundColor: "white", color: "black", width: "366px" }}
                        />
                        <input
                            type="text"
                            required
                            placeholder="e.g 'http;//twitter.com ' "
                            width={100}
                            style={{ backgroundColor: "white", color: "black", width: "366px" }}
                        />
                        <input
                            type="text"
                            required
                            placeholder="e.g 'http;//instagram.com ' "
                            width={100}
                            style={{ backgroundColor: "white", color: "black", width: "366px" }}
                        />
                        <input
                            type="text"
                            required
                            placeholder="e.g 'http;//google.com ' "
                            width={100}
                            style={{ backgroundColor: "white", color: "black", width: "366px" }}
                        />
                        <input
                            type="text"
                            required
                            placeholder="e.g 'http;//google.com ' "
                            width={100}
                            style={{ backgroundColor: "white", color: "black", width: "366px" }}
                        />

                    </div>


                </form>
            </div>
        );
    }
}

export default CreateCollection;

