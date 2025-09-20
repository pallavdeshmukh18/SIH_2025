import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-3 flex flex-col justify-center items-center bg-white">
        <img src="abc.jpg" alt="Super ERP Logo" className="w-24 h-24 mb-6" />
        <h1 className="text-3xl font-bold mb-2">Super ERP</h1>
        <p className="text-gray-600 mb-6">Efficiently manage your academic journey.</p>

        {/* Role Dropdown */}
        <div className="w-80 mb-3">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg"
          >
            <option value="" disabled>
              -- Select Role --
            </option>
            <option value="student">STUDENT</option>
            <option value="teacher">TEACHER</option>
            <option value="admin">ADMIN</option>
          </select>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-80 mb-3 px-4 py-3 border rounded-lg"
          />

          {/* Password Field with Eye Icon */}
          <div className="relative w-80 mb-3">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-lg pr-12"
              
            />
            <img
              src={showPassword ? "/eyeo.png" : "/eyec.png"}
              alt={showPassword ? "Hide password" : "Show password"}
              className="custom1 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              style={{ width: "15px", height: "12px" }}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {/* Display error */}
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <button
            type="submit"
            className="w-80 py-3 bg-black text-white rounded-full"
          >
            Continue
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4">
          By continuing, you agree to our{" "}
          <a href="#" className="underline">Terms</a> and{" "}
          <a href="#" className="underline">Privacy Policy</a>.
        </p>
      </div>

      {/* Right Section */}
        <video
        src="/background1.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
            width: "35%",          // scales with parent width
            height: "100%",         // fills parent height
            maxHeight: "100vh",     // prevent overflow
            objectFit: "cover",     // maintain aspect ratio, fill container
            animation: "fadeInOut 5s infinite alternate"
        }}
        />
    </div>
  );
}
