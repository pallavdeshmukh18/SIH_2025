import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

function Login() {
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!role) {
            setError("Please select a role");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: username, password: password, type: role })
            });

            const data = await response.json();

            if (data.status === "success") {
                // Store info in localStorage for ProtectedRoute
                localStorage.setItem("userToken", "dummy_token_for_now");
                localStorage.setItem("userRole", role);
                localStorage.setItem("username", username);

                // Navigate to respective dashboard
                if (role === "student") navigate("/dashboard/student");
                else if (role === "teacher") navigate("/dashboard/teacher");
                else if (role === "admin") navigate("/dashboard/admin");
            } else {
                setError(data.message || "Invalid credentials");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Server error. Please try again later.");
        }
    };

    return (
        <div className="login-page">
            <div className="login-left">
                <h1>School ERP Portal</h1>
                <p>Efficiently manage your academic journey.</p>
            </div>

            <div className="login-right">
                <div className="login-container">
                    <h2>Login</h2>

                    <div className="role-select">
                        <label>I am a:</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)} required>
                            <option value="" disabled>-- Select Role --</option>
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <p className="login-error">{error}</p>}
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
