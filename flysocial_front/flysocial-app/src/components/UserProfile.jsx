import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import AiOutlineLogout from "react-icons/ai";

import { AiOutlineLogout } from "react-icons/ai";
import { googleLogout } from "@react-oauth/google";
import {
  userCreatePinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import { client } from "../client";
import { MasonryLayout } from "./MasonryLayout";
import Spinner from "./Spinner";

const UserProfile = ({}) => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("Created"); // Will be either Created or Saved
  const [activeBtn, setActiveBtn] = useState("created"); // Will be either Created or Saved
  const navigate = useNavigate();
  const clientId = process.env.REACT_APP_GOOGLE_API_TOKEN;

  const { userId } = useParams();
  const randomImage =
    "https://source.unsplash.com/1600x900/?nature,photography,technology";
  console.log(userId);

  const activeBtnStyle =
    "bg-red-500 text-white font-bold rounded-full w-20 outline-none";

  const notActiveBtnStyle =
    "bg-primary mr-4 text-black font-bold rounded-full w-20 outline-none";

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data) => {
      console.log(data);
      setUser(data[0]);
    });
  }, [userId]);

  if (!user) {
    return <Spinner message='Loading profile...' />;
  }
  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5'>
        <div className='relative flex-col mb-7 '>
          <div className='flex flex-col jusitify-center items-center'>
            <img
              src={randomImage}
              alt='banner'
              className='w-full h-370 2xl:h-510 shadow-lg object-cover'
            />
            <img
              src={user.image}
              alt='user-pic'
              className='rounded-full w-20 h-20 mt-10 shadow-xl object-cover'
            />
            <h1 className='font-bold text-3xl text-center mt-3'>
              {user.userName}
            </h1>

            <div className='absolute top-0 z-1 right-0 p-3'>
              {" "}
              <googleLogout
                clientId={clientId}
                buttonText='Login'
                onLogoutSuccess={logout}
                cookiePolicy={"single_host_origin"}
                scope={""}
                isSignedin={true}
                onClick={logout}
              >
                {" "}
                <button
                  type='button'
                  className='bg-white p-2 rounded-full cursor-pointer'
                >
                  <AiOutlineLogout color='red' fontSize={21} />
                </button>
              </googleLogout>
            </div>
          </div>

          <div className='text-center mb-7'>
            <button
              type='button'
              onClick={(e) => {
                setText(e.target.Content);
                setActiveBtn("created");
              }}
              className={`${
                activeBtn === "created" ? activeBtnStyle : notActiveBtnStyle
              }`}
              set
            >
              Created
            </button>

            <button
              type='button'
              onClick={(e) => {
                setText(e.target.Content);
                setActiveBtn("saved");
              }}
              className={`${
                activeBtn === "saved" ? activeBtnStyle : notActiveBtnStyle
              }`}
              set
            >
              Saved
            </button>
          </div>
        </div>
      </div>{" "}
      {user.userName}
    </div>
  );
};

export default UserProfile;
