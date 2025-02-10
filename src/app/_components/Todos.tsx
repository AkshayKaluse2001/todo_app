import Title from "./Title";
import Table from "./Table";
import { TodosProps } from "@/app/types/todoType";

const Todos: React.FC<TodosProps> = ({ todos }) => {
  return (
    <div className="p-6">
      <Title text="Todos List" />
      {todos?.length > 0 ? (
        <Table todos={todos} />
      ) : (
        <p className="text-center text-gray-500">No todos available.</p>
      )}
    </div>
  );
};

export default Todos;
