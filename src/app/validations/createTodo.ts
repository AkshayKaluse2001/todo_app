import * as Yup from "yup";

export const createTodo = Yup.object().shape({
  title: Yup.string()
    .required("Title is required.")
    .max(50, "Title must be at most 50 characters long."),

  description: Yup.string()
    .required("Description is required.")
    .max(500, "Description must be at most 500 characters long."),

  dueDate: Yup.date()
    .required("Due date is required.")
    .min(new Date(), "Due date must be today or in the future."),
});
