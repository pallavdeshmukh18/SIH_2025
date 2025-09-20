// src/pages/TeacherProfile.jsx
import React from "react";
import "../css/TeacherProfile.css";

function TeacherProfile() {
  const teacher = {
    basic: {
      name: "Dr. Ramesh Sharma",
      dob: "1975-08-12",
      gender: "Male",
      nationality: "Indian",
      contact: "+91-9876543210",
      email: "ramesh.sharma@college.edu",
      address: "123, MG Road, Pune, Maharashtra, India",
      photo: "/images/teacher-photo.jpg",
      signature: "/images/teacher-sign.png",
    },
    education: {
      degrees: "Ph.D. in Computer Science, M.Tech in AI",
      university: "IIT Bombay, 2005",
      specialization: "Artificial Intelligence & Data Mining",
      certifications: [
        "FDP on Machine Learning - 2019",
        "Coursera Deep Learning Specialization - 2020",
        "NPTEL Cloud Computing - 2021",
      ],
      research: "Ph.D. Thesis on 'Neural Networks in Pattern Recognition', Recognized Ph.D. Guide since 2015",
    },
    employment: {
      empId: "FAC12345",
      department: "Computer Science",
      designation: "Professor",
      joiningDate: "2008-06-15",
      experience: "17 years of teaching, 5 years industry",
      promotions: "Assoc. Professor (2012), Professor (2018)",
      workload: "12 hours/week teaching, 6 hours/week research",
      attendance: "98% attendance, 5 leaves this semester",
    },
    academics: {
      subjects: [
        "Artificial Intelligence (Sem VI)",
        "Machine Learning (Sem VII)",
        "Data Mining (Sem VIII)",
      ],
      timetable: "Mon-Fri, 10 AM – 4 PM",
      assignments: "Uploaded 12 assignments this semester",
      projects: "Guided 8 student projects this year",
      internals: "Internal marks uploaded for all subjects",
      courseFiles: "Lesson plans & course files submitted",
    },
  };

  return (
    <div className="teacher-profile-page">
      <h2 className="profile-heading">Teacher Profile</h2>

      {/* Basic Details */}
      <div className="profile-section">
        <h3 className="section-title">Basic Details</h3>
        <div className="profile-basic">
          <img
            src="/teacher1.jpeg"
            alt="Teacher"
            className="profile-photo"
          />
          <div className="profile-basic-info">
            <p><strong>Full Name:</strong> {teacher.basic.name}</p>
            <p><strong>DOB:</strong> {teacher.basic.dob}</p>
            <p><strong>Gender:</strong> {teacher.basic.gender}</p>
            <p><strong>Nationality:</strong> {teacher.basic.nationality}</p>
            <p><strong>Contact:</strong> {teacher.basic.contact}</p>
            <p><strong>Email:</strong> {teacher.basic.email}</p>
            <p><strong>Address:</strong> {teacher.basic.address}</p>
          </div>
          <div className="profile-signature">
            <p><strong>Digital Signature:</strong></p>
            <img
              src={teacher.basic.signature}
              alt="Signature"
              className="signature-img"
            />
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="profile-section">
        <h3 className="section-title">Educational Qualifications</h3>
        <div className="profile-education">
          <p><strong>Degrees:</strong> {teacher.education.degrees}</p>
          <p><strong>University:</strong> {teacher.education.university}</p>
          <p><strong>Specialization:</strong> {teacher.education.specialization}</p>
          <p><strong>Certifications & Training:</strong></p>
          <ul className="certifications-list">
            {teacher.education.certifications.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
          <p><strong>Research Qualification:</strong> {teacher.education.research}</p>
        </div>
      </div>

      {/* Employment */}
      <div className="profile-section">
        <h3 className="section-title">Employment Details</h3>
        <div className="profile-employment">
          <p><strong>Employee ID:</strong> {teacher.employment.empId}</p>
          <p><strong>Department:</strong> {teacher.employment.department}</p>
          <p><strong>Designation:</strong> {teacher.employment.designation}</p>
          <p><strong>Joining Date:</strong> {teacher.employment.joiningDate}</p>
          <p><strong>Experience:</strong> {teacher.employment.experience}</p>
          <p><strong>Promotions:</strong> {teacher.employment.promotions}</p>
          <p><strong>Teaching Workload:</strong> {teacher.employment.workload}</p>
          <p><strong>Attendance/Leave Records:</strong> {teacher.employment.attendance}</p>
        </div>
      </div>

      {/* Academic Contributions */}
      <div className="profile-section">
        <h3 className="section-title">Academic Contributions</h3>
        <div className="profile-academics">
          <p><strong>Subjects Taught:</strong></p>
          <ul className="subjects-list">
            {teacher.academics.subjects.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
          <p><strong>Class Timetable:</strong> {teacher.academics.timetable}</p>
          <p><strong>Assignments:</strong> {teacher.academics.assignments}</p>
          <p><strong>Projects:</strong> {teacher.academics.projects}</p>
          <p><strong>Internal Marks:</strong> {teacher.academics.internals}</p>
          <p><strong>Course Files:</strong> {teacher.academics.courseFiles}</p>
        </div>
      </div>
    </div>
  );
}

export default TeacherProfile;
