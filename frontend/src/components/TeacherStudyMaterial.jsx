// src/pages/TeacherStudyMaterial.jsx
import React, { useState, useEffect } from "react";
import "../css/TeacherStudyMaterial.css";

function TeacherStudyMaterial() {
    const teacherName = localStorage.getItem("username") || "Teacher";

    // Load from localStorage if available
    const storedMaterials = JSON.parse(localStorage.getItem(`materials_${teacherName}`)) || [];

    const [materials, setMaterials] = useState(storedMaterials);
    const [newMaterial, setNewMaterial] = useState({
        subject: "",
        title: "",
        type: "PDF",
        link: "",
    });

    // Save to localStorage whenever materials change
    useEffect(() => {
        localStorage.setItem(`materials_${teacherName}`, JSON.stringify(materials));
    }, [materials, teacherName]);

    // Upload handler
    const handleUpload = (e) => {
        e.preventDefault();
        if (!newMaterial.subject || !newMaterial.title || !newMaterial.link) return;

        const id = materials.length ? materials[materials.length - 1].id + 1 : 1;
        const date = new Date().toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" });

        setMaterials([
            ...materials,
            { ...newMaterial, id, uploadedBy: teacherName, date }
        ]);

        setNewMaterial({ subject: "", title: "", type: "PDF", link: "" });
    };

    // Delete material
    const handleDelete = (id) => {
        setMaterials(materials.filter((m) => m.id !== id));
    };

    return (
        <div className="teacher-materials-page">
            <h2>My Study Materials</h2>

            {/* Upload Section */}
            <form className="upload-material-form" onSubmit={handleUpload}>
                <input
                    type="text"
                    placeholder="Subject"
                    value={newMaterial.subject}
                    onChange={(e) => setNewMaterial({ ...newMaterial, subject: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Title"
                    value={newMaterial.title}
                    onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                    required
                />
                <select
                    value={newMaterial.type}
                    onChange={(e) => setNewMaterial({ ...newMaterial, type: e.target.value })}
                >
                    <option value="PDF">PDF</option>
                    <option value="Video">Video</option>
                    <option value="Document">Document</option>
                </select>
                <input
                    type="text"
                    placeholder="Link (URL)"
                    value={newMaterial.link}
                    onChange={(e) => setNewMaterial({ ...newMaterial, link: e.target.value })}
                    required
                />
                <button type="submit" className="upload-btn">Upload</button>
            </form>

            {/* Materials List */}
            <div className="materials-list">
                {materials.length === 0 && <p className="no-materials">No materials uploaded yet.</p>}
                {materials.map((material) => (
                    <div className="material-row" key={material.id}>
                        <div className="material-info">
                            <h3>{material.subject}</h3>
                            <p><strong>{material.title}</strong></p>
                            <p>Type: {material.type}</p>
                            <p>Uploaded: {material.date}</p>
                        </div>

                        <div className="material-actions">
                            <a
                                href={material.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="view-btn"
                            >
                                View / Download
                            </a>
                            <button className="delete-btn" onClick={() => handleDelete(material.id)}>✖</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TeacherStudyMaterial;
