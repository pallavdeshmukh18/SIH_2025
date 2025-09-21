// src/pages/AdminProfile.jsx
import React from "react";
import "../css/AdminProfile.css";

function AdminProfile() {
  const admin = {
    basic: {
      name: "Rajesh Kumar",
      dob: "1980-02-25",
      gender: "Male",
      nationality: "Indian",
      contact: "+91-9876543210",
      email: "rajesh.kumar@university.edu",
      address: "45, Residency Road, Jaipur, Rajasthan, India",
      photo: "/images/admin-photo.jpg",
      signature: "/images/admin-sign.png",
    },
    employment: {
      empId: "ADM001",
      designation: "Administrator",
      department: "Accounts & Management",
      joiningDate: "2015-07-01",
      experience: "10 years of administration, 5 years teaching",
      workload: "10 hours/week administration, 5 hours/week supervision",
      attendance: "99% attendance, 2 leaves this semester",
    },
    responsibilities: {
      systems: [
        "Salary Management",
        "Fee Management",
        "Student Information System",
        "Staff Profiles & Records",
      ],
      achievements: [
        "Digitized entire salary processing in 2021",
        "Implemented ERP-based fee management in 2023",
        "Improved data security protocols for staff records",
      ],
    },
  };

  return (
    <div className="admin-profile-page">
      <h2 className="profile-heading">Administrator Profile</h2>

      {/* Basic Details */}
      <div className="profile-section">
        <h3 className="section-title">Basic Details</h3>
        <div className="profile-basic">
          <img
            src={admin.basic.photo}
            alt="Admin"
            className="profile-photo"
          />
          <div className="profile-basic-info">
            <p><strong>Full Name:</strong> {admin.basic.name}</p>
            <p><strong>DOB:</strong> {admin.basic.dob}</p>
            <p><strong>Gender:</strong> {admin.basic.gender}</p>
            <p><strong>Nationality:</strong> {admin.basic.nationality}</p>
            <p><strong>Contact:</strong> {admin.basic.contact}</p>
            <p><strong>Email:</strong> {admin.basic.email}</p>
            <p><strong>Address:</strong> {admin.basic.address}</p>
          </div>
          <div className="profile-signature">
            <p><strong>Digital Signature:</strong></p>
            <img
              src={admin.basic.signature}
              alt="Signature"
              className="signature-img"
            />
          </div>
        </div>
      </div>

      {/* Employment Details */}
      <div className="profile-section">
        <h3 className="section-title">Employment Details</h3>
        <div className="profile-employment">
          <p><strong>Employee ID:</strong> {admin.employment.empId}</p>
          <p><strong>Department:</strong> {admin.employment.department}</p>
          <p><strong>Designation:</strong> {admin.employment.designation}</p>
          <p><strong>Joining Date:</strong> {admin.employment.joiningDate}</p>
          <p><strong>Experience:</strong> {admin.employment.experience}</p>
          <p><strong>Workload:</strong> {admin.employment.workload}</p>
          <p><strong>Attendance/Leave Records:</strong> {admin.employment.attendance}</p>
        </div>
      </div>

      {/* System Responsibilities */}
      <div className="profile-section">
        <h3 className="section-title">System Responsibilities</h3>
        <div className="profile-responsibilities">
          <p><strong>ERP Systems Managed:</strong></p>
          <ul className="responsibilities-list">
            {admin.responsibilities.systems.map((sys, i) => (
              <li key={i}>{sys}</li>
            ))}
          </ul>

          <p><strong>Key Achievements:</strong></p>
          <ul className="achievements-list">
            {admin.responsibilities.achievements.map((ach, i) => (
              <li key={i}>{ach}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
