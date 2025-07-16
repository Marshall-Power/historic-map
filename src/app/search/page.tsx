export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
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
    <div>
      <h1>Results for “{query}”</h1>
      {pins.map((pin: any) => (
        <div key={pin._id}>
          <h2>
            {pin.street} ({pin.yearTaken})
          </h2>
          <p></p>
          <img src={pin.imageUrl} alt={pin.title} />
        </div>
      ))}
    </div>
  );
}
