export default function Header() {
  return (
    <header className="bg-linear-to-r from-blue-300 to-indigo-900 shadow-lg">
      <nav className="max-w-5xl mx-auto flex items-center gap-8 px-6 py-4 text-lg">
        <button className="flex items-center gap-2 font-bold text-white">
          <span></span> Home
        </button>
        <button className="flex items-center gap-2 text-white hover:text-yellow-300 transition">
          <span></span> Tours
        </button>
        <button className="flex items-center gap-2 text-white hover:text-yellow-300 transition">
          <span></span> Destinations
        </button>
        <button className="flex items-center gap-2 text-white hover:text-yellow-300 transition">
          <span></span> Bookings
        </button>
      </nav>
    </header>
  );
}
