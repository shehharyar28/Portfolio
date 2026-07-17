"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const PortfolioAssistant = dynamic(
  () =>
    import("@/components/assistant").then((m) => m.PortfolioAssistant),
  {
    ssr: false,
    loading: () => null,
  },
);

/** Defer assistant JS until idle / first interaction — frees mobile first paint. */
export function LazyPortfolioAssistant() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const arm = () => {
      if (!cancelled) setReady(true);
    };

    const onInteract = () => arm();
    window.addEventListener("pointerdown", onInteract, {
      once: true,
      passive: true,
    });
    window.addEventListener("scroll", onInteract, { once: true, passive: true });

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(arm, { timeout: 4000 });
    } else {
      timeoutId = setTimeout(arm, 3000);
    }

    return () => {
      cancelled = true;
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("scroll", onInteract);
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  if (!ready) return null;
  return <PortfolioAssistant />;
}
