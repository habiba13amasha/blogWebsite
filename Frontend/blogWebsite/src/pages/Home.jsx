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
        setIsLoading(true);
        const { data } = await getLatestPosts();
        setLatestPosts(data.posts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
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
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16" style={{backgroundColor:"#FDFDFD"}}>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post._id} post={post} />)
          ) : (
            <div className="col-span-full text-center py-10">
              <p  style={{color:"#1F2937"}}>No posts found yet!</p>
            </div>
          )}
        </div>
       <aside className="lg:w-80 bg-white p-6 rounded-xl shadow-md sticky top-6 h-fit">
          <h3 className="text-xl font-bold mb-4 border-b pb-2" style={{color:"#1F2937"}}>
            Latest Posts
          </h3>
          <div className="space-y-4">
            {latestPosts.map((post) => (
              <PostsSidebar key={post._id} post={post} />
            ))}
          </div>
        </aside>  
      </div>
{totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="join">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="join-item btn"
              >
                previous
              </button>
              <button className="join-item btn pointer-events-none">
                page {currentPage} - {totalPages}
              </button>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="join-item btn"
              >
                next
              </button>
            </div>
          </div>
        )}
      <button
        onClick={handleAdd}
        className="fixed bottom-6 right-6  bg-orange-400 hover:bg-orange-700 text-white rounded-full p-4 shadow-lg cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-5 h-5"
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
