"use client";

import { memo, useEffect, useRef } from "react";
import { useAssistant } from "@/context/AssistantContext";
import { MessageBubble } from "./MessageBubble";
import { ThinkingIndicator } from "./ThinkingIndicator";

function MessageListComponent() {
  const { messages, isThinking } = useAssistant();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  return (
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-3 py-3 sm:px-4">
      {messages.map((m) => (
        <MessageBubble key={m.id} message={m} />
      ))}
      {isThinking ? <ThinkingIndicator /> : null}
      <div ref={endRef} />
    </div>
  );
}

export const MessageList = memo(MessageListComponent);
