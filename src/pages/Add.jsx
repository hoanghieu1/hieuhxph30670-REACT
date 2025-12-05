import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { tourApi } from '../services/api';

function AddPage() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [slots, setSlots] = useState('');
    const [category, setCategory] = useState('tour nội địa');
    const [active, setActive] = useState(true);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        // (text, required, 5-100 ký tự)
    if (!name.trim()) newErrors.name = 'Tên tour bắt buộc';
    else if (name.trim().length < 5 || name.trim().length > 100)
      newErrors.name = 'Tên tour phải từ 5-100 ký tự';

    // (text, required, 2-50 ký tự)
    if (!slug.trim()) newErrors.slug = 'Mã tour bắt buộc';
    else if (slug.trim().length < 2 || slug.trim().length > 50)
      newErrors.slug = 'Mã tour phải từ 2-50 ký tự';

    // (text, required)
    if (!location.trim()) newErrors.location = 'Điểm đến bắt buộc';

    // (number, required, > 0)
    if (price === '' || Number(price) <= 0)
      newErrors.price = 'Giá phải > 0';

    // (URL, required, valid format)
    if (!image.trim()) newErrors.image = 'Ảnh là bắt buộc';
    else if (!/^https?:\/\/.+/i.test(image.trim()))
      newErrors.image = 'URL ảnh không hợp lệ';

    // (textarea, required, 10-1000 ký tự)
    if (!description.trim()) newErrors.description = 'Mô tả bắt buộc';
    else if (
      description.trim().length < 10 ||
      description.trim().length > 1000
    )
      newErrors.description = 'Mô tả phải từ 10-1000 ký tự';

    // (number, required, ≥ 0)
    if (slots === '' || Number(slots) < 0)
      newErrors.slots = 'Số chỗ phải ≥ 0';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async event => {
        event.preventDefault(); // ngăn load lại trang
        if (!validate()) return;

        try {
            const payload = {
                name: name.trim(),
                slug: slug.trim(),
                location: location.trim(),
                price: Number(price),
                image: image.trim(),
                description: description.trim(),
                slots: Number(slots),
                category,
                active,
            };
            await tourApi.create(payload);
            toast.success('Thêm tour thành công!');
            navigate('/list');
        } catch (error) {
            console.error(error);
            toast.error(
              error.response?.data?.message ||
              error.message ||
              "Có lỗi xảy ra, vui lòng thử lại.")
        };
    };

    const renderError = key => 
        errors[key] ? (
            <p className='text-sm text-red-500 mt-1'>{errors[key]}</p>
        ) : null;
    return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thêm tour mới</h1>

      <form className="space-y-6 text-left" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Tên tour</label>
          <input
            value={name}
            onChange={event => setName(event.target.value)}
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {renderError('name')}
        </div>

        {/* Slug */}
        <div>
          <label className="block font-medium mb-1">Mã tour (slug)</label>
          <input
            value={slug}
            onChange={event => setSlug(event.target.value)}
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {renderError('slug')}
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium mb-1">Điểm đến</label>
          <input
            value={location}
            onChange={event => setLocation(event.target.value)}
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {renderError('location')}
        </div>

        {/* Price + Slots */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Giá (VNĐ)</label>
            <input
              value={price}
              onChange={event => setPrice(event.target.value)}
              type="number"
              min="0"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {renderError('price')}
          </div>
          <div>
            <label className="block font-medium mb-1">
              Số chỗ còn (slots)
            </label>
            <input
              value={slots}
              onChange={event => setSlots(event.target.value)}
              type="number"
              min="0"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {renderError('slots')}
          </div>
        </div>

        {/* Image */}
        <div>
          <label className="block font-medium mb-1">Ảnh (URL)</label>
          <input
            value={image}
            onChange={event => setImage(event.target.value)}
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {renderError('image')}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Mô tả</label>
          <textarea
            value={description}
            onChange={event => setDescription(event.target.value)}
            rows={4}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {renderError('description')}
        </div>

        {/* Category + Active */}
        <div className="grid md:grid-cols-2 gap-4 items-center">
          <div>
            <label className="block font-medium mb-1">Loại tour</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="tour nội địa">Tour nội địa</option>
              <option value="tour quốc tế">Tour quốc tế</option>
            </select>
          </div>

          <div className="mt-4 md:mt-7">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={active}
                onChange={e => setActive(e.target.checked)}
                className="h-4 w-4"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">
                Active (mặc định: bật)
              </span>
            </label>
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );

    
}

export default AddPage;