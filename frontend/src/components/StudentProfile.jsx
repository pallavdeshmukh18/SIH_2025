import { useState } from "react";
import "../css/StudentProfile.css";

export default function StudentProfile() {
    // initial student data
    const [student, setStudent] = useState({
        name: "Anmol Katiyar",
        roll: "EXTC1234",
        email: "anmol.katiyar24@spit.ac.in",
        phone: "9999999999",
        course: "Electronics and Telecommunication",
        year: "3rd Year",
        father: "Mr. Katiyar",
        fatherContact: "9999999999",
        mother: "Mrs. Katiyar",
        motherContact: "8888888888",
        address: "Andheri West, Mumbai",
        bloodGroup: "B+",
    });

    // toggle edit mode
    const [isEditing, setIsEditing] = useState(false);

    // update form values (only for editable fields)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    // toggle edit / save
    const handleEditSave = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="profile-container">
            <h2 className="profile-title">My Profile</h2>

            <div className="profile-card">
                <div className="profile-avatar">
                    {student.name.charAt(0).toUpperCase()}
                </div>

                <div className="profile-info">
                    <div className="info-row">
                        <p><strong>Roll Number:</strong> {student.roll}</p>
                        <p>
                            <strong>Email:</strong>{" "}
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={student.email}
                                    onChange={handleChange}
                                />
                            ) : (
                                student.email
                            )}
                        </p>
                    </div>

                    <div className="info-row">
                        <p>
                            <strong>Name:</strong>{" "}
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={student.name}
                                    onChange={handleChange}
                                />
                            ) : (
                                student.name
                            )}
                        </p>
                        <p><strong>Phone:</strong> {student.phone}</p>
                    </div>

                    <div className="info-row">
                        <p><strong>Course:</strong> {student.course}</p>
                        <p><strong>Year:</strong> {student.year}</p>
                    </div>

                    <div className="info-row">
                        <p><strong>Father:</strong> {student.father}</p>
                        <p><strong>Father Contact:</strong> {student.fatherContact}</p>
                    </div>

                    <div className="info-row">
                        <p><strong>Mother:</strong> {student.mother}</p>
                        <p><strong>Mother Contact:</strong> {student.motherContact}</p>
                    </div>

                    <div className="info-row">
                        <p><strong>Address:</strong> {student.address}</p>
                        <p><strong>Blood Group:</strong> {student.bloodGroup}</p>
                    </div>
                </div>
            </div>

            <button className="edit-btn" onClick={handleEditSave}>
                {isEditing ? "Save Profile" : "Edit Profile"}
            </button>
        </div>
    );
}
