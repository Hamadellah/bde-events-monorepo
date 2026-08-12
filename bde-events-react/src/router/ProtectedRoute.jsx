import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    if (user.role === "student") {
      return <Navigate to="/dashboard/dashboardStudent" replace />;
    }

    if (user.role === "admin") {
      return <Navigate to="/dashboard/dashboardAdmin" replace />;
    }
    if(user.role === "admin"){
      return <Navigate to="/form" replace />;
    }

    return <Navigate to="/login" replace />;
  }

  return children;
}