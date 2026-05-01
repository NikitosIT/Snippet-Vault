"use client";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useSnippetFilters } from "../hooks/useSnippetFilters";

type SnippetFiltersProps = {
  tags: string[];
};

export function SnippetFilters({ tags }: SnippetFiltersProps) {
  const { query, setQuery, currentTag, setTag } = useSnippetFilters();

  return (
    <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="space-y-2">
        <p className="text-sm font-semibold text-slate-900">Search</p>
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search title or content..."
        />
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold text-slate-900">Filter by tag</p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={currentTag ? "secondary" : "primary"}
            onClick={() => setTag("")}
          >
            All
          </Button>
          {tags.map((tag) => (
            <Button
              key={tag}
              variant={currentTag === tag ? "primary" : "secondary"}
              onClick={() => setTag(tag)}
            >
              #{tag}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
