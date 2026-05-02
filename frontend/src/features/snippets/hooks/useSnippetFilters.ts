import { useDebouncedValue } from "@/shared/hooks/useDebouncedValue";
import { buildHomePath } from "@/shared/routes/routes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SEARCH_DEBOUNCE_MS = 350;

export function useSnippetFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const currentTag = searchParams.get("tag") ?? "";
  const currentQuery = searchParams.get("q") ?? "";

  useEffect(() => {
    setQuery(currentQuery);
  }, [currentQuery]);

  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_MS);

  useEffect(() => {
    if (debouncedQuery === currentQuery) return;

    router.replace(
      buildHomePath({
        q: debouncedQuery || undefined,
        tag: currentTag || undefined,
      }),
      { scroll: false },
    );
  }, [currentQuery, currentTag, debouncedQuery, router]);

  function setTag(tag: string) {
    router.replace(
      buildHomePath({
        q: query || undefined,
        tag: tag || undefined,
      }),
      { scroll: false },
    );
  }

  return {
    query,
    setQuery,
    currentTag,
    setTag,
  };
}
