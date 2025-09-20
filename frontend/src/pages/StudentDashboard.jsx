import React, { useState, useEffect } from "react";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import "../css/StudentDashboard.css";
import ChatBotPage from "../components/ChatBotPage";
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

// --- Page Components ---
import StudentDashboardHome from "../components/StudentDashboardHome";

const Courses = () => <h2>Your Courses</h2>;
const Timetable = () => <h2>Your Timetable</h2>;
const Assignments = () => <h2>Assignments</h2>;
const StudyMaterials = () => <h2>Study Materials</h2>;
const Profile = () => <h2>Profile Details</h2>;
const Results = () => <h2>Your Results</h2>;
const MCQs = () => <h2>Upcoming Tests</h2>;
const Discussions = () => <h2>Discussions</h2>;
const Attendance = () => <h2>Your Attendance</h2>;
const Fees = () => <h2>Fee Payment</h2>;
const Announcements = () => <h2>Announcements</h2>;

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

function StudentDashboard() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [studentName, setStudentName] = useState("Student");
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setStudentName(
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
                            exact
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
                    {/* Dark/Light Mode Toggle */}
                    <button className="theme-btn" onClick={toggleTheme}>
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>
                </div>

                <div className="content">
                    <Routes>
                        <Route index element={<StudentDashboardHome />} />
                        <Route path="courses" element={<Courses />} />
                        <Route path="timetable" element={<Timetable />} />
                        <Route path="assignments" element={<Assignments />} />
                        <Route path="study-materials" element={<StudyMaterials />} />
                        <Route path="results" element={<Results />} />
                        <Route path="mcqs" element={<MCQs />} />
                        <Route path="discussions" element={<Discussions />} />
                        <Route path="attendance" element={<Attendance />} />
                        <Route path="fees" element={<Fees />} />
                        <Route path="announcements" element={<Announcements />} />
                        <Route path="chatbot" element={<ChatBotPage />} />
                        <Route path="profile" element={<Profile />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default StudentDashboard;
