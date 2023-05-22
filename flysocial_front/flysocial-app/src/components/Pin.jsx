import urlBuilder from "@sanity/image-url";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { urlFor, client } from "../client";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { fetchUser } from "../utils/fetchUser";

const Pin = ({ pin: { postedBy, image, save, _id, destination } }) => {
  // console.log("Pin Fired");
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const navigate = useNavigate();
  const user = fetchUser();

  // ADVANCED:This function checks postedBy _id of the image to see how many matches the current user from local storage. (Technically it should only return one match).  It returns an array with that one user, hence you can check its length. This value is used in the condition for the Save button below.
  const alreadySaved = !!save?.filter((item) => item.posteBy._id === user.sub)
    ?.length;
  //
  //

  return (
    <div className='m-2'>
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-ld overflow-hidden transition-all duraton-500 ease-in-out'
      >
        <img
          src={urlFor(image.asset.url).width(250).url()}
          alt='user-post'
          className='rounded-lg w-full'
        />
        {/* This stylin, div, and functionality only happens on hover */}
        {postHovered && (
          <div
            className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
            style={{ height: "100%" }}
          >
            <div className='flex items-center justify-between'>
              <div className='flex gap-2'>
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  // e.stopPropogation prevents bubbling when the download icon is clicked
                  onClick={(e) => e.stopPropagation()}
                  className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type='button'
                  className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none'
                >
                  {save?.length} Saved
                </button>
              ) : (
                <button
                  type='button'
                  className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none'
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                >
                  Save Now
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pin;
