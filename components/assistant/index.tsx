"use client";

import { AssistantProvider } from "@/context/AssistantContext";
import { AssistantButton } from "./AssistantButton";
import { ChatWindow } from "./ChatWindow";

/** Client-side AI Portfolio Assistant — no backend, knowledge-base driven. */
export function PortfolioAssistant() {
  return (
    <AssistantProvider>
      <ChatWindow />
      <AssistantButton />
    </AssistantProvider>
  );
}
