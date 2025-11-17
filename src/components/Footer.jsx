export default function Footer() {
  return (
    <footer className="bg-linear-to-r from-blue-300 to-indigo-900 shadow-lg">
      <div className="max-w-5xl mx-auto px-6 py-6 text-center text-white">
        <p className="text-base font-semibold">© {new Date().getFullYear()} Tour Management System.</p>
        <p className="text-sm mt-2">Designed with ❤️ by Hiếu.</p>
      </div>
    </footer>
  );
}
