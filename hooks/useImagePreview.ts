"use client";

import { useCallback, useState } from "react";

const PLACEHOLDER =
  "https://placehold.co/400x300/e2e8f0/64748b?text=No+Image";

export function useImagePreview() {
  const [previewUrl, setPreviewUrl] = useState<string>(PLACEHOLDER);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];

      if (!selectedFile) return;

      setFile(selectedFile);

      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    },
    []
  );

  const resetPreview = useCallback(() => {
    setPreviewUrl(PLACEHOLDER);
    setFile(null);
  }, []);

  return {
    previewUrl,
    file,
    handleFileChange,
    resetPreview,
    PLACEHOLDER,
  };
}