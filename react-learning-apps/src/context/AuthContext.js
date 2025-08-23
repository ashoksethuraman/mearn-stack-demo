// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

// Create Context
const AuthContext = createContext();

// Custom hook for easy use
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        console.log("User changed:", user);
    }, [user]);

    // Fake login
    const login = (userData) => {
        setUser(userData);
        console.log("User logged in:", user);
    };

    // Logout
    const logout = () => {
        setUser(null);
        console.log("User logged out:", user);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
