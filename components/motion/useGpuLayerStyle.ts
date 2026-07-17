"use client";

import { useWillChange } from "framer-motion";

/**
 * Hardware-acceleration hint via Framer's useWillChange().
 * Pass the result to `style` on `m.*` components.
 */
export function useGpuLayerStyle() {
  const willChange = useWillChange();
  return { willChange };
}
