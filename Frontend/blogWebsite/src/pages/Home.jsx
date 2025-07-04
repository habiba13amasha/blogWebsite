import React, { useEffect, useState } from "react";
import { getLatestPosts, getPosts, getProfile } from "../Api";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";
import PostsSidebar from "../components/PostsSidebar";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await getPosts(currentPage);
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const { data } = await getLatestPosts();
        setLatestPosts(data.posts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLatestData();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getProfile();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleAdd = () => {
    navigate(user ? "/create-post" : "/login");
  };

  if (isLoading && currentPage === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-blue-50">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-20">
      {/* Hero Stats Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Our <span className="gradient-text">Latest Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover insights, tutorials, and inspiration from our community of creators
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{posts.length}+</h3>
              <p className="text-gray-600">Articles Published</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">1K+</h3>
              <p className="text-gray-600">Active Readers</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">6</h3>
              <p className="text-gray-600">Categories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom py-16">
        <div className="flex flex-col xl:flex-row gap-12">
          {/* Posts Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <div key={post._id} style={{ animationDelay: `${index * 100}ms` }}>
                    <PostCard post={post} />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No posts yet!</h3>
                  <p className="text-gray-600 mb-6">Be the first to share your story with our community.</p>
                  <button
                    onClick={handleAdd}
                    className="btn-primary px-8 py-3 rounded-full font-semibold"
                  >
                    Create First Post
                  </button>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-16">
                <div className="flex items-center space-x-2 bg-white rounded-2xl shadow-lg p-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      currentPage === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                    }`}
                  >
                    Previous
                  </button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-xl font-medium transition-all duration-300 ${
                            currentPage === page
                              ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg'
                              : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      currentPage === totalPages
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </main>

          {/* Sidebar */}
          <aside className="xl:w-96 animate-slide-in-right">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Latest Posts</h3>
              </div>
              
              <div className="space-y-1">
                {latestPosts.length > 0 ? (
                  latestPosts.map((post) => (
                    <PostsSidebar key={post._id} post={post} />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm">No recent posts</p>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={handleAdd}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 z-40 group"
        aria-label="Create new post"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-8 h-8 mx-auto transition-transform duration-300 group-hover:rotate-90"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  );
}