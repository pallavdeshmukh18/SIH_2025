import React, { useState, useEffect } from "react";
import "../css/AttendancePage.css";

function EnhancedAttendancePage() {
    const [attendanceData, setAttendanceData] = useState([]);
    const [animatedData, setAnimatedData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState("All");

    useEffect(() => {
        // Mock data for 10 subjects
        const mockData = [
            { subjectId: 1, subjectName: "Mathematics", totalDays: 20, presentDays: 18 },
            { subjectId: 2, subjectName: "Physics", totalDays: 20, presentDays: 4 },
            { subjectId: 3, subjectName: "Chemistry", totalDays: 18, presentDays: 16 },
            { subjectId: 4, subjectName: "Computer Science", totalDays: 20, presentDays: 14 },
            { subjectId: 5, subjectName: "Biology", totalDays: 21, presentDays: 17 },
            { subjectId: 6, subjectName: "English", totalDays: 20, presentDays: 19 },
            { subjectId: 7, subjectName: "History", totalDays: 19, presentDays: 18 },
            { subjectId: 8, subjectName: "Geography", totalDays: 20, presentDays: 16 },
            { subjectId: 9, subjectName: "Economics", totalDays: 18, presentDays: 17 },
            { subjectId: 10, subjectName: "Physical Education", totalDays: 15, presentDays: 15 },
        ];
        setAttendanceData(mockData);

        // Animate circle after mount
        setTimeout(() => setAnimatedData(mockData), 100);
    }, []);

    const getCircleColor = (percentage) => {
        if (percentage < 50) return "red";
        if (percentage < 75) return "orange";
        return "#4caf50"; // green
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
        // For mock, we keep same data, but later filter based on month from backend
    };

    const totalPresent = attendanceData.reduce((acc, sub) => acc + sub.presentDays, 0);
    const totalDays = attendanceData.reduce((acc, sub) => acc + sub.totalDays, 0);
    const overallPercentage = ((totalPresent / totalDays) * 100).toFixed(1);

    return (
        <div className="attendance-page">
            <h2>My Attendance</h2>

            {/* Month Filter */}
            <div className="month-filter">
                <label>Month: </label>
                <select value={selectedMonth} onChange={handleMonthChange}>
                    <option value="All">All</option>
                    <option value="Jan">January</option>
                    <option value="Feb">February</option>
                    <option value="Mar">March</option>
                    <option value="Apr">April</option>
                    <option value="May">May</option>
                </select>
            </div>

            {/* Overall Attendance */}
            <div className="overall-attendance">
                <svg className="progress-circle-large" viewBox="0 0 36 36">
                    <path
                        className="circle-bg"
                        d="M18 2.0845
                           a 15.9155 15.9155 0 0 1 0 31.831
                           a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                        className="circle-progress"
                        stroke={getCircleColor(overallPercentage)}
                        strokeDasharray={`${overallPercentage}, 100`}
                        d="M18 2.0845
                           a 15.9155 15.9155 0 0 1 0 31.831
                           a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.35" className="percentage-text">{overallPercentage}%</text>
                </svg>
                <h3>Overall Attendance</h3>
            </div>

            {/* Subject Tiles */}
            <div className="attendance-tiles">
                {attendanceData.map((sub) => {
                    const percentage = ((sub.presentDays / sub.totalDays) * 100).toFixed(1);
                    const circleColor = getCircleColor(percentage);
                    const animatedSub = animatedData.find(a => a.subjectId === sub.subjectId);
                    const displayPercentage = animatedSub ? percentage : 0;

                    return (
                        <div className={`attendance-tile ${percentage < 75 ? "low-attendance" : ""}`} key={sub.subjectId}>
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
                                        stroke={circleColor}
                                        strokeDasharray={`${displayPercentage}, 100`}
                                        d="M18 2.0845
                                           a 15.9155 15.9155 0 0 1 0 31.831
                                           a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <text x="18" y="20.35" className="percentage-text">{displayPercentage}%</text>
                                </svg>
                            </div>
                            <h3>{sub.subjectName}</h3>
                            <p>{sub.presentDays}/{sub.totalDays} Days</p>
                            {percentage < 75 && <p className="warning-text">⚠ Low Attendance</p>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default EnhancedAttendancePage;
