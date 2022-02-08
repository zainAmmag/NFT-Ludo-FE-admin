





























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


componentDidMount(){


}

    render() {

        return (
            <div className="container-fluid body-content" id="">
                <div style={{ justifyContent: "center", float: "right" }}>
                    <Button> <Link to="/createCollection">Create Collections</Link></Button>
                </div>

                {/* <div id="container">
                    <div className="row">
                        <div
                            key={index}
                            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
                        >
                            <div className="nft__item m-0">
                                <div className="author_list_pp">
                                    <Link
                                        to={
                                            item?.ownerAddress === WalletAddress
                                                ? "/myprofile"
                                                : `/profile/${item?.ownerAddress}`
                                        }
                                    >
                                        <img
                                            className="lazy"
                                            src={httpUrl + "/" + item?.ownerImage}
                                            alt=""
                                        />
                                    </Link>
                                </div>
                                <div
                                    className="nft__item_wrap"
                                    onClick={() => {
                                        history.push(
                                            item?.ownerAddress === WalletAddress
                                                ? `/mynftdetails/${item?.id}/${item?.accountId}`
                                                : `/usernftdetail/${item?.id}/${item?.accountId}`
                                        );
                                    }}
                                >
                                    <span>
                                        <img
                                            onLoad={onImgLoad}
                                            src={httpUrl + "/" + item?.image}
                                            className="lazy "
                                            alt="Nft Pic"
                                            style={{
                                                width: "100%",
                                                height: 200,
                                                borderRadius: 8,
                                                objectFit: "contain",
                                            }}
                                        />
                                    </span>
                                </div>

                                <div
                                    className="nft__item_info d-flex justify-content-between"
                                    style={{ margin: 0 }}
                                >
                                    <span className="d-flex flex-column">
                                        <p
                                            style={{ fontSize: 13 }}
                                            onClick={() => {
                                                history.push(
                                                    `/nftsbycollections/${item?.collectionId}`
                                                );
                                            }}
                                        >
                                            {item?.collectionName}
                                        </p>
                                        <h4>{item?.name}</h4>
                                        <span>{item?.blockChainName}</span>
                                    </span>
                                    <div className="nft__item_price d-flex align-items-end flex-column">
                                        <span style={{ whiteSpace: "nowrap" }}>
                                            Price: {item?.buyPrice}
                                        </span>
                                    </div>
                                </div>

                                <div className="nft__item_like d-flex justify-content-end">
                                    <div>

                                        <span class="heart-icon">
                                            <i class="fa fa-heart" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div> */}

            </div>
        );
    }
}

export default ManageCollection;
