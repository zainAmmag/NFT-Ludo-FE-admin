import React, { useState, useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "./../../Constants/BusinessManager";
import "./Mnemonic.css";
import { Link } from "react-router-dom";
const Mnemonic = () => {
  const [mnemonicArray, setMnemonicArray] = useState([]);
  useEffect(() => {
    axios
      .get(BaseUrl + "GenerateMnemonic")
      .then(function (response) {
        // handle success
        console.log(response.data.Data);
        let splittedString = stringToArray(response.data.Data);

        console.log("array", stringToArray(response.data.Data));

        setMnemonicArray(splittedString);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const stringToArray = (string) => {
    let splitString = string.split(" ");
    let array = [];
    splitString.map((item, index) => {
      array[index] = item;
    });
    return array;
  };

  const verifyMnemonics = () => {};
  return (
    <div>
      <div className="mnemonic">
        <div className="mnemonic-text">
          {" "}
          Please save your mnemonics( write them down and keep it safe )
        </div>

        <div className="row">
          <ol className="order-li">
            {mnemonicArray.length > 0
              ? mnemonicArray.map((item, index) => {
                  return (
                    <li key={index} className="">
                      {index + 1} {item}
                    </li>
                  );
                })
              : null}
          </ol>
        </div>
        <div className="btn">
          <Link to="/verifynemonic"><button className="verify-btn" >
            Verify Mnemonics
          </button>{" "}
          </Link>
          <div className="sign-up">
            Go back to <Link to="SignUp">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mnemonic;
