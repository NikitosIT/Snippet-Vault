import { SnippetType } from './enums/snippet-type.enum';
import { Snippet } from './schemas/snippet.schema';

export type SnippetData = {
  title: string;
  content: string;
  tags: string[];
  type: SnippetType;
};

export type SnippetChanges = Partial<SnippetData>;

export type SnippetFilters = {
  tag?: string;
  type?: SnippetType;
  search?: string;
};

export type SnippetListMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type SnippetListResponse = {
  items: Snippet[];
  meta: SnippetListMeta;
};

export type SnippetListResult = {
  items: Snippet[];
  total: number;
};

export type Pagination = {
  page: number;
  limit: number;
};
