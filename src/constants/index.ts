export type TodoStatusesProps = "active" | "done" | "hold" | "deleted";
export const TodoStatuses = {
  ACTIVE: "active",
  DONE: "done",
  HOLD: "hold",
  DELETED: "deleted",
} as const;

export type TodoProps = {
    id?: string;
    title: string;
    description: string;
    status: TodoStatusesProps
}