"use client";

import { BsPencilSquare } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import BackdropLoader from "./_components/backdrop/Backdrop";
import { useEffect, useState } from "react";
import { createTodo } from "./validations/createTodo";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "./store/index.slice";
import {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "./store/slices/todos.slice";
import { getCurrentUser } from "./store/slices/auth.slice";
import Cookies from "js-cookie";
import { Todo } from "./types/todoType";

export default function Home() {
  const dispatch = useAppDispatch();
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);
  const { todos, loading } = useAppSelector((state) => state.todo);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      dueDate: "",
    },
    validationSchema: createTodo,
    onSubmit: (values, { resetForm }) => {
      if (todoToEdit) {
        dispatch(updateTodo({ id: todoToEdit.id, ...values }));
        setTodoToEdit(null);
      } else {
        dispatch(addTodo(values));
      }
      resetForm();
    },
  });

  const handleEditTodo = (todo: Todo) => {
    setTodoToEdit(todo);
    formik.setValues({
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate,
    });
  };

  useEffect(() => {
    dispatch(getTodos());
    const storedUser = JSON.parse(Cookies.get("user") || "null");
    if (storedUser) {
      dispatch(getCurrentUser(storedUser));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      {loading && <BackdropLoader />}
      <div className="text-center mb-5">
        <p className="text-gray-600  ">Organize your tasks efficiently</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {todoToEdit ? "Update Todo" : "Create a Todo"}
          </h2>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="title"
                className="block text-gray-700 font-medium mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                {...formik.getFieldProps("title")}
                placeholder="Enter task title"
                className={`p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  formik.touched.title && formik.errors.title
                    ? "border-red-500"
                    : ""
                }`}
              />
              {formik.touched.title && formik.errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.title}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                {...formik.getFieldProps("description")}
                placeholder="Enter task details"
                className={`p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  formik.touched.description && formik.errors.description
                    ? "border-red-500"
                    : ""
                }`}
                rows={4}
              ></textarea>
              {formik.touched.description && formik.errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.description}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="dueDate"
                className="block text-gray-700 font-medium mb-2"
              >
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                {...formik.getFieldProps("dueDate")}
                className={`p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  formik.touched.dueDate && formik.errors.dueDate
                    ? "border-red-500"
                    : ""
                }`}
              />
              {formik.touched.dueDate && formik.errors.dueDate && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.dueDate}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              {todoToEdit ? "Update Todo" : "Create Todo"}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Your Todos
          </h2>
          {todos?.length > 0 ? (
            todos.map((todo: Todo) => (
              <div className="border p-4 rounded-md shadow-md" key={todo.id}>
                <h3 className="text-lg font-semibold text-gray-900 break-words">
                  {todo.title}
                </h3>
                <p className="text-sm text-gray-500">
                  Due Date: {todo.dueDate}
                </p>
                <p className="text-gray-700 multiline break-words">
                  {todo.description}
                </p>
                <div className="flex justify-end">
                  <div className="mt-3 space-x-4">
                    <button
                      type="button"
                      className="text-l bg-yellow-500 p-2 text-white rounded-md"
                      onClick={() => handleEditTodo(todo)}
                    >
                      <BsPencilSquare />
                    </button>
                    <button
                      type="button"
                      className="text-l bg-red-500 p-2 text-white rounded-md"
                      onClick={() =>
                        todo.id && dispatch(deleteTodo(String(todo.id)))
                      }
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No todos found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
