import React, { memo } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../formatDate";

function PostCard({ post }) {
  const categoryColors = {
    Programming: "from-blue-500 to-blue-600",
    Lifestyle: "from-green-500 to-green-600",
    Beauty: "from-pink-500 to-pink-600",
    Fashion: "from-purple-500 to-purple-600",
    "Art & Design": "from-yellow-500 to-yellow-600",
    Travel: "from-indigo-500 to-indigo-600",
  };

  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 card-hover animate-fade-in-up">
      <div className="relative overflow-hidden">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${categoryColors[post.category] || 'from-gray-500 to-gray-600'} shadow-lg`}>
            {post.category}
          </span>
        </div>

        {/* Reading Time Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white bg-black/30 backdrop-blur-sm">
            {Math.ceil(post.content.length / 200)} min read
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
            {post.title}
          </h3>
          <p className="text-gray-600 line-clamp-3 leading-relaxed">
            {post.content}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {post.author?.userName?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {post.author?.userName}
              </p>
              <time className="text-xs text-gray-500" dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </div>
          </div>

          <Link
            to={`/post/${post._id}`}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white text-sm font-semibold rounded-full hover:from-orange-500 hover:to-orange-700 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
            aria-label={`Read more about ${post.title}`}
          >
            Read More
            <svg
              className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default memo(PostCard);