// src/components/AdminFees.jsx
import React, { useState } from "react";
import "../css/AdminFees.css";

function AdminFees() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Amit Verma",
      uid: "STU001",
      photo: "https://via.placeholder.com/50",
      feeStatus: "Paid",
    },
    {
      id: 2,
      name: "Neha Singh",
      uid: "STU002",
      photo: "https://via.placeholder.com/50",
      feeStatus: "Unpaid",
    },
    {
      id: 3,
      name: "Rahul Sharma",
      uid: "STU003",
      photo: "https://via.placeholder.com/50",
      feeStatus: "Unpaid",
    },
    {
      id: 4,
      name: "Sneha Patel",
      uid: "STU004",
      photo: "https://via.placeholder.com/50",
      feeStatus: "Paid",
    },
  ]);

  // Calculate progress
  const paidCount = students.filter((s) => s.feeStatus === "Paid").length;
  const totalCount = students.length;
  const progress = Math.round((paidCount / totalCount) * 100);

  const handleNotify = (id) => {
    const student = students.find((s) => s.id === id);
    console.log(`Notification Sent to ${student.name} (${student.uid})`);
    alert(`Notification Sent to ${student.name}`);
  };

  const handleMarkPaid = (id) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, feeStatus: "Paid" } : s
      )
    );
  };

  return (
    <div className="admin-fees-page">
      <h2>Student Fee Management</h2>

      {/* Progress Bar */}
      <div className="progress-container">
        <span>
          {paidCount} / {totalCount} Students Paid
        </span>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span>{progress}%</span>
      </div>

      {/* Student Table */}
      <div className="fees-table-wrapper">
        <table className="fees-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>UID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((stu) => (
              <tr key={stu.id}>
                <td>
                  <img
                    src={stu.photo}
                    alt={stu.name}
                    className="student-photo"
                  />
                </td>
                <td>{stu.name}</td>
                <td>{stu.uid}</td>
                <td>
                  <span
                    className={`fee-status ${stu.feeStatus.toLowerCase()}`}
                  >
                    {stu.feeStatus}
                  </span>
                </td>
                <td>
                  {stu.feeStatus === "Unpaid" ? (
                    <div className="actions">
                      <button
                        className="action-btn notify-btn"
                        onClick={() => handleNotify(stu.id)}
                      >
                        Notify
                      </button>
                      <button
                        className="action-btn pay-btn"
                        onClick={() => handleMarkPaid(stu.id)}
                      >
                        Mark as Paid
                      </button>
                    </div>
                  ) : (
                    <span>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminFees;
