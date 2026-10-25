/** Quiet placeholder with page proportions, shown only while a client navigation streams in. */
export function PageFallback() {
  return (
    <div aria-hidden="true" className="container-page pt-12 pb-20 md:pb-28">
      <div className="border-t pt-10">
        <div className="h-3 w-24 bg-muted" />
        <div className="mt-6 h-14 w-2/3 max-w-xl bg-muted" />
      </div>
      <div className="mt-16 aspect-3/2 w-full bg-muted" />
    </div>
  );
}
