import Link from "next/link";

import { Snippet } from "@/features/snippets/types/snippet.types";
import {
  formatSnippetDate,
  getSnippetPreview,
} from "@/features/snippets/utils/snippet.utils";

export function SnippetCard({ snippet }: { snippet: Snippet }) {
  const preview = getSnippetPreview(snippet.content);

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-0.5">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 inline-flex rounded-full bg-teal-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-teal-700">
            {snippet.type}
          </p>
          <h2 className="text-lg font-semibold text-slate-900">
            <Link href={`/snippets/${snippet._id}`} className="hover:underline">
              {snippet.title}
            </Link>
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Published: {formatSnippetDate(snippet.updatedAt)}
        </p>
      </div>

      <div className="text-sm text-slate-600">
        <p className="break-words whitespace-pre-wrap">
          {preview.text}
        </p>
        {preview.isTrimmed ? (
          <Link
            href={`/snippets/${snippet._id}`}
            className="mt-2 inline-flex text-sm font-medium text-slate-900 underline underline-offset-2"
          >
            Read more...
          </Link>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {snippet.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600"
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
