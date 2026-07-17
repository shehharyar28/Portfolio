"use client";

import Image from "next/image";
import { memo } from "react";
import { m, useReducedMotion } from "framer-motion";
import { useGpuLayerStyle } from "@/components/motion/useGpuLayerStyle";
import { knowledge } from "@/data/knowledge";

/** Isolated continuous float — parent re-renders won't restart this tree's identity. */
const HeroFloatLayer = memo(function HeroFloatLayer({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const gpu = useGpuLayerStyle();

  if (reduceMotion) {
    return <div className="relative">{children}</div>;
  }

  return (
    <m.div
      className="relative"
      style={gpu}
      animate={{
        y: [0, -8, 0, -5, 0],
        rotate: [0, -1.8, 1.6, -1.2, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </m.div>
  );
});

const HeroGlow = memo(function HeroGlow() {
  const reduceMotion = useReducedMotion();
  const gpu = useGpuLayerStyle();
  if (reduceMotion) {
    return (
      <div className="pointer-events-none absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.28),transparent_70%)] opacity-50" />
    );
  }
  return (
    <m.div
      className="pointer-events-none absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.35),transparent_70%)]"
      style={gpu}
      animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.06, 1] }}
      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
    />
  );
});

const ScanSheen = memo(function ScanSheen() {
  const reduceMotion = useReducedMotion();
  const gpu = useGpuLayerStyle();
  if (reduceMotion) return null;
  return (
    <m.div
      className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-cyan-300/15 to-transparent"
      style={gpu}
      animate={{ y: ["-20%", "120%"] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
    />
  );
});

const AccentDots = memo(function AccentDots() {
  const reduceMotion = useReducedMotion();
  const gpu = useGpuLayerStyle();
  if (reduceMotion) {
    return (
      <span className="absolute -right-3 bottom-12 z-20 select-none font-mono text-[10px] tracking-widest text-cyan-300/85">
        ONLINE
      </span>
    );
  }
  return (
    <>
      <m.span
        className="absolute -right-2 top-10 z-20 h-3 w-3 rounded-full bg-cyan-300"
        style={gpu}
        animate={{ y: [0, -10, 0], scale: [1, 1.25, 1], opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <m.span
        className="absolute -right-3 bottom-12 z-20 select-none font-mono text-[10px] tracking-widest text-cyan-300/85"
        style={gpu}
        animate={{ opacity: [0.45, 1, 0.45], x: [0, 3, 0] }}
        transition={{ duration: 2.6, repeat: Infinity }}
      >
        ONLINE
      </m.span>
    </>
  );
});

function HeroPortraitComponent() {
  const { about } = knowledge;

  return (
    <div className="relative z-10 mx-auto w-full max-w-[300px] lg:mx-0 lg:max-w-[340px]">
      <HeroGlow />

      <HeroFloatLayer>
        <div className="relative overflow-hidden rounded-[1.75rem] border border-cyan-300/30 bg-[#060d1a] p-[3px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="holo-card-border absolute inset-0 rounded-[1.75rem] opacity-80" />
          <div className="relative z-10 overflow-hidden rounded-[1.55rem] bg-[#030712]">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/assets/Sheharyar.jpeg"
                alt={about.fullName}
                fill
                priority
                unoptimized
                className="object-cover object-top"
                sizes="(max-width: 1024px) 280px, 340px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030712]/55 via-transparent to-cyan-400/10" />
              <ScanSheen />
            </div>
          </div>
        </div>
        <AccentDots />
      </HeroFloatLayer>

      <p className="mt-4 text-center font-mono text-[11px] tracking-wider text-cyan-200/70 lg:text-left">
        {about.fullName} · {about.title}
      </p>
    </div>
  );
}

export const HeroPortrait = memo(HeroPortraitComponent);
