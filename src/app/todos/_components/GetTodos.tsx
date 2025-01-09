"use client"

import TodoActions from "./TodoActions";
import { useSearchParams } from "next/navigation";
import { getPaginatiedData } from "@/lib/paginatiedData";
import clsx from 'clsx';
import { TodoStatuses } from "@/constants";
import Pagination from "@/components/common/Pagination";
import { TodoP } from "./TodoForm";

export default function GetTodos({ todos }: { todos?: TodoP[] }) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const perPage = searchParams.get("perPage") || "5";
  const paginatedData = getPaginatiedData({ data: todos, page, perPage });
  return (
    <div>
      <div className="space-y-4 min-h-[400px] pt-5">
        {paginatedData?.map(({ id, title, description, status }) => (
          <div
            key={id}
            className={clsx("py-3 pl-2 grid grid-cols-4 gap-4 border-l-2", {
              "border-green-500": status === TodoStatuses.ACTIVE,
              "border-red-500": status === TodoStatuses.DELETED,
              "border-gray-300": status === TodoStatuses.DONE,
              "border-orange-500": status === TodoStatuses.HOLD,
            })}
          >
            <div className="flex font-semibold text-sm items-start justify-start">
              <p>{title}</p>
            </div>
            <div className="flex text-sm items-center font-medium justify-start">
              <p>{description}</p>
            </div>
            <div className="flex items-center justify-center">
              <p
                className={clsx(
                  "shadow border py-1.5 min-w-20 text-center rounded-lg px-3 text-sm font-bold",
                  {
                    "bg-green-100 shadow-green-400 text-green-500 ":
                      status === TodoStatuses.ACTIVE,
                    "bg-red-100 shadow-red-400 text-red-500 ":
                      status === TodoStatuses.DELETED,
                    "bg-gray-100 shadow-gray-400 text-gray-500 ":
                      status === TodoStatuses.DONE,
                    "bg-orange-100 shadow-orange-400 text-orange-500 ":
                      status === TodoStatuses.HOLD,
                  }
                )}
              >
                {status}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <TodoActions todoId={id + ""} />
            </div>
          </div>
        ))}
      </div>
      <Pagination
        page={page}
        perPage={perPage}
        totalCount={todos?.length || 0}
      />
    </div>
  );
}
