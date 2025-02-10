import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {UserContext} from '../UserContext'; 
import axios from 'axios';

function Dropdown() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
      axios.post("http://localhost:4000/api/v1/auth/logout", {}, {
        headers: { "Content-Type": "application/json" }
      }).then(() => {
        localStorage.removeItem("token");
        setUser(null) // Remove JWT token
        alert("Logged out successfully!");
        navigate('/login');
      }).catch((error) => {
        console.error("Logout failed:", error);
      });
    };

  return (
    <div className='flex flex-col Dropdown'>
        <ul className='flex flex-col gap-4'>
            <li><Link to={'/jobs/create'}>upload a job</Link></li>
            <li><Link to={'/jobs/get'}>get jobs</Link></li>
            <li><Link to={'/Stats'}>stats</Link></li>
            <li>
              <button
                onClick={handleLogout}
                  
              >
                Logout
              </button>
            </li>
        </ul>
    </div>
        
   
  )
}

export default Dropdown
