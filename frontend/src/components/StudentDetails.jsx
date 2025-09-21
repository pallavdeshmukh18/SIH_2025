// src/components/StudentDetails.jsx
import React, { useEffect, useState } from "react";
import "../css/StudentDetails.css";

function StudentDetails() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const res = await fetch("http://127.0.0.1:5000/api/admin/students", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok && data.students) {
          setStudents(data.students);
        } else {
          setError(data.message || "Failed to fetch students.");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching students.");
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="student-details card">
      <h2>Student List</h2>
      {error && <p className="error-msg">{error}</p>}

      <table className="student-table">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="3" className="no-data">
                No students found.
              </td>
            </tr>
          ) : (
            students.map((student, index) => (
              <tr key={student.id || index}>
                <td>{index + 1}</td>
                <td>{student.username}</td>
                <td>{student.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentDetails;
