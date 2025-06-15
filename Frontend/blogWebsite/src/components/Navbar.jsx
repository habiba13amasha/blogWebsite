import React, { useEffect, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { getProfile, logout } from "../Api";
import { toast } from "react-toastify";

export default function Navbar({ categories }) {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getProfile();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className=" border-b border-gray-200 shadow-sm sticky top-0 z-50" style={{backgroundColor:"#FFF7ED"}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side */}
          <div className="flex items-center">
            <Link
              style={{ backgroundColor: "#F59E0B" }}
              to="/"
              className=" font-bold  text-white px-4 py-2 rounded-full shadow-md hover:shadow-sm transition-all"
            >
              BLOG
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {categories?.map((category) => (
              <NavLink
              key={category}
                to={`/category/${category}`}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-full text-md font-medium ${
                    isActive
                      ? "bg-[#F59E0B] text-white"
                      : "text-gray-200 hover:bg-orange-300 font-extrabold"
                  } transition-colors`
                }
              >
                {category}
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-[#F59E0B]  transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-[#F59E0B] shadow-sm transition-colors"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="relative group ml-3">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <img
                    src={user.profilePicture || "/person-avatar.avif" }
                    alt={user.userName}
                    className="h-8 w-8 rounded-full object-cover border-2 border-white"
                  />
                 
                </div>

                {/* Dropdown menu */}
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm  font-medium" style={{color:"#1F2937"}}>
                      {user.userName}
                    </p>
                    <p className="text-xs  truncate" style={{color:"#1F2937"}}>
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-[#EF4444] hover:bg-red-50 transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {categories?.map((category) => (
              <Link
                key={category}
                to={`/category/${category}`}
                className="block px-3 py-2 rounded-md text-base font-medium text-[#1F2937] hover:bg-[#F59E0B] "
                onClick={() => setIsMenuOpen(false)}
              >
                {category}
              </Link>
            ))}
          </div>
        
        </div>
      )}
    </nav>
  );
}
