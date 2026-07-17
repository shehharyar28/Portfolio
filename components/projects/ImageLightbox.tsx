"use client";

import Image from "next/image";
import { memo, useCallback, useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageLightboxProps {
  images: string[];
  startIndex?: number;
  alt: string;
  open: boolean;
  onClose: () => void;
}

function ImageLightboxComponent({
  images,
  startIndex = 0,
  alt,
  open,
  onClose,
}: ImageLightboxProps) {
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    if (open) setIndex(startIndex);
  }, [open, startIndex]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, prev, next]);

  return (
    <AnimatePresence>
      {open ? (
        <m.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            type="button"
            aria-label="Close gallery"
            className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>

          {images.length > 1 ? (
            <>
              <button
                type="button"
                aria-label="Previous"
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-cyan-400/30 bg-cyan-950/80 p-2 text-cyan-100 hover:bg-cyan-900 sm:left-6"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                aria-label="Next"
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-cyan-400/30 bg-cyan-950/80 p-2 text-cyan-100 hover:bg-cyan-900 sm:right-6"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          ) : null}

          <m.div
            key={images[index]}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="relative max-h-[88dvh] max-w-[min(920px,94vw)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[index]}
              alt={`${alt} — ${index + 1}`}
              className="max-h-[88dvh] w-auto max-w-full rounded-xl object-contain"
            />
            <p className="mt-3 text-center font-mono text-xs text-cyan-200/70">
              {index + 1} / {images.length}
            </p>
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}

export const ImageLightbox = memo(ImageLightboxComponent);

/** Compact thumbnail strip */
export function GalleryThumbs({
  images,
  alt,
  active,
  onSelect,
}: {
  images: string[];
  alt: string;
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
      {images.map((src, i) => (
        <button
          key={src}
          type="button"
          onClick={() => onSelect(i)}
          className={`relative h-14 w-10 shrink-0 overflow-hidden rounded-md border transition sm:h-16 sm:w-12 ${
            i === active
              ? "border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.45)]"
              : "border-white/15 opacity-70 hover:opacity-100"
          }`}
        >
          <Image
            src={src}
            alt={`${alt} thumb ${i + 1}`}
            fill
            loading="lazy"
            quality={50}
            className="object-cover"
            sizes="48px"
          />
        </button>
      ))}
    </div>
  );
}
