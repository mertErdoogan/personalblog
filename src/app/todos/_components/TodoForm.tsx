"use client";

import { TodoStatuses, TodoStatusesProps } from "@/constants";
import TodoFormButton from "./TodoFormButton";
import { createOrUpdateTodo } from "../actions";

export type TodoP = {
  id?: string;
  title: string;
  description: string;
  status: TodoStatusesProps;
  created_at?: string;
};

export type TodoFormProps = {
  title: string;
  description: string;
  status: TodoStatusesProps;
};

export default function TodoForm({
  formValues,
  closeFormModal,
  setEmptyActiveTodo,
}: {
  formValues?: TodoP;
  closeFormModal: () => void;
  setEmptyActiveTodo: () => void;
}) {
  return (
    <>
      <form
        className="space-y-4"
        action={async (e) => {
          await createOrUpdateTodo(e);
          closeFormModal();
          setEmptyActiveTodo();
        }}
      >
        {formValues && (
          <input type="hidden" name="id" defaultValue={formValues?.id} />
        )}
        <div className="w-full">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            defaultValue={formValues?.title}
            required={true}
            className="block w-full border py-3 px-4"
            type="text"
          />
        </div>
        <div className="w-full">
          <label htmlFor="description">Description</label>
          <input
            name="description"
            defaultValue={formValues?.description}
            id="description"
            className="block w-full border py-3 px-4"
            type="text"
          />
        </div>
        <div className="w-full">
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            defaultValue={formValues?.status || TodoStatuses.ACTIVE}
            className="block border w-full py-3 px-4"
          >
            {Object.values(TodoStatuses).map((todo, index) => (
              <option key={index}>{todo}</option>
            ))}
          </select>
        </div>
        <TodoFormButton />
      </form>
    </>
  );
}
