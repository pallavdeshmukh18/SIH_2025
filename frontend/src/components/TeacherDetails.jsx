// src/components/TeacherDetails.jsx
import React, { useEffect, useState } from "react";
import "../css/TeacherDetails.css";

function TeacherDetails() {
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const res = await fetch("http://127.0.0.1:5000/api/admin/teachers", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok && data.teachers) {
          setTeachers(data.teachers);
        } else {
          setError(data.message || "Failed to fetch teachers.");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching teachers.");
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className="teacher-details card">
      <h2>Teacher List</h2>
      {error && <p className="error-msg">{error}</p>}

      <table className="teacher-table">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {teachers.length === 0 ? (
            <tr>
              <td colSpan="3" className="no-data">
                No teachers found.
              </td>
            </tr>
          ) : (
            teachers.map((teacher, index) => (
              <tr key={teacher.id || index}>
                <td>{index + 1}</td>
                <td>{teacher.username}</td>
                <td>{teacher.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TeacherDetails;
