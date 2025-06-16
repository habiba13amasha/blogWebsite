import axios from "axios";
import { toast } from "react-toastify";

const Api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://blog-website-de4g-habibas-projects-2c481812.vercel.app",
  withCredentials: true,
});


Api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

Api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error("You must login first");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ========== APIs ========== //

// users
export const userRegister = (data) => Api.post("/api/users/register", data);
export const login = (data) => Api.post("/api/users/login", data);
export const logout = () => Api.get("/api/users/logout");
export const getProfile = () => Api.get("/api/users/user-profile");

// posts
export const getPosts = (page) => Api.get(`/api/posts?page=${page}`);
export const getPost = (id) => Api.get(`/api/posts/${id}`);
export const createPost = (data) => Api.post("/api/posts", data);
export const updatePost = (id, data) => Api.put(`/api/posts/${id}`, data);
export const deletePost = (id) => Api.delete(`/api/posts/${id}`);
export const getPostsByCategory = (category,page) =>
  Api.get(`/api/posts/category/${category}?page=${page}`);
export const getLatestPosts = () => Api.get("/api/posts/latest");
