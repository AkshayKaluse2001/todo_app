import { ReactNode } from "react";

export default function DashboardLayout({
  posts,
  comments,
}: {
  posts: ReactNode;
  comments: ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-3">
      <div className="md:w-1/2 rounded">{posts}</div>
      <div className="md:w-1/2 rounded">{comments}</div>
    </div>
  );
}
