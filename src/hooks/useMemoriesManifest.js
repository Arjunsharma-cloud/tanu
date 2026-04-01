import { useCallback, useEffect, useState } from "react";

/**
 * Normalizes Vite `base` into a prefix ending with `/`.
 */
function viteBasePrefix() {
  const raw = import.meta.env.BASE_URL || "/";
  return raw.endsWith("/") ? raw : `${raw}/`;
}

/**
 * Loads `/memories/manifest.json` (generated from `public/memories/`).
 * @returns {{ items: Array<{ file: string, kind: 'image'|'video' }>, loading: boolean, error: string | null, assetUrl: (file: string) => string }}
 */
export function useMemoriesManifest() {
  const prefix = viteBasePrefix();
  const [state, setState] = useState({
    items: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    const url = `${prefix}memories/manifest.json`;
    fetch(url, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error("Could not load memories list.");
        return r.json();
      })
      .then((data) => {
        if (cancelled) return;
        const items = Array.isArray(data?.items) ? data.items : [];
        setState({ items, loading: false, error: null });
      })
      .catch((e) => {
        if (cancelled) return;
        setState({ items: [], loading: false, error: e?.message ?? "Failed to load memories." });
      });
    return () => {
      cancelled = true;
    };
  }, [prefix]);

  const assetUrl = useCallback(
    (file) => `${prefix}memories/${encodeURIComponent(file)}`,
    [prefix]
  );

  return { ...state, assetUrl };
}
