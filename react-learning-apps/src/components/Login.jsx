import { useNavigate } from "react-router-dom";
import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => login({ name: "Ashok Kumar", email: "ashok@example.com" });
    const handleRegister = () => {
        navigate("/register");
    }

    return (
        <div>
            <h1>🔑 Login</h1>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}