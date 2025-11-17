import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function BookingPage({ tours }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const tour = tours.find(t => t.id === parseInt(id));

  const handleBooking = (e) => {
    e.preventDefault();
    alert(`Đặt tour ${tour.name} thành công! Vui lòng kiểm tra email để xác nhận.`);
    navigate("/");
  };

  if (!tour) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-slate-800">Tour không tìm thấy</p>
          <Button label="Quay lại" onClick={() => navigate("/")} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-2xl rounded-xl border-2 border-slate-300 bg-white px-8 py-10">
        <button onClick={() => navigate(-1)} className="mb-6 text-blue-500 hover:text-blue-700 font-semibold">
          ← Quay lại
        </button>

        <div className="flex gap-6 mb-8">
          <img
            src={tour.img}
            alt={tour.name}
            className="w-32 h-32 object-cover rounded-lg"
          />
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Đặt tour</h1>
            <p className="text-lg text-blue-600 font-semibold">{tour.name}</p>
            <p className="text-lg text-blue-600 font-semibold">{tour.price}</p>
          </div>
        </div>

        <form onSubmit={handleBooking} className="space-y-5">
          <div>
            <label className="block text-slate-700 font-semibold mb-2">Họ và tên *</label>
            <input
              type="text"
              placeholder="Nhập họ và tên"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-2">Email *</label>
            <input
              type="email"
              placeholder="Nhập email"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-2">Số điện thoại *</label>
            <input
              type="tel"
              placeholder="Nhập số điện thoại"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-2">Số người *</label>
            <input
              type="number"
              min="1"
              placeholder="Nhập số người"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-2">Ngày khởi hành *</label>
            <input
              type="date"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-2">Ghi chú</label>
            <textarea
              placeholder="Ghi chú thêm (nếu có)"
              rows="4"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>

          <div className="bg-orange-50 rounded-lg p-4 mb-6">
            <p className="text-slate-700"><span className="font-semibold">Tổng tiền:</span> {tour.price}</p>
          </div>

          <div className="flex gap-4">
            <Button label="Xác nhận đặt tour" variant="primary" onClick={handleBooking} />
            <Button label="Hủy" variant="secondary" onClick={() => navigate("/")} />
          </div>
        </form>
      </div>
    </div>
  );
}
