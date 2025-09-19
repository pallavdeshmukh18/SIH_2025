import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import TeacherDashboard from "./pages/TeacherDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/student" element={<StudentDashboard />} />
      <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
      <Route path="/dashboard/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
