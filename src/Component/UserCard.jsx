import { BASE_URL } from "../utils/Constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/FeedSlice";

const UserCard = ({ user, readonly = false }) => {
  if (!user) return null;

  const { _id, firstname, lastname, photo, age, gender, about, Skills } = user;
  const dispatch = useDispatch();

  const handlesendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userId));
    } catch (error) {
      console.error("Error sending request:", error.message);
    }
  };

  // Handle both string and array input for skills
  const skillList = Array.isArray(Skills)
    ? Skills
    : typeof Skills === "string"
    ? Skills.split(/[\n,]+/)
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="card bg-base-300 w-full md:w-[28rem] min-h-[36rem] shadow-md mx-auto transition-all duration-300">
      {photo ? (
        <img
          src={photo}
          alt={`${firstname} ${lastname}`}
          className="h-60 w-full object-contain rounded-t-lg bg-base-300"
        />
      ) : (
        <div className="h-60 w-full flex items-center justify-center bg-gray-200 text-gray-500 text-sm rounded-t-lg">
          No photo
        </div>
      )}

      <div className="card-body px-5 py-4 flex flex-col">
        <h2 className="text-xl font-semibold mb-2">
          {firstname} {lastname}
        </h2>

        <p className="text-sm text-white mb-2">{about}</p>

        {age && (
          <p className="text-sm mb-1">
            <strong>Age:</strong> {age}
          </p>
        )}

        {gender && (
          <p className="text-sm mb-2">
            <strong>Gender:</strong> {gender}
          </p>
        )}

        {skillList.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-semibold">Skills:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {skillList.map((skill, idx) => (
                <span
                  key={idx}
                  className="badge badge-outline badge-secondary text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ✅ Buttons only visible when not readonly */}
        {!readonly && (
          <div className="card-actions justify-center mt-auto space-x-4">
            <button
              className="btn btn-error btn-sm md:btn-md"
              onClick={() => handlesendRequest("ignore", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-success btn-sm md:btn-md"
              onClick={() => handlesendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
