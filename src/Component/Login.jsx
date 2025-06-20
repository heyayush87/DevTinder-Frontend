import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/UserSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constant";
const Login = () => {
    const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = async () => {
        try {
            const res= await axios.post(BASE_URL+"/login", {
                emailId: emailId,
                password: password
            }, { withCredentials: true });
           
            dispatch(addUser(res?.data?.data));
            navigate("/");
        }
        catch (error) {
          setError(error?.response?.data || "Login failed");
            console.error("Login failed:", error);
        }
    }
    return (
      <div className="flex justify-center  px-5 my-30">
        <div className="card bg-base-300 w-96 shadow-sm">
          <h2 className=" flex justify-center feont-bold text-2xl my-3">Login</h2>
          <div className="card-body">
            <h2 className="card-title">Email</h2>
            <fieldset className="fieldset">
              <input
                type="text"
                className="input input-bordered w-full  rounded-lg"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            <h2 className="card-title">Password</h2>
            <fieldset className="fieldset">
              <input
                type="text"
                className="input input-bordered w-full rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="card-actions  px-4 m-4 justify-center ">
                        <button className="btn btn-primary"
                        onClick={handleLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Login