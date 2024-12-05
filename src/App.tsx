import { Outlet } from "react-router";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar/Navbar";
import { Tooltip } from "react-tooltip";
import React from "react";
function App() {
  return (
    <>
      <Tooltip
        id="my-tooltip"
        style={{ zIndex: 30 }}
        globalCloseEvents={{ clickOutsideAnchor: true }}
      />
      <Navbar />
      <Outlet />
      <ToastContainer />
    </>
  );
}

export default App;
