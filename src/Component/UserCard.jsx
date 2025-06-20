const UserCard = ({ user }) => {
 
  if (!user) {
 
    return null;
  }
 
  const { firstname, lastname, photo, age, gender, about, Skills } = user;
  
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      {photo ? (
        <img
          src={photo}
          alt={`${firstname} ${lastname}`}
          className="h-full object-contain"
        />
      ) : (
        <div className="h-32 w-full flex items-center justify-center bg-gray-200 text-gray-500 text-sm">
          No photo
        </div>
      )}
      <div className="card-body">
        <h2 className="card-title text-xl font-semibold">
          {firstname} {lastname}
        </h2>
        <p className="text-sm text-white">{about}</p>
        <p className="text-sm">
          <strong>Age:</strong> {age}
        </p>
        <p className="text-sm">
          <strong>Gender:</strong> {gender}
        </p>
        {Skills?.length > 0 && (
          <div>
            <p className="text-sm font-semibold">Skills:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {Skills.map((skill, idx) => (
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

        <div className="card-actions justify-center my-5">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
