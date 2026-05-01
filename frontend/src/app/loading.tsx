export default function Loading() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="animate-pulse space-y-4">
        <div className="h-10 w-64 rounded-xl bg-slate-200" />
        <div className="h-40 rounded-[2rem] bg-slate-200" />
        <div className="h-24 rounded-[2rem] bg-slate-200" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="h-48 rounded-[2rem] bg-slate-200" />
          <div className="h-48 rounded-[2rem] bg-slate-200" />
          <div className="h-48 rounded-[2rem] bg-slate-200" />
        </div>
      </div>
    </main>
  );
}
