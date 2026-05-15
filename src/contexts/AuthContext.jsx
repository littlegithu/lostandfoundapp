import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signup = (userData) => {
    localStorage.setItem('authUser', JSON.stringify(userData));
    setUser(userData);
    return true;
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('appUsers') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      localStorage.setItem('authUser', JSON.stringify(foundUser));
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('authUser');
    setUser(null);
  };

  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    localStorage.setItem('authUser', JSON.stringify(newUser));
    setUser(newUser);
    
    const users = JSON.parse(localStorage.getItem('appUsers') || '[]');
    const updatedUsers = users.map(u => 
      u.email === user.email ? { ...u, ...updatedData } : u
    );
    localStorage.setItem('appUsers', JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);