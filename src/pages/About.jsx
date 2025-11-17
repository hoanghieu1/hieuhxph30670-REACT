import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="flex-1 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-3xl rounded-xl border-2 border-slate-300 bg-white px-8 py-10">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">About Us</h1>
        <p className="text-slate-700 leading-relaxed mb-6">
          Đây là trang About
        </p>
        <Link to="/" className="text-blue-600 hover:underline">← Quay lại trang chủ</Link>
      </div>
    </div>
  );
}
