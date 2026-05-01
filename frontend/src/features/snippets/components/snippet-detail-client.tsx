'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  deleteSnippet,
  updateSnippet,
} from '@/features/snippets/api/snippets.api';
import {
  Snippet,
  SnippetPayload,
} from '@/features/snippets/types/snippet.types';
import { formatSnippetDate } from '@/features/snippets/utils/snippet.utils';
import { Button } from '@/shared/ui/button';
import { SnippetForm } from './snippet-form';

export function SnippetDetailClient({ snippet }: { snippet: Snippet }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const initialValues: SnippetPayload = {
    title: snippet.title,
    content: snippet.content,
    tags: snippet.tags,
    type: snippet.type,
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-teal-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-teal-700">
              {snippet.type}
            </p>
            <h1 className="break-words text-3xl font-semibold text-slate-900">
              {snippet.title}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Created {formatSnippetDate(snippet.createdAt)} · Updated{' '}
              {formatSnippetDate(snippet.updatedAt)}
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setIsEditing((value) => !value)}>
              {isEditing ? 'Cancel edit' : 'Edit'}
            </Button>
            <Button
              variant="danger"
              onClick={async () => {
                await deleteSnippet(snippet._id);
                router.push('/');
                router.refresh();
              }}
            >
              Delete
            </Button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {snippet.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-6 break-all whitespace-pre-wrap rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-700">
          {snippet.content}
        </div>
      </div>

      {isEditing ? (
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900">Edit snippet</h2>
            <p className="mt-2 text-sm text-slate-500">
              Update content and keep the same clean flow as create.
            </p>
          </div>

          <SnippetForm
            initialValues={initialValues}
            submitLabel="Save changes"
            onSubmitAction={async (payload) => {
              await updateSnippet(snippet._id, payload);
              setIsEditing(false);
              router.refresh();
            }}
          />
        </section>
      ) : null}

      <Link href="/" className="inline-flex text-sm font-medium text-slate-700 hover:underline">
        Back to all snippets
      </Link>
    </div>
  );
}
