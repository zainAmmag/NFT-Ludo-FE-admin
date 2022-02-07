import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { SendHttpRequest } from "./utility";
import axios from "axios";
import {
  BaseUrl,
  AuthenticationTokenId,
  ImageBaseUrl,
  BaseUrlGet,
} from "../Constants/BusinessManager";

const UpdatePool = () => {
  const [data, setData] = useState();
  const { id } = useParams();
  useEffect(() => {
    getProject(id);
  }, []);

  function getProject(Id) {
    axios
      .get(BaseUrl + `v1/Pool/GetPoolByIdAdmin?ProjectId=${Id}`)
      .then((resp) => {
        setData(resp.data.data);
        // console.log(resp.data.data)
      })
      .catch((error) => {});
  }

  return (
    <div>
      <div className="form-group row">
        <div className="col-sm-6">
          <label
            htmlFor="fullName"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Full Name
          </label>
          <input
            defaultValue={data?.fullName}
            type="text"
            name="fullName"
            className="form-control"
            placeholder="Full name"
          />
        </div>
        <div className="col-sm-6">
          <label
            htmlFor="title"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Title
          </label>
          <input
            defaultValue={data?.title}
            type="text"
            name="title"
            className="form-control"
            placeholder="Title"
          />
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-6">
          <label
            htmlFor="telegram"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Telegram
          </label>
          <input
            defaultValue={data?.telegram}
            type="text"
            name="telegram"
            className="form-control"
            placeholder="Telegram"
          />
        </div>
        <div className="col-sm-6">
          <label
            htmlFor="email"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Email
          </label>
          <input
            defaultValue={data?.email}
            type="text"
            name="email"
            className="form-control"
            placeholder="Email"
          />
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-6">
          <label
            htmlFor="projectName"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Project Name
          </label>
          <input
            defaultValue={data?.projectName}
            type="text"
            name="projectName"
            className="form-control"
            placeholder="Project name"
          />
        </div>
        <div className="col-sm-6">
          <label
            htmlFor="websiteUrl"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Website Url
          </label>
          <input
            defaultValue={data?.websiteURL}
            type="text"
            name="websiteUrl"
            className="form-control"
            placeholder="Website Url"
          />
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-6">
          <label
            htmlFor="whitepaperUrl"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Whitepaper Url
          </label>
          <input
            defaultValue={data?.whitepaperURL}
            type="text"
            name="whitepaperUrl"
            className="form-control"
            placeholder="Whitepaper Url"
          />
        </div>
        <div className="col-sm-6">
          <label
            htmlFor="linkToDesk"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Link to Desk
          </label>
          <input
            defaultValue={data?.linktoDeck}
            type="text"
            name="linkToDesk"
            className="form-control"
            placeholder="Link to Desk"
          />
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-6">
          <label
            htmlFor="projectTwitter"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Project Twitter
          </label>
          <input
            defaultValue={data?.projectTwitter}
            type="text"
            name="projectTwitter"
            className="form-control"
            placeholder="Project Twitter"
          />
        </div>
        <div className="col-sm-6">
          <label
            htmlFor="projectTelegram"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Project Telegram
          </label>
          <input
            defaultValue={data?.projectTelegram}
            type="text"
            name="projectTelegram"
            className="form-control"
            placeholder="Project Telegram"
          />
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-6">
          <label
            htmlFor="projectGithub"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Project Github
          </label>
          <input
            defaultValue={data?.projectGithub}
            type="text"
            name="projectGithub"
            className="form-control"
            placeholder="Project Github"
          />
        </div>
        <div className="col-sm-6">
          <label
            htmlFor="projectDescription"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Project Description
          </label>
          <textarea
            defaultValue={data?.projectDescription}
            type="text"
            name="projectDescription"
            className="form-control"
            placeholder="Project Description"
          />
        </div>
      </div>

      <div className="form-group row">
        <div className="col-sm-6">
          <label
            htmlFor="tokenInformation"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Token Information
          </label>
          <input
            defaultValue={data?.tokenInformation}
            type="text"
            name="tokenInformation"
            className="form-control"
            placeholder="Token Information"
          />
        </div>
        <div className="col-sm-6">
          <label
            htmlFor="productDevelopmentState"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Product Development State
          </label>
          <input
            defaultValue={data?.productDevelopmentState}
            type="text"
            name="productDevelopmentState"
            className="form-control"
            placeholder="Product Development State"
          />
        </div>
      </div>

      <div className="form-group row">
        <div className="col-sm-6">
          <label
            htmlFor="developmentRoadmap"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Development Roadmap
          </label>
          <input
            defaultValue={data?.developmentRoadmap}
            type="text"
            name="developmentRoadmap"
            className="form-control"
            placeholder="Development Roadmap"
          />
        </div>
        <div className="col-sm-6">
          <label
            htmlFor="uniqueValueProposition"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Unique Value Proposition
          </label>
          <input
            defaultValue={data?.uniqueValueProposition}
            type="text"
            name="uniqueValueProposition"
            className="form-control"
            placeholder="Unique Value Proposition"
          />
        </div>
      </div>

      <div className="form-group row">
        <div className="col-sm-6">
          <label
            htmlFor="cardonoContribution"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Cardono Contribution
          </label>
          <input
            defaultValue={data?.cardonoContribution}
            type="text"
            name="cardonoContribution"
            className="form-control"
            placeholder="Cardono Contribution"
          />
        </div>
        <div className="col-sm-6">
          <label
            htmlFor="projectFinancingStructure"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Project Financing Structure
          </label>
          <input
            defaultValue={data?.projectFinancingStructure}
            type="text"
            name="projectFinancingStructure"
            className="form-control"
            placeholder="Project Financing Structure"
          />
        </div>
      </div>

      <div className="form-group row">
        <div className="col-sm-6">
          <label
            htmlFor="blockchainName"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Blockchain Name
          </label>
          <input
            defaultValue={data?.blockChainName}
            type="text"
            name="blockchainName"
            className="form-control"
            placeholder="Blockchain Name"
          />
        </div>
        <div className="col-sm-6">
          <label
            htmlFor="contractAddres"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Contract Address
          </label>
          <input
            defaultValue={data?.contractAddress}
            type="text"
            name="contractAddress"
            className="form-control"
            placeholder="Contract Address"
          />
        </div>
      </div>

      <div className="form-group row">
        <div className="col-sm-6">
          <label
            htmlFor="shortDescription"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Short Description
          </label>
          <input
            defaultValue={data?.shortDescription}
            type="text"
            name="shortDescription"
            className="form-control"
            placeholder="Short Description"
          />
        </div>
        <div className="col-sm-6">
          <label
            htmlFor="raiseTarget"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Raise Target
          </label>
          <input
            defaultValue={data?.raiseTarget}
            type="number"
            type="text"
            name="raiseTarget"
            className="form-control"
            placeholder="Raise Target (usd)"
          />
        </div>
      </div>

      <div className="form-group row">
        <div className="col-sm-6">
          <label
            htmlFor="StartDate"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Start Date
          </label>
          <input
            defaultValue={data?.startDate.split("T")[0]}
            type="text"
            type="date"
            name="StartDate"
            className="form-control"
            placeholder="Start Date"
          />
        </div>
        <div className="col-sm-6">
          <label
            htmlFor="EndDate"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            End Date
          </label>
          <input
            defaultValue={data?.endDate.split("T")[0]}
            type="text"
            type="date"
            name="EndDate"
            className="form-control"
            placeholder="Start Date"
          />
        </div>
        <div className="col-sm-6">
          <label
            htmlFor="LiveDate"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Live Date
          </label>
          <input
            defaultValue={data?.liveDate.split("T")[0]}
            type="text"
            type="date"
            name="LiveDate"
            className="form-control"
            placeholder="Start Date"
          />
        </div>
        <div className="col-sm-6">
          <label
            htmlFor="ClaimDate"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Claim Date
          </label>
          <input
            defaultValue={data?.claimDate.split("T")[0]}
            type="text"
            type="date"
            name="ClaimDate"
            className="form-control"
            placeholder="Start Date"
          />
        </div>
      </div>

      <div className="form-group row">
        <div className="col-sm-6">
          <label
            htmlFor="supplyAmount"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Supply Amount
          </label>
          <input
            defaultValue={data?.supplyAmount}
            type="number"
            type="text"
            name="supplyAmount"
            className="form-control"
            placeholder="Supply Amount"
          />
        </div>
        <div className="col-sm-6">
          <label
            htmlFor="tokenRate"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Token Rate (usd)
          </label>
          <input
            defaultValue={data?.tokenRate}
            type="text"
            type="number"
            name="tokenRate"
            className="form-control"
            placeholder="Token Rate (usd)"
          />
        </div>
      </div>

      <div className="form-group row">
        <div className="col-sm-6">
          <label
            htmlFor="supplyTransactionHash"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Supply TransactionHash
          </label>
          <input
            // defaultValue={data?.fullName}
            type="text"
            name="supplyTransactionHash"
            className="form-control"
            placeholder="Supply TransactionHash"
          />
        </div>
        <div className="col-sm-6">
          <label
            htmlFor="supplyTransactionHash"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Supply Transaction Status
          </label>
          <input
            defaultValue={data?.supplyTransactionStatus}
            type="text"
            name="supplyTransactionHash"
            className="form-control"
            placeholder="Supply Transaction Status"
          />
        </div>
      </div>

      <div className="form-group row">
        <div className="col-sm-6">
          <label
            htmlFor="remainingSupply"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Remaining Supply
          </label>
          <input
            defaultValue={data?.remainingSupplyAmount}
            type="number"
            name="remainingSupply"
            className="form-control"
            placeholder="Remaining Supply"
          />
        </div>
        <div className="col-sm-6">
          <label
            htmlFor="pendingSupplyDeposit"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Pending Supply deposit
          </label>
          <input
            // defaultValue={data?.fullName}
            type="number"
            name="pendingSupplyDeposit"
            className="form-control"
            placeholder="Pending Supply deposit"
          />
        </div>
      </div>

      <div className="form-group row">
        <div className="col-sm-6">
          <label
            htmlFor="confirmedSupplyDeposited"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Confirmed Supply Deposited
          </label>
          <input
            // defaultValue={data?.fullName}
            type="number"
            name="confirmedSupplyDeposited"
            className="form-control"
            placeholder="Confirmed Supply Deposited"
          />
        </div>
        <div className="col-sm-6">
          <label
            htmlFor="createdAt"
            className="col-form-label TEXTFIELD_FIRST"
            style={{ fontWeight: "bold", textTransform: "uppercase" }}
          >
            Created At
          </label>
          <input
            // defaultValue={data?.fullName}
            type="date"
            name="createdAt"
            className="form-control"
            placeholder="Created At"
          />
        </div>
      </div>
      <div style={{textAlign:"center",margin:"30px 0px"}}>
      <button
        type="submit"
        className="create-btn"
        style={{
          fontWeight: "bold",
          letterSpacing: 1,
          width: "30%",
        
        }}
      >
        Update
      </button>
      </div>
    </div>
  );
};

export default UpdatePool;
