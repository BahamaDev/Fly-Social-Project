import React from "react";
import { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes, useActionData } from "react-router-dom";
import { Sidebar, UserProfile, Login } from "../components";
import { client } from "../client";
import logo from "../assets/logo.png";
import Pins from "./Pins";
import { userQuery } from "../utils/data";
import { fetchUser } from "../utils/fetchUser";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  //Checks local storage for user.  If the user exists it parses and assigns. If not, it clears local storage.
  const userInfo = fetchUser();

  console.log("User info from Storage", userInfo.sub);

  useEffect(() => {
    const query = userQuery(userInfo.sub);

    // console.log(query);

    // userInfo && console.log("User on load", userInfo.sub);

    client.fetch(query).then((data) => {
      // console.log("Data at", data);
      setUser(data[0]);
      console.log(data[0]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <>
      {" "}
      <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
        <div className='hidden md:flex h-screen flex-initial '>
          <Sidebar user={user && user} />
        </div>
        <div className='flex md:hidden flex-row'>
          <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
            <HiMenu
              fontSize={40}
              className='cursor-pointer'
              onClick={() => setToggleSidebar(true)}
            />
            <Link to='/'>
              <img src={logo} alt='logo' className='w-28' />
            </Link>

            <Link to={`user-profile/${user?._id}`}>
              <img src={user?.image} alt='user Image' className='w-28' />
            </Link>
          </div>
          {/* Toggle Sidebar */}
          {toggleSidebar && (
            <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
              <div className='absolute w-full flex justify-end items-center p-2'>
                <AiFillCloseCircle
                  fontSize={30}
                  className='cursor-pointer'
                  onClick={() => setToggleSidebar(false)}
                />
              </div>
              <Sidebar user={user && user} closeToggle={setToggleSidebar} />
            </div>
          )}
        </div>

        {/* Scrolling Menu */}
        <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
          <Routes>
            <Route
              path='/user-profile/:userId'
              element={<UserProfile user={user} />}
            />
            <Route path='/*' element={<Pins user={user && user} />} />
            <Route />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Home;
