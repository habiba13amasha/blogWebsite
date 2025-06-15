import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../formatDate";

export default function PostsSidebar({ post }) {
  return (
    <Link 
      to={`/post/${post._id}`}
      className="block group hover:bg-gray-50 rounded-lg transition p-3"
    >
      <div className="flex items-start space-x-3">
        <img
          src={post.image }
          alt={post.title}
          className="flex-shrink-0 w-16 h-16 rounded-lg object-cover"
          
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium  truncate " style={{color:"#1F2937"}}>
            {post.title}
          </h3>
          <p className="text-xs  mt-1" style={{color:"#1F2937"}}>
            Written By {post.author?.userName }
          </p>
          <time 
            className="text-xs text-gray-400"
            dateTime={post.createdAt}
          >
            {formatDate(post.createdAt)}
          </time>
        </div>
      </div>
    </Link>
  );
}