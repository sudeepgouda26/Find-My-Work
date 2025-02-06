// import axios from 'axios';
// import axios from 'axios';
// import { createContext, useEffect, useState } from 'react';

// export const UserContext = createContext();

// export function UserContextProvider({ children }) {
//     const storedToken = localStorage.getItem('token');
//     const storedUser = localStorage.getItem('user');

//     const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
//     const [token, setToken] = useState(storedToken || '');

//     useEffect(() => {
//         console.log("useEffect running with token:", token);
        
//         if (storedToken && !token) {
//             setToken(storedToken);  // Ensure token is updated on refresh
//         }

//         const fetchProfile = async () => {
//             if (token && !user) {  
//                 try {
//                     console.log('Fetching profile with token:', token);
//                     const { data } = await axios.get('http://localhost:4000/api/v1/user/profile', {
//                         headers: { Authorization: `Bearer ${token}` }
//                     });
//                     if (data.success) {
//                         console.log('Profile fetched successfully:', data.data);
//                         setUser(data.data);
//                         localStorage.setItem('user', JSON.stringify(data.data));
//                     } else {
//                         console.log('Profile fetch failed:', data.message);
//                         logout();
//                     }
//                 } catch (error) {
//                     console.log('Error fetching profile:', error);
//                     logout();
//                 }
//             }
//         };

//         fetchProfile();
//     }, [token]);  // Depend only on token

//     const login = (token, user) => {
//         console.log('Logging in with token:', token);
//         setToken(token);
//         setUser(user);
//         localStorage.setItem('token', token);
//         localStorage.setItem('user', JSON.stringify(user));
//     };

//     const logout = () => {
//         console.log('Logging out');
//         setToken('');
//         setUser(null);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//     };

//     return (
//         <UserContext.Provider value={{ user, login, logout, setUser,token,setToken }}>
//             {children}
//         </UserContext.Provider>
//     );
// }

import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));

    // Function to check if the token is expired
    const isTokenExpired = (token) => {
        if (!token) return true;
        try {
            const payload = JSON.parse(atob(token.split(".")[1])); // Decode payload
            const expiration = payload.exp * 1000; // Convert to milliseconds
            return Date.now() >= expiration; // Check if expired
        } catch (error) {
            console.error("Invalid token:", error);
            return true; // Treat invalid tokens as expired
        }
    };

    // Fetch user data from API
    const fetchUser = async (token) => {
        try {
            const response = await axios.get('http://localhost:4000/api/v1/user/get-user', // Use environment variable for API URL
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setUser(response.data.user);
        } catch (error) {
            console.error("Error fetching user data:", error);
            logout(); // Logout if fetching user fails
        }
    };

    // Handle login
    const login = (userData, token) => {
        setUser(userData);
        setToken(token);
        localStorage.setItem("token", token);
    };

    // Handle logout
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    };

    // Check token validity on mount
    useEffect(() => {
        if (token) {
            if (isTokenExpired(token)) {
                logout(); // Logout if expired
            } else {
                fetchUser(token); // Fetch user data if valid
            }
        }
    }, [token]); // Runs when token changes

    return (
        <UserContext.Provider value={{ user, login, logout, setUser, token, setToken }}>
            {children}
        </UserContext.Provider>
    );
}




