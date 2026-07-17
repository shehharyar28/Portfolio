"use client";

import { memo } from "react";
import { m } from "framer-motion";
import type { ChatMessage } from "@/context/AssistantContext";
import { useAssistant } from "@/context/AssistantContext";

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function MessageBubbleComponent({ message }: { message: ChatMessage }) {
  const { runAction } = useAssistant();
  const isUser = message.role === "user";

  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed sm:max-w-[85%] ${
          isUser
            ? "rounded-br-md bg-gradient-to-br from-cyan-500 to-teal-600 text-white shadow-[0_0_20px_rgba(34,211,238,0.25)]"
            : "rounded-bl-md border border-cyan-400/20 bg-white/[0.04] text-slate-100 shadow-[inset_0_0_20px_rgba(34,211,238,0.06)] backdrop-blur-md"
        }`}
      >
        <p className="whitespace-pre-wrap">
          {message.content}
          {message.isStreaming ? (
            <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-cyan-300 align-middle shadow-[0_0_6px_#22d3ee]" />
          ) : null}
        </p>

        {!isUser && !message.isStreaming && message.technologies?.length ? (
          <div className="mt-3">
            <p className="mb-1.5 font-mono text-[10px] font-medium uppercase tracking-wider text-cyan-400/70">
              Technologies
            </p>
            <div className="flex flex-wrap gap-1.5">
              {message.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-cyan-500/25 bg-cyan-500/10 px-2 py-0.5 font-mono text-[11px] text-cyan-100"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {!isUser && !message.isStreaming && message.projectRefs?.length ? (
          <div className="mt-3">
            <p className="mb-1.5 font-mono text-[10px] font-medium uppercase tracking-wider text-teal-400/70">
              Projects
            </p>
            <div className="flex flex-wrap gap-1.5">
              {message.projectRefs.map((p) => (
                <span
                  key={p.id}
                  className="rounded border border-teal-500/25 bg-teal-500/10 px-2 py-0.5 font-mono text-[11px] text-teal-100"
                >
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {!isUser && !message.isStreaming && message.actions?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.actions.map((action) => (
              <button
                key={`${action.type}-${action.label}`}
                type="button"
                onClick={() => runAction(action)}
                className="btn-holo rounded-lg border border-cyan-400/35 bg-cyan-400/10 px-2.5 py-1 font-mono text-[11px] font-medium text-cyan-100 transition hover:border-cyan-300/60 hover:bg-cyan-400/20 hover:shadow-[0_0_12px_rgba(34,211,238,0.3)]"
              >
                {action.label}
              </button>
            ))}
          </div>
        ) : null}

        <p
          className={`mt-1.5 font-mono text-[10px] ${
            isUser ? "text-white/70" : "text-slate-500"
          }`}
        >
          {formatTime(message.timestamp)}
        </p>
      </div>
    </m.div>
  );
}

export const MessageBubble = memo(MessageBubbleComponent);
