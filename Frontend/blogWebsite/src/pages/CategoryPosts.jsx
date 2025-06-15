import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostsByCategory, getProfile } from "../Api";
import PostCard from "../components/PostCard";

export default function CategoryPosts() {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const { data } = await getPostsByCategory(category, currentPage);
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [category, currentPage]);

  const handleAdd = () => {
    navigate(user ? "/create-post" : "/login");
  };

  if (isLoading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen pb-16 container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize text-center" style={{color:"#1F2937"}}>{category} Posts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <p className="col-span-full text-center" style={{color:"#1F2937"}}>No posts found!</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <div className="join">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="join-item btn"
            >
              Previous
            </button>
            <button className="join-item btn pointer-events-none">
              Page {currentPage} 
            </button>
            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="join-item btn"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <button
        onClick={handleAdd}
        style={{backgroundColor:"#F59E0B"}}
        className="fixed bottom-6 right-6 text-white rounded-full p-4 shadow-lg cursor-pointer"
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
