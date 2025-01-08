"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from 'clsx'

interface PaginationP {
  page: string;
  perPage: string;
  totalCount: number;
}

export default function Pagination({ totalCount, perPage, page }: PaginationP) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const currentPage = page;
  const totalStepButton = Math.ceil(totalCount / Number(perPage));
  const buttonArray = Array.from(
    { length: totalStepButton },
    (_, index) => index + 1
  );

  const handleClickButton = (step: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", step.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const onChangePerPage = (count: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("perPage", count);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex gap-5 text-sm justify-center font-semibold pt-5">
      {buttonArray.map((i) => (
        <button
          className={clsx("", {
            "bg-gray-200 px-3 py-1 rounded-lg": Number(currentPage) === i,
          })}
          onClick={() => handleClickButton(i)}
          key={i}
        >
          {i}
        </button>
      ))}
      <select defaultValue={perPage} onChange={(e) => onChangePerPage(e?.target?.value)} className="border rounded-lg text-center w-12">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
    </div>
  );
};
