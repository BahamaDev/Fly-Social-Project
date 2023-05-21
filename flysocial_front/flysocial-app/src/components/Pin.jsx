import urlBuilder from "@sanity/image-url";
import React from "react";
import { urlFor } from "../client";

const Pin = ({ pin }) => {
  console.log("Pin Fired", pin);

  const checkStatus = () => {
    console.log("Check Status");
  };

  return (
    <div>
      {/* <button onClick={() => checkStatus()}> Click Pin </button> */}
      <img
        src={urlFor(pin.image.asset.url).width(250).url()}
        alt='user-post'
        className='rounded-lg w-full'
      />
    </div>
  );
};

export default Pin;
