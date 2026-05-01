import { notFound } from "next/navigation";
import { Metadata } from "next";

import { getSnippet } from "@/features/snippets/api/snippets.api";
import { SnippetDetailClient } from "@/features/snippets/components/snippet-detail-client";

type SnippetDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SnippetDetailPage({
  params,
}: SnippetDetailPageProps) {
  const { id } = await params;
  const snippet = await getSnippet(id);

  if (!snippet) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <SnippetDetailClient snippet={snippet} />
    </main>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: "Snippet details | Snippet Vault",
  };
}
