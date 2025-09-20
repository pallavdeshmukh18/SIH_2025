// src/components/TeacherDashboardHome.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/TeacherDashboardHome.css";

const TeacherDashboardHome = () => {
    const navigate = useNavigate();

    const teacher = {
        name: localStorage.getItem("username") || "Teacher",
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
                <h2>Welcome back, {teacher.name}!</h2>
                <p>{todayDate}</p>
            </div>

            {/* Hostel Info */}
            <div className="widget hostel-info">
                <h3>Hostel Information</h3>
                <p><strong>Name:</strong> {teacher.hostel.name}</p>
                <p><strong>Room:</strong> {teacher.hostel.room}</p>
                <p><strong>Block:</strong> {teacher.hostel.block}</p>
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
                    onClick={() => navigate("/dashboard/teacher/courses")}
                >
                    Courses Enrolled: {teacher.coursesEnrolled}
                </div>
                <div
                    className="stats-card clickable"
                    onClick={() => navigate("/dashboard/teacher/assignments")}
                >
                    Assignments Due: {teacher.assignmentsDue}
                </div>
                <div
                    className="stats-card clickable"
                    onClick={() => navigate("/dashboard/teacher/attendance")}
                >
                    Attendance: {teacher.attendance}%
                </div>
                <div className="stats-card">
                    Branch: {teacher.branch}
                </div>
            </div>

            {/* Upcoming Deadlines */}
            <div
                className="widget upcoming-deadlines clickable"
                onClick={() => navigate("/dashboard/teacher/assignments")}
            >
                <h3>Upcoming Deadlines</h3>
                <ul>
                    {teacher.upcomingAssignments.map((a, idx) => (
                        <li key={idx}>
                            <strong>{a.title}</strong> ({a.course}) - <em>{a.due}</em>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Today's Timetable */}
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

            {/* Attendance Summary */}
            <div
                className="widget attendance-summary clickable"
                onClick={() => navigate("/dashboard/teacher/attendance")}
            >
                <h3>Attendance Summary</h3>
                <div className="progress-bar">
                    <div
                        className="progress"
                        style={{ width: `${teacher.attendance}%` }}
                    ></div>
                </div>
                <p>Overall: {teacher.attendance}%</p>
            </div>

            {/* Performance Snapshot */}
            <div
                className="widget performance-snapshot clickable"
                onClick={() => navigate("/dashboard/teacher/results")}
            >
                <h3>Performance Snapshot</h3>
                <p>GPA: {teacher.gpa}</p>
                <p>Next Assignment: {teacher.nextAssignment}</p>
            </div>
        </div>
    );
};

export default TeacherDashboardHome;
