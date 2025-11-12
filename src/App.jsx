function App() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <div className="text-center px-4">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 drop-shadow-lg animate-bounce">
          React + Vite + Tailwind 🎯
        </h1>

        <p className="text-lg mb-6 opacity-90">
          Hoàng Xuân Hiếu – HIEUHXPH30670
        </p>

        <button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-xl shadow-md hover:bg-gray-200 hover:scale-105 transition transform duration-200">
          Bắt đầu học Frontend!
        </button>

        <p className="mt-8 text-sm text-gray-200 opacity-80">
          Tailwind hoạt động tốt nếu bạn thấy nền{" "}
          <span className="font-bold">tím-hồng 💜</span>
        </p>
      </div>
    </div>
  );
}

export default App;
