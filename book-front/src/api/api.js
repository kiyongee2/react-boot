import axios from "axios";

const api = axios.create({
  // 백엔드 API 기본 URL(springboot 서버 주소)
  //baseURL: "http://localhost:8080/api",   //development
  baseURL: "/api",  //production(운영)
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export default api;
