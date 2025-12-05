// src/services/api.js
import axios from "axios";

const BASE_URL = "http://localhost:3001";


export const getTours = async () => {
  const res = await axios.get(`${BASE_URL}/tours`);
  return res.data;
};

export const getTour = async (id) => {
  const res = await axios.get(`${BASE_URL}/tours/${id}`);
  return res.data;
};

export const addTour = async (payload) => {
  const res = await axios.post(`${BASE_URL}/tours`, payload);
  return res.data;
};

export const updateTour = async (id, payload) => {
  const res = await axios.put(`${BASE_URL}/tours/${id}`, payload);
  return res.data;
};

export const deleteTour = async (id) => {
  const res = await axios.delete(`${BASE_URL}/tours/${id}`);
  return res.data;
};

export const tourApi = {
  getAll: () => getTours(),
  getById: (id) => getTour(id),
  create: (payload) => addTour(payload),
  updateOne: (id, payload) => updateTour(id, payload),
  remove: (id) => deleteTour(id),
  toggleActive: async (id, currentActive) => {
    const res = await axios.patch(`${BASE_URL}/tours/${id}`, {
      active: !currentActive,
    });
    return res.data;
  },
};



export const authApi = {
  register: async (email, password) => {
    const res = await axios.post(`${BASE_URL}/register`, { email, password });
    // { accessToken, user }
    return res.data;
  },

  login: async (email, password) => {
    const res = await axios.post(`${BASE_URL}/login`, { email, password });
    // { accessToken, user }
    return res.data;
  },
};

/* ============ DESTINATION ============ */

export const getDestinations = async () => {
  const res = await axios.get(`${BASE_URL}/destinations`);
  return res.data;
};

export const destinationApi = {
  getAll: () => getDestinations(),
};

/* ============ fetchTours cho client ============ */

export default async function fetchTours() {
  const data = await getTours();

  if (!data || !Array.isArray(data)) return [];

  return data.map((t) => ({
    id: typeof t.id === "string" ? t.id : t.id,
    ...t,
    img: t.image || t.img || "/placeholder.png",
    price:
      typeof t.price === "number"
        ? t.price.toLocaleString("vi-VN") + " VND"
        : t.price || "",
    location: t.destination || t.location || "",
    details: t.details || t.description || "",
  }));
}
