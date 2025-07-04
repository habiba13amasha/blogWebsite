import React, { useEffect, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { getProfile, logout } from "../Api";
import { toast } from "react-toastify";

export default function Navbar({ categories }) {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
        : 'bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none"
                viewBox="0 0 24 24" 
                strokeWidth={2} 
                stroke="white"
                className="w-6 h-6"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25A8.966 8.966 0 0118 3.75c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" 
                />
              </svg>
            </div>
            <span className="blog-title text-2xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
              Creative Blog
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {categories?.map((category) => (
              <NavLink
                key={category}
                to={`/category/${category}`}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  }`
                }
              >
                {category}
              </NavLink>
            ))}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <div className="hidden sm:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-6 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary px-6 py-2 rounded-full text-sm font-medium"
                >
                  Get Started
                </Link>
              </div>
            ) : (
              <div className="relative group">
                <div className="flex items-center space-x-3 cursor-pointer p-2 rounded-full hover:bg-gray-50 transition-colors">
                  <div className="relative">
                    <img
                      src={user.profilePicture || "/person-avatar.avif"}
                      alt={user.userName}
                      className="h-10 w-10 rounded-full object-cover border-2 border-orange-200 shadow-md"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-semibold text-gray-800">{user.userName}</p>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                </div>

                {/* Enhanced Dropdown */}
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.profilePicture || "/person-avatar.avif"}
                        alt={user.userName}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">{user.userName}</p>
                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <Link
                      to="/create-post"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Create Post
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg
                className="h-6 w-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="container-custom py-4">
            <div className="space-y-2">
              {categories?.map((category) => (
                <Link
                  key={category}
                  to={`/category/${category}`}
                  className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
              
              {!user && (
                <div className="pt-4 border-t border-gray-100 space-y-2">
                  <Link
                    to="/login"
                    className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-3 rounded-lg bg-gradient-to-r from-orange-400 to-orange-600 text-white font-medium text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}