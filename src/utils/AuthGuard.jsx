import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("token");

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthGuard;
