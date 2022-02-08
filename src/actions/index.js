import { SET_IS_LOADER_ACTIVE,METAMASK_CONNECTION,ADD_WALLETS,SET_FOCUSED,SET_TOKEN,SET_API_INTERVAL,SET_QR,SET_DEFAULTS, SET_INTERVAL_STARTED,SET_QRMERCHANTKEY, SET_ISMERCHANT} from "../Constants/action-types";

export function setIsLoaderActive(payload){
  return {type:SET_IS_LOADER_ACTIVE,payload:payload};
}


export function setMetamaskAction(payload){
  return {type:METAMASK_CONNECTION,payload:payload};
}






export function addWallets(payload) {
  return { type: ADD_WALLETS, payload:payload };
}
export function setDefaults(payload) {
  return { type: SET_DEFAULTS, payload:payload };
}
export function setFocused(payload) {
  return { type: SET_FOCUSED, payload:payload };
}
export function setToken(payload) {
  return { type: SET_TOKEN, payload:payload };
}
export function setApiInterval(payload) {
  return { type: SET_API_INTERVAL, payload:payload };
}
export function setIntervalStarted(payload) {
  return { type: SET_INTERVAL_STARTED, payload:payload };
}
export function setQR(payload) {
  return { type: SET_QR, payload:payload };
}
export function setQRMerchantKey(payload){
  return {type:SET_QRMERCHANTKEY,payload:payload};
}

export function setIsMerchant(payload){
  return {type:SET_ISMERCHANT,payload:payload};
}
