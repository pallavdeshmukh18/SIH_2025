// src/pages/StudentAnnouncements.jsx
import React, { useState } from "react";
import "../css/StudentAnnouncements.css";

function StudentAnnouncements() {
    const [announcements] = useState([
        {
            id: 1,
            title: "Semester Exams Schedule",
            description: "The exams for this semester will begin from 10th October. Check your timetable for details.",
            date: "2025-09-20",
        },
        {
            id: 2,
            title: "New Library Books",
            description: "New arrivals in the library include reference books for Electronics, Physics, and CS subjects.",
            date: "2025-09-18",
        },
        {
            id: 3,
            title: "Campus Maintenance Notice",
            description: "The main campus will be under maintenance from 22nd to 24th September. Classes will be online.",
            date: "2025-09-15",
        },
        {
            id: 4,
            title: "Guest Lecture on AI",
            description: "A guest lecture on Artificial Intelligence will be conducted by Dr. R. Sharma on 26th September at 11 AM.",
            date: "2025-09-14",
        },
    ]);

    return (
        <div className="student-announcements-page">
            <h2>Announcements</h2>
            <div className="announcements-list">
                {announcements.map((ann) => (
                    <div key={ann.id} className="announcement-card">
                        <h3>{ann.title}</h3>
                        <p className="announcement-date">{ann.date}</p>
                        <p>{ann.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StudentAnnouncements;
