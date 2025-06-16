'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/me');
        const data = await res.json();
        if (data?.user) {
          setUser(data.user); // ✅ now this matches API response
        }
      } catch (err) {
        console.error('Auth fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = (user) => setUser(user);

  const logout = async () => {
    await fetch('/api/logout'); // Make sure this route exists too
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
