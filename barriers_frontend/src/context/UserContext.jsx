import { createContext, useState, useEffect } from 'react';
import API from '../api.jsx';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // загрузка профиля по токену
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await API.get('/auth/profile'); // настрой этот роут на бэкенде
        setUser(res.data);
      } catch (err) {
        localStorage.removeItem('token');
      }
    };
    fetchProfile();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
