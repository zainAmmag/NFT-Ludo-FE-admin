export const setMnemonic = (value) => {
  localStorage.setItem("mnemonic", value);
};
export const getMnemonic = () => {
  return localStorage.getItem("mnemonic");
};

export const setEncryptedMnemonic = (value) => {
  localStorage.setItem("EncryptedMnemonic", value);
};
export const getEncryptedMnemonic = () => {
  return localStorage.getItem("EncryptedMnemonic");
};

export const setToken = (value) => {
  localStorage.setItem("Token", value);
};
export const getToken = () => {
  return localStorage.getItem("Token");
};

export const setEmail = (value) => {
  localStorage.setItem("email", value);
};
export const getEmail = () => {
  return localStorage.getItem("email");
};
