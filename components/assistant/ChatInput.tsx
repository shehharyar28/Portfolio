"use client";

import { memo, useState, type FormEvent } from "react";
import { SendHorizontal } from "lucide-react";
import { useAssistant } from "@/context/AssistantContext";

function ChatInputComponent() {
  const { sendMessage, isThinking } = useAssistant();
  const [value, setValue] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim() || isThinking) return;
    sendMessage(value);
    setValue("");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="border-t border-cyan-400/15 bg-black/30 px-3 py-3 sm:px-4"
    >
      <div className="flex items-center gap-2 rounded-xl border border-cyan-400/25 bg-cyan-950/20 px-3 py-2 focus-within:border-cyan-300/50 focus-within:shadow-[0_0_16px_rgba(34,211,238,0.15)]">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Query Baber's portfolio systems…"
          disabled={isThinking}
          className="min-w-0 flex-1 bg-transparent font-mono text-sm text-slate-100 outline-none placeholder:text-slate-500 disabled:opacity-60"
          aria-label="Message Baber's Portfolio Assistant"
        />
        <button
          type="submit"
          disabled={isThinking || !value.trim()}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-teal-500 text-slate-950 shadow-[0_0_14px_rgba(34,211,238,0.4)] transition hover:brightness-110 disabled:opacity-40"
          aria-label="Send message"
        >
          <SendHorizontal className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}

export const ChatInput = memo(ChatInputComponent);
