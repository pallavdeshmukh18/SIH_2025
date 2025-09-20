import React, { useState, useEffect } from "react";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import "../css/TeacherDashboard.css";
import ChatBotPage from "../components/ChatBotPage";
import TeacherTimetable from "../components/TeacherTimetable";
import {
    FaHome,
    FaCalendarAlt,
    FaClipboardList,
    FaUser,
    FaChartBar,
    FaBell,
    FaSignOutAlt,
    FaBars,
    FaQuestionCircle,
    FaComments,
    FaUserCheck,
    FaRobot,
    FaBookOpen,
    FaMoon,
    FaSun,
    FaMoneyCheckAlt,
    FaFileAlt
} from "react-icons/fa";

// --- Page Components ---
import TeacherDashboardHome from "../components/TeacherDashboardHome";

//const Timetable = () => <h2>Your Timetable</h2>;
//const Assignments = () => <h2>Assignments</h2>;
const StudyMaterials = () => <h2>Study Materials</h2>;
const Profile = () => <h2>Profile Details</h2>;
const Discussions = () => <h2>Discussions</h2>;
const Attendance = () => <h2>Your Attendance</h2>;
const Announcements = () => <h2>Announcements</h2>;
const Salary = () => <h2>Salary Details</h2>;
const Examination = () => <h2>Examination Details</h2>;

// --- Sidebar Link Component ---
function SidebarLink({ to, icon, label, isCollapsed, exact }) {
    return (
        <NavLink
            to={to}
            end={exact}
            className={({ isActive }) =>
                isActive ? "active-link" : "sidebar-link"
            }
            title={isCollapsed ? label : ""}
        >
            {icon} {!isCollapsed && <span className="link-label">{label}</span>}
        </NavLink>
    );
}

function TeacherDashboard() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [teacherName, setTeacherName] = useState("Teacher");
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setTeacherName(
                storedUsername.charAt(0).toUpperCase() + storedUsername.slice(1)
            );
        }

        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) setDarkMode(storedTheme === "dark");
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
        <div className={`teacher-dashboard ${darkMode ? "dark-mode" : "light-mode"}`}>
            {/* Sidebar */}
            <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
                <div className="logo">{!isCollapsed && `Hello, ${teacherName}!`}</div>
                <ul>
                    <li>
                        <SidebarLink
                            to="/dashboard/teacher"
                            icon={<FaHome />}
                            label="Dashboard"
                            isCollapsed={isCollapsed}
                            exact
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/teacher/timetable"
                            icon={<FaCalendarAlt />}
                            label="Timetable"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/teacher/assignments"
                            icon={<FaClipboardList />}
                            label="Assignments"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/teacher/study-materials"
                            icon={<FaBookOpen />}
                            label="Study Materials"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/teacher/attendance"
                            icon={<FaUserCheck />}
                            label="Attendance"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/teacher/examination"
                            icon={<FaFileAlt />}
                            label="Examination"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/teacher/salary"
                            icon={<FaMoneyCheckAlt />}
                            label="Salary"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/teacher/discussions"
                            icon={<FaComments />}
                            label="Discussions"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/teacher/chatbot"
                            icon={<FaRobot />}
                            label="Chat Bot"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/teacher/announcements"
                            icon={<FaBell />}
                            label="Announcements"
                            isCollapsed={isCollapsed}
                        />
                    </li>
                    <li>
                        <SidebarLink
                            to="/dashboard/teacher/profile"
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
                    <h1>Teacher Portal</h1>
                    {/* Dark/Light Mode Toggle */}
                    <button className="theme-btn" onClick={toggleTheme}>
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>
                </div>

                <div className="content">
                    <Routes>
                        <Route index element={<TeacherDashboardHome />} />
                        <Route path="timetable" element={<TeacherTimetable />} />
                        <Route path="assignments" element={<TeacherAssignments />} />
                        <Route path="study-materials" element={<StudyMaterials />} />
                        <Route path="attendance" element={<Attendance />} />
                        <Route path="examination" element={<Examination />} />
                        <Route path="salary" element={<Salary />} />
                        <Route path="discussions" element={<Discussions />} />
                        <Route path="chatbot" element={<ChatBotPage />} />
                        <Route path="announcements" element={<Announcements />} />
                        <Route path="profile" element={<Profile />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default TeacherDashboard;
