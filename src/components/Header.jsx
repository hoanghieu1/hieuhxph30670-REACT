import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-linear-to-r from-blue-300 to-indigo-900 shadow-lg relative z-50">
      <nav className="max-w-5xl mx-auto flex items-center gap-8 px-6 py-4 text-lg">
        <NavLink to="/" className={({isActive}) => `flex items-center gap-2 font-bold text-white ${isActive ? 'underline' : ''}`}>
          Home
        </NavLink>
        <NavLink to="/tours" className={({isActive}) => `flex items-center gap-2 text-white hover:text-yellow-300 transition ${isActive ? 'underline' : ''}`}>
          Tours
        </NavLink>
        <NavLink to="/destinations" className={({isActive}) => `flex items-center gap-2 text-white hover:text-yellow-300 transition ${isActive ? 'underline' : ''}`}>
          Destinations
        </NavLink>
        <NavLink to="/about" className={({isActive}) => `flex items-center gap-2 text-white hover:text-yellow-300 transition ${isActive ? 'underline' : ''}`}>
          About
        </NavLink>
        <NavLink to="/bookings" className={({isActive}) => `flex items-center gap-2 text-white hover:text-yellow-300 transition ${isActive ? 'underline' : ''}`}>
          Bookings
        </NavLink>
      </nav>
    </header>
  );
}
