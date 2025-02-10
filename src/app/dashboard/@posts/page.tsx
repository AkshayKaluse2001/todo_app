"use client";

import PostCard from "@/app/_components/PostCard";
import { useEffect, useState } from "react";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Posts</h2>
      <div className="space-y-4">
        {posts.length <= 0 && <p>Loading posts...</p>}

        {posts.map((post: { id: number; title: string; body: string }) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
