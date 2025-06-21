import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/UserSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constant";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [error, setError] = useState("");
  const [islogin, setislogin] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      setislogin(true);
      dispatch(addUser(res?.data?.data));
      setError(""); // ✅ Clear error after success
      navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Login failed");
      console.error("Login failed:", error);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstname, lastname, emailId, password },
        { withCredentials: true }
      );
      setError(""); 
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (err) {
      const msg =
        err.response?.data || "Signup failed. Please try again later.";
      setError(msg);
    }
  };
  

  return (
    <div className="flex justify-center px-4 sm:px-6 lg:px-8 py-10">
      <div className="w-full max-w-md bg-base-300 rounded-lg shadow-lg p-6">
        <h2 className="text-center text-2xl font-bold mb-4 text-white">
          {islogin ? "Login" : "Sign Up"}
        </h2>

        {!islogin && (
          <>
            <label className="block text-white text-sm mb-1">First Name</label>
            <input
              type="text"
              className="input input-bordered w-full rounded-lg mb-4"
              value={firstname}
              onChange={(e) => setfirstname(e.target.value)}
            />

            <label className="block text-white text-sm mb-1">Last Name</label>
            <input
              type="text"
              className="input input-bordered w-full rounded-lg mb-4"
              value={lastname}
              onChange={(e) => setlastname(e.target.value)}
            />
          </>
        )}

        <label className="block text-white text-sm mb-1">Email</label>
        <input
          type="text"
          className="input input-bordered w-full rounded-lg mb-4"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />

        <label className="block text-white text-sm mb-1">Password</label>
        <input
          type="password"
          className="input input-bordered w-full rounded-lg mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="flex justify-center mt-4">
          <button
            className="btn btn-primary w-full"
            onClick={islogin ? handleLogin : handleSignUp}
          >
            {islogin ? "Login" : "Sign Up"}
          </button>
        </div>

        <p
          className="text-center text-white mt-4 cursor-pointer"
          onClick={() => setislogin(!islogin)}
        >
          {islogin
            ? "New user? Sign Up here"
            : "Already have an account? Login here"}
        </p>
      </div>
    </div>
  );
};

export default Login;
