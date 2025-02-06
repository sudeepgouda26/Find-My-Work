import { Navigate, useLocation } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../UserContext";

const PrivateRoute = ({ children }) => {
  const { token } = useContext(UserContext);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;