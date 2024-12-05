import React from "react";
import logo from "./Images/FinCatLogoText-black-150.png";
import "./Navbar.css";
import { useAuth } from "../../Context/useAuth";
import { Link } from "react-router-dom";

interface Props {}

const Navbar = (props: Props) => {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <nav className="fixed top-0 z-10 bg-white w-full zcontainer mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          <Link to="/dashboard">
            <img src={logo} alt="" className="w-36" />
          </Link>
          <div className="hidden font-bold md:flex">
            {isLoggedIn() ? (
              <Link to="/dashboard" className="text-black hover:text-darkBlue">
                Dashboard
              </Link>
            ) : (
              <></>
            )}
          </div>
        </div>
        {isLoggedIn() ? (
          <div className="flex items-center space-x-6 text-back">
            <div className="hidden md:flex">Welcome, {user?.userName}</div>
            <button
              onClick={logout}
              className="px-8 py-3 font-bold rounded-lg text-white bg-blue-700 hover:bg-blue-800 hover:opacity-70"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-6 text-back">
            <Link className="hover:text-darkBlue" to={"/login"}>
              Login
            </Link>
            <Link
              className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
              to={"/register"}
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
