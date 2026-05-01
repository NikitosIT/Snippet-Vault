import type { Route } from 'next';

type HomeRouteParams = {
  page?: number;
  q?: string;
  tag?: string;
};

export function buildHomePath({ page, q, tag }: HomeRouteParams = {}) {
  const params = new URLSearchParams();

  if (page && page > 1) {
    params.set('page', String(page));
  }

  if (q) {
    params.set('q', q);
  }

  if (tag) {
    params.set('tag', tag);
  }

  const query = params.toString();
  return (query ? `/?${query}` : '/') as Route;
}
