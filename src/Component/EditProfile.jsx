import React, { useState,useEffect } from 'react'
import UserCard from './UserCard';
import { BASE_URL } from '../utils/Constant';
import axios from 'axios';
import { addUser } from '../utils/UserSlice';
import { useDispatch } from 'react-redux';

const EditProfile = ({ user }) => {
    // console.log("user", user);
    const [firstname, setFirstname] = useState(user?.firstname || "");
    const [lastname, setLastname] = useState(user?.lastname || "");
    const [age, setAge] = useState(user?.age || "");
    const [about, setAbout] = useState(user?.about || "");
    const [Skills, setSkills] = useState(
      Array.isArray(user?.Skills) ? user.Skills : []
    );
    const [gender, setGender] = useState(user?.gender || "");
    const [photo, setPhoto] = useState(user?.photo || "");

    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const [toast, settoast] = useState(false);

    
    
    
    const SaveProfile = async () => {
        try {
            const res = await axios.patch(
              BASE_URL + "/profile/edit",
              {
                firstname,
                lastname,
                gender,
                age,
                  about,
                photo,
                Skills
              },
              { withCredentials: true }
            );
            console.log("response", res.data);
            dispatch(addUser(res.data))
            
            setTimeout(() => {
                settoast(true);
            }, 3000);
    } catch (error) {
        setError(error?.response?.data || error.message);
        }
        

    }
    
   

    return (
      <div>
        <div className="flex justify-center px-10 my-30">
          <div className="flex justify-center  px-5 ">
            <div className="card bg-base-300 w-96 shadow-sm">
              <h2 className=" flex justify-center feont-bold text-2xl my-3">
                Edit Profile
              </h2>
              <div className="card-body">
                <h2 className="card-title">FirstName</h2>
                <fieldset className="fieldset">
                  <input
                    type="text"
                    className="input input-bordered w-full  rounded-lg"
                    value={firstname || ""}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </fieldset>
                <h2 className="card-title">LastName</h2>
                <fieldset className="fieldset">
                  <input
                    type="text"
                    className="input input-bordered w-full rounded-lg"
                    value={lastname || ""}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </fieldset>
                <h2 className="card-title">Photo</h2>
                <fieldset className="fieldset">
                  <input
                    type="text"
                    className=" w-full rounded-lg"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                  />
                </fieldset>
                <h2 className="card-title">Age</h2>
                <fieldset className="fieldset">
                  <input
                    type="text"
                    className="input input-bordered w-full rounded-lg"
                    value={age || ""}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
                <h2 className="card-title">About</h2>
                <fieldset className="fieldset">
                  <textarea
                    rows={3} // You can adjust this
                    className="textarea textarea-bordered w-full rounded-lg resize-y"
                    value={about || ""}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Write something about yourself..."
                  ></textarea>
                </fieldset>
                <h2 className="card-title">Gender</h2>
                <fieldset className="fieldset">
                  <select
                    className="select select-bordered w-full rounded-lg"
                    value={gender || ""}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="" disabled>
                      Select gender
                    </option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                    <option value="others">others</option>
                  </select>
                </fieldset>
                <h2 className="card-title">Skills</h2>
                <fieldset className="fieldset">
                  <textarea
                    rows={2}
                    className="textarea textarea-bordered w-full rounded-lg resize-y"
                    value={Skills?.join(", ") || ""}
                    onChange={(e) =>
                      setSkills(e.target.value.split(",").map((s) => s.trim()))
                    }
                    placeholder="e.g., JavaScript, React, Node.js"
                  ></textarea>
                </fieldset>

                <p className="text-red-400"> {error}</p>
                <div className="card-actions  px-4 m-4 justify-center ">
                  <button className="btn btn-primary" onClick={SaveProfile}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <UserCard
              user={{ firstname, lastname, photo, age, gender, about, Skills }}
            />
          </div>
        </div>
        
          {toast && <div className="toast toast-top toast-center">
              <div className="alert alert-success">
              <span>Profile saved successfully.</span>
            </div>
          </div>}
        
      </div>
    );
}

export default EditProfile