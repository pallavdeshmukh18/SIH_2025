// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import "../css/AdminDashboard.css";

import AdminDashboardHome from "../components/AdminDashboardHome";
import ChatBotPage from "../components/ChatBotPage";
// import AttendancePage from "../components/AttendancePage";
// import DiscussionsPage from "../components/DiscussionsPage";
import TeacherRegistration from "../components/TeacherRegistration";
import StudentRegistration from "../components/StudentRegistration";
import AdminRegistration from "../components/AdminRegistration";
// import AddEntity from "../components/AddEntity";
import StudentDetails from "../components/StudentDetails";
// import TeacherDetails from "../components/TeacherDetails";
// import AddAnnouncements from "../components/AddAnnouncements";
// import SalaryDetails from "../components/SalaryDetails";
// import Fees from "../components/Fees";
// import AdminAnnouncements from "../components/AdminAnnouncements";
// import AdminProfile from "../components/AdminProfile";

import {
    FaHome,
    FaUserPlus,
    FaUserGraduate,
    FaUserShield,
    FaUserCircle,
    FaPlusSquare,
    FaUsers,
    FaChalkboardTeacher,
    FaBullhorn,
    FaMoneyCheckAlt,
    FaMoneyBill,
    FaSignOutAlt,
    FaBars,
    FaRobot,
    FaMoon,
    FaSun
} from "react-icons/fa";

// Sidebar Link Component
function SidebarLink({ to, icon, label, isCollapsed, exact }) {
    return (
        <NavLink
            to={to}
            end={exact}
            className={({ isActive }) => `sidebar-link ${isActive ? "active-link" : ""}`}
            title={isCollapsed ? label : ""}
        >
            {icon} {!isCollapsed && <span className="link-label">{label}</span>}
        </NavLink>
    );
}

function AdminDashboard() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [adminName, setAdminName] = useState("");
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminName = async () => {
            try {
                const token = localStorage.getItem("userToken");
                const res = await fetch("http://127.0.0.1:5000/api/admin/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();

                if (data.status === "success" && data.data.name) {
                    setAdminName(formatName(data.data.name));
                } else {
                    const rawUsername = localStorage.getItem("username") || "Admin";
                    setAdminName(formatName(rawUsername));
                }
            } catch (err) {
                console.error("Failed to fetch admin name:", err);
                const rawUsername = localStorage.getItem("username") || "Admin";
                setAdminName(formatName(rawUsername));
            }
        };

        fetchAdminName();
    }, []);

    // helper to format names/emails
    const formatName = (raw) => {
        const base = raw.includes("@") ? raw.split("@")[0] : raw;
        return base
            .split(/[\._]/)
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(" ");
    };

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        localStorage.setItem("theme", !darkMode ? "dark" : "light");
    };

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("username");
        localStorage.removeItem("userRole");
        navigate("/login");
    };

    return (
        <div className={`admin-dashboard ${darkMode ? "dark-mode" : "light-mode"}`}>
            {/* Sidebar */}
            <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
                <div className="logo">
                    {!isCollapsed && adminName ? `Welcome, ${adminName}!` : ""}
                </div>
                <ul>
                    <li>
                        <SidebarLink
                            to="/dashboard/admin"
                            icon={<FaHome />}
                            label="Dashboard"
                            isCollapsed={isCollapsed}
                            exact={true}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/admin/teacher-registration"
                            icon={<FaUserPlus />}
                            label="Teacher Registration"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/admin/student-registration"
                            icon={<FaUserGraduate />}
                            label="Student Registration"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/admin/admin-registration"
                            icon={<FaUserShield />}
                            label="Admin Registration"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/admin/add-entity"
                            icon={<FaPlusSquare />}
                            label="Add New Entity"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/admin/student-details"
                            icon={<FaUsers />}
                            label="Student Details"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/admin/teacher-details"
                            icon={<FaChalkboardTeacher />}
                            label="Teacher Details"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/admin/add-announcements"
                            icon={<FaBullhorn />}
                            label="Add Announcements"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/admin/salary-details"
                            icon={<FaMoneyCheckAlt />}
                            label="Salary Details"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/admin/fees"
                            icon={<FaMoneyBill />}
                            label="Fees"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/admin/chatbot"
                            icon={<FaRobot />}
                            label="Chat Bot"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/admin/profile"
                            icon={<FaUserCircle />}
                            label="Profile"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                            title={isCollapsed ? "Logout" : ""}
                        >
                            <FaSignOutAlt /> {!isCollapsed && <span className="link-label">Logout</span>}
                        </button>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <div className="topbar">
                    <button className="menu-btn" onClick={toggleSidebar}>
                        <FaBars />
                    </button>
                    <h1>Admin Portal</h1>
                    <button className="theme-btn" onClick={toggleTheme}>
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>
                </div>

                <div className="content">
                    <Routes>
                        <Route index element={<AdminDashboardHome />} />
                        <Route path="teacher-registration" element={<TeacherRegistration />} />
                        <Route path="student-registration" element={<StudentRegistration />} />
                        <Route path="admin-registration" element={<AdminRegistration />} />
                        <Route path="student-details" element={<StudentDetails />} />
                        <Route path="chatbot" element={<ChatBotPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
