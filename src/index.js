import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import AxiosDemo from "./AxiosDemo.js";
import RouterDemo from "./RouterDemo.js";
import Header from "./Header.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="container">
    <RouterDemo />
  </div>
);
