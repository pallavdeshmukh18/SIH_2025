// src/pages/StudentStudyMaterial.jsx
import React from "react";
import "../css/StudentStudyMaterial.css";

function StudentStudyMaterial() {
    const materials = [
        {
            id: 1,
            subject: "Mathematics",
            title: "Calculus Notes",
            type: "PDF",
            link: "#",
        },
        {
            id: 2,
            subject: "Physics",
            title: "Kinematics Lecture Video",
            type: "Video",
            link: "#",
        },
        {
            id: 3,
            subject: "Chemistry",
            title: "Periodic Table Reference",
            type: "PDF",
            link: "#",
        },
        {
            id: 4,
            subject: "Computer Science",
            title: "Data Structures Notes",
            type: "PDF",
            link: "#",
        },
    ];

    return (
        <div className="student-materials-page">
            <h2>Study Materials</h2>
            <div className="materials-list">
                {materials.map((material) => (
                    <div className="material-row" key={material.id}>
                        <div className="material-info">
                            <h3>{material.subject}</h3>
                            <p><strong>{material.title}</strong></p>
                            <p>Type: {material.type}</p>
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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StudentStudyMaterial;
