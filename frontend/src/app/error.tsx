"use client";

import { useEffect } from "react";

import { Button } from "@/shared/ui/button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-red-600">Error</p>
      <h1 className="mt-3 text-3xl font-semibold text-slate-900">
        Something went wrong while loading snippets
      </h1>
      <p className="mt-2 text-sm text-slate-500">Please try again later.</p>
      <Button className="mt-6" onClick={reset}>
        Try again
      </Button>
    </main>
  );
}
