import Link from "next/link";

export default function SnippetNotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
        Not found
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-slate-900">
        Snippet was not found
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        This snippet may have been deleted or the link is invalid.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Back to all snippets
      </Link>
    </main>
  );
}
