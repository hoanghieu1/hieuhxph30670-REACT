import Header from "./components/Header";
import MainSection from "./components/MainSection";
import Footer from "./components/Footer";

export default function App() {
  const tours = [
    { id: 1, name: "Tour Bali", description: "du lịch bali siêu siêu đẹp",       img: "./bali.webp" },
    { id: 2, name: "Tour Singapore", description: "Singapore đất nước siêu phát triển", img: "./sing.webp" },
    { id: 3, name: "Tour Japan", description: "Nhật bản xứ sở hoa anh đào",    img: "./nhatban.webp" },
    { id: 4, name: "Tour Việt Nam", description:"Việt Nam quê hương ta đẹp lắm",   img: "./vietnam.webp" },
    { id: 5, name: "Tour Mỹ", description: "Đế quốc Mỹ hùng mạnh đẹp đẽ",  img: "./my.webp" },
    { id: 6, name: "Tour Hàn Quốc", description: "Kim chi là món ăn siêu hấp dẫn", img: "./hanquoc.webp" },
  ];

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <Header />
      <MainSection tours={tours} />
      <Footer />
    </div>
  );
}
