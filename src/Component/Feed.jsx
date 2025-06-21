import React from "react";
import { BASE_URL } from "../utils/Constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/FeedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);

  const dispatch = useDispatch();
  const fetchFeed = async () => {
    try {
      // Only fetch if feed is not already available
      if (feed?.length) return;

      const res = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });

      if (res.status === 200 && res.data?.data) {
        dispatch(addFeed(res.data.data));
      } else {
        console.warn("Unexpected response:", res);
      }
    } catch (error) {
      console.error(
        "Error fetching feed:",
        error?.response?.data || error.message
      );

      // Optional: Handle specific errors
      if (error?.response?.status === 401) {
        console.warn("Unauthorized: Please login again.");
      } else if (error?.response?.status === 500) {
        console.warn("Server error. Try again later.");
      }
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (!feed) return null;

  if (feed.length === 0) {
    return (
      <div className="text-white text-center mt-10 text-xl">
        🎉 You’ve reached the end! No more users to show.
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center px-4 sm:px-6 lg:px-8 mt-10 w-full">
      <div className="max-w-md w-full">
        {feed?.length && <UserCard user={feed[0]} />}
      </div>
    </div>
  );
};

export default Feed;
