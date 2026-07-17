"use client";

import { memo } from "react";
import { m, useWillChange } from "framer-motion";

function ThinkingIndicatorComponent() {
  const willChange = useWillChange();

  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-white/5 px-3.5 py-2.5">
        {[0, 1, 2].map((i) => (
          <m.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-cyan-300/80"
            style={{ willChange }}
            animate={{ opacity: [0.35, 1, 0.35], y: [0, -3, 0] }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
        <span className="ml-1 text-[11px] text-zinc-400">Thinking…</span>
      </div>
    </div>
  );
}

export const ThinkingIndicator = memo(ThinkingIndicatorComponent);
