// src/pages/List.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { tourApi } from "../services/api";


const renderCategory = (cat) => {
  if (cat === "domestic") return "Tour nội địa";
  if (cat === "international") return "Tour quốc tế";
  return "Không xác định";
};

function ListPage() {
  const [tours, setTours] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  // Lấy danh sách tour từ API
  const fetchTours = async () => {
    try {
      setLoading(true);
      const data = await tourApi.getAll(); // trả về mảng tours
      setTours(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Lỗi tải danh sách tour");
      setTours([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  // Xóa tour
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa tour này?")) return;
    try {
      await tourApi.remove(id);
      setTours((prev) => prev.filter((t) => t.id !== id));
      toast.success("Xóa tour thành công");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Xóa tour thất bại");
    }
  };

  // Bật / tắt trạng thái active
  const handleToggleActive = async (tour) => {
    try {
      const updated = { ...tour, active: !tour.active };
      await tourApi.updateOne(tour.id, updated);
      setTours((prev) =>
        prev.map((t) => (t.id === tour.id ? updated : t))
      );
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Cập nhật trạng thái thất bại");
    }
  };

  // Lọc + search
  const filteredTours = useMemo(() => {
    let result = Array.isArray(tours) ? [...tours] : [];

    if (search.trim()) {
      const kw = search.trim().toLowerCase();
      result = result.filter((t) =>
        t.name?.toLowerCase().includes(kw)
      );
    }

    if (categoryFilter !== "all") {
      result = result.filter((t) => t.category === categoryFilter);
    }

    if (statusFilter !== "all") {
      const flag = statusFilter === "active";
      result = result.filter((t) => !!t.active === flag);
    }

    return result;
  }, [tours, search, categoryFilter, statusFilter]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-left">
        Danh sách Tour
      </h1>

      {/* Bộ lọc */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          className="border rounded px-3 py-2 flex-1 min-w-[200px]"
          placeholder="Tìm theo tên tour..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded px-3 py-2"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">Tất cả loại tour</option>
          <option value="domestic">Tour nội địa</option>
          <option value="international">Tour quốc tế</option>
        </select>

        <select
          className="border rounded px-3 py-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="active">Đang hoạt động</option>
          <option value="inactive">Ngừng hoạt động</option>
        </select>
      </div>

      {/* Bảng danh sách */}
      {loading ? (
        <p className="text-center">Đang tải...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border text-left">ID</th>
                <th className="px-4 py-2 border text-left">Tên tour</th>
                <th className="px-4 py-2 border text-left">Slug</th>
                <th className="px-4 py-2 border text-left">Giá</th>
                <th className="px-4 py-2 border text-left">Loại tour</th>
                <th className="px-4 py-2 border text-left">Slots còn</th>
                <th className="px-4 py-2 border text-left">Active</th>
                <th className="px-4 py-2 border text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredTours.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-4 text-gray-500"
                  >
                    Không có tour nào phù hợp
                  </td>
                </tr>
              ) : (
                filteredTours.map((tour) => (
                  <tr key={tour.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{tour.id}</td>

                    <td className="px-4 py-2 border text-left">
                      {tour.name}
                    </td>

                    {/* Slug */}
                    <td className="px-4 py-2 border text-left">
                      {tour.slug || "—"}
                    </td>

                    {/* Giá */}
                    <td className="px-4 py-2 border">
                      {typeof tour.price === "number"
                        ? tour.price.toLocaleString("vi-VN") + " đ"
                        : tour.price || ""}
                    </td>

                    {/* Loại tour */}
                    <td className="px-4 py-2 border">
                      {renderCategory(tour.category)}
                    </td>

                    {/* Slots còn lại */}
                    <td className="px-4 py-2 border">
                      {tour.available ?? 0}
                    </td>

                    {/* Active switch */}
                    <td className="px-4 py-2 border">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={!!tour.active}
                          onChange={() => handleToggleActive(tour)}
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full transition-colors duration-200" />
                      </label>
                    </td>

                    {/* Hành động */}
                    <td className="px-4 py-2 border">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(tour.id)}
                          className="px-3 py-1 text-xs bg-red-500 text-white rounded"
                        >
                          Xóa
                        </button>
                        <Link to={`/edit/${tour.id}`}>
                          <button className="px-3 py-1 text-xs bg-yellow-500 text-white rounded">
                            Sửa
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ListPage;
