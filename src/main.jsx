import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import Admin from "./admin/Admin";

import "./styles/style.css";

const caminho = window.location.pathname;

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    {caminho === "/admin" ? <Admin /> : <App />}
  </React.StrictMode>
);