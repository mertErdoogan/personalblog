"use client";
import { openModal } from "@/store/slices/TodoFormSlice";
import { setActiveTodo } from "@/store/slices/TodoSlice";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";

export default function AddTodoButton() {
  const dispatch = useDispatch();
  const openFormModal = () => {
    dispatch(setActiveTodo(null));
    dispatch(openModal());
  };

  return (
    <button
      onClick={openFormModal}
      className="w-10 h-10 shadow flex rounded-full items-center justify-center bg-black"
    >
      <PlusIcon className="w-5 h-5 text-white" />
    </button>
  );
}
