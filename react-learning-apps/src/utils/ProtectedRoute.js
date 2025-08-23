import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    console.log("ProtectedRoute - isAuthenticated:", isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    return children;
}