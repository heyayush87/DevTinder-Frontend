import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constant";
import axios from "axios";
import { removeUser } from "../utils/UserSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm px-4 flex-wrap">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          🧑‍💻 DevTinder
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user photo" src={user.photo} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile" className="font-semibold py-2">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/connection" className="font-semibold py-2">
                  Connection
                </Link>
              </li>
              <li>
                <Link to="/request" className="font-semibold py-2">
                  Requests
                </Link>
              </li>
              <li>
                <Link to="/" className="font-semibold py-2">
                  Feed
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="font-semibold py-2 text-left"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
