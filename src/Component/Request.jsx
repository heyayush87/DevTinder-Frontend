import React, { useEffect } from "react";
import { BASE_URL } from "../utils/Constant";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addRequests, removeRequest } from "../utils/RequestSlice";

const Request = () => {
  const requestList = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data || []));
    } catch (err) {
      console.error("Error: " + err.message);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requestList) return null;

  if (requestList.length === 0)
    return (
      <h1 className="text-white text-xl text-center mt-10">No Request Found</h1>
    );

  return (
    <div className="text-center py-10 px-4 sm:px-6 lg:px-8 pb-28">
      <h1 className="font-bold text-white text-3xl mb-6">Requests</h1>

      {requestList.map((req) => {
        const user = req.fromUserId;
        if (!user) return null;

        const {
          _id,
          firstname,
          lastname,
          gender,
          age,
          about,
          photo,
          Skills = [],
        } = user;

        return (
          <div
            key={req._id}
            className="flex flex-col sm:flex-row m-4 p-4 rounded-lg bg-base-300 w-full max-w-3xl mx-auto shadow-md"
          >
            <div className="flex-shrink-0">
              <img
                alt="User"
                className="w-20 h-20 rounded-full object-cover"
                src={photo}
              />
            </div>

            <div className="ml-4 flex-1 text-left">
              <h2 className="font-bold text-xl">
                {firstname} {lastname}
              </h2>
              {age && gender && (
                <p className="text-gray-400 text-sm">
                  {age} yrs, {gender}
                </p>
              )}
              <p className="text-sm mt-1">{about}</p>

              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => reviewRequest("rejected", req._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => reviewRequest("accepted", req._id)}
                >
                  Accept
                </button>
              </div>

              {Skills?.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold text-sm mb-1">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {Skills.map((skill, index) => (
                      <span
                        key={index}
                        className="badge badge-outline badge-secondary text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Request;
