import { Outlet, Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "./state/userState";

const ProtectedRoute = () => {
  const [user, setUser] = useRecoilState(userState);

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
