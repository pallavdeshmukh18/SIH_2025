import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import TeacherDashboard from "./pages/TeacherDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Protected student routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard/student/*" element={<StudentDashboard />} />
        <Route path="/dashboard/teacher/*" element={<TeacherDashboard />} />
        <Route path="/dashboard/admin/*" element={<AdminDashboard />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<h1>404: Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
