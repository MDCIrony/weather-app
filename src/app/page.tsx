import SearchBox from "@/components/client/SearchBox";

export default function Home() {
  return (
    <main className="mt-5 mx-5">
      <h1 className="text-xl font-medium mb-4">WeatherWise</h1>
      <form>
        <h2 className="text-lg mb-4">Search For local weather</h2>
        <SearchBox />
      </form>
    </main>
  );
}
