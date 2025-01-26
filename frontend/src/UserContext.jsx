import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    useEffect(() => {
      if (!user) {
          axios.get('/profile', { withCredentials: true })
              .then(({ data }) => {
                  setUser(data);
              })
              .catch((error) => {
                  console.error('Error fetching profile:', error);
              });
      }
  }, [user]);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}