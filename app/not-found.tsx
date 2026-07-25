import Btn from "@/components/Btn";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center px-5 text-center">
      <p className="tag-index">Lost</p>
      <h1 className="display mt-4 text-5xl sm:text-6xl">
        NOT ON THIS <em className="text-green">street.</em>
      </h1>
      <p className="lede mt-5 max-w-md text-mist">
        The page you're after isn't in the collection. The residences are.
      </p>
      <div className="mt-9 flex gap-4">
        <Btn href="/">Back Home</Btn>
        <Btn href="/residences" variant="outline">
          The Residences
        </Btn>
      </div>
    </section>
  );
}
