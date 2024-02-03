"use client";
import { useEffect, useState } from "react";
import { fetchPosts } from "../utils/fetchPost";

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts(0, 8);
  }, []);
  const loadPosts = (startIndex, endIndex) => {
    const newPosts = fetchPosts(startIndex, endIndex);
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
  };
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 200
    ) {
      const currentIndex = posts.length;
      loadPosts(currentIndex, currentIndex + 8);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [posts]);

  return (
    <div className="grid grid-cols-1 container gap-6">
      {posts.map((post) => (
        <div
          key={post.post_id}
          className="bg-white p-4 rounded-lg shadow-md overflow-hidden"
        >
          <img
            src={post.image_url}
            alt={`Post by ${post.username}`}
            className="w-full h-32 object-cover mb-4 rounded-md"
          />
          <p className="text-gray-600 mb-2">@{post.username}</p>
          <p className="text-gray-800 font-bold mb-2">{post.caption}</p>
          <div className="flex items-center text-gray-500">
            <span className="mr-2">{post.likes} Likes</span>
            <span>{post.comments} Comments</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
