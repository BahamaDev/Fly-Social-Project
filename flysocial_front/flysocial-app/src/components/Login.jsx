import React from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";

import logowhite from "../assets/logowhite.png";

const Login = () => {
  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS.", res);
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
