// src/pages/AdminAnnouncements.jsx
import React, { useState, useEffect } from "react";
import "../css/AdminAnnoucements.css";

function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem("adminAnnouncements");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: "Semester Timetable Released",
            description: "The semester timetable has been published. Please check the portal.",
            date: "2025-09-19",
          },
          {
            id: 2,
            title: "Holiday Notice",
            description: "The institute will remain closed on 25th September for Ganesh Visarjan.",
            date: "2025-09-17",
          },
        ];
  });

  const [showPopup, setShowPopup] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    localStorage.setItem("adminAnnouncements", JSON.stringify(announcements));
  }, [announcements]);

  const handleAddAnnouncement = () => {
    if (!newTitle.trim() || !newDescription.trim()) return;

    // Get today's date in YYYY-MM-DD (IST timezone)
    const today = new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata",
    });

    const newAnn = {
      id: Date.now(),
      title: newTitle.trim(),
      description: newDescription.trim(),
      date: today,
    };

    setAnnouncements((prev) => [newAnn, ...prev]);
    setNewTitle("");
    setNewDescription("");
    setShowPopup(false);
  };

  return (
    <div className="admin-announcements-page">
      <h2>Admin Announcements</h2>

      <div className="announcements-list">
        <div
          className="announcement-card make-announcement-btn"
          onClick={() => setShowPopup(true)}
        >
          <p className="make-announcement-text">+ Make an announcement</p>
        </div>

        {announcements.map((ann) => (
          <div key={ann.id} className="announcement-card">
            <h3>{ann.title}</h3>
            <p className="announcement-date">{ann.date}</p>
            <p>{ann.description}</p>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Create Announcement</h3>
            <input
              type="text"
              placeholder="Enter title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="popup-input"
            />
            <textarea
              placeholder="Enter description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="popup-textarea"
            />
            <div className="popup-actions">
              <button
                className="popup-btn submit-btn"
                onClick={handleAddAnnouncement}
              >
                Submit
              </button>
              <button
                className="popup-btn cancel-btn"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminAnnouncements;
