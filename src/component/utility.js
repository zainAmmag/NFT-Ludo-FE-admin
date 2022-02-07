import { AsyncStorage } from "react";
import { AuthenticationTokenId } from "../Constants/BusinessManager"
import { getToken } from "../Utils/Utils";
export const SetAsyncStorage = async (Key, Value) => {
  try {
    await AsyncStorage.setItem(Key, Value);
  } catch (error) {
    throw new Error("Something went wrong!");
  }
};
export const GetAsyncStorage = async Key => {
  try {
    return await AsyncStorage.getItem(Key) || "NULL";
  } catch (error) {
    throw new Error("Something went wrong!");
  }
};
export const DeleteAsyncStorage = Key => {
  try {
    AsyncStorage.removeItem(Key);
  } catch (error) {
    throw new Error("Something went wrong!");
  }
};

export const SendHttpRequest = async (url = "", data = {}, method) => {
  var options = {}
  var temToken = "Barear "+getToken();
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("AUTHORIZATION", temToken)
data.Auth=temToken;
data.Channel="web";
  
  if (method == "GET" || method == "get") {
    options = {
      method: method,
      headers: myHeaders
    }
  }
  else {
    options = {
      method: method,
      headers: myHeaders,
      
      body: JSON.stringify(data)
    }
  }
  let response={};  
    response = await fetch(url, options);
const resData = await response.json();
  return resData;
};

