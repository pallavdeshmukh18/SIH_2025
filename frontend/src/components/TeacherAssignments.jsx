// src/pages/ProfessorAssignments.jsx
import React, { useState, useEffect } from "react";
import "../css/TeacherAssignments.css";

function ProfessorAssignments() {
    // Load assignments from localStorage if available
    const [assignments, setAssignments] = useState(() => {
        const saved = localStorage.getItem("professorAssignments");
        return saved ? JSON.parse(saved) : [
            {
                id: 1,
                subject: "Mathematics",
                title: "Algebra Problem Set",
                dueDate: "2025-09-25",
                totalStudents: 50,
                submittedStudents: 20,
            },
            {
                id: 2,
                subject: "Physics",
                title: "Lab Report on Motion",
                dueDate: "2025-09-27",
                totalStudents: 45,
                submittedStudents: 45,
            },
        ];
    });

    const [showModal, setShowModal] = useState(false);
    const [newAssignment, setNewAssignment] = useState({
        subject: "",
        title: "",
        dueDate: "",
        batch: "",
        totalStudents: 0,
    });

    // Save assignments to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("professorAssignments", JSON.stringify(assignments));
    }, [assignments]);

    // Create assignment handler
    const handleCreateAssignment = () => {
        if (
            !newAssignment.subject ||
            !newAssignment.title ||
            !newAssignment.dueDate ||
            !newAssignment.totalStudents ||
            !newAssignment.batch
        ) return;

        const id = assignments.length ? assignments[assignments.length - 1].id + 1 : 1;
        setAssignments([
            ...assignments,
            { ...newAssignment, id, submittedStudents: 0 },
        ]);

        setNewAssignment({ subject: "", title: "", dueDate: "", batch: "", totalStudents: 0 });
        setShowModal(false);
    };

    // Delete assignment handler
    const handleDeleteAssignment = (id) => {
        setAssignments(assignments.filter((assignment) => assignment.id !== id));
    };

    return (
        <div className="professor-assignments-page">
            <h2>Manage Assignments</h2>

            {/* Create Assignment Button */}
            <div className="create-assignment-btn-wrapper">
                <button
                    className="create-assignment-btn"
                    onClick={() => setShowModal(true)}
                >
                    Create Assignment
                </button>
            </div>

            {/* Modal Popup */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h3>Create New Assignment</h3>
                        <input
                            type="text"
                            placeholder="Subject"
                            value={newAssignment.subject}
                            onChange={(e) => setNewAssignment({ ...newAssignment, subject: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Title"
                            value={newAssignment.title}
                            onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                        />
                        <input
                            type="date"
                            value={newAssignment.dueDate}
                            onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                        />
                        <select
                            value={newAssignment.batch}
                            onChange={(e) => setNewAssignment({ ...newAssignment, batch: e.target.value })}
                        >
                            <option value="">Select Batch</option>
                            <option value="B.Sc. I">B.Sc. I</option>
                            <option value="B.Sc. II">B.Sc. II</option>
                            <option value="B.Sc. III">B.Sc. III</option>
                            <option value="M.Sc. I">M.Sc. I</option>
                            <option value="M.Sc. II">M.Sc. II</option>
                        </select>
                        <input
                            type="number"
                            placeholder="Total Students"
                            value={newAssignment.totalStudents}
                            onChange={(e) => setNewAssignment({ ...newAssignment, totalStudents: parseInt(e.target.value) })}
                        />
                        <div className="modal-buttons">
                            <button className="submit-btn" onClick={handleCreateAssignment}>Submit</button>
                            <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* List of Assignments */}
            <div className="assignments-list">
                {assignments.map((assignment) => {
                    const progress = Math.round(
                        (assignment.submittedStudents / assignment.totalStudents) * 100
                    );

                    return (
                        <div className="assignment-row" key={assignment.id}>
                            {/* Delete Button */}
                            <button
                                className="delete-btn"
                                onClick={() => handleDeleteAssignment(assignment.id)}
                            >
                                ✖
                            </button>

                            <div className="assignment-info">
                                <h3>{assignment.subject}</h3>
                                <p><strong>{assignment.title}</strong></p>
                                <p>Batch: {assignment.batch}</p>
                                <p>Due: {assignment.dueDate}</p>
                                <p>
                                    Submission Progress: {assignment.submittedStudents}/{assignment.totalStudents} ({progress}%)
                                </p>
                                <div className="progress-bar">
                                    <div
                                        className="progress"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ProfessorAssignments;
