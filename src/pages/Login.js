import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed. Please try again.");
            }

            console.log("✅ Login successful:", data);

            // Store session
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("user", JSON.stringify(data.user));

            // Dispatch to Redux
            dispatch(login(data.user));

            // Set auto logout timer based on 1 hour (3600000 ms)
            setTimeout(() => {
                dispatch(logout());
                sessionStorage.clear();
                alert("Session expired. Please login again.");
                navigate("/login");
            }, 3600000); // 1 hour in ms — match your JWT expiry

            navigate("/");
        } catch (error) {
            console.error("❌ Login error:", error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-header">Sign In</h2>
            {error && <div className="error-message">{error}</div>}
            
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        className="form-input"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input
                        id="password"
                        className="form-input"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                
                <button 
                    type="submit" 
                    className="auth-button login-button" 
                    disabled={isLoading}
                >
                    {isLoading ? "Signing in..." : "Sign In"}
                </button>
            </form>
            
            <div className="auth-footer">
                Don't have an account? <a className="auth-link" href="/signup">Create account</a>
            </div>
        </div>
    );
};

export default Login;