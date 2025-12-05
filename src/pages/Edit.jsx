// src/pages/Edit.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { tourApi } from "../services/api";

function EditPage() {
  const { id } = useParams();          // id có thể là "1" hoặc "edb4"
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    destination: "",
    price: "",
    available: "",
    image: "",
    description: "",
    category: "domestic",
    active: true,
  });

  // Lấy tour theo id để fill form
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const tour = await tourApi.getById(id); // 👈 dùng id thẳng
        setForm({
          name: tour.name || "",
          slug: tour.slug || "",
          destination: tour.destination || "",
          price: tour.price ?? "",
          available: tour.available ?? "",
          image: tour.image || "",
          description: tour.description || "",
          category: tour.category || "domestic",
          active: tour.active ?? true,
        });
      } catch (error) {
        console.error(error);
        toast.error("Lỗi tải tour");
      }
    };
    fetchTour();
  }, [id]);

  // handle change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate basic
    if (!form.name.trim() || form.name.trim().length < 5) {
      toast.error("Tên tour phải từ 5 ký tự");
      return;
    }
    if (!form.destination.trim()) {
      toast.error("Điểm đến bắt buộc");
      return;
    }
    if (!form.price || Number(form.price) <= 0) {
      toast.error("Giá phải > 0");
      return;
    }

    try {
      await tourApi.updateOne(id, {   // 👈 KHÔNG ép Number ở đây
        ...form,
        price: Number(form.price),
        available: Number(form.available) || 0,
      });
      toast.success("Cập nhật tour thành công");
      navigate("/list");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Cập nhật tour thất bại");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-left">
      <h1 className="text-2xl font-semibold mb-6">
        Cập nhật tour ID: {id}
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium mb-1">Tên tour</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Mã tour (slug)</label>
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Điểm đến</label>
          <input
            name="destination"
            value={form.destination}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Giá (VND)</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Số chỗ còn (slots)
            </label>
            <input
              name="available"
              type="number"
              value={form.available}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Ảnh (URL)</label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Mô tả</label>
          <textarea
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex items-center gap-4">
          <div>
            <label className="block font-medium mb-1">Loại tour</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            >
              <option value="domestic">Tour nội địa</option>
              <option value="international">Tour quốc tế</option>
            </select>
          </div>

          <label className="inline-flex items-center gap-2 mt-6">
            <input
              type="checkbox"
              name="active"
              checked={form.active}
              onChange={handleChange}
            />
            <span>Active</span>
          </label>
        </div>

        <button
          type="submit"
          className="mt-4 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
}

export default EditPage;
