// client/src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle initial check


  // 1............................ Check for user in localStorage on initial load.................
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  //2......................... login and logout functions........................................

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    console.log("2. Global logout function in AuthContext CALLED!");
     console.log("3. Global user state in AuthContext was just SET TO NULL.");
    localStorage.removeItem("user");
    setUser(null);
  };

  // 3....................... Provide the state and functions to all child components
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};