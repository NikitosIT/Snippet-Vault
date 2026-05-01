"use client";

import {
  SnippetPayload,
  SnippetType,
} from "@/features/snippets/types/snippet.types";
import { useSnippetForm } from "@/features/snippets/hooks/useSnippetForm";
import { SNIPPET_TYPES } from "@/features/snippets/utils/snippet.utils";
import { Button } from "@/shared/ui/button";
import { Input, Textarea } from "@/shared/ui/input";

type SnippetFormProps = {
  initialValues?: SnippetPayload;
  submitLabel: string;
  onSubmitAction: (payload: SnippetPayload) => Promise<void>;
};
export function SnippetForm({
  initialValues,
  submitLabel,
  onSubmitAction,
}: SnippetFormProps) {
  const {
    title,
    setTitle,
    content,
    setContent,
    tags,
    setTags,
    type,
    setType,
    errors,
    serverError,
    isPending,
    handleSubmit,
  } = useSnippetForm({
    initialValues,
    onSubmitAction,
  });

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="title">
          Title
        </label>
        <Input
          id="title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Mongo text search cheat sheet"
          required
        />
        {errors.title ? (
          <p className="text-sm text-red-600">{errors.title}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="type">
          Type
        </label>
        <select
          id="type"
          name="type"
          value={type}
          onChange={(event) => setType(event.target.value as SnippetType)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
        >
          {SNIPPET_TYPES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="tags">
          Tags
        </label>
        <Input
          id="tags"
          name="tags"
          value={tags}
          onChange={(event) => setTags(event.target.value)}
          placeholder="react, api, mongo"
        />
        <p className="text-xs text-slate-500">Separate tags with commas.</p>
        {errors.tags ? (
          <p className="text-sm text-red-600">{errors.tags}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="content">
          Content
        </label>
        <Textarea
          id="content"
          name="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Add a note, command, or useful link..."
          required
        />
        {errors.content ? (
          <p className="text-sm text-red-600">{errors.content}</p>
        ) : null}
      </div>

      {serverError ? (
        <p className="text-sm text-red-600">{serverError}</p>
      ) : null}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
