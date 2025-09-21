// src/components/StudentRegistration.jsx
import React, { useState } from "react";
import "../css/StudentRegistration.css";

function StudentRegistration() {
    const [studentData, setStudentData] = useState({
        name: "",
        email: "",
        password: "",
        hostel: "",
        room_no: "",
        mess: "",
        branch: "",
        year: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const hostels = ["Hostel A", "Hostel B", "Hostel C", "Hostel D"];
    const messes = ["Mess 1", "Mess 2", "Mess 3", "Mess 4"];
    const branches = ["EXTC", "Computer", "IT", "Mechanical", "Civil", "Electrical"];
    const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

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
                    hostel: "",
                    room_no: "",
                    mess: "",
                    branch: "",
                    year: "",
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
                    <label>Name</label>
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

                <div className="form-group">
                    <label>Hostel</label>
                    <select name="hostel" value={studentData.hostel} onChange={handleChange} required>
                        <option value="">Select Hostel</option>
                        {hostels.map((hostel) => (
                            <option key={hostel} value={hostel}>{hostel}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Room No</label>
                    <input
                        type="text"
                        name="room_no"
                        value={studentData.room_no}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Mess</label>
                    <select name="mess" value={studentData.mess} onChange={handleChange}>
                        <option value="">Select Mess</option>
                        {messes.map((mess) => (
                            <option key={mess} value={mess}>{mess}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Branch</label>
                    <select name="branch" value={studentData.branch} onChange={handleChange} required>
                        <option value="">Select Branch</option>
                        {branches.map((branch) => (
                            <option key={branch} value={branch}>{branch}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Year</label>
                    <select name="year" value={studentData.year} onChange={handleChange} required>
                        <option value="">Select Year</option>
                        {years.map((yr) => (
                            <option key={yr} value={yr}>{yr}</option>
                        ))}
                    </select>
                </div>

                <button type="submit">Register Student</button>
            </form>
        </div>
    );
}

export default StudentRegistration;
