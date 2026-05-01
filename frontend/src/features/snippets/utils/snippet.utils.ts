import {
  SnippetFormErrors,
  SnippetPayload,
  SnippetsPageSearchParams,
  SnippetType,
} from "@/features/snippets/types/snippet.types";

export const SNIPPET_TYPES: SnippetType[] = ["link", "note", "command"];

const SNIPPET_PREVIEW_WORD_LIMIT = 100;
const SNIPPET_CONTENT_MAX_LENGTH = 1000;

export function formatSnippetDate(value: string) {
  return new Intl.DateTimeFormat("uk-UA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function parseSnippetsPageSearchParams(
  params: SnippetsPageSearchParams,
) {
  const parsedPage = Number(params.page);

  return {
    page: Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1,
    q: params.q?.trim() ?? "",
    tag: params.tag ?? "",
  };
}

export function parseSnippetTags(value: string) {
  return [
    ...new Set(
      value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  ];
}

export function joinSnippetTags(tags: string[]) {
  return tags.join(", ");
}

export function getSnippetPreview(content: string) {
  const normalizedContent = content.trim();
  const words = normalizedContent.split(/\s+/).filter(Boolean);
  const isTrimmed = words.length > SNIPPET_PREVIEW_WORD_LIMIT;

  return {
    text: isTrimmed
      ? `${words.slice(0, SNIPPET_PREVIEW_WORD_LIMIT).join(" ")}...`
      : content,
    isTrimmed,
  };
}

export function getDefaultSnippetPayload(
  initialValues?: SnippetPayload,
): SnippetPayload {
  return (
    initialValues ?? {
      title: "",
      content: "",
      tags: [],
      type: "note",
    }
  );
}

export function createSnippetPayload(formData: FormData): SnippetPayload {
  return {
    title: String(formData.get("title") ?? ""),
    content: String(formData.get("content") ?? ""),
    tags: parseSnippetTags(String(formData.get("tags") ?? "")),
    type: String(formData.get("type") ?? "note") as SnippetType,
  };
}

export function validateSnippetPayload(
  payload: SnippetPayload,
): SnippetFormErrors {
  const errors: SnippetFormErrors = {};

  if (!payload.title.trim()) {
    errors.title = "Title is required.";
  }

  if (!payload.content.trim()) {
    errors.content = "Content is required.";
  }

  if (payload.content.length > SNIPPET_CONTENT_MAX_LENGTH) {
    errors.content = `Content must be at most ${SNIPPET_CONTENT_MAX_LENGTH} characters.`;
  }

  return errors;
}
