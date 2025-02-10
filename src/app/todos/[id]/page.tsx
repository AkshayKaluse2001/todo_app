import TodoDetails from "@/app/_components/TodoDetails";
import { notFound } from "next/navigation";
import React from "react";

interface TodoPageProps {
  params: { id: string };
}

export default async function Page({ params }: TodoPageProps) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${params.id}`
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    return (
      <div>
        <TodoDetails todo={data} />
      </div>
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return notFound();
    }
  }
}
