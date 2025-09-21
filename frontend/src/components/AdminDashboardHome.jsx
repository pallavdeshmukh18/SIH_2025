// src/components/AdminDashboardHome.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/AdminDashboardHome.css";

const AdminDashboardHome = () => {
    const navigate = useNavigate();

    const rawUsername = localStorage.getItem("username") || "Admin";
    const nameOnly = rawUsername.split("@")[0];
    const formattedName = nameOnly
        .split(/[\._]/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");

    const admin = {
        name: formattedName || "Admin",
        role: "System Administrator",
        totalStudents: 1200,
        totalTeachers: 85,
        totalDepartments: 6,
        pendingRequests: 12,
        upcomingEvents: [
            { title: "Orientation Program", date: "2025-09-25" },
            { title: "Faculty Development Workshop", date: "2025-09-28" },
        ],
        announcements: [
            { title: "Holiday on 2nd October", postedBy: "Admin Office", date: "2025-09-20" },
            { title: "New Library Rules", postedBy: "Librarian", date: "2025-09-19" },
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
                <h2>Welcome back, {admin.name}!</h2>
                <p>{todayDate}</p>
                <p className="role">{admin.role}</p>
            </div>

            {/* Quick Stats */}
            <div className="quick-stats">
                <div
                    className="stats-card clickable"
                    onClick={() => navigate("/dashboard/admin/students")}
                >
                    Students: {admin.totalStudents}
                </div>
                <div
                    className="stats-card clickable"
                    onClick={() => navigate("/dashboard/admin/teachers")}
                >
                    Teachers: {admin.totalTeachers}
                </div>
                <div
                    className="stats-card clickable"
                    onClick={() => navigate("/dashboard/admin/departments")}
                >
                    Departments: {admin.totalDepartments}
                </div>
                <div
                    className="stats-card clickable"
                    onClick={() => navigate("/dashboard/admin/requests")}
                >
                    Pending Requests: {admin.pendingRequests}
                </div>
            </div>

            {/* Upcoming Events */}
            <div
                className="widget upcoming-events clickable"
                onClick={() => navigate("/dashboard/admin/events")}
            >
                <h3>Upcoming Events</h3>
                <ul>
                    {admin.upcomingEvents.map((event, idx) => (
                        <li key={idx}>
                            <strong>{event.title}</strong> - <em>{event.date}</em>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Recent Announcements */}
            <div
                className="widget recent-announcements clickable"
                onClick={() => navigate("/dashboard/admin/announcements")}
            >
                <h3>Recent Announcements</h3>
                <ul>
                    {admin.announcements.map((ann, idx) => (
                        <li key={idx}>
                            {ann.title} - <em>{ann.postedBy}, {ann.date}</em>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboardHome;
