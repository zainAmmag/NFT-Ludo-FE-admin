import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import swal from "sweetalert";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { SendHttpRequest } from "./utility";
import moment from "moment";

import axios from "axios";
import {
  BaseUrl,
  AuthenticationTokenId,
  ImageBaseUrl,
  BaseUrlGet,
} from "../Constants/BusinessManager";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setIsLoaderActive } from "../actions/index";
import { getToken } from "../Utils/Utils";

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoaderActive: bindActionCreators(setIsLoaderActive, dispatch),
  };
};
const UpdatePool = (props) => {
  const [data, setData] = useState();
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [PoolData, setPoolData] = useState({
    projectId: "",
    projectName: "",
    liveDate: "",
    endDate: "",
    claimDate: "",
    supplyAmount: "",
    minimumInvestment: "",
    maximumInvestment: "",
    stackingContractAddress: "",
  });

  const onHandleChange = (event) => {
    const { name, value } = event.target;

    setPoolData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [ProjectId, SetProjectId] = useState();
  useEffect(() => {
    getProject(id);
  }, []);

  function getProject(Id) {
    props.setIsLoaderActive(true);
    axios
      .get(BaseUrl + `v1/Pool/GetPoolByIdAdmin?ProjectId=${Id}`)
      .then((resp) => {
        props.setIsLoaderActive(false);
        setData(resp.data.data);
        SetProjectId(resp.data.data.id);
        setPoolData({
          projectId: resp?.data.data?.id,
          projectName: resp?.data.data ? resp?.data.data?.projectName : "",
          liveDate: resp?.data.data
            ? resp?.data.data?.liveDate?.split("T")[0]
            : "",
          endDate: resp?.data.data
            ? resp?.data.data?.endDate?.split("T")[0]
            : "",
          claimDate: resp?.data.data
            ? resp?.data.data?.claimDate?.split("T")[0]
            : "",
          supplyAmount: resp?.data.data ? resp?.data.data?.supplyAmount : "",
          minimumInvestment: resp?.data.data
            ? resp?.data.data?.minimumInvestment
            : "",
          maximumInvestment: resp?.data.data
            ? resp?.data.data?.maximumInvestment
            : "",
          stackingContractAddress: resp?.data.data
            ? resp?.data.data?.stackingContractAddress
            : "",
        });
      })
      .catch((error) => {props.setIsLoaderActive(false);});
  }

  const GoLivePool = async () => {
    props.setIsLoaderActive(true);
    axios
      .get(BaseUrl + `v1/Pool/GoLivePool?ProjectId=${ProjectId}`, {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      })
      .then((resp) => {
        props.setIsLoaderActive(false);
        if (resp?.data?.isSuccess === true) {
          swal({
            icon: "success",
            title: resp.data.message,
          });
          setTimeout(() => window.location.reload(), 2000);
        } else {
          swal({
            icon: "error",
            title: resp?.data?.message || "Something Went Wrong",
          });
        }
      })
      .catch((error) => {
        props.setIsLoaderActive(false);
        swal({
          icon: "error",
          title: "Something Went Wrong",
        });
      });
  };

  const RejectPool = async () => {
    props.setIsLoaderActive(true);
    axios
      .get(BaseUrl + `v1/Pool/RejectPool?ProjectId=${ProjectId}`, {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      })
      .then((resp) => {
        props.setIsLoaderActive(false);
        if (resp?.data?.isSuccess === true) {
          swal({
            icon: "success",
            title: resp.data.message,
          });
          setTimeout(() => window.location.reload(), 2000);
        } else {
          swal({
            icon: "error",
            title: resp?.data?.message || "Something Went Wrong",
          });
        }
      })
      .catch((error) => {
        props.setIsLoaderActive(false);
        swal({
          icon: "error",
          title: "Something Went Wrong",
        });
      });
  };

  const EndIdo = async () => {
    props.setIsLoaderActive(true);
    axios
      .get(BaseUrl + `v1/Pool/EndPool?ProjectId=${ProjectId}`, {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      })
      .then((resp) => {
        props.setIsLoaderActive(false);
        if (resp?.data?.isSuccess === true) {
          swal({
            icon: "success",
            title: resp.data.message,
          });
          setTimeout(() => window.location.reload(), 2000);
        } else {
          swal({
            icon: "error",
            title: resp?.data?.message || "Something Went Wrong",
          });
        }
      })
      .catch((error) => {
        props.setIsLoaderActive(false);
        swal({
          icon: "error",
          title: "Something Went Wrong",
        });
      });
  };

  const SendCollectedInvestmentPool = async () => {
    props.setIsLoaderActive(true);
    axios
      .get(
        BaseUrl + `v1/Pool/SendCollectedInvestmentPool?ProjectId=${ProjectId}`,
        {
          headers: {
            Authorization: "Bearer " + getToken(),
          },
        }
      )
      .then((resp) => {
        props.setIsLoaderActive(false);
        if (resp?.data?.isSuccess === true) {
          swal({
            icon: "success",
            title: resp.data.message,
          });
          setTimeout(() => window.location.reload(), 2000);
        } else {
          swal({
            icon: "error",
            title: resp?.data?.message || "Something Went Wrong",
          });
        }
      })
      .catch((error) => {
        props.setIsLoaderActive(false);
        swal({
          icon: "error",
          title: "Something Went Wrong",
        });
      });
  };
  const AllowClaims = async () => {
    props.setIsLoaderActive(true);
    axios
      .get(BaseUrl + `v1/Pool/AllowClaims?ProjectId=${ProjectId}`, {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      })
      .then((resp) => {
        props.setIsLoaderActive(false);
        if (resp?.data?.isSuccess === true) {
          swal({
            icon: "success",
            title: resp.data.message,
          });
          setTimeout(() => window.location.reload(), 2000);
        } else {
          swal({
            icon: "error",
            title: resp?.data?.message || "Something Went Wrong",
          });
        }
      })
      .catch((error) => {
        props.setIsLoaderActive(false);
        swal({
          icon: "error",
          title: "Something Went Wrong",
        });
      });
  };

  const ApprovePool = async (e) => {
    e.preventDefault();
    // console.log(PoolData);
    props.setIsLoaderActive(true);
    axios
      .post(BaseUrl + `v1/Pool/ApprovePool`, PoolData, {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      })
      .then((resp) => {
        props.setIsLoaderActive(false);
        if (resp?.data?.isSuccess === true) {
          swal({
            icon: "success",
            title: resp.data.message,
          });
          setTimeout(() => window.location.reload(), 2000);
        } else {
          swal({
            icon: "error",
            title: resp?.data?.message || "Something Went Wrong",
          });
        }
      })
      .catch((error) => {
        props.setIsLoaderActive(false);
        swal({
          icon: "error",
          title: "Something Went Wrong",
        });
      });
  };
  return (
    <div>
      <div style={{ textAlign: "center", margin: "30px 0px" }}>
        {data && (
          <>
            {data.poolStatus == "ComingSoon" && (
              <button
                onClick={GoLivePool}
                type="submit"
                className="create-btn"
                style={{
                  fontWeight: "bold",
                  letterSpacing: 1,
                  width: "30%",
                  marginBottom: "20",
                }}
              >
                Go Live Now
              </button>
            )}
            <br />
            {(data.adminStatus == "Rejected" ||
              data.adminStatus == "InReview" ||
              data.adminStatus == "None") && (
              <button
                onClick={handleShow}
                type="submit"
                className="create-btn"
                style={{
                  fontWeight: "bold",
                  letterSpacing: 1,
                  width: "30%",
                  marginBottom: "20",
                }}
              >
                Approve
              </button>
            )}
            <br />
            {data.poolStatus == "ComingSoon" &&
              (data.adminStatus == "Verified" ||
                data.adminStatus == "InReview") && (
                <button
                  onClick={RejectPool}
                  type="submit"
                  className="create-btn"
                  style={{
                    fontWeight: "bold",
                    letterSpacing: 1,
                    width: "30%",
                    marginBottom: "20",
                  }}
                >
                  Reject
                </button>
              )}
            <br />
            {data.poolStatus == "Live" && (
              <button
                type="submit"
                className="create-btn"
                onClick={EndIdo}
                style={{
                  fontWeight: "bold",
                  letterSpacing: 1,
                  width: "30%",
                  marginBottom: "20",
                }}
              >
                End IDO
              </button>
            )}
            {data.poolStatus == "Ended" &&
              data.isStackingInvestmentSended == false && (
                <button
                  onClick={SendCollectedInvestmentPool}
                  type="submit"
                  className="create-btn"
                  style={{
                    fontWeight: "bold",
                    letterSpacing: 1,
                    width: "30%",
                    margin: "20",
                  }}
                >
                  Send Investments to IDO owner
                </button>
              )}
            {data.poolStatus == "Ended" && data.isClaimable == false && (
              <button
                onClick={AllowClaims}
                type="submit"
                className="create-btn"
                style={{
                  fontWeight: "bold",
                  letterSpacing: 1,
                  width: "30%",
                  margin: "20",
                }}
              >
                Allow Claims
              </button>
            )}
            <br />
            {data && (
              <div
                className="container "
                style={{ fontSize: 16, color: "white" }}
              >
                <div className="row">
                  <div className="col-4 text-center">Icon</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {" "}
                    {data && data?.image && (
                      <img
                        alt=""
                        style={{
                          width: "auto",
                          maxWidth: "inherit",
                          height: "auto",
                        }}
                        src={BaseUrlGet + data?.image}
                      />
                    )}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">Full Name</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.fullName}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">Title</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.title}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">Telegram</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.telegram}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">Email</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.email}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">Project Name</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.projectName}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">Website Url</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.websiteURL}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">Whitepaper URL</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.whitepaperURL}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">Link to Deck</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.linktoDeck}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">Project Twitter</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.projectTwitter}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">Project Telegram</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.projectTelegram}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">Project Github</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.projectGithub}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">Project Description</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.projectDescription}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">Token Information</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.tokenInformation}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">
                    Product Development State
                  </div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.productDevelopmentState}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">Development Roadmap</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.developmentRoadmap}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">
                    Unique Value Proposition
                  </div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.uniqueValueProposition}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">Cardono Contribution</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.cardonoContribution}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">
                    Project Financing Structure
                  </div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.projectFinancingStructure}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">BlockChain Name</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.blockChainName}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">Contract Address</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.contractAddress}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">Short Description</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.shortDescription}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">Token Rate</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.tokenRate}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">Token Symbol</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.tokenSymbol}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">Token Name</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.tokenName}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">
                    Staking Address (owner address for investment)
                  </div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.stackingContractAddress}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">IDO Address</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.idoContractAddress}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">
                    Stable Contract Address
                  </div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.stableContractAdress}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">
                    Stacking Contract Address Transaction Hash
                  </div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.stackingContractAddressTransactionHash}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">Raise Target</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.raiseTarget}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">Supply Amount</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.supplyAmount}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">
                    Remaining Supply Amount
                  </div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.remainingSupplyAmount}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">
                    Supply Transaction Status
                  </div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.supplyTransactionStatus}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">Start Date</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.startDate &&
                      moment(data?.startDate).format("MM-DD-YYYY")}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">End Date</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.endDate &&
                      moment(data?.endDate).format("MM-DD-YYYY")}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">Claim Date</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.claimDate &&
                      moment(data?.claimDate).format("MM-DD-YYYY")}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">Audit Status</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.auditStatus}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">Admin Status</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.adminStatus}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">Background Image</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.backgroundImageFile && (
                      <img
                      style={{maxWidth: "inherit"}}
                        alt=""
                        src={BaseUrlGet + data?.backgroundImageFile}
                      />
                    )}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">
                    Current Currency Exchange Rate
                  </div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.currentCurrencyExchangeRate}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">
                    Token Distribution Count
                  </div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.tokenDistributionCount}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">Minimum Investment</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.minimumInvestment}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">Maximum Investment</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.maximumInvestment}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="row">
                  <div className="col-4 text-center">Pool Status</div>
                  <div
                    className="col"
                    style={{ overflow: "auto", overflowWrap: "break-word" }}
                  >
                    {data?.poolStatus}
                  </div>
                </div>
                <hr className="mt-2 mb-2" />
              </div>
            )}
          </>
        )}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ background: "black" }} closeButton>
          <Modal.Title>Edit And Approve</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={ApprovePool}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Project Name </Form.Label>
              <Form.Control
                required
                onChange={onHandleChange}
                value={PoolData.projectName}
                name="projectName"
                type="Text"
                placeholder="Enter Project Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Supply Amount </Form.Label>
              <Form.Control
                required
                onChange={onHandleChange}
                value={PoolData.supplyAmount}
                name="supplyAmount"
                type="Text"
                placeholder="Enter Supply Amount"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Minumum Investment </Form.Label>
              <Form.Control
                required
                onChange={onHandleChange}
                value={PoolData.minimumInvestment}
                name="minimumInvestment"
                type="number"
                placeholder="Enter Minumum Investment"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Maximum Investment </Form.Label>
              <Form.Control
                required
                onChange={onHandleChange}
                value={PoolData.maximumInvestment}
                name="maximumInvestment"
                type="number"
                placeholder="Enter Maximum Investment"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Owner Address (for investment payout) </Form.Label>
              <Form.Control
                required
                onChange={onHandleChange}
                value={PoolData.stackingContractAddress}
                name="stackingContractAddress"
                type="Text"
                placeholder="Enter Owner Address"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Live Date:</Form.Label>
              <Form.Control
                required
                value={PoolData.liveDate}
                name="liveDate"
                onChange={onHandleChange}
                type="date"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> End Date </Form.Label>
              <Form.Control
                required
                value={PoolData.endDate}
                name="endDate"
                onChange={onHandleChange}
                type="date"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Claim Date </Form.Label>

              <Form.Control
                required
                value={PoolData.claimDate}
                name="claimDate"
                onChange={onHandleChange}
                type="date"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Button type="submit" variant="primary">
                Approve Pool
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(UpdatePool);
