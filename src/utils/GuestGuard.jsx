import { Navigate } from "react-router-dom";

const GuestGuard = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("token");

  if (isLoggedIn) {
    return <Navigate to="/customer/dashboard" />;
  }

  return children;
};

export default GuestGuard;
