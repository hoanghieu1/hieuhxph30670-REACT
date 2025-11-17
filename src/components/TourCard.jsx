import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function TourCard({ tour }) {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/detail/${tour.id}`);
  };

  const handleBookTour = () => {
    navigate(`/booking/${tour.id}`);
  };

  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-slate-100 px-6 py-6 bg-linear-to-b from-purple-50 to-blue-300">
      <img
        src={tour.img}
        alt={tour.name}
        className="w-full h-48 object-cover rounded-md "
      />
      <div className="w-full rounded-md px-4 py-3">
        <p className="text-base font-semibold text-slate-800">{tour.name}</p>
        <p className="text-sm text-slate-800 text-center">{tour.description}</p>
      </div>
      <div className="w-full flex gap-3 mt-2">
        <Button label="Xem Thêm" variant="secondary" onClick={handleViewMore} />
        <Button label="Đặt Tour" variant="primary" onClick={handleBookTour} />
      </div>
    </div>
  );
}
