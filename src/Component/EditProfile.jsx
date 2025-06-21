import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/Constant";
import axios from "axios";
import { addUser } from "../utils/UserSlice";
import { useDispatch } from "react-redux";

const EditProfile = ({ user }) => {
  const [firstname, setFirstname] = useState(user?.firstname || "");
  const [lastname, setLastname] = useState(user?.lastname || "");
  const [age, setAge] = useState(user?.age || "");
  const [about, setAbout] = useState(user?.about || "");
  const [Skills, setSkills] = useState(
    Array.isArray(user?.Skills) ? user.Skills : []
  );
  const [skillsInput, setSkillsInput] = useState(Skills.join(", ")); // NEW
  const [gender, setGender] = useState(user?.gender || "");
  const [photo, setPhoto] = useState(user?.photo || "");

  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [toast, settoast] = useState(false);

  // Keep Skills array in sync with input
  useEffect(() => {
    const parsed = skillsInput
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    setSkills(parsed);
  }, [skillsInput]);

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
          Skills,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      setError("");
      settoast(true);
      setTimeout(() => settoast(false), 3000);
    } catch (error) {
      setError(error?.response?.data || error.message);
    }
  };

  return (
    <div className="px-4 max-w-7xl mx-auto py-30">
      <div className="flex flex-col md:flex-row justify-center gap-6 flex-wrap items-start">
        {/* Profile Edit Card */}
        <div className="card bg-base-300 w-full md:w-[28rem] shadow-md">
          <h2 className="text-center font-bold text-2xl mt-4">Edit Profile</h2>
          <div className="card-body space-y-4">
            {/* First Name */}
            <div>
              <label className="card-title mb-1">First Name</label>
              <input
                type="text"
                className="input input-bordered w-full rounded-lg text-base py-3 px-4"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="card-title mb-1">Last Name</label>
              <input
                type="text"
                className="input input-bordered w-full rounded-lg text-base py-3 px-4"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>

            {/* Photo */}
            <div>
              <label className="card-title mb-1">Photo</label>
              <input
                type="text"
                className="input input-bordered w-full rounded-lg text-base py-3 px-4"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </div>

            {/* Age */}
            <div>
              <label className="card-title mb-1">Age</label>
              <input
                type="text"
                className="input input-bordered w-full rounded-lg text-base py-3 px-4"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            {/* About */}
            <div>
              <label className="card-title mb-1">About</label>
              <textarea
                rows={3}
                className="textarea textarea-bordered w-full rounded-lg text-base py-3 px-4 resize-y"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Write something about yourself..."
              />
            </div>

            {/* Gender */}
            <div>
              <label className="card-title mb-1">Gender</label>
              <select
                className="select select-bordered w-full rounded-lg text-base h-12 px-4"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="others">others</option>
              </select>
            </div>

            {/* Skills (fixed using separate state) */}
            <div>
              <label className="card-title mb-1">Skills</label>
              <textarea
                rows={2}
                className="textarea textarea-bordered w-full rounded-lg text-base py-3 px-4 resize-y"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                placeholder="e.g., React.js, Next.js, Node.js"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded-md text-sm break-words">
                {error}
              </div>
            )}

            {/* Save Button */}
            <div className="card-actions justify-center">
              <button className="btn btn-primary w-full" onClick={SaveProfile}>
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Preview Card */}
        <div className="w-full md:w-96">
          <UserCard
            user={{ firstname, lastname, photo, age, gender, about, Skills }}
            readonly={true}
          />
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
