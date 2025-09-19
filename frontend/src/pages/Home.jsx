import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Welcome to SIH Project</h1>
            <Link to="/login">Go to Login</Link>
        </div>
    );
}

export default Home;
