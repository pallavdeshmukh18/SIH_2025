// src/components/SalaryDetails.jsx
import React, { useState } from "react";
import "../css/SalaryDetails.css";

function SalaryDetails() {
  const [salaries, setSalaries] = useState([
    {
      id: 1,
      name: "Ramesh Sharma",
      total: 50000,
      status: "Processed",
      dueDate: "2025-09-10",
      paidDate: "2025-09-09",
    },
    {
      id: 2,
      name: "Priya Patel",
      total: 48000,
      status: "Pending",
      dueDate: "2025-09-15",
      paidDate: "",
    },
    {
      id: 3,
      name: "Arjun Mehta",
      total: 47000,
      status: "Cancelled",
      dueDate: "2025-09-05",
      paidDate: "",
    },
    {
      id: 4,
      name: "Sneha Desai",
      total: 51000,
      status: "Pending",
      dueDate: "2025-09-18",
      paidDate: "",
    },
  ]);

  const handlePay = (id) => {
    setSalaries((prev) =>
      prev.map((sal) =>
        sal.id === id
          ? {
              ...sal,
              status: "Processed",
              paidDate: new Date().toISOString().slice(0, 10),
            }
          : sal
      )
    );
  };

  const handleDecline = (id) => {
    setSalaries((prev) =>
      prev.map((sal) =>
        sal.id === id ? { ...sal, status: "Cancelled" } : sal
      )
    );
  };

  // Utility: check due date status
  const getDueFlag = (salary) => {
    if (salary.status === "Processed") return "Paid";
    if (salary.status === "Cancelled") return "Declined";

    const today = new Date().toISOString().slice(0, 10);
    if (salary.dueDate < today) return "Overdue";
    if (salary.dueDate === today) return "Due Today";
    return "Pending";
  };

  return (
    <div className="admin-salary-page">
      <h2>Employee Salary Management</h2>
      <div className="salary-table-wrapper">
        <table className="salary-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Total Salary</th>
              <th>Due Date</th>
              <th>Paid Date</th>
              <th>Status</th>
              <th>Due Flag</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {salaries.map((sal) => (
              <tr key={sal.id}>
                <td>{sal.name}</td>
                <td>
                  <span
                    className="salary-amount"
                    data-amount={`₹${sal.total}`}
                  >
                    XXXXXX
                  </span>
                </td>
                <td>{sal.dueDate}</td>
                <td>{sal.paidDate || "---"}</td>
                <td>
                  <span
                    className={`salary-status ${sal.status.toLowerCase()}`}
                  >
                    {sal.status}
                  </span>
                </td>
                <td>
                  <span className={`due-flag ${getDueFlag(sal).toLowerCase().replace(" ", "-")}`}>
                    {getDueFlag(sal)}
                  </span>
                </td>
                <td>
                  {sal.status === "Pending" && (
                    <div className="actions">
                      <button
                        className="action-btn pay-btn"
                        onClick={() => handlePay(sal.id)}
                      >
                        Pay
                      </button>
                      <button
                        className="action-btn decline-btn"
                        onClick={() => handleDecline(sal.id)}
                      >
                        Decline
                      </button>
                    </div>
                  )}
                  {sal.status !== "Pending" && <span>—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalaryDetails;
