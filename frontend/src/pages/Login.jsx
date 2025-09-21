import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

export default function Login() {
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
                body: JSON.stringify({ email: username, password, type: role }),
            });

            const data = await response.json();

            if (data.status === "success") {
                localStorage.setItem("userToken", "dummy_token_for_now");
                localStorage.setItem("userRole", role);
                localStorage.setItem("username", username);

                if (role === "student") navigate("/dashboard/student");
                else if (role === "teacher") navigate("/dashboard/teacher");
                else if (role === "admin") navigate("/dashboard/admin");
            } else {
                setError(data.message || "Invalid credentials or role");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Server error. Please try again later.");
        }
    };

    return (
        <div className="login-container">
        <div className="floaty">
            <div className="login-left">
                <img src="abc.jpg" alt="Super ERP Logo" className="logo" />
                <h1 className="title">Acad Sync</h1>
                <p className="subtitle">Efficiently manage your academic journey.</p>

                <form onSubmit={handleSubmit} className="form">
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                        className="input-field"
                    >
                        <option value="" disabled hidden>
                            -- Select Role --
                        </option>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="admin">Admin</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="input-field"
                        autoFocus
                    />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input-field"
                    />

                    {error && <p className="error">{error}</p>}

                    <button type="submit" className="submit-btn">
                        Continue
                    </button>
                </form>

                <p className="terms">
                    By continuing, you agree to our <a href="#">Terms</a> and{" "}
                    <a href="#">Privacy Policy</a>.
                </p>
            </div>
        </div>

            <div className="login-right">
                <video
                    src="/background1.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="background-video"
                />
            </div>
        </div>
    );
}
