import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
const clientId =
  "897768674151-htcdj4vvf6upj92fem3q33hl86fe414b.apps.googleusercontent.com";
root.render(
  <Router>
    {" "}
    <GoogleOAuthProvider clientId={clientId}>
      <App />{" "}
    </GoogleOAuthProvider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
