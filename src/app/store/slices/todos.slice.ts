import { db } from "@/app/firebase";
import { Todo, TodoState } from "@/app/types/todoType";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const initialState: TodoState = {
  todo: null,
  todos: [],
  loading: false,
  error: null,
};

// Get Todos
export const getTodos = createAsyncThunk<Todo[], void, { rejectValue: string }>(
  "todo/getTodos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/todos");
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Add a Todo
export const addTodo = createAsyncThunk<Todo, Todo, { rejectValue: string }>(
  "todo/addTodo",
  async (todo, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, "todos"), todo);
      return { id: docRef.id, ...todo };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Delete Todo
export const deleteTodo = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("todo/deleteTodo", async (id, { rejectWithValue }) => {
  try {
    await deleteDoc(doc(db, "todos", id));
    return id;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

// Update Todo
export const updateTodo = createAsyncThunk<Todo, Todo, { rejectValue: string }>(
  "todo/updateTodo",
  async (updatedTodo, { rejectWithValue }) => {
    try {
      await updateDoc(doc(db, "todos", updatedTodo.id as string), {
        title: updatedTodo.title,
        description: updatedTodo.description,
        dueDate: updatedTodo.dueDate,
      });
      return updatedTodo;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get todos
      .addCase(getTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getTodos.fulfilled,
        (state, { payload }: PayloadAction<Todo[]>) => {
          state.loading = false;
          state.todos = payload;
        }
      )
      .addCase(
        getTodos.rejected,
        (state, { payload }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = payload ?? "Failed to fetch todos";
          toast.error(`Error fetching todos: ${state.error}`);
        }
      )

      // Add todo
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, { payload }: PayloadAction<Todo>) => {
        state.loading = false;
        state.todos.push(payload);
        toast.success("Todo added successfully!");
      })
      .addCase(
        addTodo.rejected,
        (state, { payload }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = payload ?? "Failed to add todo";
          toast.error(`Error adding todo: ${state.error}`);
        }
      )

      // Delete todo
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteTodo.fulfilled,
        (state, { payload }: PayloadAction<string>) => {
          state.loading = false;
          state.todos = state.todos.filter((todo) => todo.id !== payload);
          toast.success("Todo deleted successfully!");
        }
      )
      .addCase(
        deleteTodo.rejected,
        (state, { payload }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = payload ?? "Failed to delete todo";
          toast.error(`Error deleting todo: ${state.error}`);
        }
      )

      // Update todo
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateTodo.fulfilled,
        (state, { payload }: PayloadAction<Todo>) => {
          state.loading = false;
          state.todos = state.todos.map((todo) =>
            todo.id === payload.id ? payload : todo
          );
          toast.success("Todo updated successfully!");
        }
      )
      .addCase(
        updateTodo.rejected,
        (state, { payload }: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = payload ?? "Failed to update todo";
          toast.error(`Error updating todo: ${state.error}`);
        }
      );
  },
});

export default todoSlice.reducer;
