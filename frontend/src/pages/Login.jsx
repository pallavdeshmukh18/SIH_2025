import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

function Login() {
    const navigate = useNavigate();
    const [role, setRole] = useState(""); // Student, Teacher, Admin
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Hardcoded login check based on role + username + password
        if (role === "student" && username === "student" && password === "student") {
            navigate("/dashboard/student");
        } else if (role === "teacher" && username === "teacher" && password === "teacher") {
            navigate("/dashboard/teacher");
        } else if (role === "admin" && username === "admin" && password === "admin") {
            navigate("/dashboard/admin");
        } else {
            alert("Invalid credentials or role");
        }
    };

    return (
        <div className="login-page">
            {/* Left side */}
            <div className="login-left">
                <h1>Welcome to SIH Project</h1>
                <p>Manage your tasks and dashboards efficiently.</p>
            </div>

            {/* Right side */}
            <div className="login-right">
                <div className="login-container">
                    <h2>Login</h2>

                    {/* Role selection */}
                    <div className="role-select">
                        <label>Select Role:</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)} required>
                            <option value="">-- Select --</option>
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    {/* Login form */}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Username"
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
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
