import React from 'react'

const UserCard = ({ user }) => {
    const{firstname, lastname ,photo , age,gender,about ,Skills} = user || {};
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photo} alt="Photo of a person" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstname + " " + lastname}</h2>
        <p>{about}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
}

export default UserCard