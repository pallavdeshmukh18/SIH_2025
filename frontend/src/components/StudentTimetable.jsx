// src/pages/StudentTimetable.jsx
import React from "react";
import "../css/StudentTimetable.css";

function StudentTimetable() {
    const timetable = {
        Monday: [
            { subject: "Mathematics", faculty: "Dr. Sharma", room: "101" },
            { subject: "Physics", faculty: "Prof. Gupta", room: "102" },
            { subject: "English", faculty: "Ms. Rao", room: "105" },
            { subject: "Computer Science", faculty: "Dr. Mehta", room: "Lab 2" },
            { subject: "History", faculty: "Dr. Nair", room: "201" },
            { subject: "Biology", faculty: "Dr. Khan", room: "104" },
        ],
        Tuesday: [
            { subject: "Chemistry", faculty: "Dr. Iyer", room: "103" },
            { subject: "Mathematics", faculty: "Dr. Sharma", room: "101" },
            { subject: "Geography", faculty: "Prof. Menon", room: "202" },
            { subject: "Economics", faculty: "Dr. Patel", room: "203" },
            { subject: "English", faculty: "Ms. Rao", room: "105" },
            { subject: "Physical Education", faculty: "Mr. Singh", room: "Gym" },
        ],
        Wednesday: [
            { subject: "Physics", faculty: "Prof. Gupta", room: "102" },
            { subject: "Computer Science", faculty: "Dr. Mehta", room: "Lab 2" },
            { subject: "Biology", faculty: "Dr. Khan", room: "104" },
            { subject: "History", faculty: "Dr. Nair", room: "201" },
            { subject: "Chemistry", faculty: "Dr. Iyer", room: "103" },
            { subject: "English", faculty: "Ms. Rao", room: "105" },
        ],
        Thursday: [
            { subject: "Mathematics", faculty: "Dr. Sharma", room: "101" },
            { subject: "Economics", faculty: "Dr. Patel", room: "203" },
            { subject: "Computer Science", faculty: "Dr. Mehta", room: "Lab 2" },
            { subject: "Geography", faculty: "Prof. Menon", room: "202" },
            { subject: "Physics", faculty: "Prof. Gupta", room: "102" },
            { subject: "Chemistry", faculty: "Dr. Iyer", room: "103" },
        ],
        Friday: [
            { subject: "English", faculty: "Ms. Rao", room: "105" },
            { subject: "Mathematics", faculty: "Dr. Sharma", room: "101" },
            { subject: "Computer Science", faculty: "Dr. Mehta", room: "Lab 2" },
            { subject: "Biology", faculty: "Dr. Khan", room: "104" },
            { subject: "History", faculty: "Dr. Nair", room: "201" },
            { subject: "Physical Education", faculty: "Mr. Singh", room: "Gym" },
        ],
    };

    const timeSlots = ["9:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 1:00", "1:00 - 2:00", "2:00 - 3:00"];

    return (
        <div className="student-timetable-page">
            <h2>Weekly Timetable</h2>
            <table className="timetable-grid">
                <thead>
                    <tr>
                        <th>Day</th>
                        {timeSlots.map((slot, index) => (
                            <th key={index}>{slot}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(timetable).map(([day, subjects], dayIndex) => (
                        <tr key={dayIndex}>
                            <td className="day-col">{day}</td>
                            {subjects.map((s, subIndex) => (
                                <td key={subIndex}>
                                    <strong>{s.subject}</strong>
                                    <br />
                                    <small>{s.faculty}</small>
                                    <br />
                                    <span className="room">{s.room}</span>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentTimetable;
