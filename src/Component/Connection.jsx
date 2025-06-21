import { BASE_URL } from '../utils/Constant'
import axios from 'axios'


import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/ConnectionSlice'

const Connection = () => {
    const connections = useSelector((store => store.connection))
    const dispatch = useDispatch()
    const getconnection = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connection", { withCredentials: true });
            console.log(res.data.data)
            dispatch(addConnection(res?.data?.data))
            
        } catch (err) {
            console.error("Error:" + err.message)
        }
    }

    useEffect(() => { getconnection() }, [])
    
    if (!connections) return;

    if (connections.length === 0) return <h1 className="flex justify-center"> No Connections Found</h1>;

    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-white text-3xl">Connections</h1>

            {connections.map((connection) => {
                const {
                    _id,
                    firstname,
                    lastname,
                    gender,
                    age,
                    about,
                    photo,
                    Skills="react.js",
                } = connection;

                return (
                  <div
                    key={_id}
                    className="flex flex-col sm:flex-row m-4 p-4 rounded-lg bg-base-300 w-full max-w-3xl mx-auto shadow-md"
                  >
                    {/* Profile Photo */}
                    <div className="flex-shrink-0">
                      <img
                        alt="User"
                        className="w-20 h-20 rounded-full object-cover"
                        src={photo}
                      />
                    </div>

                    {/* User Info */}
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

                      {/* Skills Section */}
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
            }
          
        )}
        </div>
    );
};


export default Connection