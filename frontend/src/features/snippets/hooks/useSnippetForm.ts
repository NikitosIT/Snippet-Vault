"use client";

import { useState, useTransition } from "react";

import {
  SnippetFormErrors,
  SnippetPayload,
  SnippetType,
} from "@/features/snippets/types/snippet.types";
import {
  createSnippetPayload,
  getDefaultSnippetPayload,
  joinSnippetTags,
  validateSnippetPayload,
} from "@/features/snippets/utils/snippet.utils";

type UseSnippetFormParams = {
  initialValues?: SnippetPayload;
  onSubmitAction: (payload: SnippetPayload) => Promise<void>;
};

export function useSnippetForm({
  initialValues,
  onSubmitAction,
}: UseSnippetFormParams) {
  const defaultValues = getDefaultSnippetPayload(initialValues);
  const [errors, setErrors] = useState<SnippetFormErrors>({});
  const [serverError, setServerError] = useState("");
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState(defaultValues.title);
  const [content, setContent] = useState(defaultValues.content);
  const [tags, setTags] = useState(joinSnippetTags(defaultValues.tags));
  const [type, setType] = useState<SnippetType>(defaultValues.type);

  function resetCreateForm() {
    setTitle("");
    setContent("");
    setTags("");
    setType("note");
  }

  function handleSubmit(formData: FormData) {
    const payload = createSnippetPayload(formData);
    const nextErrors = validateSnippetPayload(payload);

    setErrors(nextErrors);
    setServerError("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    startTransition(async () => {
      try {
        await onSubmitAction(payload);
        setErrors({});

        if (!initialValues) {
          resetCreateForm();
        }
      } catch (error) {
        setServerError(
          error instanceof Error ? error.message : "Something went wrong.",
        );
      }
    });
  }

  return {
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
  };
}
