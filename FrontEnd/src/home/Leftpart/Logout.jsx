import React, { useState } from 'react'
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";
import Cookies from "js-cookie";
import toast from 'react-hot-toast';
function Logout() {
  const [loading,setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logout successfully");
      setTimeout(() => {
        window.location.reload();
      }, 700);
    } catch (error) {
      toast.error("Couldn't log out");
      console.error('Error in Logout', error);
    } 
  }
  return (
    <div className='bg-gray-950 fixed bottom-0 left-0 w-full'>
     <TbLogout2 className='text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-3' onClick={handleLogout}/>
    </div>
  )
}

export default Logout
