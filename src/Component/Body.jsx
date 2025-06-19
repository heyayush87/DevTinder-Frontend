
import { BASE_URL } from '../utils/Constant'
import Footer from './Footer'
import NavBar from './NavBar'
import { Outlet, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { addUser } from '../utils/UserSlice'  

const Body = () => {
  const navigate = useNavigate();
  const user=useSelector((store) => store.user);
  const dispatch = useDispatch();
  const fetchuser = async () => {
    if(user)return; // If user is already fetched, no need to fetch again
    try {
      const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
      dispatch(addUser(res?.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.error("Error fetching user:", error);
    }
  }

  useEffect(()=>{fetchuser()},[])
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer/>
    </div>
  )
}

export default Body