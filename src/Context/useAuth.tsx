import { useEffect, useState, createContext } from "react";
import { UserProfile, UserProfileToken } from "../Models/Users";
import { useNavigate } from "react-router";
import {
  forgotPasswordAPI,
  googleLoginAPI,
  loginAPI,
  registerAPI,
  resetPasswordAPI,
  userSettingsPost,
} from "../Services/AuthService";
import React from "react";
import { toast } from "react-toastify";
import axios from "axios";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  changeSettings: (currencyCode: string) => void;
  handleGoogleLoginSuccess: (response: any) => void;
  forgotPassword: (email: string) => void;
  resetPassword: (email: string, token: string, newPassword: string) => void;
  handleGoogleLoginError: () => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };
const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    await registerAPI(email, username, password)
      .then((res) => {
        if (res) {
          setUserToken(res.data, "Login Success!", "/dashboard");
        }
      })
      .catch((e) => toast.warning("Server error occured"));
  };
  const loginUser = async (username: string, password: string) => {
    await loginAPI(username, password)
      .then((res) => {
        if (res) {
          setUserToken(res.data, "Login Success!", "/dashboard");
        }
      })
      .catch((e) => toast.warning("Server error occured"));
  };
  const changeSettings = async (currencyCode: string) => {
    await userSettingsPost({ currencyCode: currencyCode })
      .then((res) => {
        if (res) {
          setUserToken(res.data, "User settings updated.");
        }
      })
      .catch((e) => toast.warning("Server error occured"));
  };

  const forgotPassword = async (email: string) => {
    await forgotPasswordAPI(email)
      .then((res) => {
        toast.success(res?.data);
        navigate("/");
      })
      .catch((e) => toast.warning("Server error occured"));
  };
  const resetPassword = async (
    email: string,
    token: string,
    newPassword: string
  ) => {
    await resetPasswordAPI(email, token, newPassword)
      .then((res) => {
        if (res) {
          toast.success("Password updated");
          setUserToken(
            res.data,
            "Password reset, login complete.",
            "/dashboard"
          );
        } else {
          toast.warning(JSON.stringify(res));
        }
      })
      .catch((e) => toast.warning("Server error occured"));
  };
  const authapi = `${process.env.REACT_APP_APIHOST}auth/google`;

  const setUserToken = async (
    profile: UserProfileToken,
    successMsg: string,
    url?: string
  ) => {
    localStorage.setItem("token", profile.token);
    const userObj = {
      userName: profile.userName,
      email: profile.email,
      userCurrency: profile.userCurrency,
    };
    localStorage.setItem("user", JSON.stringify(userObj));
    setToken(profile.token!);
    axios.defaults.headers.common["Authorization"] = "Bearer " + profile.token;
    setUser(userObj!);
    toast.success(successMsg);
    if (url != undefined) navigate(url);
  };

  const handleGoogleLoginSuccess = async (response: any) => {
    const token = response.credential; // The Google JWT token

    // Send the token to your API
    googleLoginAPI(JSON.stringify({ token }))
      .then((res) => {
        if (res) {
          setUserToken(res?.data, "Login Success!", "/dashboard");
        }
      })
      .catch((e) => toast.warning("Server error occured"));
  };

  const handleGoogleLoginError = () => {
    console.log("Google Login Failed");
  };
  const isLoggedIn = () => {
    return !!user;
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{
        loginUser,
        changeSettings,
        user,
        token,
        logout,
        isLoggedIn,
        registerUser,
        handleGoogleLoginError,
        handleGoogleLoginSuccess,
        forgotPassword,
        resetPassword,
      }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};
export const useAuth = () => React.useContext(UserContext);
