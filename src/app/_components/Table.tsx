"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Todo1, Todos } from "../types/todoType";

const Table = ({ todos }: Todos) => {
  const router = useRouter();

  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="px-4 py-2 border">ID</th>
          <th className="px-4 py-2 border">Title</th>
          <th className="px-4 py-2 border">Completed</th>
          <th className="px-4 py-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos?.map((todo: Todo1) => (
          <tr
            key={todo.id}
            onClick={() => {
              router.push(`/todos/./${todo.id}`);
            }}
            className="cursor-pointer"
          >
            <td className="px-4 py-2 border text-center">{todo.id}</td>
            <td className="px-4 py-2 border">{todo.title}</td>
            <td className="px-4 py-2 border text-center">
              {todo.completed ? "✅" : "❌"}
            </td>
            <td className="px-4 py-2 border text-center">Click Me</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
