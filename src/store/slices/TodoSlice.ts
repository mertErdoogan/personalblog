import { TodoProps } from "@/constants"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

type TodoSliceProps = {
  todos: TodoProps[];
  activeTodoId: string | null;
};

const initialState: TodoSliceProps = {
  todos: [],
  activeTodoId: null
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(
        (todo) => todo.id + "" !== action.payload
      );
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    addTodo: (state, action: PayloadAction<TodoProps>) => {
      state.todos.push({ ...action.payload, id: uuidv4() });
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    updateTodo: (state, action: PayloadAction<TodoProps>) => {
      const newTodos = state.todos.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.todos = newTodos;
      localStorage.setItem("todos", JSON.stringify(newTodos));
    },
    setActiveTodo: (state, action: PayloadAction<string | null>) => {
      state.activeTodoId = action.payload;
    },
  },
});

export const { setActiveTodo, addTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer