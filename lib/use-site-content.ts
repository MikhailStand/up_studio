"use client";

import { useEffect, useState } from "react";
import { cloneDefaultContent, type SiteContent } from "./site-content";

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(() => cloneDefaultContent());

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/content", { cache: "no-store", signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((saved: SiteContent) => setContent(saved))
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  return content;
}
