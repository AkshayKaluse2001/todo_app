"use client";

import { useEffect, useState } from "react";
import CommentCard from "@/app/_components/CommentCard";

export default function CommentsPage() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((data) => setComments(data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Comments</h2>
      <div className="space-y-4">
        {comments.length <= 0 && <p>Loading Comments...</p>}
        {comments.map((comment: { id: number; name: string; body: string }) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
