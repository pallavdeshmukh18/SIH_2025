import React, { useState, useEffect } from "react";
import "../css/StudentCourses.css";

function StudentCourses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const mockCourses = [
            {
                id: 1,
                name: "Mathematics",
                instructor: "Prof. John",
                syllabus: "/syllabus/mathematics.pdf",
                dueAssignments: ["Assignment 1: Algebra"]
            },
            {
                id: 2,
                name: "Physics",
                instructor: "Prof. Jane",
                syllabus: "/syllabus/physics.pdf",
                dueAssignments: []
            },
            {
                id: 3,
                name: "Chemistry",
                instructor: "Prof. Smith",
                syllabus: "/syllabus/chemistry.pdf",
                dueAssignments: ["Assignment 2: Organic Chemistry"]
            },
            {
                id: 4,
                name: "Computer Science",
                instructor: "Prof. Emily",
                syllabus: "/syllabus/compsci.pdf",
                dueAssignments: []
            },
            {
                id: 5,
                name: "Biology",
                instructor: "Prof. Brown",
                syllabus: "/syllabus/biology.pdf",
                dueAssignments: ["Assignment 1: Cell Biology"]
            },
            {
                id: 6,
                name: "English",
                instructor: "Prof. Wilson",
                syllabus: "/syllabus/english.pdf",
                dueAssignments: []
            },
            {
                id: 7,
                name: "History",
                instructor: "Prof. Taylor",
                syllabus: "/syllabus/history.pdf",
                dueAssignments: []
            },
            {
                id: 8,
                name: "Geography",
                instructor: "Prof. Davis",
                syllabus: "/syllabus/geography.pdf",
                dueAssignments: ["Assignment 1: Maps & Coordinates"]
            },
            {
                id: 9,
                name: "Economics",
                instructor: "Prof. Miller",
                syllabus: "/syllabus/economics.pdf",
                dueAssignments: []
            },
            {
                id: 10,
                name: "Physical Education",
                instructor: "Prof. Anderson",
                syllabus: "/syllabus/pe.pdf",
                dueAssignments: []
            },
        ];
        setCourses(mockCourses);
    }, []);

    return (
        <div className="student-courses-page">
            <h2>Your Courses</h2>
            <div className="courses-list">
                {courses.map((course) => (
                    <div key={course.id} className="course-card">
                        <h3>{course.name}</h3>
                        <p>Instructor: {course.instructor}</p>
                        <p>
                            Syllabus:{" "}
                            <a href={course.syllabus} target="_blank" rel="noopener noreferrer">
                                View PDF
                            </a>
                        </p>
                        {course.dueAssignments.length > 0 ? (
                            <p>
                                <strong>Due Assignments:</strong>{" "}
                                {course.dueAssignments.join(", ")}
                            </p>
                        ) : (
                            <p>No pending assignments</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StudentCourses;
