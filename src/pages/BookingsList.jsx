import { Link } from "react-router-dom";

export default function BookingsList() {
  // Mock bookings data for demo
  const bookings = [
    { id: 1, name: "Tour Bali", date: "2025-12-10", people: 2, price: "5,000,000 VND" },
    { id: 2, name: "Tour Singapore", date: "2026-01-05", people: 4, price: "3,500,000 VND" },
  ];

  return (
    <div className="flex-1 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-4xl rounded-xl border-2 border-slate-300 bg-white px-8 py-10">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Danh sách bookings</h1>

        {bookings.length === 0 ? (
          <p className="text-slate-600">Chưa có booking nào.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div key={b.id} className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-slate-800">{b.name}</p>
                  <p className="text-sm text-slate-600">Ngày: {b.date} • Người: {b.people}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-600">{b.price}</p>
                  <Link to={`/detail/${b.id}`} className="text-sm text-blue-500 hover:underline">Xem chi tiết</Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6">
          <Link to="/" className="text-blue-600 hover:underline">← Quay lại</Link>
        </div>
      </div>
    </div>
  );
}
