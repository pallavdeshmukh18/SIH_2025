// src/components/StudentDashboardHome.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/StudentDashboardHome.css";

const StudentDashboardHome = () => {
    const navigate = useNavigate();

    const student = {
        name: localStorage.getItem("username") || "Student",
        gpa: 8.7,
        attendance: 92,
        branch: "EXTC",
        nextAssignment: "Math Project",
        coursesEnrolled: 5,
        assignmentsDue: 3,
        hostel: {
            name: "Tagore Hostel",
            room: "B-203",
            block: "Block B",
        },
        todaysClasses: [
            { time: "9:00 AM", subject: "Mathematics", room: "101" },
            { time: "11:00 AM", subject: "Physics", room: "102" },
            { time: "2:00 PM", subject: "Chemistry", room: "103" },
        ],
        upcomingAssignments: [
            { title: "Math Homework 5", course: "Mathematics", due: "Tomorrow" },
            { title: "Physics Lab Report", course: "Physics", due: "In 3 days" },
        ],
        announcements: [
            { title: "Midterm Exam Schedule", postedBy: "Admin", date: "2025-09-20" },
            { title: "Library Closed", postedBy: "Admin", date: "2025-09-19" },
        ],
    };

    const messInfo = {
        name: "Mess 1",
        type: "Central Mess",
        menu: "Veg & Non-Veg",
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
                <h2>Welcome back, {student.name}!</h2>
                <p>{todayDate}</p>
            </div>

            {/* Hostel Info */}
            <div className="widget hostel-info">
                <h3>Hostel Information</h3>
                <p><strong>Name:</strong> {student.hostel.name}</p>
                <p><strong>Room:</strong> {student.hostel.room}</p>
                <p><strong>Block:</strong> {student.hostel.block}</p>
            </div>

            {/* Mess Info */}
            <div className="widget mess-info">
                <h3>Mess Information</h3>
                <p><strong>Mess Name:</strong> {messInfo.name}</p>
                <p><strong>Type:</strong> {messInfo.type}</p>
                <p><strong>Menu:</strong> {messInfo.menu}</p>
            </div>

            {/* Quick Stats */}
            <div className="quick-stats">
                <div
                    className="stats-card clickable"
                    onClick={() => navigate("/dashboard/student/courses")}
                >
                    Courses Enrolled: {student.coursesEnrolled}
                </div>
                <div
                    className="stats-card clickable"
                    onClick={() => navigate("/dashboard/student/assignments")}
                >
                    Assignments Due: {student.assignmentsDue}
                </div>
                <div
                    className="stats-card clickable"
                    onClick={() => navigate("/dashboard/student/attendance")}
                >
                    Attendance: {student.attendance}%
                </div>
                <div className="stats-card">
                    Branch: {student.branch}
                </div>
            </div>

            {/* Upcoming Deadlines */}
            <div
                className="widget upcoming-deadlines clickable"
                onClick={() => navigate("/dashboard/student/assignments")}
            >
                <h3>Upcoming Deadlines</h3>
                <ul>
                    {student.upcomingAssignments.map((a, idx) => (
                        <li key={idx}>
                            <strong>{a.title}</strong> ({a.course}) - <em>{a.due}</em>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Today's Timetable */}
            <div
                className="widget todays-timetable clickable"
                onClick={() => navigate("/dashboard/student/timetable")}
            >
                <h3>Today's Timetable</h3>
                <ul>
                    {student.todaysClasses.map((cls, idx) => (
                        <li key={idx}>
                            {cls.time} - {cls.subject} ({cls.room})
                        </li>
                    ))}
                </ul>
            </div>

            {/* Recent Announcements */}
            <div
                className="widget recent-announcements clickable"
                onClick={() => navigate("/dashboard/student/announcements")}
            >
                <h3>Recent Announcements</h3>
                <ul>
                    {student.announcements.map((ann, idx) => (
                        <li key={idx}>
                            {ann.title} - <em>{ann.postedBy}, {ann.date}</em>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Attendance Summary */}
            <div
                className="widget attendance-summary clickable"
                onClick={() => navigate("/dashboard/student/attendance")}
            >
                <h3>Attendance Summary</h3>
                <div className="progress-bar">
                    <div
                        className="progress"
                        style={{ width: `${student.attendance}%` }}
                    ></div>
                </div>
                <p>Overall: {student.attendance}%</p>
            </div>

            {/* Performance Snapshot */}
            <div
                className="widget performance-snapshot clickable"
                onClick={() => navigate("/dashboard/student/results")}
            >
                <h3>Performance Snapshot</h3>
                <p>GPA: {student.gpa}</p>
                <p>Next Assignment: {student.nextAssignment}</p>
            </div>
        </div>
    );
};

export default StudentDashboardHome;
