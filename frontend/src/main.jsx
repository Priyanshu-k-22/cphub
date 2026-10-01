import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.jsx";
import "./shared/styles/index.css";

try {
  document.documentElement.dataset.theme =
    window.localStorage.getItem("cphub-theme") === "light" ? "light" : "dark";
} catch {
  document.documentElement.dataset.theme = "dark";
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
