import { TodoStatusesProps } from '@/constants';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export type TodoFormProps = {
  title: string;
  description: string;
  status: TodoStatusesProps;
};


interface TodoFormSliceProps {
  formModal: boolean;
  formValues: TodoFormProps | null
};

const initialState: TodoFormSliceProps = {
  formModal: false,
  formValues: null
};

export const loadTodos = createAsyncThunk("todoForm/loadTodos", async () => {
  const storedTodos = localStorage.getItem("todos");
  return storedTodos ? JSON.parse(storedTodos) : [];
});

export const todoFormSlice = createSlice({
  name: "todoForm",
  initialState,
  reducers: {
    openModal: (state) => {
      state.formModal = true;
    },
    closeModal: (state) => {
      state.formModal = false;
    },
    setFormValues: (state, action) => {
      state.formValues = action.payload;
    },
  },
}); 

export const { openModal, closeModal } = todoFormSlice.actions;

export default todoFormSlice.reducer