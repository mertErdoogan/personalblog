
import { getSearchTodos } from "../actions";
import GetTodos from "./GetTodos";


  export default async function TodoList({
    queryStr,
    status
  }: {
    queryStr?: string;
    status: string[];
  }) {
    const todos = await getSearchTodos({
      queryStr,
      statuses: status
    });

    return (
      <div className="pb-8">
        <GetTodos todos={todos?.data || []} />
      </div>
    );
  }
