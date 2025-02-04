import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext'; 
import axios from 'axios';

function Dropdown() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await axios.post('/logout', {}, { withCredentials: true });
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
  return (
    <div className='flex flex-col Dropdown'>
        <ul className='flex flex-col gap-4'>
            
            <Link to={'/create-jobs'}><li>upload a job</li></Link>
            <Link to={'/history'}><li>History</li></Link>
            <li onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</li>
        </ul>
    </div>
        
   
  )
}

export default Dropdown
