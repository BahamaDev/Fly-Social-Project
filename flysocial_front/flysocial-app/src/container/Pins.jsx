import React from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar, CreatePin, PinDetail, Search, Feed } from "../components";

const Pins = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div className='px-2 md:px-5'>
        <div className='bg-grey-50'>
          <Navbar searchTerm={searchTerm} user={user} />
        </div>
        <div className='h-full'>
          <Routes>
            <Route path='/' element={<Feed user={user} />} />
            <Route
              path='/category/:categoryId'
              element={<Feed user={user} />}
            />
            <Route
              path='/pin-detail/:pinId'
              element={<PinDetail user={user} />}
            />
            <Route path='/create-pin' element={<CreatePin user={user} />} />
            <Route
              path='/search'
              element={
                <Search setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Pins;
