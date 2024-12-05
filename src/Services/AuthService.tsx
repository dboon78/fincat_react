import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken, UserSettingsPost } from "../Models/Users";
import { formatLargeMonetaryNumber } from "../Helpers/NumberFormatting";

const api = `${process.env.REACT_APP_APIHOST}account/`;

const authapi = `${process.env.REACT_APP_APIHOST}google-auth/`;
export const userData = (): UserProfileToken | null => {
  const data = localStorage.getItem("user");
  if (!data) {
    return null;
  }
  try {
    return JSON.parse(data) as UserProfileToken;
  } catch (e) {
    console.error("failed to parse Json:", e);
    return null;
  }
};
export const getCurrencyCode = () => {
  const user = userData();
  if (user === null || user === undefined) return "USD";
  return user.userCurrency.code;
};

export const getUserCurrency = () => {
  const user = userData();
  if (user === null || user === undefined || user.userCurrency.code === "USD")
    return "$1 USD";
  return `${user.userCurrency.symbol}${user.userCurrency.value.toFixed(2)} ${
    user.userCurrency.code
  }`;
};

export const convertToBaseCurrency = (value: number) => {
  return `$${formatLargeMonetaryNumber(value)} USD`;
};
export const displayUserCurrency = (value: number) => {
  const user = userData();
  if (user === null || user === undefined) return value;
  return `${user.userCurrency.symbol}${formatLargeMonetaryNumber(value)} ${
    user.userCurrency.code
  }`;
};

export const convertToUserCurrency = (value: number) => {
  const user = userData();
  if (user === null || user === undefined) return value;

  const val = value * user.userCurrency.value;
  return `${user.userCurrency.symbol}${formatLargeMonetaryNumber(val)} ${
    user.userCurrency.code
  }`;
};

export const googleLoginAPI = async (form: string) => {
  try {
    //console.log("googleLoginAPI:", form);
    axios.defaults.headers.common["Content-Type"] = "application/json";

    const data = await axios.post<UserProfileToken>(authapi, form);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "login", {
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};
export const forgotPasswordAPI = async (email: string) => {
  try {
    const data = await axios.post<string>(api + "forgot-password", {
      email: email,
    });
    console.log("forgotPasswordAPI", email, data);

    return data;
  } catch (err) {
    handleError(err);
  }
};
export const resetPasswordAPI = async (
  email: string,
  token: string,
  newPassword: string
) => {
  try {
    console.log("resetPasswordAPI sent", email, token, newPassword);
    const data = await axios.post<UserProfileToken>(api + "reset-password", {
      email: email,
      token: token,
      newPassword: newPassword,
    });

    console.log("resetPasswordAPI received", data);
    return data;
  } catch (err) {
    handleError(err);
  }
};
export const registerAPI = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "register", {
      username: username,
      email: email,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const userSettingsPost = async (settings: UserSettingsPost) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "settings", settings);
    return data;
  } catch (error) {
    handleError(error);
  }
};
