'use client';

import { useRouter } from 'next/navigation';

import { createSnippet } from '@/features/snippets/api/snippets.api';
import { SnippetForm } from './snippet-form';

export function CreateSnippetPanel() {
  const router = useRouter();

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">New snippet</h2>
        <p className="mt-2 max-w-xl text-sm text-slate-600">
          Save links, notes, and commands. Create, edit, search, and delete items.
        </p>
      </div>

      <SnippetForm
        submitLabel="Create snippet"
        onSubmitAction={async (payload) => {
          await createSnippet(payload);
          router.refresh();
        }}
      />
    </section>
  );
}
