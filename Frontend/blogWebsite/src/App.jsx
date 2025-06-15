import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Protected from "./pages/Protected";
import Navbar from "./components/Navbar";
import "./App.css";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import Footer from "./components/Footer";
import CategoryPosts from "./pages/CategoryPosts";
import EditPost from "./pages/EditPost";
import Header from "./components/Header";
export default function App() {
  const categories = [
    "Programming",
    "Lifestyle",
    "Beauty",
    "Fashion",
    "Art & Design",
    "Travel",
  ];
  const location = useLocation();

  const hideNavbarAndFooterPaths = ["/login", "/register"];
  const showNavbarAndFooter = !hideNavbarAndFooterPaths.includes(
    location.pathname
  );

  return (
    <>
      {showNavbarAndFooter && (
        <> 
        <Navbar categories={categories} />
        <Header/>
        </>
        )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/category/:category" element={<CategoryPosts />} />
        <Route element={<Protected />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/edit-post/:id" element={<EditPost/>}/>
        </Route>
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
      {showNavbarAndFooter && <Footer />}
    </>
  );
}
