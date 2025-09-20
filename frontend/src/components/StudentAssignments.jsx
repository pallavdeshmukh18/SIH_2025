// src/pages/StudentAssignments.jsx
import React, { useState } from "react";
import "../css/StudentAssignments.css";

function StudentAssignments() {
    const [submittedFiles, setSubmittedFiles] = useState({});

    const assignments = [
        {
            id: 1,
            subject: "Mathematics",
            title: "Algebra Problem Set",
            dueDate: "2025-09-25",
            status: "Pending",
            link: "#",
        },
        {
            id: 2,
            subject: "Physics",
            title: "Lab Report on Motion",
            dueDate: "2025-09-27",
            status: "Submitted",
            link: "#",
        },
        {
            id: 3,
            subject: "Chemistry",
            title: "Organic Chemistry Worksheet",
            dueDate: "2025-09-29",
            status: "Pending",
            link: "#",
        },
        {
            id: 4,
            subject: "Computer Science",
            title: "Java OOP Project",
            dueDate: "2025-10-02",
            status: "Pending",
            link: "#",
        },
    ];

    const handleFileChange = (id, event) => {
        setSubmittedFiles({
            ...submittedFiles,
            [id]: event.target.files[0]?.name || "",
        });
    };

    return (
        <div className="student-assignments-page">
            <h2>Assignments</h2>
            <div className="assignments-list">
                {assignments.map((assignment) => (
                    <div className="assignment-row" key={assignment.id}>
                        <div className="assignment-info">
                            <h3>{assignment.subject}</h3>
                            <p><strong>{assignment.title}</strong></p>
                            <p>Due: {assignment.dueDate}</p>
                            <p>
                                Status:{" "}
                                <span
                                    className={`status ${assignment.status === "Submitted" ? "submitted" : "pending"
                                        }`}
                                >
                                    {assignment.status}
                                </span>
                            </p>
                        </div>

                        <div className="assignment-actions">
                            <a
                                href={assignment.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="view-btn"
                            >
                                View / Download
                            </a>

                            {assignment.status === "Submitted" ? (
                                <button className="submitted-btn" disabled>
                                    Submitted
                                </button>
                            ) : (
                                <>
                                    <label className="upload-btn">
                                        Submit
                                        <input
                                            type="file"
                                            style={{ display: "none" }}
                                            onChange={(e) => handleFileChange(assignment.id, e)}
                                        />
                                    </label>
                                    {submittedFiles[assignment.id] && (
                                        <p className="file-name">📂 {submittedFiles[assignment.id]}</p>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StudentAssignments;
