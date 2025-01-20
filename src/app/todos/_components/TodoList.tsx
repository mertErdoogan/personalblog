
import { getSearchTodos } from "../actions";
import GetTodos from "./GetTodos";

  export default async function TodoList({
    queryStr,
    status,
  }: {
    queryStr?: string;
    status: string[];
  }) {
    const todos = await getSearchTodos({
      queryStr,
      statuses: status,
    });
    return (
      <div className="pb-8">
        {todos?.data && todos?.data.length > 0 ? (
          <GetTodos todos={todos?.data} />
        ) : (
          <p className="py-12 text-center text-2xl font-bold">- No Todo -</p>
        )}
      </div>
    );
  }
