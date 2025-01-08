import TodoPage from "./_components";

export const revalidate = 1;

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    status?: string[]
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const status = searchParams?.status || '';
  return (
    <div className="container py-20">
      <div className="py-5">
        <TodoPage queryStr={query} status={status} />
      </div>
    </div>
  );
}
