import { Outlet, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const ProtectedRoute = () => {
  const [cookie, setCookie] = useCookies(["token"]);

  return cookie.token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
