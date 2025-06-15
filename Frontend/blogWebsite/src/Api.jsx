import axios from "axios";
import { toast } from "react-toastify";

const Api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://blog-website-de4g-habibas-projects-2c481812.vercel.app/",
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
export const userRegister = (data) => Api.post("/users/register", data);
export const login = (data) => Api.post("/users/login", data);
export const logout = () => Api.get("/users/logout");
export const getProfile = () => Api.get("/users/user-profile");

// posts
export const getPosts = (page) => Api.get(`/posts?page=${page}`);
export const getPost = (id) => Api.get(`/posts/${id}`);
export const createPost = (data) => Api.post("/posts", data);
export const updatePost = (id, data) => Api.put(`/posts/${id}`, data);
export const deletePost = (id) => Api.delete(`/posts/${id}`);
export const getPostsByCategory = (category,page) =>
  Api.get(`/posts/category/${category}?page=${page}`);
export const getLatestPosts = () => Api.get("/posts/latest");
