import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPost, deletePost } from "../Api";
import { getProfile } from "../Api";
import {formatDate} from "../formatDate"
export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const { data } = await getPost(id);
        setPost(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch post");
        console.error("Error fetching post:", err);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchUserData = async () => {
      try {
        const { data } = await getProfile();
        setUser(data);
      } catch (err) {
        console.log("User not logged in or error fetching profile");
      }
    };

    fetchPost();
    fetchUserData();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id);
        navigate("/", { replace: true });
      } catch (err) {
        console.error("Error deleting post:", err);
        alert("Failed to delete post");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Post not found</div>
      </div>
    );
  }

 
  return (
    <div className="min-h-screen pb-16">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-md overflow-hidden ">
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-96 object-cover"
            />
          )}
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
              {post.category && (
              <div className="mt-4">
                <span className="px-3 py-1 bg-[#38BDF8] text-white rounded-full text-sm">
                  {post.category}
                </span>
              </div>
            )}
              
            </div>

            <div className="flex items-center text-sm text-gray-500 mb-6 justify-around">
              <span> By  {post.author.userName}</span>
              <span className="mx-2">•</span>
              <span>{formatDate(post.createdAt)}</span>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
            </div>

            {user && user._id === post.author._id && (
                <div className="flex space-x-2 items-center justify-between m-2">
                  <button
                    onClick={() => navigate(`/edit-post/${post._id}`)}
                    className="btn btn-accent "
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="btn btn-error "
                  >
                    Delete
                  </button>
                </div>
              )}
          </div>
        </article>
      </div>
    </div>
  );
}