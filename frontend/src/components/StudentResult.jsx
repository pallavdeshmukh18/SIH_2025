// src/pages/StudentResult.jsx
import React from "react";
import "../css/StudentResult.css";

function StudentResult() {
    const results = [
        { id: 1, subject: "Mathematics", marksObtained: 85, totalMarks: 100, grade: "A" },
        { id: 2, subject: "Physics", marksObtained: 78, totalMarks: 100, grade: "B+" },
        { id: 3, subject: "Chemistry", marksObtained: 90, totalMarks: 100, grade: "A+" },
        { id: 4, subject: "Computer Science", marksObtained: 95, totalMarks: 100, grade: "A+" },
        { id: 5, subject: "Biology", marksObtained: 70, totalMarks: 100, grade: "B" },
        { id: 6, subject: "English", marksObtained: 88, totalMarks: 100, grade: "A" },
    ];

    const totalObtained = results.reduce((acc, r) => acc + r.marksObtained, 0);
    const totalMarks = results.reduce((acc, r) => acc + r.totalMarks, 0);
    const percentage = ((totalObtained / totalMarks) * 100).toFixed(2);

    // GPA = average of (marksObtained / 10)
    const gpa = (results.reduce((acc, r) => acc + r.marksObtained / 10, 0) / results.length).toFixed(2);

    return (
        <div className="student-result-page">
            <h2>Student Result</h2>
            <table className="results-table">
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Marks Obtained</th>
                        <th>Total Marks</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result) => (
                        <tr key={result.id}>
                            <td>{result.subject}</td>
                            <td>{result.marksObtained}</td>
                            <td>{result.totalMarks}</td>
                            <td>{result.grade}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="overall-summary">
                <p><strong>Total Marks Obtained:</strong> {totalObtained} / {totalMarks}</p>
                <p><strong>Percentage:</strong> {percentage}%</p>
                <p><strong>GPA:</strong> {gpa} / 10</p>
            </div>
        </div>
    );
}

export default StudentResult;
