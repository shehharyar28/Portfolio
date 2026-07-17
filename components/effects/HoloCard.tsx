"use client";

import { memo, type ReactNode } from "react";
import { m } from "framer-motion";
import { riseIn } from "@/lib/motion";
import { useGpuLayerStyle } from "@/components/motion/useGpuLayerStyle";

interface HoloCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

function HoloCardComponent({
  children,
  className = "",
  delay = 0,
}: HoloCardProps) {
  const gpu = useGpuLayerStyle();

  return (
    <m.article
      {...riseIn}
      transition={{ ...riseIn.transition, delay }}
      style={gpu}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`holo-card group relative overflow-hidden rounded-2xl border border-white/10 bg-[#060d1a] p-5 sm:p-6 ${className}`}
    >
      <div className="relative z-10">{children}</div>
    </m.article>
  );
}

export const HoloCard = memo(HoloCardComponent);
