import React, { memo } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../formatDate";

function PostCard({ post }) {
  const categoryColors = {
  Programming: "bg-blue-100 text-blue-800",
  Lifestyle: "bg-green-100 text-green-800",
  Beauty: "bg-pink-100 text-pink-800",
  Fashion: "bg-purple-100 text-purple-800",
  "Art & Design": "bg-yellow-100 text-yellow-800",
  Travel: "bg-indigo-100 text-indigo-800",
};
  return (
    <article className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white h-full flex flex-col">
      <div className="relative pt-[56.25%] overflow-hidden">
        <img
          src={post.image }
          alt={post.title}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
          
        />
        <span style={{ backgroundColor: "#38BDF8" }} className={`text-white font-bold absolute bottom-0 right-0 text-xs px-2 py-1 rounded-3xl ${
        categoryColors[post.category] 
      }`}>
        {post.category}
      </span>
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2 line-clamp-2" style={{color:"#1F2937"}}>
          {post.title}
        </h3>
        <p className=" mb-4 line-clamp-3 flex-grow" style={{color:"#1F2937"}}>
          {post.content}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="text-sm ">
            <span style={{color:"#1F2937"}}>Written By </span>
            <span className="font-medium " style={{color:"#1F2937"}}>
              {post.author?.userName }
            </span>
          </div>
          
          <Link
            to={`/post/${post._id}`}
            style={{ backgroundColor: "#F59E0B" }}
            className="inline-flex items-center px-3 py-1.5  text-white text-sm font-medium rounded-md "
            aria-label={`Read more about ${post.title}`}
          >
            Read
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <time 
          className="mt-2 text-xs text-gray-400 block"
          dateTime={post.createdAt}
        >
          {formatDate(post.createdAt)}
        </time>
      </div>
    </article>
  );
}

export default memo(PostCard);