import React, { useEffect } from "react";
import { BASE_URL } from "../utils/Constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/FeedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const fetchFeed = async () => {
    try {
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
      <div className="min-h-[80vh] flex items-center justify-center text-white text-center px-4">
        🎉 You’ve reached the end! No more users to show.
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start px-4 sm:px-6 lg:px-8 pt-10 pb-24 w-full">
      <div className="w-full max-w-md">
        <UserCard user={feed[0]} />
      </div>
    </div>
  );
};

export default Feed;
