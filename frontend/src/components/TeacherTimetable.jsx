// src/pages/TeacherTimetable.jsx
import React from "react";
import "../css/TeacherTimetable.css";

function TeacherTimetable() {
        const timetable = {
            Monday: [
                { subject: "Mathematics - B.Sc. I Year", class: "B.Sc. I", room: "101" },
                { subject: "Mathematics - M.Sc. II Year", class: "M.Sc. II", room: "201" },
                { subject: "Office Hours / Research", class: "Faculty Room", room: "F-Block" },
            ],
            Tuesday: [
                { subject: "Mathematics - B.Sc. II Year", class: "B.Sc. II", room: "102" },
                { subject: "Mathematics - M.Sc. I Year", class: "M.Sc. I", room: "202" },
                { subject: "Department Meeting", class: "Math Dept.", room: "Conference Hall" },
            ],
            Wednesday: [
                { subject: "Mathematics - B.Sc. I Year", class: "B.Sc. I", room: "101" },
                { subject: "Mathematics - B.Sc. III Year", class: "B.Sc. III", room: "103" },
                { subject: "Research Guidance (PhD Students)", class: "Research Lab", room: "R-1" },
            ],
            Thursday: [
                { subject: "Mathematics - M.Sc. II Year", class: "M.Sc. II", room: "201" },
                { subject: "Mathematics - B.Sc. II Year", class: "B.Sc. II", room: "102" },
                { subject: "Office Hours", class: "Faculty Room", room: "F-Block" },
            ],
            Friday: [
                { subject: "Mathematics - B.Sc. III Year", class: "B.Sc. III", room: "103" },
                { subject: "Mathematics - M.Sc. I Year", class: "M.Sc. I", room: "202" },
                { subject: "Seminar / Guest Lecture", class: "Open Batch", room: "Auditorium" },
            ],
        };


    const timeSlots = ["9:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00"];

    return (
        <div className="teacher-timetable-page">
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

export default TeacherTimetable;
