import TourCard from "./TourCard";

export default function MainSection({ tours }) {
  return (
    <main className="flex-1 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-5xl rounded-xl border-2 border-slate-300 bg-white px-8 py-10">
        <div className="mb-6 text-center">
          <p className="text-2xl font-semibold text-slate-800">
            ✈️ Du Lịch Toàn Cầu
          </p>
        </div>

        <p className="mb-6 text-center text-slate-600">
          Danh sách tours nổi bật
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </main>
  );
}
