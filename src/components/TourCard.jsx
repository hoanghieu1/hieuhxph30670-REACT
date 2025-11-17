export default function TourCard({ tour }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-slate-300 px-6 py-6 bg-slate-50">
      <img
        src={tour.img}
        alt={tour.name}
        className="w-24 h-24 object-cover rounded-md border"
      />
      <p className="text-sm font-medium text-slate-800">{tour.name}</p>
      <p className="text-sm font-medium text-slate-800">{tour.description}</p>
    </div>
  );
}
