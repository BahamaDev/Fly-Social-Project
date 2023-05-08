import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./container/Home";
import { gapi } from "gapi-script";
import { useEffect } from "react";

const clientId = process.env.REACT_APP_GOOGLE_API_TOKEN;
const App = () => {
  useEffect(() => {
    function start() {
      gapi.client.init({ clientId: clientId, scope: "" });
    }

    gapi.load("client: auth2", start);
  });

  return (
    <>
      <Routes>
        <Route path='login' element={<Login />} />

        <Route path='/*' element={<Home />} />
      </Routes>{" "}
      {/* <h1 className='text-3xl font-bold underline'>Hello world!</h1>
        <h2>NADDDO</h2> */}
    </>
  );
};

export default App;
