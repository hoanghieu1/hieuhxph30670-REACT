// src/components/Header.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  // Cập nhật trạng thái khi token thay đổi ở tab khác
  useEffect(() => {
    const handleStorage = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success("Đã đăng xuất");
    navigate("/login");
  };

  const linkClass =
    "px-3 py-2 text-sm font-medium hover:text-white/90";
  const activeClass =
    "border-b-2 border-white text-white";

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow">
      <nav className="max-w-6xl mx-auto flex items-center justify-between h-14 px-4">
        {/* LOGO / BRAND */}
        <NavLink to="/" className="font-semibold text-lg">
          Tour Management
        </NavLink>

        {/* MENU TRÁI */}
        <div className="flex items-center gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/tours"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Tours
          </NavLink>
          <NavLink
            to="/destinations"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Destinations
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/bookings"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Bookings
          </NavLink>

          {/* Link vào khu ADMIN */}
          <NavLink
            to="/list"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : ""}`
            }
          >
            Admin
          </NavLink>
        </div>

        {/* MENU PHẢI: LOGIN / LOGOUT */}
        <div className="flex items-center gap-3 text-sm">
          {!isLoggedIn ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : ""}`
                }
              >
                Đăng nhập
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : ""}`
                }
              >
                Đăng ký
              </NavLink>
            </>
          ) : (
            <>
              <span className="opacity-80">Đã đăng nhập</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-sm"
              >
                Đăng xuất
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
