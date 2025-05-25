import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Use the createRoot API for React 18
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />,
);
