"use client";

import { memo } from "react";
import { AnimatePresence, m, useWillChange } from "framer-motion";
import { Sparkles, MessageCircle } from "lucide-react";
import { useAssistant } from "@/context/AssistantContext";

/** Isolated loop layers — not re-created when parent context re-renders. */
const FabPulseRings = memo(function FabPulseRings() {
  const willChange = useWillChange();
  return (
    <>
      <m.span
        className="absolute inset-0 rounded-full bg-white/50"
        style={{ willChange }}
        animate={{ scale: [1, 1.55, 1], opacity: [0.65, 0, 0.65] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
      />
      <m.span
        className="absolute -inset-1 rounded-full bg-cyan-200/35"
        style={{ willChange }}
        animate={{ scale: [1, 1.35, 1], opacity: [0.45, 0, 0.45] }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          delay: 0.35,
          ease: "easeOut",
        }}
      />
    </>
  );
});

const ChipSheen = memo(function ChipSheen() {
  const willChange = useWillChange();
  return (
    <m.span
      className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent"
      style={{ willChange }}
      animate={{ x: ["-120%", "120%"] }}
      transition={{
        duration: 2.6,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: 1,
      }}
    />
  );
});

function AssistantButtonComponent() {
  const { toggle, isOpen } = useAssistant();
  const willChange = useWillChange();

  return (
    <div className="fixed bottom-5 right-4 z-50 flex items-center gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {!isOpen ? (
          <m.button
            type="button"
            key="assistant-label"
            onClick={toggle}
            initial={{ opacity: 0, x: 12, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1, y: [0, -4, 0] }}
            exit={{ opacity: 0, x: 8, scale: 0.96 }}
            transition={{
              opacity: { duration: 0.2 },
              x: { duration: 0.25 },
              y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{ willChange }}
            whileTap={{ scale: 0.97 }}
            className="relative max-w-[220px] overflow-hidden rounded-2xl border border-white/40 bg-white px-3.5 py-2.5 text-left shadow-[0_8px_28px_rgba(0,0,0,0.4)] sm:max-w-none"
            aria-label="Open Baber's AI Portfolio Assistant"
          >
            <ChipSheen />
            <div className="relative z-10 flex items-start gap-2">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#030712] text-cyan-300">
                <MessageCircle className="h-4 w-4" />
              </span>
              <div>
                <p className="font-display text-xs font-bold tracking-wide text-[#030712] sm:text-[13px]">
                  Ask Sheharyar's AI
                </p>
                <p className="mt-0.5 text-[10px] font-semibold leading-snug text-slate-600">
                  Chat about experience, apps & skills
                </p>
              </div>
            </div>
          </m.button>
        ) : null}
      </AnimatePresence>

      <m.button
        type="button"
        onClick={toggle}
        aria-label={
          isOpen
            ? "Close Baber's AI Portfolio Assistant"
            : "Open Baber's AI Portfolio Assistant"
        }
        className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full sm:h-16 sm:w-16"
        style={{ willChange }}
        whileTap={{ scale: 0.94 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <FabPulseRings />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-white text-[#030712] shadow-[0_4px_20px_rgba(0,0,0,0.35)] sm:h-16 sm:w-16">
          <m.span
            animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Sparkles className="h-6 w-6 text-cyan-600 sm:h-7 sm:w-7" />
          </m.span>
        </span>
      </m.button>
    </div>
  );
}

export const AssistantButton = memo(AssistantButtonComponent);
