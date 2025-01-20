import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession();
  if(session) return (
    <>
      <div className="container w-full text-center pt-24 space-y-12">
        <p className="text-3xl font-bold italic text-blue-500">
          Welcome, <span className="underline">{session?.user?.name}</span>
        </p>
        <Link
          href={"/todos"}
          className="inline-block border px-3 py-1.5 text-blue-500 font-semibold text-xl border-blue-500 hover:bg-blue-500 hover:text-white hover:shadow hover:shadow-blue-500 transition-all"
        >
          Todos
        </Link>
      </div>
    </>
  ); 
  return (
    <div className="container w-full text-center pt-24 space-y-12">
      <p className="text-3xl font-bold italic text-blue-500">
        Welcome, please signin before continue.
      </p>
      <Link href={'/api/auth/signin'} className="inline-block border px-3 py-1.5 text-blue-500 font-semibold text-xl border-blue-500 hover:bg-blue-500 hover:text-white hover:shadow hover:shadow-blue-500 transition-all">
        Sign In
      </Link>
    </div>
  );
};
