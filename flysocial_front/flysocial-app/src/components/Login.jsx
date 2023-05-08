import React from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import jwt_decode from "jwt-decode";
import logowhite from "../assets/logowhite.png";
import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();
  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS.", res);

    // Sends the response credential to local Storage
    localStorage.setItem("user", JSON.stringify(res));

    // Decodes the respose token so that you can read data.
    const credential = res.credential;
    const decoded = jwt_decode(credential);
    console.log(decoded);
    console.log(decoded.picture);

    // Object createde for Sanity Client Side (below).
    const doc = {
      _id: "decoded.iat",
      _type: "user",
      userName: decoded.name,
      image: decoded.picture,
    };
    console.log({ doc });

    // If the user does not already exist, this creates them in Sanity database then redirects the to the home page.
    client.createIfNotExists(doc).then(() => navigate("/", { replace: true }));
  };

  const onFailure = (res) => {
    console.log("LOGIN FAILED", res);
  };
  const clientId = process.env.REACT_APP_GOOGLE_API_TOKEN;

  return (
    <>
      <div className='flex justify-start items-center flex-col h-screen'>
        <div className='relative w-full h-full'>
          <video
            src={shareVideo}
            type='video/mp4'
            loop
            controls={false}
            muted
            autoPlay
            className='w-full h-full object-cover'
          />
          <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay '>
            <div className='p-5'>
              <img src={logowhite} width='130px' alt='logo' />
            </div>

            <div className='shadow-2xl'>
              <GoogleLogin
                clientId={clientId}
                buttonText='Login'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                scope={""}
                isSignedin={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
