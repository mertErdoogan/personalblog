"use client"

import { openModal } from "@/store/slices/TodoFormSlice";
import { setActiveTodo } from "@/store/slices/TodoSlice";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";

export default function TodoEditButton({ todoId }: { todoId: string }) {
  const dispatch = useDispatch();

  const clickEditButton = async () => {
    dispatch(openModal());
    dispatch(setActiveTodo(todoId));
  };

  return (
    <button className="border p-1.5 rounded-lg border-black" onClick={clickEditButton}>
      <PencilIcon className="w-5 h-5 text-black" />
    </button>
  );
};
