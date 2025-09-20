import React, { useState, useEffect } from "react";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import "../css/StudentDashboard.css";

import StudentDashboardHome from "../components/StudentDashboardHome";
import ChatBotPage from "../components/ChatBotPage";
import AttendancePage from "../components/AttendancePage";
import DiscussionsPage from "../components/DiscussionsPage";
import StudentCourses from "../components/StudentCourses";
import StudentTimetable from "../components/StudentTimetable";
import StudentAssignments from "../components/StudentAssignments";
import StudentStudyMaterial from "../components/StudentStudyMaterial";
import StudentResult from "../components/StudentResult";
import MCQs from "../components/MCQs";
import Fees from "../components/Fees";
import StudentAnnouncements from "../components/StudentAnnouncements";
import StudentProfile from "../components/StudentProfile";

import {
    FaHome,
    FaBook,
    FaCalendarAlt,
    FaClipboardList,
    FaUser,
    FaChartBar,
    FaMoneyBill,
    FaBell,
    FaSignOutAlt,
    FaBars,
    FaQuestionCircle,
    FaComments,
    FaUserCheck,
    FaRobot,
    FaBookOpen,
    FaMoon,
    FaSun
} from "react-icons/fa";

// --- Sidebar Link Component ---
function SidebarLink({ to, icon, label, isCollapsed, exact }) {
    return (
        <NavLink
            to={to}
            end={exact} // only use exact for routes like Dashboard
            className={({ isActive }) =>
                `sidebar-link ${isActive ? "active-link" : ""}`
            }
            title={isCollapsed ? label : ""}
        >
            {icon} {!isCollapsed && <span className="link-label">{label}</span>}
        </NavLink>
    );
}

function StudentDashboard() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [studentName, setStudentName] = useState("Student");
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudentName = async () => {
            try {
                const token = localStorage.getItem("userToken"); // your auth token
                const res = await fetch("http://127.0.0.1:5000/api/student/profile", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.status === "success") {
                    setStudentName(data.data.name);
                }
            } catch (err) {
                console.error("Failed to fetch student name:", err);
                setStudentName("Student"); // fallback
            }
        };

        fetchStudentName();
    }, []);


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
        <div className={`student-dashboard ${darkMode ? "dark-mode" : "light-mode"}`}>
            {/* Sidebar */}
            <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
                <div className="logo">{!isCollapsed && `Hello, ${studentName}!`}</div>
                <ul>
                    <li>
                        <SidebarLink
                            to="/dashboard/student"
                            icon={<FaHome />}
                            label="Dashboard"
                            isCollapsed={isCollapsed}
                            exact={true} // exact match
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/student/courses"
                            icon={<FaBook />}
                            label="Courses"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/student/timetable"
                            icon={<FaCalendarAlt />}
                            label="Timetable"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/student/assignments"
                            icon={<FaClipboardList />}
                            label="Assignments"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/student/study-materials"
                            icon={<FaBookOpen />}
                            label="Study Materials"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/student/results"
                            icon={<FaChartBar />}
                            label="Results"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/student/attendance"
                            icon={<FaUserCheck />}
                            label="Attendance"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/student/mcqs"
                            icon={<FaQuestionCircle />}
                            label="MCQs"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/student/discussions"
                            icon={<FaComments />}
                            label="Discussions"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/student/fees"
                            icon={<FaMoneyBill />}
                            label="Fees"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/student/chatbot"
                            icon={<FaRobot />}
                            label="Chat Bot"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/student/announcements"
                            icon={<FaBell />}
                            label="Announcements"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/student/profile"
                            icon={<FaUser />}
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
                    <h1>Student Portal</h1>
                    <button className="theme-btn" onClick={toggleTheme}>
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>
                </div>

                <div className="content">
                    <Routes>
                        <Route index element={<StudentDashboardHome />} />
                        <Route path="courses" element={<StudentCourses />} />
                        <Route path="timetable" element={<StudentTimetable />} />
                        <Route path="assignments" element={<StudentAssignments />} />
                        <Route path="study-materials" element={<StudentStudyMaterial />} />
                        <Route path="results" element={<StudentResult />} />
                        <Route path="mcqs" element={<MCQs />} />
                        <Route path="discussions" element={<DiscussionsPage />} />
                        <Route path="attendance" element={<AttendancePage />} />
                        <Route path="fees" element={<Fees />} />
                        <Route path="announcements" element={<StudentAnnouncements />} />
                        <Route path="chatbot" element={<ChatBotPage />} />
                        <Route path="profile" element={<StudentProfile />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default StudentDashboard;
