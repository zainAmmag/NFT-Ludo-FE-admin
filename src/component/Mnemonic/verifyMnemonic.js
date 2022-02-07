import React, { useState, useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "./../../Constants/BusinessManager";
import "./Mnemonic.css";
import { Link, useHistory, withRouter } from "react-router-dom";
import { randomArray } from "./../../Utils/Utils";
import {
  setToken,
  setEncryptedMnemonic,
  setEmail,
} from "./../../Common/CommonFunctions/CommonFunctions";
const VerifyMnemonic = (props) => {
  const history = useHistory();
  const [mnemonicArray, setMnemonicArray] = useState([]);
  const [randomMnemonicArray, setRandomMnemonicArray] = useState([]);
  const [selectedMnemonicArray, setSelectedMnemonicArray] = useState([]);
  const [initialMnemonicArray, setInitialMnemonicArray] = useState([]);
  const [verify, setVerify] = useState(true);
  useEffect(() => {
    setVerify(true);
    axios
      .get(BaseUrl + "GenerateMnemonic")
      .then(function (response) {
        // handle success
        console.log(response.data.Data);
        setInitialMnemonicArray(response.data.Data);
        let splittedString = stringToArray(response.data.Data);

        console.log("array", stringToArray(response.data.Data));
        let random = randomArray([...splittedString]);
        console.log("abc", random);
        setRandomMnemonicArray(random);

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

  const selectWord = (index) => {
    setSelectedMnemonicArray([
      ...selectedMnemonicArray,
      randomMnemonicArray.splice(index, 1),
    ]);
  };
  const clearMnemonics = () => {
    let splittedArray = [];
    splittedArray = stringToArray(initialMnemonicArray);

    setRandomMnemonicArray(randomArray([...splittedArray]));

    setSelectedMnemonicArray([]);
  };
  const verifyMnemonics = () => {
    setVerify(false);
  };
  const verifyArray = () => {
    let arrayToString = selectedMnemonicArray.join(" ");

    if (initialMnemonicArray == arrayToString) {
      axios({
        method: "post",
        url: BaseUrl + "Register",
        data: {
          email: props.email,
          password: props.password,
          mnemonics: initialMnemonicArray.trim(),
        },
      })
        .then((response) => {
          setEncryptedMnemonic(response.EncryptedMnemonics);
          setToken(response.Token);
          setEmail(props.email);
          history.push({
            pathname: "/overView",
          });
        })

        .catch((error) => {});
    } else {
      console.log("false");
    }
  };

  return (
    <div>
      {verify ? (
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
            <button className="verify-btn" onClick={verifyMnemonics}>
              Verify Mnemonics
            </button>{" "}
            <div className="sign-up">
              Go back to <Link to="SignUp">Sign Up</Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="mnemonic">
          <div className="mnemonic-text">
            {" "}
            Please save your mnemonics( write them down and keep it safe )
          </div>

          <div className="row">
            <ol className="order-li-selected">
              <li className="">
                1-{" "}
                {selectedMnemonicArray.length > 0
                  ? selectedMnemonicArray[0]
                  : null}
              </li>

              <li className="">
                2-
                {selectedMnemonicArray.length > 1
                  ? selectedMnemonicArray[1]
                  : null}
              </li>

              <li className="">
                3-
                {selectedMnemonicArray.length > 2
                  ? selectedMnemonicArray[2]
                  : null}
              </li>

              <li className="">
                4-
                {selectedMnemonicArray.length > 3
                  ? selectedMnemonicArray[3]
                  : null}
              </li>

              <li className="">
                5-
                {selectedMnemonicArray.length > 4
                  ? selectedMnemonicArray[4]
                  : null}
              </li>

              <li className="">
                6-
                {selectedMnemonicArray.length > 5
                  ? selectedMnemonicArray[5]
                  : null}
              </li>

              <li className="">
                7-
                {selectedMnemonicArray.length > 6
                  ? selectedMnemonicArray[6]
                  : null}
              </li>

              <li className="">
                8-
                {selectedMnemonicArray.length > 7
                  ? selectedMnemonicArray[7]
                  : null}
              </li>

              <li className="">
                9-
                {selectedMnemonicArray.length > 8
                  ? selectedMnemonicArray[8]
                  : null}
              </li>

              <li className="">
                10-
                {selectedMnemonicArray.length > 9
                  ? selectedMnemonicArray[9]
                  : null}
              </li>

              <li className="">
                11-
                {selectedMnemonicArray.length > 10
                  ? selectedMnemonicArray[10]
                  : null}
              </li>

              <li className="">
                12-
                {selectedMnemonicArray.length > 11
                  ? selectedMnemonicArray[11]
                  : null}
              </li>
            </ol>
          </div>
          <div className="row">
            <ol className="order-li">
              {randomMnemonicArray.length > 0
                ? randomMnemonicArray.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className=""
                        onClick={() => selectWord(index)}
                      >
                        {item}
                      </li>
                    );
                  })
                : null}
            </ol>
          </div>
          <div className="btn">
            <button className="verify-btn" onClick={verifyArray}>
              Verify Mnemonics
            </button>{" "}
            <button className="clear-btn" onClick={clearMnemonics}>
              Clear{" "}
            </button>
            <div className="sign-up">
              Go back to <Link>Sign Up</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyMnemonic;
