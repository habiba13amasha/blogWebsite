import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../formatDate";

export default function PostsSidebar({ post }) {
  return (
    <Link 
      to={`/post/${post._id}`}
      className="block group hover:bg-gradient-to-r hover:from-orange-50 hover:to-blue-50 rounded-xl transition-all duration-300 p-4 border border-transparent hover:border-orange-100 hover:shadow-md"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 relative overflow-hidden rounded-lg">
          <img
            src={post.image}
            alt={post.title}
            className="w-20 h-16 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
            {post.title}
          </h3>
          
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {post.author?.userName?.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium">{post.author?.userName}</span>
            </div>
            <span>•</span>
            <time dateTime={post.createdAt}>
              {formatDate(post.createdAt)}
            </time>
          </div>
          
          <div className="mt-2 flex items-center text-xs text-gray-400">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {Math.ceil(post.content.length / 200)} min read
          </div>
        </div>
      </div>
    </Link>
  );
}