import TourCard from "./TourCard";

export default function MainSection({ tours }) {
  return (
    <main className="flex-1 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-7xl rounded-xl border-2 border-slate-300 bg-linear-to-br from-orange-100 to-pink-200 px-12 py-16">
        <div className="mb-8 text-center">
          <p className="text-4xl font-bold text-slate-800">
            ✈️ Du Lịch Toàn Cầu
          </p>
        </div>

        <p className="mb-8 text-center text-lg text-slate-900">
          Danh sách tours nổi bật
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </main>
  );
}
