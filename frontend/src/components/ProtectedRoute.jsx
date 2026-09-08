
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles = [] }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    if (user.role === "seller") {
      return <Navigate to="/seller/dashboard" replace />;
    }

    return <Navigate to="/products" replace />;
  }

  return children;
}

export default ProtectedRoute;

