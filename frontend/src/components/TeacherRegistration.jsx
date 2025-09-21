// src/components/TeacherRegistration.jsx
import React, { useState } from "react";
import "../css/StudentRegistration.css"; // Reuse CSS

function TeacherRegistration() {
    const [teacherData, setTeacherData] = useState({
        teacher_id: "",
        name: "",
        email: "",
        password: "",
        department: "",
        designation: "",
        subject: "",  // changed from subjects array to single subject
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const departments = ["EXTC", "Computer", "IT", "Mechanical", "Civil", "Electrical"];
    const designations = ["Professor", "Assistant Professor", "Lab Instructor", "HOD"];
    const subjectsList = ["Mathematics", "Physics", "Electronics", "Programming", "Networking", "Civil Drawing"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeacherData({ ...teacherData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const token = localStorage.getItem("userToken");
            const res = await fetch("http://127.0.0.1:5000/api/admin/teacher-registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(teacherData),
            });

            const data = await res.json();

            if (data.status === "success") {
                setMessage("Teacher registered successfully!");
                setTeacherData({
                    teacher_id: "",
                    name: "",
                    email: "",
                    password: "",
                    department: "",
                    designation: "",
                    subject: "",
                });
            } else {
                setError(data.message || "Failed to register teacher.");
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred. Try again later.");
        }
    };

    return (
        <div className="student-registration card">
            <h2>Register Teacher</h2>
            {message && <p className="success-msg">{message}</p>}
            {error && <p className="error-msg">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Teacher ID</label>
                    <input type="text" name="teacher_id" value={teacherData.teacher_id} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={teacherData.name} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={teacherData.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={teacherData.password} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Department</label>
                    <select name="department" value={teacherData.department} onChange={handleChange} required>
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Designation</label>
                    <select name="designation" value={teacherData.designation} onChange={handleChange} required>
                        <option value="">Select Designation</option>
                        {designations.map(desg => (
                            <option key={desg} value={desg}>{desg}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Subject</label>
                    <select name="subject" value={teacherData.subject} onChange={handleChange} required>
                        <option value="">Select Subject</option>
                        {subjectsList.map(subject => (
                            <option key={subject} value={subject}>{subject}</option>
                        ))}
                    </select>
                </div>

                <button type="submit">Register Teacher</button>
            </form>
        </div>
    );
}

export default TeacherRegistration;
