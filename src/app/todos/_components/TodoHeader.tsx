import Search from "@/components/common/Search";
import AddTodoButton from "./AddTodoButton";
import Filter from "@/components/common/Filter";

export default function TodoHeader() {
  return (
    <>
      <div className="flex justify-between items-center py-5 border-b">
        <h1 className="text-xl font-semibold">Todo List</h1>
        <div className="flex gap-4">
          <div className="pt-2">
            <Filter />
          </div>
          <AddTodoButton />
        </div>
      </div>
      <Search />
    </>
  );
};
