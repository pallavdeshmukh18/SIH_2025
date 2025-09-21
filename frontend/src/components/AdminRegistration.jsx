// src/components/AdminRegistration.jsx
import React, { useState } from "react";
import "../css/AdminRegistration.css"; // Use your fixed CSS

function AdminRegistration() {
    const [adminData, setAdminData] = useState({
        admin_id: "",
        name: "",
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdminData({ ...adminData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const token = localStorage.getItem("userToken"); // optional if only super-admin can add admins
            const res = await fetch("http://127.0.0.1:5000/api/admin/admin-registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(adminData),
            });

            const data = await res.json();

            if (data.status === "success") {
                setMessage("Admin registered successfully!");
                setAdminData({
                    admin_id: "",
                    name: "",
                    email: "",
                    password: "",
                });
            } else {
                setError(data.message || "Failed to register admin.");
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred. Try again later.");
        }
    };

    return (
        <div className="admin-registration card">
            <h2>Register Admin</h2>
            {message && <p className="success-msg">{message}</p>}
            {error && <p className="error-msg">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Admin ID</label>
                    <input type="text" name="admin_id" value={adminData.admin_id} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={adminData.name} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={adminData.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={adminData.password} onChange={handleChange} required />
                </div>

                <button type="submit">Register Admin</button>
            </form>
        </div>
    );
}

export default AdminRegistration;
