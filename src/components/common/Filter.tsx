"use client"

import { TodoStatuses } from "@/constants";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";

export default function Filter() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleChangeStatusFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);
    const selectedStatuses = params.getAll("status");

    if (selectedStatuses.includes(value)) {
      const selectedValues = params.getAll("status");
      params.delete("status");
      selectedValues
        .filter((item) => item !== value)
        .map((i) => {
          params.append("status", i);
        });
    } else {
      params.append("status", value);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={clsx(
          "border p-1 border-blue-600 bg-white z-30 hover:border-blue-500 rounded-t-lg",
          {
            "border-b-0": open,
          }
        )}
      >
        <AdjustmentsHorizontalIcon className="w-5 h-5 text-blue-600" />
      </button>
      {open && (
        <div className="absolute border-blue-600 min-w-56 px-6 py-4 block border bg-white shadow top-[97%] right-0 z-10">
          <div className="space-y-4">
            <h2 className="text-lg text-blue-600 font-semibold">Todo Status</h2>
            <div className="gap-6 grid grid-cols-2">
              {Object.values(TodoStatuses).map((i, index) => (
                <div
                  key={`${i}-${index}`}
                  className="flex items-center gap-1.5"
                >
                  <input
                    onChange={(e) => handleChangeStatusFilter(e?.target?.value)}
                    id={i}
                    defaultChecked={searchParams.getAll("status")?.includes(i)}
                    type="checkbox"
                    value={i}
                    className="w-4 h-4"
                  />
                  <label className="font-medium text-gray-500" htmlFor={i}>
                    {i}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
