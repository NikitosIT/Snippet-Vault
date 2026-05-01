import {
  GetSnippetsParams,
  Snippet,
  SnippetListResponse,
  SnippetPayload,
} from "@/features/snippets/types/snippet.types";
import { API_CONFIG } from "@/shared/config/api.config";
import { parseError } from "@/shared/api/parse-error";
import { toQueryString } from "@/shared/utils/query-string";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

type RequestOptions = Omit<RequestInit, "method"> & {
  method?: HttpMethod;
};

const SNIPPETS_ENDPOINTS = {
  list: "/snippets",
  tags: "/snippets/tags",
  detail: (id: string) => `/snippets/${id}`,
} as const;

export async function request<T>(
  path: string,
  options?: RequestOptions,
): Promise<T> {
  const response = await fetch(`${API_CONFIG.baseUrl}${path}`, {
    ...options,
    method: options?.method ?? "GET",
    headers: {
      ...API_CONFIG.defaultHeaders,
      ...options?.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export function getSnippets(params: GetSnippetsParams) {
  return request<SnippetListResponse>(
    `${SNIPPETS_ENDPOINTS.list}${toQueryString(params)}`,
  );
}

export function getSnippet(id: string) {
  return request<Snippet>(SNIPPETS_ENDPOINTS.detail(id));
}

export function getTags() {
  return request<string[]>(SNIPPETS_ENDPOINTS.tags);
}

export function createSnippet(payload: SnippetPayload) {
  return request<Snippet>(SNIPPETS_ENDPOINTS.list, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateSnippet(id: string, payload: SnippetPayload) {
  return request<Snippet>(SNIPPETS_ENDPOINTS.detail(id), {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function deleteSnippet(id: string) {
  return request<void>(SNIPPETS_ENDPOINTS.detail(id), {
    method: "DELETE",
  });
}
