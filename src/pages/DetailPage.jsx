import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function DetailPage({ tours }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const tour = tours.find(t => t.id === parseInt(id));

  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-200 flex flex-col">
        <div className="flex-1 flex justify-center items-center">
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-800">Tour không tìm thấy</p>
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
