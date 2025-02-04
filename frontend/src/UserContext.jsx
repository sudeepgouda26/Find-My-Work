// import axios from 'axios';
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
    const [token, setToken] = useState(storedToken || '');

    useEffect(() => {
        console.log("useEffect running with token:", token);
        
        if (storedToken && !token) {
            setToken(storedToken);  // Ensure token is updated on refresh
        }

        const fetchProfile = async () => {
            if (token && !user) {  
                try {
                    console.log('Fetching profile with token:', token);
                    const { data } = await axios.get('http://localhost:4000/api/v1/user/profile', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (data.success) {
                        console.log('Profile fetched successfully:', data.data);
                        setUser(data.data);
                        localStorage.setItem('user', JSON.stringify(data.data));
                    } else {
                        console.log('Profile fetch failed:', data.message);
                        logout();
                    }
                } catch (error) {
                    console.log('Error fetching profile:', error);
                    logout();
                }
            }
        };

        fetchProfile();
    }, [token]);  // Depend only on token

    const login = (token, user) => {
        console.log('Logging in with token:', token);
        setToken(token);
        setUser(user);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const logout = () => {
        console.log('Logging out');
        setToken('');
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, login, logout, setUser,token,setToken }}>
            {children}
        </UserContext.Provider>
    );
}
