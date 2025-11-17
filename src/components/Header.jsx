export default function Header() {
  return (
    <header className="border-b bg-white">
      <nav className="max-w-5xl mx-auto flex items-center gap-8 px-6 py-4 text-lg">
        <button className="flex items-center gap-2 font-medium text-blue-600">
          <span></span> Home
        </button>
        <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
          <span></span> Tours
        </button>
        <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
          <span></span> Destinations
        </button>
        <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
          <span></span> Bookings
        </button>
      </nav>
    </header>
  );
}
