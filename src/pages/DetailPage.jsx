import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/Button";

export default function DetailPage({ tours }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // debug: log incoming props to help diagnose missing tour
  console.log('DetailPage render', { id, tours });

  const parentTour = (tours || []).find((t) => t.id === parseInt(id));

  const [localTour, setLocalTour] = useState(null);
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    let mounted = true;

    if (!parentTour) {
      setLocalLoading(true);
      axios
        .get(`http://localhost:3001/tours/${id}`)
        .then((res) => {
          if (!mounted) return;
          const t = res.data;
          if (t) {
            setLocalTour({
              ...t,
              id: typeof t.id === "string" ? Number(t.id) : t.id,
              img: t.image || t.img || "/placeholder.png",
              price: typeof t.price === "number" ? t.price.toLocaleString("vi-VN") + " VND" : (t.price || ""),
              location: t.destination || t.location || "",
              details: t.details || t.description || "",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          if (mounted) setLocalError("Không tải được tour từ API");
        })
        .finally(() => {
          if (mounted) setLocalLoading(false);
        });
    }

    return () => (mounted = false);
  }, [id, parentTour]);

  const tour = parentTour || localTour;

  if (localLoading) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="text-center text-slate-700">Đang tải chi tiết tour...</div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-200 flex flex-col">
        <div className="flex-1 flex justify-center items-center">
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-800">Tour không tìm thấy</p>
            {localError && <p className="text-red-500">{localError}</p>}
            <Button label="Quay lại" onClick={() => navigate("/")} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-3xl rounded-xl border-2 border-slate-300 bg-white px-8 py-10">
        <button onClick={() => navigate("/")} className="mb-6 text-blue-500 hover:text-blue-700 font-semibold">
          ← Quay lại
        </button>

        <img
          src={tour.img}
          alt={tour.name}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />

        <h1 className="text-4xl font-bold text-slate-800 mb-4">{tour.name}</h1>

        <p className="text-xl text-blue-600 font-semibold mb-4">Giá: {tour.price}</p>

        <div className="bg-orange-50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">Chi tiết tour:</h2>
          <p className="text-slate-700 leading-relaxed">{tour.details}</p>
        </div>

        <div className="flex gap-4">
          <Button label="Đặt tour ngay" variant="primary" onClick={() => navigate(`/booking/${id}`)} />
          <Button label="Quay lại danh sách" variant="secondary" onClick={() => navigate("/")} />
        </div>
      </div>
    </div>
  );
}
