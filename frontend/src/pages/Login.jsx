import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

export default function Login() {
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

    if (loginSuccess) {
      localStorage.setItem("userToken", "a_dummy_auth_token_for_now");
      localStorage.setItem("userRole", role);
      localStorage.setItem("username", username);
      navigate(dashboardPath);
    } else {
      setError("Invalid credentials or role selected. Please try again.");
    }
  };

  return (
    <div className="login-container">
      {/* Left Side (75%) */}
      <div className ="floaty">
      <div className="login-left">
        <img src="abc.jpg" alt="Super ERP Logo" className="logo" />
        <h1 className="title">Acad Sync</h1>
        <p className="subtitle">Efficiently manage your academic journey.</p>

        <div className="input-wrapper">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="input-field"
          >
            <option class="placeholder-text" value="" disabled>
              -- Select Role --
            </option>
            <option class="placeholder-text" value="student">Student</option>
            <option class="placeholder-text" value="teacher">Teacher</option>
            <option class="placeholder-text" value="admin">Admin</option>
          </select>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input-field"
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

      {/* Right Side (25%) */}
      <div className="login-right">
        <video
          src="/background1.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="background-video"
        ></video>
      </div>
    </div>
  );
}
