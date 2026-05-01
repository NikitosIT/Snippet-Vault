import { getSnippets, getTags } from "@/features/snippets/api/snippets.api";
import { CreateSnippetPanel } from "@/features/snippets/components/create-snippet-panel";
import { SnippetCard } from "@/features/snippets/components/snippet-card";
import { SnippetFilters } from "@/features/snippets/components/snippet-filters";
import { SnippetPagination } from "@/features/snippets/components/snippet-pagination";
import { SnippetsPageSearchParams } from "@/features/snippets/types/snippet.types";
import { parseSnippetsPageSearchParams } from "@/features/snippets/utils/snippet.utils";

const SNIPPETS_PAGE_LIMIT = 6;

type HomePageProps = {
  searchParams: Promise<SnippetsPageSearchParams>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;

  const { page, q, tag } = parseSnippetsPageSearchParams(params);

  const [snippetResponse, tags] = await Promise.all([
    getSnippets({ page, limit: SNIPPETS_PAGE_LIMIT, q, tag }),
    getTags(),
  ]);

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Snippets Vault
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600">
            Store links, notes, and commands. Search, filter, edit, and delete saved snippets.
          </p>
        </div>
        <CreateSnippetPanel />
      </section>

      <SnippetFilters tags={tags} />

      {snippetResponse.items.length ? (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {snippetResponse.items.map((snippet) => (
              <SnippetCard key={snippet._id} snippet={snippet} />
            ))}
          </section>

          <SnippetPagination
            page={snippetResponse.meta.page}
            totalPages={snippetResponse.meta.totalPages}
            query={q}
            tag={tag}
          />
        </>
      ) : (
        <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-card">
          <h2 className="text-xl font-semibold text-slate-900">
            No snippets yet
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Create your first entry or adjust search and tag filters.
          </p>
        </section>
      )}
    </main>
  );
}
