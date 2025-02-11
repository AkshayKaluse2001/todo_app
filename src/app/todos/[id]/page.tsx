import TodoDetails from "@/app/_components/TodoDetails";
import { notFound } from "next/navigation";

interface TodoPageProps {
  params: { id: string };
}

// Server-side function to fetch todo data
async function getTodo(id: string) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );

    if (!response.ok) return null; // If not found, return null

    return response.json();
  } catch (error) {
    console.error("Error fetching todo:", error);
    return null;
  }
}

export default async function Page({ params }: TodoPageProps) {
  const todo = await getTodo(params.id);

  if (!todo) {
    return notFound(); // Show Next.js 404 page if todo not found
  }

  return (
    <div>
      <TodoDetails todo={todo} />
    </div>
  );
}
