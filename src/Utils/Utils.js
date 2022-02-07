import { AuthenticationTokenId, UserDetailId } from "../Constants/BusinessManager";

var CryptoJS = require("crypto-js");

export const randomArray = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
export function MK() {
  // return "M@$terKey()FQ[]@nt@pp+@mm@G";
  return "DmjLAkNAZELaOL/mWSY4UfoKuADdduGW";
}
export function encryptDesCbcPkcs7Padding(message, key) {
  var keyWords = CryptoJS.enc.Base64.parse(key);
  var encrypted = CryptoJS.TripleDES.encrypt(message, keyWords, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.ZeroPadding,
  });
  return encrypted.toString();
}
export function SetUser(token,name,email)
{
  localStorage.setItem(AuthenticationTokenId,token);
  localStorage.setItem(UserDetailId,JSON.stringify({Name:name,Email:email}));
}
export function getToken(){
  return localStorage.getItem(AuthenticationTokenId);
}
export function getUser()
{
  return JSON.parse(localStorage.getItem(UserDetailId)||"{}");
}