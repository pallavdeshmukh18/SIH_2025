import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

function Login() {
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(""); 

        let loginSuccess = false;
        let dashboardPath = "";

        
        if (role === "student" && username === "student" && password === "student") {
            loginSuccess = true;
            dashboardPath = "/dashboard/student";
        } else if (role === "teacher" && username === "teacher" && password === "teacher") {
            loginSuccess = true;
            dashboardPath = "/dashboard/teacher";
        } else if (role === "admin" && username === "admin" && password === "admin") {
            loginSuccess = true;
            dashboardPath = "/dashboard/admin";
        }

        // --- Handle Login Result ---
        if (loginSuccess) {
            // **THE MOST IMPORTANT CHANGE IS HERE**
            // On successful login, we store a dummy token in localStorage.
            // Your ProtectedRoute component will check for this item.
            localStorage.setItem('userToken', 'a_dummy_auth_token_for_now');

            // We can also store user info for use in the dashboard
            localStorage.setItem('userRole', role);
            localStorage.setItem('username', username);

            navigate(dashboardPath);
        } else {
            // If login fails, set an error message instead of using alert().
            setError("Invalid credentials or role selected. Please try again.");
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

                        {/* Display error message if it exists */}
                        {error && <p className="login-error">{error}</p>}

                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;