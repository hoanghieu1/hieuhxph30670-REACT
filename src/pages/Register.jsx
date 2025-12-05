// src/pages/Register.jsx
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { authApi } from "../services/api";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("Email bắt buộc");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Email không hợp lệ");
      return;
    }
    if (!password) {
      toast.error("Password bắt buộc");
      return;
    }
    if (password.length < 6) {
      toast.error("Password tối thiểu 6 ký tự");
      return;
    }

    try {
      await authApi.register(email.trim(), password);
      toast.success("Đăng ký thành công, hãy đăng nhập!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Đăng ký thất bại");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto text-left">
      <h1 className="text-2xl font-semibold mb-6">Register mới</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
