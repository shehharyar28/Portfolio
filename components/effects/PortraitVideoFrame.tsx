"use client";

import { memo, useEffect, useRef, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { riseIn } from "@/lib/motion";
import { useGpuLayerStyle } from "@/components/motion/useGpuLayerStyle";

const ScanLine = memo(function ScanLine() {
  const gpu = useGpuLayerStyle();
  return (
    <m.div
      className="pointer-events-none absolute inset-x-0 top-0 hidden h-16 bg-gradient-to-b from-cyan-300/12 to-transparent md:block"
      style={gpu}
      animate={{ y: ["0%", "110%"] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
    />
  );
});

function PortraitVideoFrameComponent({
  src,
  caption,
}: {
  src: string;
  caption?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);
  const reduceMotion = useReducedMotion();
  const gpu = useGpuLayerStyle();

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setLoadVideo(true);
          io.disconnect();
        }
      },
      { rootMargin: "140px 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <m.div
      ref={wrapRef}
      {...riseIn}
      style={gpu}
      className="mx-auto flex w-full max-w-[280px] flex-col items-center sm:max-w-[300px]"
    >
      <div className="relative">
        <div className="pointer-events-none absolute -inset-6 hidden rounded-[2.5rem] bg-cyan-400/15 blur-2xl md:block" />

        <div className="holo-phone relative overflow-hidden rounded-[2rem] border border-cyan-200/30 bg-[#020617] p-2 shadow-[0_0_32px_rgba(34,211,238,0.2)]">
          <div className="absolute left-1/2 top-3 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black/90" />

          <div className="relative aspect-[9/16] overflow-hidden rounded-[1.55rem] bg-black">
            {loadVideo ? (
              <video
                className="h-full w-full object-cover"
                controls
                playsInline
                preload="metadata"
              >
                <source src={src} type="video/mp4" />
              </video>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#030712] font-mono text-[10px] tracking-wider text-cyan-300/50">
                AI DEMO
              </div>
            )}
            {!reduceMotion ? <ScanLine /> : null}
          </div>

          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-white/25" />
        </div>
      </div>

      {caption ? (
        <p className="mt-4 text-center font-mono text-[11px] tracking-wider text-cyan-200/70">
          {caption}
        </p>
      ) : null}
    </m.div>
  );
}

export const PortraitVideoFrame = memo(PortraitVideoFrameComponent);
