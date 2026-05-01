export type SnippetType = "link" | "note" | "command";

export type Snippet = {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  type: SnippetType;
  createdAt: string;
  updatedAt: string;
};

export type SnippetListResponse = {
  items: Snippet[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type SnippetPayload = {
  title: string;
  content: string;
  tags: string[];
  type: SnippetType;
};

export type SnippetFormErrors = Partial<Record<keyof SnippetPayload, string>>;

export type GetSnippetsParams = {
  page?: number;
  limit?: number;
  q?: string;
  tag?: string;
  type?: string;
};

export type SnippetsPageSearchParams = Pick<
  GetSnippetsParams,
  "page" | "q" | "tag"
>;
