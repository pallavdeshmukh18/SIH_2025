// src/components/TeacherDashboardHome.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/TeacherDashboardHome.css";

const TeacherDashboardHome = () => {
    const navigate = useNavigate();

    const teacher = {
        name: localStorage.getItem("username") || "Teacher",
        id: "TCH12345",
        photo: "https://via.placeholder.com/100", // Replace with teacher profile image
        department: "Electronics & Telecommunication",
        subjects: ["Mathematics", "Physics", "Digital Systems"],
        email: "teacher@example.com",
        phone: "+91-9876543210",
        assignedClasses: [
            { class: "FY B.Tech A", subject: "Mathematics" },
            { class: "SY B.Tech B", subject: "Physics" },
        ],
        todaysClasses: [
            { time: "9:00 AM", subject: "Mathematics", room: "101" },
            { time: "11:00 AM", subject: "Physics", room: "102" },
            { time: "2:00 PM", subject: "Chemistry", room: "103" },
        ],
        announcements: [
            { title: "Midterm Exam Schedule", postedBy: "Admin", date: "2025-09-20" },
            { title: "Library Closed", postedBy: "Admin", date: "2025-09-19" },
        ],
        events: [
            { title: "Staff Meeting", date: "2025-09-22", time: "10:00 AM" },
            { title: "Workshop on AI Tools", date: "2025-09-25", time: "3:00 PM" },
        ],
    };

    const todayDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="dashboard-home">
            {/* Welcome Banner */}
            <div className="welcome-banner">
                <h2>Welcome back, {teacher.name}!</h2>
                <p>{todayDate}</p>
            </div>

            {/* Profile Overview */}
            <div className="widget profile-overview">
                <h3>Profile Overview</h3>
                <div className="profile-details">
                    <img src="/teacher1.jpeg" alt="Teacher" className="profile-photo" />
                    <div>
                        <p><strong>Name:</strong> {teacher.name}</p>
                        <p><strong>ID:</strong> {teacher.id}</p>
                        <p><strong>Department:</strong> {teacher.department}</p>
                        <p><strong>Subjects:</strong> {teacher.subjects.join(", ")}</p>
                        <p><strong>Email:</strong> {teacher.email}</p>
                        <p><strong>Phone:</strong> {teacher.phone}</p>
                    </div>
                </div>
            </div>

            {/* Class & Subject Management */}
            <div className="widget class-management">
                <h3>Assigned Classes & Subjects</h3>
                <ul>
                    {teacher.assignedClasses.map((cls, idx) => (
                        <li key={idx}>
                            {cls.class} - {cls.subject}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Assignments & Exams */}
            <div className="widget assignments-exams">
                <h3>Assignments & Exams</h3>
                <button onClick={() => navigate("/dashboard/teacher/assignments")}>
                    Upload / Create Assignments
                </button>
                <button onClick={() => navigate("/dashboard/teacher/examination")}>
                    Manage Exams
                </button>
                <button onClick={() => navigate("/dashboard/teacher/assignments")}>
                    Track Submissions
                </button>
            </div>


            {/* Timetable */}
            <div
                className="widget todays-timetable clickable"
                onClick={() => navigate("/dashboard/teacher/timetable")}
            >
                <h3>Today's Timetable</h3>
                <ul>
                    {teacher.todaysClasses.map((cls, idx) => (
                        <li key={idx}>
                            {cls.time} - {cls.subject} ({cls.room})
                        </li>
                    ))}
                </ul>
            </div>

            
            {/* Recent Announcements */}
            <div
                className="widget recent-announcements clickable"
                onClick={() => navigate("/dashboard/teacher/announcements")}
            >
                <h3>Recent Announcements</h3>
                <ul>
                    {teacher.announcements.map((ann, idx) => (
                        <li key={idx}>
                            {ann.title} - <em>{ann.postedBy}, {ann.date}</em>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Upcoming Events & Meetings */}
            <div className="widget upcoming-events">
                <h3>Upcoming Events / Meetings</h3>
                <ul>
                    {teacher.events.map((ev, idx) => (
                        <li key={idx}>
                            <strong>{ev.title}</strong> - {ev.date} at {ev.time}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TeacherDashboardHome;
