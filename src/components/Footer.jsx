export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-5xl mx-auto px-6 py-4 text-center text-slate-600 text-sm">
        <p>© {new Date().getFullYear()} Tour Management System.</p>
        <p className="text-xs mt-1">Designed with by Hiếu.</p>
      </div>
    </footer>
  );
}
