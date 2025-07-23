import { CardList, SearchBar } from "@/components";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";

  const res = await fetch(
    `${process.env.APP_BASE_URL}/api/search?q=${encodeURIComponent(query)}`,
    {
      cache: "no-store",
    }
  );

  const pins = await res.json();
  return (
    <div className="p-2">
      <SearchBar />
      <div className="pt-20 grid grid-cols-[repeat(auto-fill,_minmax(calc(16px+16.2rem),_1fr))] gap-x-4">
        <CardList pins={pins} />
      </div>
    </div>
  );
}
