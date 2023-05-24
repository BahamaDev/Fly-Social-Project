import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { feedQuery, searchQuery } from "../utils/data";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  const [pins, setPins] = useState(null);

  useEffect(() => {
    // If there is a category Id fetch the data using that as the argument and query parameter.
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);

      client.fetch(query).then((data) => {
        // console.log(data);
        setPins(data);
        setLoading(false);
      });
    } else {
      // This query fetches all pins for that user.
      client.fetch(feedQuery).then((data) => {
        console.log(data);
        setPins(data);
        setLoading(false);
        // console.log(loading);
      });
    }
  }, [categoryId]);

  if (loading) return <Spinner message='Updating your Feed!' />;
  return <div> {pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
