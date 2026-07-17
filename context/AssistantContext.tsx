"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { WELCOME_MESSAGE } from "@/data/knowledge";
import type {
  AssistantAction,
  AssistantResponse,
  ConversationMemory,
} from "@/data/types";
import { autoExecuteFromIntent, executeAction } from "@/lib/assistant/actions";
import {
  createMemory,
  pushTurn,
} from "@/lib/assistant/memory";
import { generateResponse } from "@/lib/assistant/respond";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  technologies?: string[];
  projectRefs?: { id: string; name: string }[];
  actions?: AssistantAction[];
  isStreaming?: boolean;
}

interface AssistantContextValue {
  isOpen: boolean;
  isThinking: boolean;
  messages: ChatMessage[];
  open: () => void;
  close: () => void;
  toggle: () => void;
  sendMessage: (text: string) => void;
  runAction: (action: AssistantAction) => void;
}

const AssistantContext = createContext<AssistantContextValue | null>(null);

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function AssistantProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "welcome",
      role: "assistant",
      content: WELCOME_MESSAGE,
      timestamp: Date.now(),
    },
  ]);
  const memoryRef = useRef<ConversationMemory>(createMemory());
  const streamTimerRef = useRef<number | null>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const runAction = useCallback((action: AssistantAction) => {
    executeAction(action);
  }, []);

  const streamAssistantReply = useCallback(
    (response: AssistantResponse, userQuery: string) => {
      const id = uid();
      const full = response.text;
      const started: ChatMessage = {
        id,
        role: "assistant",
        content: "",
        timestamp: Date.now(),
        technologies: response.technologies,
        projectRefs: response.projectRefs,
        actions: response.actions,
        isStreaming: true,
      };

      setMessages((prev) => [...prev, started]);
      setIsThinking(false);

      let i = 0;
      const step = () => {
        i += Math.max(1, Math.floor(full.length / 80));
        const slice = full.slice(0, i);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === id
              ? {
                  ...m,
                  content: slice,
                  isStreaming: i < full.length,
                }
              : m,
          ),
        );
        if (i < full.length) {
          streamTimerRef.current = window.setTimeout(step, 16);
        } else {
          memoryRef.current = pushTurn(memoryRef.current, "assistant", full);
          autoExecuteFromIntent(userQuery, response.actions);
        }
      };
      streamTimerRef.current = window.setTimeout(step, 40);
    },
    [],
  );

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      if (streamTimerRef.current) {
        window.clearTimeout(streamTimerRef.current);
        streamTimerRef.current = null;
      }

      const userMsg: ChatMessage = {
        id: uid(),
        role: "user",
        content: trimmed,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg]);
      memoryRef.current = pushTurn(memoryRef.current, "user", trimmed);
      setIsThinking(true);

      // Simulate brief thinking delay for premium feel
      window.setTimeout(() => {
        const { response, memory } = generateResponse(
          trimmed,
          memoryRef.current,
        );
        memoryRef.current = memory;
        streamAssistantReply(response, trimmed);
      }, 420 + Math.random() * 280);
    },
    [streamAssistantReply],
  );

  const value = useMemo(
    () => ({
      isOpen,
      isThinking,
      messages,
      open,
      close,
      toggle,
      sendMessage,
      runAction,
    }),
    [
      isOpen,
      isThinking,
      messages,
      open,
      close,
      toggle,
      sendMessage,
      runAction,
    ],
  );

  return (
    <AssistantContext.Provider value={value}>
      {children}
    </AssistantContext.Provider>
  );
}

export function useAssistant() {
  const ctx = useContext(AssistantContext);
  if (!ctx) {
    throw new Error("useAssistant must be used within AssistantProvider");
  }
  return ctx;
}
