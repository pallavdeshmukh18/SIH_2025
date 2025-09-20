// src/pages/StudentProfile.jsx
import React, { useState, useEffect } from "react";
import "../css/StudentProfile.css";

function StudentProfile() {
    const [student, setStudent] = useState({
        name: "",
        rollNumber: "EXTC1234",
        email: "",
        contact: "",
        course: "Electronics and Telecommunication",
        profilePic: "",
        parents: {
            father: { name: "Mr. Deshmukh", contact: "9999999999" },
            mother: { name: "Mrs. Deshmukh", contact: "8888888888" },
        },
        idCard: { idNumber: "STU2025001", issueDate: "2025-06-01" },
        previousSchool: { name: "ABC High School", board: "CBSE", yearOfPassing: 2023 }
    });

    useEffect(() => {
        const storedName = localStorage.getItem("username") || "Student";
        const storedEmail = localStorage.getItem("email") || "student@example.com";
        const storedContact = localStorage.getItem("contact") || "0000000000";

        setStudent(prev => ({
            ...prev,
            name: storedName.charAt(0).toUpperCase() + storedName.slice(1),
            email: storedEmail,
            contact: storedContact
        }));
    }, []);

    const handleEdit = () => {
        alert("Profile edit functionality can be implemented here.");
    };

    return (
        <div className="student-profile-page">
            <h2>My Profile</h2>

            <div className="profile-card">
                {student.profilePic ? (
                    <img src={student.profilePic} alt="Profile" className="profile-pic" />
                ) : (
                    <div className="profile-pic-placeholder">{student.name.charAt(0)}</div>
                )}

                <div className="profile-details">
                    <p><strong>Name:</strong> {student.name}</p>
                    <p><strong>Roll Number:</strong> {student.rollNumber}</p>
                    <p><strong>Email:</strong> {student.email}</p>
                    <p><strong>Contact:</strong> {student.contact}</p>
                    <p><strong>Course:</strong> {student.course}</p>

                    <h3>Parent / Guardian Info</h3>
                    <p><strong>Father:</strong> {student.parents.father.name} ({student.parents.father.contact})</p>
                    <p><strong>Mother:</strong> {student.parents.mother.name} ({student.parents.mother.contact})</p>

                    <h3>ID Card Details</h3>
                    <p><strong>ID Number:</strong> {student.idCard.idNumber}</p>
                    <p><strong>Issue Date:</strong> {student.idCard.issueDate}</p>

                    <h3>Previous School</h3>
                    <p><strong>School Name:</strong> {student.previousSchool.name}</p>
                    <p><strong>Board:</strong> {student.previousSchool.board}</p>
                    <p><strong>Year of Passing:</strong> {student.previousSchool.yearOfPassing}</p>
                </div>
            </div>

            <button className="edit-profile-btn" onClick={handleEdit}>Edit Profile</button>
        </div>
    );
}

export default StudentProfile;
