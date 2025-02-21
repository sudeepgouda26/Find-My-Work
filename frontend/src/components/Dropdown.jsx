import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {UserContext} from '../UserContext'; 
import axios from 'axios';
import { toast } from 'react-toastify';


function Dropdown() {
    const { user, setUser } = useContext(UserContext);
   
   
    const navigate = useNavigate();

    const handleLogout = () => {
      if (!window.confirm("Are you sure you want to logout?")) return;
      axios.post("http://localhost:4000/api/v1/auth/logout", {}, {
        headers: { "Content-Type": "application/json" }
      }).then(() => {
        localStorage.removeItem("token");
        setUser(null) // Remove JWT token
        toast.success("Logged out successfully!");
        navigate('/login');
      }).catch((error) => {
        console.error("Logout failed:", error);
        toast.error("Logout failed");
      });
    };

  return (
    <div className='flex mt-4 Dropdown bg-gray-600 absolute top-16 right-0 rounded-none border-0 h-auto w-48 text-center shadow-[0px_-4px_2px_#000000]'>
        <ul className='flex-col text-center gap-5 font-semibold text-base text-slate-200 block w-full '>
            <li className='hover:bg-gray-700 active:bg-cyan-700 text-center py-3'  >
              <Link to={'/jobs/create'}  >Upload Job</Link>
            </li>
            <li className='hover:bg-gray-700 active:bg-cyan-700  text-center py-3'>
              <Link to={'/jobs/get'} >Get Jobs</Link>
            </li>
            
            <li className='hover:bg-gray-700 active:bg-cyan-700  text-center py-3'>
              <Link to={'/Stats'}>Stats</Link>
            </li>

            <li className='hover:bg-gray-700 active:bg-cyan-700  text-center py-3'><Link to={'/my-jobs'}>My jobs</Link></li>
            <li className='hover:bg-gray-700 active:bg-cyan-700  text-center py-3'><Link to={'/edit-profile'}>Edit profile</Link></li>
            <br/>
            <li className='hover:bg-gray-700 active:bg-cyan-700  text-center py-2'>
              <button onClick={handleLogout} >
                Logout
              </button>
            </li>
        </ul>
        
    </div>
    
  )
}

export default Dropdown
