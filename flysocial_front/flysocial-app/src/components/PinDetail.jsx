import React from "react";
import { useState, useEffect } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { client, urlFor } from "../client";
import MasonryLayout from "./MasonryLayout";
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data";
import Spinner from "./Spinner";

const PinDetail = ({ user }) => {
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);

  const { pinId } = useParams();

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: uuidv4(),
            postedBy: {
              _type: "postedBy",
              _ref: user._id,
            },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment("");
          setAddingComment(false);
        });
    }
  };

  //  This function first gets data based on the pinId. Then if further queries using the info from the initial query, to get all related pins.
  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);
    //  Gets original pin.
    if (query) {
      client.fetch(query).then((data) => {
        // console.log("fetched Data", data);
        setPinDetail(data[0]);

        // Gets all related pin.
        if (data[0]) {
          query = pinDetailMorePinQuery(data[0]);
          client.fetch(query).then((res) => {
            // console.log(res);
            setPins(res);
          });
        }
      });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, []);

  if (!pinDetail) return <Spinner message='Loading Pin' />;

  // console.log("detial rendered");
  return (
    <div
      className='flex  xl-flex-row flex-col m-auto bg-white'
      style={{ maxWidth: "1500px", borderRadius: "32px" }}
    >
      <div className='flex justify-center items-center md:items-start flex initial'>
        <img
          src={pinDetail?.image && urlFor(pinDetail.image).url()}
          alt='user-post'
          className='rounded-t-3xl rounded-b-lg'
        />
      </div>
      <div className='w-full p-5 flex-1 xl:min-w-620'>
        {/* Info Section  */}
        <div className='flex items-center justify-between'>
          <div className='flex gap-2 items-center'>
            {" "}
            <a
              href={`${pinDetail.image?.asset?.url}?dl=`}
              download
              // e.stopPropogation prevents bubbling when the download icon is clicked
              onClick={(e) => e.stopPropagation()}
              className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
            >
              <MdDownloadForOffline />
            </a>
          </div>

          <a href={pinDetail?.destination} target='_black' rel='noreferrer'>
            {pinDetail.destination}
          </a>
        </div>
        <div className=''>
          <h1 className='text-4xl font-bold break-word mt-3'>
            {pinDetail.title}
          </h1>
          <p className='mt-3'>{pinDetail.about}</p>
        </div>
        {/*  */}
        {/*  */}
        {/*User Header  */}
        <Link
          to={`user-profile/${pinDetail.postedBy?._id}`}
          className='flex gap-2 mt-5 items-center bg-white rounded-lg'
        >
          <img
            src={pinDetail.postedBy?.image}
            alt='user-profile'
            className='w-8 h-8 rounded-full object-cover'
          />
        </Link>
        <h2 className='mt-5 text-2xl'>Comments</h2>
        {/*  */}
        {/*  */}
        {/*Container for the comments */}
        {/*Container for the comments */}
        <div className=' max-h-370 overflow-y-auto '>
          {pinDetail?.comments?.map((item, i) => {
            return (
              <div
                className='flex gap-2 mt-5 items-center bg-white rounded-lg'
                key={i}
              >
                {/* <img
                src={item.postedBy.image}
                alt='user-profile'
                className='w-10 h-10 rounded-full cursor-pointer'
              /> */}
                <div className='flex flex-col'>
                  {" "}
                  <p className='font-semibold capitalize'>
                    {item.postedBy.userName}
                  </p>
                  <p>{item.comment}</p>
                </div>
              </div>
            );
          })}
        </div>
        {/*  */}
        {/*  */}
        {/* Comment Input and user icon */}
        {/* Comment Input and user icon */}
        <div className='flex flex-wrap mt-6 gap-3 '>
          <Link
            to={`user-profile/${pinDetail.postedBy?._id}`}
            className='flex gap-2  items-center bg-white rounded-lg'
          >
            <img
              src={pinDetail.postedBy?.image}
              alt='user-profile'
              className='w-8 h-8 rounded-full cursor-pointer'
            />
          </Link>

          <input
            type='text'
            className='flex-1 border-gray-100 outline-none border p-2 rounded-2xl focus:border-gray-300'
            placeholder='Add a comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type='button'
            className='bg-red-500
            text-white
            rounded-full
            px-6
            py-2
            font-semibold
            text-base
            outline-none'
            onClick={addComment}
          >
            {addingComment ? "Posting the comment..." : "Post"}
          </button>
          {/*  */}
        </div>
      </div>
      PinDetail
    </div>
  );
};

export default PinDetail;
