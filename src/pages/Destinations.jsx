import { Link } from "react-router-dom";

export default function Destinations({ tours }) {
  const locations = Array.from(new Map(tours.map(t => [t.location, t])).values());

  return (
    <main className="flex-1 flex justify-center items-start px-4 py-10">
      <div className="w-full max-w-7xl rounded-xl border-2 border-slate-300 bg-white px-8 py-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Destinations</h1>
          <p className="text-sm text-slate-600">Choose a destination to view tours</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.map((t) => (
            <Link key={t.location} to={`/tours?loc=${encodeURIComponent(t.location)}`} className="block rounded-lg overflow-hidden border hover:shadow-md">
              <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${t.img})` }} />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-slate-800">{t.location}</h3>
                <p className="text-sm text-slate-600 mt-1">Xem các tour tại {t.location}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6">
          <Link to="/" className="text-blue-600 hover:underline">← Quay lại</Link>
        </div>
      </div>
    </main>
  );
}
