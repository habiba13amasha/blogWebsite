import { Navigate, Outlet } from "react-router-dom";

export default function Protected() {
  const isAuthenticated = localStorage.getItem("token"); 

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
