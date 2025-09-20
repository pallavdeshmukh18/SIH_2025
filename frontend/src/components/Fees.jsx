// src/pages/Fees.jsx
import React, { useState } from "react";
import "../css/Fees.css";

function Fees() {
    const [fees, setFees] = useState([
        { id: 1, name: "Tuition Fee", amount: 50000, status: "Paid" },
        { id: 2, name: "Lab Fee", amount: 5000, status: "Pending" },
        { id: 3, name: "Library Fee", amount: 2000, status: "Paid" },
        { id: 4, name: "Exam Fee", amount: 3000, status: "Pending" },
        { id: 5, name: "Sports Fee", amount: 1500, status: "Pending" },
    ]);

    const totalAmount = fees.reduce((acc, f) => acc + f.amount, 0);
    const totalPaid = fees.filter(f => f.status === "Paid").reduce((acc, f) => acc + f.amount, 0);
    const totalDue = totalAmount - totalPaid;

    const handlePay = (fee) => {
        // Redirect to Eazebuzz (demo link)
        const eazebuzzURL = `https://www.eazebuzz.com/payment?feeName=${encodeURIComponent(fee.name)}&amount=${fee.amount}`;
        window.open(eazebuzzURL, "_blank");
    };

    return (
        <div className="student-fees-page">
            <h2>Fees Overview</h2>
            <div className="fees-summary">
                <p><strong>Total Fees:</strong> ₹{totalAmount}</p>
                <p><strong>Paid:</strong> ₹{totalPaid}</p>
                <p><strong>Due:</strong> ₹{totalDue}</p>
            </div>

            <div className="fees-list">
                {fees.map(fee => (
                    <div key={fee.id} className="fee-card">
                        <div className="fee-info">
                            <h3>{fee.name}</h3>
                            <p>Amount: ₹{fee.amount}</p>
                            <p>Status: <span className={fee.status === "Paid" ? "paid" : "pending"}>{fee.status}</span></p>
                        </div>
                        {fee.status === "Pending" && (
                            <button className="pay-btn" onClick={() => handlePay(fee)}>Pay Now</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Fees;
