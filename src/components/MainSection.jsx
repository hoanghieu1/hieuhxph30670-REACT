import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TourCard from "./TourCard";

export default function MainSection({ tours }) {
  const slides = [
    { id: 1, img: "/bali.webp", title: "Khám phá Bali", subtitle: "Bãi biển & văn hóa" },
    { id: 2, img: "/nhatban.webp", title: "Vùng đất hoa anh đào", subtitle: "Trải nghiệm Nhật Bản" },
    { id: 3, img: "/my.webp", title: "American Dream", subtitle: "Thành phố & thiên nhiên" },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  const featured = tours.slice(0, 3);

  return (
    <main className="flex-1 flex flex-col items-center px-4 py-10 gap-8">
      {/* HERO / SLIDER */}
      <section className="w-full max-w-7xl rounded-xl overflow-hidden shadow-md">
        <div className="relative h-72 md:h-96 bg-gray-200">
          {slides.map((s, i) => (
            <div
              key={s.id}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
              style={{ backgroundImage: `url(${s.img})` }}
              aria-hidden={i !== index}
            >
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="absolute left-6 bottom-6 text-white">
                <h2 className="text-2xl md:text-4xl font-bold">{s.title}</h2>
                <p className="text-sm md:text-lg mt-1">{s.subtitle}</p>
                <Link to="/tours" className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Xem tất cả tours</Link>
              </div>
            </div>
          ))}

          <button onClick={prev} aria-label="Prev" className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white px-3 py-2 rounded-full">‹</button>
          <button onClick={next} aria-label="Next" className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white px-3 py-2 rounded-full">›</button>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="w-full max-w-7xl rounded-xl border-2 border-slate-200 bg-white px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-slate-800">Tours nổi bật</h3>
            <p className="text-sm text-slate-600">Những hành trình được lựa chọn bởi khách hàng</p>
          </div>
          <Link to="/tours" className="text-blue-600 hover:underline">Xem tất cả</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((t) => (
            <TourCard key={t.id} tour={t} />
          ))}
        </div>
      </section>

      {/* Promotion */}
      <section className="w-full max-w-7xl px-4">
        <div className="rounded-lg bg-amber-50 border border-amber-100 px-8 py-6">
          <h4 className="text-xl font-bold text-slate-800 mb-2">Chương trình khuyến mãi</h4>
          <p className="text-slate-700">Nhận ưu đãi đến 20% cho các tour đặt trước. Liên hệ ngay để được tư vấn và nhận quà tặng hấp dẫn trong dịp lễ!</p>
        </div>
      </section>
    </main>
  );
}
