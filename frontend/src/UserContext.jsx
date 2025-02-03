import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    useEffect(() => {
      let isMounted = true;
      axios.get('/profile', { withCredentials: true })
          .then(({ data }) => {
              if (isMounted) setUser(data);
          })
          .catch((error) => {
              if (isMounted) console.error('Error fetching profile:', error);
          });
      return () => { isMounted = false; };
  }, []);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}