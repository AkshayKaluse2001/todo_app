"use client";

import BackdropLoader from "@/app/_components/backdrop/Backdrop";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { use } from "react"; // Import use() to unwrap params

export default function TodoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;

  const [todo, setTodo] = useState<{
    id: number;
    title: string;
    completed: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const closeModal = () => {
    router.back();
  };

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await fetch(
          ` https://jsonplaceholder.typicode.com/todos/${id}`
        );
        const data = await response.json();
        setTodo(data);
      } catch (error) {
        console.error("Error fetching the todo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  if (loading) {
    return <BackdropLoader />;
  }

  if (!todo) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p>Todo not found.</p>
          <button
            onClick={closeModal}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <div className="bg-white shadow-md rounded p-4">
          <p>
            <strong>ID:</strong> {todo.id}
          </p>
          <p>
            <strong>Title:</strong> {todo.title}
          </p>
          <p>
            <strong>Completed:</strong> {todo.completed ? "✅ Yes" : "❌ No"}
          </p>
        </div>
        <button
          onClick={closeModal}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
