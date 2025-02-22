"use client";

import TodoForm, { TodoP } from "@/app/todos/_components/TodoForm";
import Modal from "./Modal";
import React, { useEffect, useState } from "react";
import { RootState } from "@/store";
import { closeModal } from "@/store/slices/TodoFormSlice";
import { setActiveTodo } from "@/store/slices/TodoSlice";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "@/app/todos/actions";

export default function FormModal() {
  const [formValues, setFormValues] = useState<TodoP | null>();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const isOpen = useSelector((state: RootState) => state.todoForm.formModal);

  const activeTodoId = useSelector(
    (state: RootState) => state.todo.activeTodoId
  );

  const closeFormModal = () => {
    dispatch(closeModal());
  };

  const setEmptyActiveTodo = ()=> {
    dispatch(setActiveTodo(null));
    
  }

  const close = () => {
    closeFormModal();
    setEmptyActiveTodo();
  };

  useEffect(() => {
    if (activeTodoId) {
      const fetchTodoValues = async () => {
        setIsLoading(true);
        await getTodos(Number(activeTodoId))
          .then((res) => {
            if (res?.success) {
              const data = res?.data?.[0];
              setFormValues(data);
            } else {
              setFormValues(undefined);
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
      };
      fetchTodoValues();
    } else {
      setFormValues(null);
    }
  }, [activeTodoId]);
  if (isLoading) return <p>Loading...</p>;
  return (
    <Modal isOpen={isOpen} onClose={close}>
      <div className="px-12 py-12">
        <TodoForm
          formValues={formValues || undefined}
          closeFormModal={closeFormModal}
          setEmptyActiveTodo={setEmptyActiveTodo}
        />
      </div>
    </Modal>
  );
}
