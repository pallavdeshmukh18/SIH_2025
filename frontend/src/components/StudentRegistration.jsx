// src/components/StudentRegistration.jsx
import React, { useState } from "react";
import "../css/StudentRegistration.css";

function StudentRegistration() {
    const [studentData, setStudentData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setStudentData({
            ...studentData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const token = localStorage.getItem("userToken");
            const res = await fetch("http://127.0.0.1:5000/api/admin/student-registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(studentData),
            });

            const data = await res.json();

            if (data.status === "success") {
                setMessage("Student registered successfully!");
                setStudentData({
                    name: "",
                    email: "",
                    password: "",
                });
            } else {
                setError(data.message || "Failed to register student.");
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred. Try again later.");
        }
    };

    return (
        <div className="student-registration card">
            <h2>Register Student</h2>
            {message && <p className="success-msg">{message}</p>}
            {error && <p className="error-msg">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        name="name"
                        value={studentData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={studentData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={studentData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Register Student</button>
            </form>
        </div>
    );
}

export default StudentRegistration;
