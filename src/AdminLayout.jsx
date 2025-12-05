// src/AdminLayout.jsx
import { Navigate, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    // chưa đăng nhập -> về login
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="max-w-6xl mx-auto mt-6 px-4">
      <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
