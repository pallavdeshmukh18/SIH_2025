// src/pages/TeacherAttendance.jsx
import React, { useState, useEffect } from "react";
import "../css/TeacherAttendance.css";

function TeacherAttendance() {
    const teacherName = localStorage.getItem("username") || "Teacher";

    // Mock classes and students
    const initialClasses = [
        { classId: 1, className: "Mathematics", totalDays: 20 },
        { classId: 2, className: "Physics", totalDays: 22 },
        { classId: 3, className: "Chemistry", totalDays: 18 },
        { classId: 4, className: "Computer Science", totalDays: 20 },
    ];

    // Load attendance data from localStorage
    const storedAttendance = JSON.parse(localStorage.getItem(`attendance_${teacherName}`)) || {};

    const [classes, setClasses] = useState(initialClasses);
    const [attendanceData, setAttendanceData] = useState(storedAttendance);
    const [selectedClass, setSelectedClass] = useState(null);

    // Save to localStorage on any change
    useEffect(() => {
        localStorage.setItem(`attendance_${teacherName}`, JSON.stringify(attendanceData));
    }, [attendanceData, teacherName]);

    // Open modal for a class
    const openClassModal = (classObj) => {
        setSelectedClass(classObj);

        // If no data exists yet for this class, initialize mock students
        if (!attendanceData[classObj.classId]) {
            const students = [
                { id: 1, name: "Student A", presentDays: Math.floor(classObj.totalDays * 0.8) },
                { id: 2, name: "Student B", presentDays: Math.floor(classObj.totalDays * 0.7) },
                { id: 3, name: "Student C", presentDays: Math.floor(classObj.totalDays * 0.9) },
                { id: 4, name: "Student D", presentDays: Math.floor(classObj.totalDays * 0.6) },
            ];
            setAttendanceData(prev => ({ ...prev, [classObj.classId]: students }));
        }
    };

    // Close modal
    const closeModal = () => {
        setSelectedClass(null);
    };

    // Adjust attendance
    const adjustAttendance = (classId, studentId, delta) => {
        setAttendanceData(prev => ({
            ...prev,
            [classId]: prev[classId].map(s =>
                s.id === studentId
                    ? { ...s, presentDays: Math.min(Math.max(s.presentDays + delta, 0), selectedClass.totalDays) }
                    : s
            )
        }));
    };

    // Get color based on percentage
    const getCircleColor = (percentage) => {
        if (percentage < 50) return "red";
        if (percentage < 75) return "orange";
        return "#4caf50";
    };

    return (
        <div className="teacher-attendance-page">
            <h2>Class Attendance</h2>

            {/* Class Tiles */}
            <div className="attendance-tiles">
                {classes.map(cls => {
                    const students = attendanceData[cls.classId] || [];
                    const totalPresent = students.reduce((acc, s) => acc + s.presentDays, 0);
                    const totalDays = cls.totalDays * (students.length || 1);
                    const percentage = totalDays ? ((totalPresent / totalDays) * 100).toFixed(1) : 0;

                    return (
                        <div
                            className={`attendance-tile ${percentage < 75 ? "low-attendance" : ""}`}
                            key={cls.classId}
                            onClick={() => openClassModal(cls)}
                        >
                            <div className="circle-container">
                                <svg className="progress-circle" viewBox="0 0 36 36">
                                    <path
                                        className="circle-bg"
                                        d="M18 2.0845
                                           a 15.9155 15.9155 0 0 1 0 31.831
                                           a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path
                                        className="circle-progress"
                                        stroke={getCircleColor(percentage)}
                                        strokeDasharray={`${percentage}, 100`}
                                        d="M18 2.0845
                                           a 15.9155 15.9155 0 0 1 0 31.831
                                           a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <text x="18" y="20.35" className="percentage-text">{percentage}%</text>
                                </svg>
                            </div>
                            <h3>{cls.className}</h3>
                            <p>{students.length} Students</p>
                        </div>
                    );
                })}
            </div>

            {/* Modal Popup for Selected Class */}
            {selectedClass && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h3>{selectedClass.className} - Attendance</h3>
                        <div className="students-list">
                            {attendanceData[selectedClass.classId].map(student => {
                                const percentage = ((student.presentDays / selectedClass.totalDays) * 100).toFixed(1);
                                return (
                                    <div className="student-row" key={student.id}>
                                        <span className="student-name">{student.name}</span>
                                        <div className="student-progress-wrapper">
                                            <div className="progress-bar">
                                                <div
                                                    className="progress"
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                            </div>
                                            <span className="student-percentage">{percentage}%</span>
                                        </div>
                                        <div className="attendance-buttons">
                                            <button onClick={() => adjustAttendance(selectedClass.classId, student.id, 1)}>+</button>
                                            <button onClick={() => adjustAttendance(selectedClass.classId, student.id, -1)}>-</button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <button className="close-btn" onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TeacherAttendance;
