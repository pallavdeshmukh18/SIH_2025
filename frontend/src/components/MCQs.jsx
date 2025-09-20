// src/pages/MCQs.jsx
import React, { useState } from "react";
import "../css/MCQs.css";

function MCQs() {
    const [tests, setTests] = useState([
        { id: 1, subject: "Mathematics", title: "Algebra Quiz", status: "Pending" },
        { id: 2, subject: "Physics", title: "Motion Quiz", status: "Pending" },
    ]);

    const [activeTest, setActiveTest] = useState(null);
    const [answers, setAnswers] = useState({});
    const [marks, setMarks] = useState(null);

    const questions = [
        { id: 1, question: "2 + 2 = ?", options: ["3", "4", "5", "6"] },
        { id: 2, question: "5 * 3 = ?", options: ["15", "10", "20", "13"] },
        { id: 3, question: "√16 = ?", options: ["2", "4", "8", "6"] },
        { id: 4, question: "10 / 2 = ?", options: ["4", "5", "6", "8"] },
        { id: 5, question: "7 + 6 = ?", options: ["12", "13", "14", "15"] },
        { id: 6, question: "9 - 3 = ?", options: ["5", "6", "7", "8"] },
        { id: 7, question: "3 * 3 = ?", options: ["6", "9", "12", "15"] },
        { id: 8, question: "√81 = ?", options: ["7", "8", "9", "10"] },
        { id: 9, question: "15 / 3 = ?", options: ["4", "5", "6", "7"] },
        { id: 10, question: "6 + 7 = ?", options: ["12", "13", "14", "15"] },
    ];

    // Correct answers for demo
    const correctAnswers = {
        1: "4",
        2: "15",
        3: "4",
        4: "5",
        5: "13",
        6: "6",
        7: "9",
        8: "9",
        9: "5",
        10: "13",
    };

    const firstPendingTestId = tests.find(t => t.status === "Pending")?.id;

    const handleStartTest = (id) => {
        if (id === firstPendingTestId) {
            setActiveTest(tests.find(t => t.id === id));
            setAnswers({});
            setMarks(null);
        }
    };

    const handleAnswerChange = (qId, option) => {
        setAnswers({ ...answers, [qId]: option });
    };

    const handleSubmitTest = () => {
        // Calculate marks
        let score = 0;
        questions.forEach(q => {
            if (answers[q.id] === correctAnswers[q.id]) score += 1;
        });
        setMarks(score);

        // Update test status
        setTests(tests.map(t => t.id === activeTest.id ? { ...t, status: "Completed" } : t));
    };

    if (activeTest) {
        return (
            <div className="student-mcqs-page">
                <h2>{activeTest.title} - {activeTest.subject}</h2>
                <div className="test-questions">
                    {questions.map((q) => (
                        <div key={q.id} className="question-card">
                            <p><strong>{q.id}. {q.question}</strong></p>
                            <div className="options">
                                {q.options.map((opt) => (
                                    <label key={opt}>
                                        <input
                                            type="radio"
                                            name={`q${q.id}`}
                                            value={opt}
                                            checked={answers[q.id] === opt}
                                            onChange={() => handleAnswerChange(q.id, opt)}
                                            disabled={marks !== null}
                                        />
                                        {opt}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}

                    {marks === null ? (
                        <button className="submit-test-btn" onClick={handleSubmitTest}>Submit Test</button>
                    ) : (
                        <div className="test-result">
                            <h3>Test Submitted!</h3>
                            <p>Marks Obtained: {marks} / {questions.length}</p>
                            <button onClick={() => setActiveTest(null)}>Back to Tests</button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Normal test list view
    return (
        <div className="student-mcqs-page">
            <h2>Upcoming MCQs / Tests</h2>
            <div className="mcqs-list">
                {tests.map((test) => (
                    <div className="mcq-row" key={test.id}>
                        <div className="mcq-info">
                            <h3>{test.subject}</h3>
                            <p><strong>{test.title}</strong></p>
                            <p>Status: <span className={test.status === "Completed" ? "completed" : "pending"}>{test.status}</span></p>
                        </div>
                        <div className="mcq-actions">
                            {test.status === "Pending" ? (
                                <button
                                    className="start-btn"
                                    onClick={() => handleStartTest(test.id)}
                                    disabled={test.id !== firstPendingTestId}
                                    title={test.id !== firstPendingTestId ? "Complete previous test first" : ""}
                                >
                                    Start Test
                                </button>
                            ) : (
                                <button className="completed-btn" disabled>Completed</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MCQs;
