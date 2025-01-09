"use client"

import TodoEditButton from "./TodoEditButton";

export default function TodoActions({ todoId }: { todoId?: string }) {
  return (
    <div className="flex items-center gap-4">
      {todoId && <TodoEditButton todoId={todoId} />}
    </div>
  );
};
