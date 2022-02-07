import React from "react";
import { Link } from "react-router-dom";
import Ticker from "react-ticker";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import { connect } from "react-redux";
import profilePic from "../Assets/images/profilePic.png";
import "../Assets/css/custom.css";
import coming from '../Assets/images/coming-soon.png';
import CreateCollection from "./CreateCollection";


class ManageCollection extends React.Component {
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
                name: " Collection"
            },
            {
                name: "Collection"
            },
            {
                name: "Collection"
            },
            {
                name: "Collection"
            },
            {
                name: "Collection"
            },
        ]
        this.setState({ tableData: meta });
    }
    render() {

        return (
            <div className="container-fluid body-content" id="">
                <div style={{ justifyContent: "center", float: "right" }}>
                    <Button> <Link to="/createCollection">Create Collections</Link></Button>
                </div>


                <div id="container">
                    <div className="row">
                        {
                            this.state.tableData.map((playerData, k) => (
                                <>
                                    <Col key={k} style={{ paddingTop: '15px' }} md={2} lg={4}>
                                        <div className="card buysellcard " style={{ width: "350px", margin: "0px 20px", paddingTop: '20px' }}>
                                            <div id="container" >
                                                <h3> {playerData.name}</h3>
                                                <div className="panal">
                                                    <img
                                                        src={coming}
                                                        alt="Etherem"
                                                        className="NFT-immage"
                                                        
                                                    />

                                                    <hr style={{ width: 300 }} />
                                                    <span className="head" style={{ fontSize: "20px" }}>
                                                        Name:.............

                                                    </span>
                                                    <hr />

                                                    <span className="head" style={{ fontSize: "20px", marginTop: '30%' }}>
                                                        Price:............
                                                        <hr />
                                                    </span>

                                                    <span className="head" style={{ fontSize: "20px", marginTop: '30%' }}>
                                                        Address:............
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                         </Col>
                                </>
                            )
                            )
                        }
                    </div>
                </div>

            </div>
        );
    }
}

export default ManageCollection;
