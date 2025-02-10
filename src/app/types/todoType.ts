export interface User {
  uid?: string;
  email?: string | null;
}

export interface TitleProps {
  text: string;
}

export interface TodoDetailsProps {
  todo: Todo1 | null;
}

export interface TodosProps {
  todos: Todo1[];
}

export type Todo = {
  id?: string;
  title: string;
  description: string;
  dueDate: string;
};

export type Todo1 = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export interface Todos {
  todos: Todo1[];
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface TodoState {
  id?: number;
  todo: Todo | null;
  todos: Todo[];
  loading: boolean;
  error: string | null;
}
