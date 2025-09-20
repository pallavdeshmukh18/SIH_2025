// src/components/ChatBotPage.jsx
import React from "react";
import "../css/ChatBotPage.css";
import axios from "axios";
import { useState } from "react";

// IMPORTANT: Replace with your actual API key
const API_KEY = "AIzaSyCIqc_sKVARUx1rykbmeFS8Vy_hKR4sqXc";

function ChatBotPage() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    async function generateAnswer() {
        if (!question.trim()) {
            setAnswer("Please ask a question first.");
            return;
        }

        setLoading(true);
        setAnswer("Thinking...");

        try {
            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
                method: "post",
                data: {
                    contents: [{ parts: [{ text: question }] }],
                },
            });

            const generatedText = response.data.candidates[0].content.parts[0].text;
            setAnswer(generatedText);

        } catch (error) {
            console.error("Error generating answer:", error.response || error);
            setAnswer("Sorry, something went wrong. Please check the console for details.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="chatbot-page">
            <div className="chatbot-container">
                <h1 className="chatbot-title">AI Assistant 🤖</h1>
                <p className="chatbot-subtitle">Ask me anything about your courses, deadlines, or general knowledge!</p>

                {/* ✅ Grouping the textarea and button together */}
                <div className="input-group">
                    <textarea
                        className="chatbot-textarea"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="E.g., Explain the theory of relativity in simple terms..."
                    />
                    <button
                        className="chatbot-button"
                        onClick={generateAnswer}
                        disabled={loading}
                    >
                        {loading ? "Thinking..." : "Generate Answer"}
                    </button>
                </div>

                <div className="chatbot-answer-area">
                    {answer && <pre className="chatbot-answer">{answer}</pre>}
                </div>
            </div>
        </div>
    );
}

export default ChatBotPage;