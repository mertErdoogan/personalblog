"use client"

import { signIn } from "next-auth/react";

export default function GithubButton() {
  return (
    <>
      <button
        onClick={() => signIn("github", { callbackUrl: "/todos" })}
        className="border px-4 py-1 rounded-lg bg-black text-white font-bold"
      >
        Github
      </button>
    </>
  );
};
