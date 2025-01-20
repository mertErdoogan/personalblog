"use client";

import { useFormStatus } from "react-dom";

export default function TodoFormButton({create}:{create?: boolean}) {
  const { pending } = useFormStatus();
  return (
    <>
      <button className="px-4 py-3 w-full bg-black text-white" type="submit">
        {pending ? "Sending.." : create ? "Update" : "Create"}
      </button>
    </>
  );
}
