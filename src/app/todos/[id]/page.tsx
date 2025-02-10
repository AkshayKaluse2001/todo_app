import TodoDetails from "@/app/_components/TodoDetails";
import { TodoProps } from "@/app/types/todoType";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }: TodoProps) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${params?.id}`
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
      return notFound();
    }
  }
};

export default page;
