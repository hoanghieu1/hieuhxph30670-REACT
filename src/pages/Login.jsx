// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authApi } from "../services/api";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // validate cơ bản
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
      const { accessToken, user } = await authApi.login(
        email.trim(),
        password
      );

      // lưu token vào localStorage
      localStorage.setItem("token", accessToken);
      localStorage.setItem("userEmail", user.email);

      toast.success("Đăng nhập thành công!");
      navigate("/list");
    } catch (error) {
      console.error(error);
      // json-server-auth trả string trong error.response.data
      const msg =
        error.response?.data || error.message || "Đăng nhập thất bại.";
      toast.error(msg);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto text-left">
      <h1 className="text-2xl font-semibold mb-6">Login</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium mb-1">Password</label>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit */}
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

export default LoginPage;
