// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const isAuthenticated = localStorage.getItem("userToken");

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Render nested routes here
    return <Outlet />;
}

export default ProtectedRoute;
