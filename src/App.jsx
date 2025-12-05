import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

import Header from "./components/Header";
import MainSection from "./components/MainSection";
import Footer from "./components/Footer";
import DetailPage from "./pages/DetailPage";
import BookingPage from "./pages/BookingPage";
import About from "./pages/About";
import ToursPage from "./pages/ToursPage";
import BookingsList from "./pages/BookingsList";
import Destinations from "./pages/Destinations";
import fetchTours from "./services/api";

import ListPage from "./pages/List";
import AddPage from "./pages/Add";
import EditPage from "./pages/Edit";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import AdminLayout from "./AdminLayout";

export default function App() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchTours()
      .then((data) => {
        if (mounted) setTours(data);
      })
      .catch((err) => {
        console.error(err);
        if (mounted) setError(err.message || "Lỗi khi tải dữ liệu");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="text-center text-slate-700">Đang tải dữ liệu...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold">Lỗi: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-200 flex flex-col">
        <Header />

        <main className="flex-1">
          <Routes>
            {/* CLIENT ROUTES */}
            <Route path="/" element={<MainSection tours={tours} />} />
            <Route path="/tours" element={<ToursPage tours={tours} />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/destinations"
              element={<Destinations tours={tours} />}
            />
            <Route
              path="/detail/:id"
              element={<DetailPage tours={tours} />}
            />
            <Route
              path="/booking/:id"
              element={<BookingPage tours={tours} />}
            />
            <Route path="/bookings" element={<BookingsList />} />

            {/* AUTH */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* ADMIN (protected) */}
            <Route element={<AdminLayout />}>
              <Route path="/list" element={<ListPage />} />
              <Route path="/add" element={<AddPage />} />
              <Route path="/edit/:id" element={<EditPage />} />
            </Route>
          </Routes>
        </main>

        <Footer />

        <Toaster position="top-right" />
      </div>
    </Router>
  );
}
