// src/pages/TeacherAnnouncements.jsx
import React, { useState, useEffect } from "react";
import "../css/TeacherAnnouncements.css";

function TeacherAnnouncements() {
  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem("teacherAnnouncements");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: "Internal Marks Submission",
            description: "Please submit the internal marks for your subjects by 25th September.",
            date: "2025-09-19",
          },
          {
            id: 2,
            title: "Staff Meeting",
            description: "All teachers are requested to attend the staff meeting on 21st September at 3 PM in Seminar Hall.",
            date: "2025-09-17",
          },
        ];
  });

  const [showPopup, setShowPopup] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    localStorage.setItem("teacherAnnouncements", JSON.stringify(announcements));
  }, [announcements]);

  const handleAddAnnouncement = () => {
    if (!newTitle.trim() || !newDescription.trim()) return;

    // ---------- Option A (explicit IST / Asia/Kolkata) ----------
    // Use this if you want the date fetched as per Indian Standard Time regardless of the user's machine timezone.
    // Works in modern browsers that support Intl options.
    const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }); // yields YYYY-MM-DD

    // ---------- Option B (browser local date) ----------
    // If you prefer the browser's local date (whatever timezone the user's machine is in), uncomment below and comment out the toLocaleDateString line above.
    /*
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const today = `${yyyy}-${mm}-${dd}`; // YYYY-MM-DD in local timezone
    */

    const newAnn = {
      id: Date.now(), // unique id
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
    <div className="teacher-announcements-page">
      <h2>Announcements</h2>

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
              <button className="popup-btn submit-btn" onClick={handleAddAnnouncement}>
                Submit
              </button>
              <button className="popup-btn cancel-btn" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherAnnouncements;
