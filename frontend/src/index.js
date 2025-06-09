import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import TestApp from "./TestApp";

// Use TestApp to verify React is working, then switch back to App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>,
);
