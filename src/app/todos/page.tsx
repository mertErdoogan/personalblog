import { getServerSession } from "next-auth";
import TodoPage from "./_components";
import { redirect } from "next/navigation";

export const revalidate = 1;

export default async function Todos(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    status?: string[]
  }>;
}) {
  const session = await getServerSession();
  if(!session || !session.user) {
    redirect("/api/auth/signin");
  } 
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const status = searchParams?.status || "";

  if(!session) return <>You must be logged in to see this page</> 

  return (
    <div className="container py-20">
      <div className="py-5">
        <TodoPage queryStr={query} status={status} />
      </div>
    </div>
  );
}
