import Link from "next/link";

import { buildHomePath } from "@/shared/routes/routes";

type SnippetPaginationProps = {
  page: number;
  totalPages: number;
  query?: string;
  tag?: string;
};

export function SnippetPagination({
  page,
  totalPages,
  query,
  tag,
}: SnippetPaginationProps) {
  return (
    <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-4 shadow-card">
      <p className="text-sm text-slate-600">
        Page {page} of {totalPages}
      </p>
      <div className="flex gap-3">
        {page > 1 ? (
          <Link
            href={buildHomePath({ page: page - 1, q: query, tag })}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Previous
          </Link>
        ) : (
          <span className="inline-flex cursor-not-allowed items-center justify-center rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-400">
            Previous
          </span>
        )}

        {page < totalPages ? (
          <Link
            href={buildHomePath({ page: page + 1, q: query, tag })}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Next
          </Link>
        ) : (
          <span className="inline-flex cursor-not-allowed items-center justify-center rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-400">
            Next
          </span>
        )}
      </div>
    </div>
  );
}
