"use client";

import { memo } from "react";
import { SUGGESTED_QUESTIONS } from "@/data/knowledge";
import { useAssistant } from "@/context/AssistantContext";

function SuggestedChipsComponent() {
  const { sendMessage, isThinking } = useAssistant();

  return (
    <div className="flex gap-2 overflow-x-auto px-3 pb-2 pt-1 scrollbar-none sm:px-4">
      {SUGGESTED_QUESTIONS.map((q) => (
        <button
          key={q}
          type="button"
          disabled={isThinking}
          onClick={() => sendMessage(q)}
          className="shrink-0 rounded-full border border-cyan-400/25 bg-cyan-400/5 px-3 py-1 font-mono text-[11px] text-cyan-100/90 transition hover:border-cyan-300/50 hover:bg-cyan-400/15 hover:shadow-[0_0_12px_rgba(34,211,238,0.25)] disabled:opacity-50"
        >
          {q}
        </button>
      ))}
    </div>
  );
}

export const SuggestedChips = memo(SuggestedChipsComponent);
