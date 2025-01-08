import { arrayTypeParamsConverter } from "@/lib/arrayTypeParams";
import TodoHeader from "./TodoHeader";
import TodoList from "./TodoList";

export default async function TodoPage({
  queryStr,
  status,
}: {
  queryStr?: string;
  status: string | string[];
}) {
  return (
    <>
      <TodoHeader />
      <TodoList status={arrayTypeParamsConverter(status)} queryStr={queryStr} />
    </>
  );
}