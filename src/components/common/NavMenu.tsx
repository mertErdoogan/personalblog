"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from 'clsx'

export default function NavMenu() {
  const { data: session } = useSession();
  const pathname = usePathname();
 
  return (
    <div className="container flex items-center justify-between">
      <div className="flex items-center gap-4 text-sm font-bold">
        <Link
          className={clsx("hover:underline", {
            "text-blue-500 underline": pathname === "/",
          })}
          href={"/"}
        >
          Home
        </Link>
        <Link
          className={clsx("hover:underline", {
            "text-blue-500 underline": pathname === "/todos",
          })}
          href={"/todos"}
        >
          Todos
        </Link>
      </div>
      {!session || !session?.user ? (
        <div className="container flex items-center justify-end gap-5">
          <p className="font-semibold">Not signed in</p>
          <button
            className="border hover:shadow hover:shadow-blue-300 border-blue-500 text-blue-500 px-3 shadow py-1.5 underline"
            onClick={() => signIn()}
          >
            Sign in
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-end gap-5">
          <div className="flex items-center space-x-1">
            <p>Hello,</p>
            <p className="font-semibold">{session?.user?.name}</p>
          </div>
          <button
            className="border hover:shadow hover:shadow-blue-300 border-blue-500 text-blue-500 px-3 shadow py-1.5 underline"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};
