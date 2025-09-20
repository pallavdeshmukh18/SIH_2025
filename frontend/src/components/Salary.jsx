import React from "react";
import "../css/Salary.css";

function Salary() {
  const salaries = [
    { id: 1, total: 50000, status: "Processed", date: "2025-09-10" },
    { id: 2, total: 48000, status: "Pending", date: "" },
    { id: 3, total: 47000, status: "Cancelled", date: "" },
    { id: 4, total: 51000, status: "Processed", date: "2025-08-10" },
  ];

  return (
    <div className="salary-page">
      <h2>Salary Details</h2>
      <div className="salary-list">
        {salaries.map((salary) => (
          <div className="salary-row" key={salary.id}>
            <div className="salary-info">
              <p>
                <strong>Total Salary: </strong>
                <span className="salary-amount" data-amount={`₹${salary.total}`}>
                  XXXXXX
                </span>
              </p>
              <p>
                <strong>Status: </strong>
                <span className={`salary-status ${salary.status.toLowerCase()}`}>
                  {salary.status}
                </span>
              </p>
              <p>
                <strong>Date of Payment: </strong>
                <span className="salary-date">{salary.date || "---"}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Salary;
