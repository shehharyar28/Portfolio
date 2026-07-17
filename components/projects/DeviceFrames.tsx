"use client";

import Image from "next/image";
import { memo, type ReactNode } from "react";

/** Premium device chrome for mobile (portrait phone) screenshots. */
export const PhoneFrame = memo(function PhoneFrame({
  src,
  alt,
  priority,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative mx-auto w-full max-w-[220px] ${className}`}>
      <div className="pointer-events-none absolute -inset-4 hidden rounded-[2.5rem] bg-cyan-400/15 blur-2xl md:block" />
      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/20 bg-[#020617] p-[7px] shadow-[0_12px_32px_rgba(0,0,0,0.45)] md:shadow-[0_20px_50px_rgba(0,0,0,0.55),0_0_40px_rgba(34,211,238,0.18)]">
        <div className="absolute left-1/2 top-2.5 z-20 h-4 w-20 -translate-x-1/2 rounded-full bg-black/95" />
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.35rem] bg-black">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className="object-cover object-top"
            sizes="(max-width: 768px) 40vw, 220px"
            quality={70}
          />
        </div>
        <div className="mx-auto mt-1.5 h-1 w-14 rounded-full bg-white/20" />
      </div>
    </div>
  );
});

/** Browser window chrome for landscape web / POS screenshots. */
export const BrowserFrame = memo(function BrowserFrame({
  src,
  alt,
  priority,
  urlLabel,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  urlLabel?: string;
  className?: string;
}) {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="pointer-events-none absolute -inset-3 hidden rounded-2xl bg-teal-400/10 blur-2xl md:block" />
      <div className="relative overflow-hidden rounded-xl border border-white/15 bg-[#0a1220] shadow-[0_12px_36px_rgba(0,0,0,0.45)] md:shadow-[0_24px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(45,212,191,0.12)]">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <div className="ml-2 flex-1 truncate rounded-md border border-white/10 bg-black/30 px-2.5 py-1 font-mono text-[10px] text-slate-400">
            {urlLabel ?? "app.preview"}
          </div>
        </div>
        <div className="relative aspect-[16/10] w-full bg-black">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 560px"
            quality={70}
          />
        </div>
      </div>
    </div>
  );
});

export function MediaStage({ children }: { children: ReactNode }) {
  return <div className="relative">{children}</div>;
}
