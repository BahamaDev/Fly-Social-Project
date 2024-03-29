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
  // console.log("Pin Fired", destination);

  const [postHovered, setPostHovered] = useState(false);

  const navigate = useNavigate();
  const user = fetchUser();

  // ADVANCED:This function checks postedBy _id of the image to see how many matches the current user from local storage. (Technically it should only return one match).  It returns an array with that one user, hence you can check its length. This value is used in the condition for the Save button below.
  const alreadySaved = !!save?.filter((item) => item.postedBy._id === user?.sub)
    ?.length;
  //
  //

  // This function is built with methods(ei patch(), setIfMissing(), insert(), commit()) unique to Sanity, tapping into some of its unique capabilites.
  const savePin = (id) => {
    if (!alreadySaved?.length) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user?.sub,
            postedBy: { _type: "postedBy", _ref: user.sub },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
        });
    }
  };

  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

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
        {/* This styling, div, and functionality only happens on hover */}
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
                    console.log("click");
                    savePin(_id);
                    e.stopPropagation();
                  }}
                >
                  Save Now
                </button>
              )}
            </div>

            <div className='flex justify-between text-base items-center gap-2 w-full'>
              {destination && (
                <a
                  href={destination}
                  target='_blank'
                  rel='noreferrer'
                  className='bg-white flex items-center gap-2 text-black text-xs font-bold p-2 pl-4 pr-4 rounded full opacity-70 hover:100 hover:shadow-md'
                >
                  <BsFillArrowUpRightCircleFill />
                  {destination.length > 15
                    ? `${destination.slice(0, 15)}...`
                    : destination}
                </a>
              )}
              {postedBy?._id === user?.sub && (
                <button
                  type='button'
                  onClick={(e) => {
                    console.log("click");
                    deletePin(_id);
                    e.stopPropagation();
                  }}
                  className='bg-white p-2 opacity-70 hover:opacity-100 text-dark font-bold  text-base rounded-full hover:shadow-md outlined-none'
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`user-profile/${postedBy?._id}`}
        className='flex gap-2 mt-2 items-center'
      >
        <img
          src={postedBy?.image}
          alt='user-profile'
          className='w-8 h-8 rounded-full object-cover'
        />
      </Link>
      <p className='font-semibold capitalize'>{postedBy?.userName}</p>
    </div>
  );
};

export default Pin;
