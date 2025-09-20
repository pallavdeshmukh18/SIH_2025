import React, { useState, useEffect } from "react";
import "../css/DiscussionsPage.css";

function DiscussionsPage() {
    const [discussions, setDiscussions] = useState([]);
    const [newDiscussion, setNewDiscussion] = useState({ title: "", author: "Pallav" });
    const [newComment, setNewComment] = useState({}); // store input per discussion

    useEffect(() => {
        // Mock data
        setDiscussions([
            {
                id: 1,
                title: "Question about Assignment 3",
                author: "Hrishikesh",
                date: "2025-09-20",
                comments: [
                    { author: "Pallav", text: "Can you explain step 2?", date: "2025-09-20" }
                ]
            }
        ]);
    }, []);

    const handleAddDiscussion = () => {
        if (!newDiscussion.title) return;
        setDiscussions([
            ...discussions,
            { ...newDiscussion, id: Date.now(), date: new Date().toISOString(), comments: [] }
        ]);
        setNewDiscussion({ title: "", author: "Pallav" });
    };

    const handleAddComment = (id) => {
        const text = newComment[id];
        if (!text) return;
        setDiscussions(
            discussions.map((d) =>
                d.id === id
                    ? { ...d, comments: [...d.comments, { author: "Pallav", text, date: new Date().toISOString() }] }
                    : d
            )
        );
        setNewComment({ ...newComment, [id]: "" });
    };

    return (
        <div className="discussions-page">
            <h2>Discussions Chat</h2>

            {/* New Discussion */}
            <div className="new-discussion">
                <input
                    type="text"
                    placeholder="Start a new discussion"
                    value={newDiscussion.title}
                    onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
                />
                <button onClick={handleAddDiscussion}>Post</button>
            </div>

            {/* Discussions List */}
            <div className="discussion-list">
                {discussions.map((d) => (
                    <div key={d.id} className="discussion-card">
                        <h3>{d.title}</h3>
                        <small>
                            By {d.author} on {new Date(d.date).toLocaleString()}
                        </small>

                        {/* Comments */}
                        <div className="comments">
                            {d.comments.map((c, i) => (
                                <p key={i}>
                                    <b>{c.author}:</b> {c.text}
                                </p>
                            ))}
                        </div>

                        {/* Add Comment */}
                        <div className="add-comment">
                            <input
                                type="text"
                                placeholder="Write a reply..."
                                value={newComment[d.id] || ""}
                                onChange={(e) => setNewComment({ ...newComment, [d.id]: e.target.value })}
                            />
                            <button onClick={() => handleAddComment(d.id)}>Reply</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DiscussionsPage;
