"use client";

import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/TodoSlice";
import todoFormReducer from "./slices/TodoFormSlice";

const getTodosFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("todos") || "[]");
  }
  return [];
};

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    todoForm: todoFormReducer,
  },
  preloadedState: {
    todo: {
      activeTodoId: null,
      todos: getTodosFromLocalStorage(),
    },
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
