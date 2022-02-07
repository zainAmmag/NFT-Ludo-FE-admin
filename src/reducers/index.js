import {
  ADD_WALLETS,
  SET_FOCUSED,
  SET_TOKEN,
  SET_API_INTERVAL,
  SET_INTERVAL_STARTED,
  SET_QR,
  SET_QRMERCHANTKEY,
  SET_DEFAULTS,
  SET_IS_LOADER_ACTIVE,
  SET_ISMERCHANT,
} from "../Constants/action-types";
const initialState = {
  Wallets: {},
  Focused: "",
  Token: "",
  Interval: null,
  IntervalStarted: false,
  QRCode: "",
  QRMerchantKey: "",
  Defaults: {},
  isLoaderActive:false,
  IsMerchant:true,
};
function rootReducer(state = initialState, action) {
  if (action.type === ADD_WALLETS) {
    return Object.assign({}, state, {
      Wallets: action.payload
    });
  }
  if (action.type === SET_DEFAULTS) {
    return Object.assign({}, state, {
      Defaults: action.payload
    });
  }
  if (action.type === SET_FOCUSED) {
    return Object.assign({}, state, {
      Focused: action.payload
    });
  }
  if (action.type === SET_TOKEN) {
    return Object.assign({}, state, {
      Token: action.payload
    });
  }
  if (action.type === SET_API_INTERVAL) {
    return Object.assign({}, state, {
      Interval: action.payload
    });
  }
  if (action.type === SET_INTERVAL_STARTED) {
    return Object.assign({}, state, {
      IntervalStarted: action.payload
    });
  }
  if (action.type === SET_QR) {
    return Object.assign({}, state, {
      QRCode: action.payload
    });
  }
  if (action.type === SET_QRMERCHANTKEY) {
    return Object.assign({}, state, {
      QRMerchantKey: action.payload
    });
  }
  if (action.type === SET_IS_LOADER_ACTIVE){
    return Object.assign({}, state, {
      isLoaderActive: action.payload
    });
  }
  if (action.type === SET_ISMERCHANT){
    return Object.assign({}, state, {
      IsMerchant: action.payload
    });
  }
  return state;
}
export default rootReducer;
