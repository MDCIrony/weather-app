import Link from "next/link";

export default function Detail(): React.ReactElement {
  return (
    <>
      <main>
        <div className="container">
          <Link href={"/"}>&larr; Home</Link>
        </div>
      </main>
    </>
  );
}
