import { Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

function ProtectedRoute({ children, role }) {
  const { user, token } = useApp();

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;