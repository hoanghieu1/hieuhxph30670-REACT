import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import MainSection from "./components/MainSection";
import Footer from "./components/Footer";
import DetailPage from "./pages/DetailPage";
import BookingPage from "./pages/BookingPage";

export default function App() {
  const [tours] = useState([
    { id: 1, name: "Tour Bali", description: "du lịch bali siêu siêu đẹp", img: "/bali.webp", price: "5,000,000 VND", details: "Khám phá đảo Bali với những bãi biển tuyệt đẹp, đền thờ cổ kính và cuộc sống đơn sơ của người dân địa phương." },
    { id: 2, name: "Tour Singapore", description: "Singapore đất nước siêu phát triển", img: "/sing.webp", price: "3,500,000 VND", details: "Trải nghiệm thành phố hiện đại Singapore với những tòa nhà chọc trời, vườn Gardens by the Bay và mua sắm tại Orchard Road." },
    { id: 3, name: "Tour Japan", description: "Nhật bản xứ sở hoa anh đào", img: "/nhatban.webp", price: "8,000,000 VND", details: "Chiêm ngưỡng vẻ đẹp của Nhật Bản qua những ngôi đền cổ, vườn hoa anh đào và nền văn hóa độc đáo." },
    { id: 4, name: "Tour Việt Nam", description: "Việt Nam quê hương ta đẹp lắm", img: "/vietnam.webp", price: "2,000,000 VND", details: "Khám phá vẻ đẹp tự nhiên của Việt Nam từ Hạ Long, Hà Nội, Sapa đến TP.HCM." },
    { id: 5, name: "Tour Mỹ", description: "Đế quốc Mỹ hùng mạnh đẹp đẽ", img: "/my.webp", price: "10,000,000 VND", details: "Thăm viếng những địa danh nổi tiếng của Mỹ như New York, Las Vegas, Grand Canyon và Hollywood." },
    { id: 6, name: "Tour Hàn Quốc", description: "Kim chi là món ăn siêu hấp dẫn", img: "/hanquoc.webp", price: "6,000,000 VND", details: "Trải nghiệm nền văn hóa K-pop, ẩm thực Hàn Quốc và khám phá Seoul, Busan cùng Jeju." },
  ]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-200 flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<MainSection tours={tours} />} />
          <Route path="/detail/:id" element={<DetailPage tours={tours} />} />
          <Route path="/booking/:id" element={<BookingPage tours={tours} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
