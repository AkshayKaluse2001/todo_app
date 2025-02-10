import BackdropLoader from "@/app/_components/backdrop/Backdrop";
import React from "react";
import { TodoDetailsProps } from "@/app/types/todoType";

const TodoDetails: React.FC<TodoDetailsProps> = ({ todo }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Todo Details</h1>
      {todo ? (
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
      ) : (
        <BackdropLoader />
      )}
    </div>
  );
};

export default TodoDetails;
