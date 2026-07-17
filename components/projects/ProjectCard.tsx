"use client";

import { memo, useMemo, useState } from "react";
import { m } from "framer-motion";
import { ExternalLink, Images, Sparkles } from "lucide-react";
import type { Project } from "@/data/types";
import {
  BrowserFrame,
  PhoneFrame,
} from "@/components/projects/DeviceFrames";
import { ImageLightbox } from "@/components/projects/ImageLightbox";
import { LazyMount } from "@/components/LazyMount";
import { riseIn } from "@/lib/motion";
import { useGpuLayerStyle } from "@/components/motion/useGpuLayerStyle";

function useFrameType(project: Project): "phone" | "browser" {
  return useMemo(() => {
    if (
      project.categories.includes("web") ||
      project.categories.includes("pos")
    ) {
      return "browser";
    }
    return "phone";
  }, [project]);
}

function ProjectCardComponent({
  project,
  delay = 0,
  featuredLayout = false,
  priorityCover = false,
}: {
  project: Project;
  delay?: number;
  featuredLayout?: boolean;
  priorityCover?: boolean;
}) {
  const images = project.imageUrls ?? [];
  const [lightbox, setLightbox] = useState(false);
  const frame = useFrameType(project);
  const cover = images[0];
  const gpu = useGpuLayerStyle();

  return (
    <>
      <m.article
        {...riseIn}
        transition={{ ...riseIn.transition, delay }}
        style={gpu}
        className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#060d1a]/90 p-[1px] ${
          featuredLayout ? "sm:col-span-2" : ""
        }`}
      >
        <div className="holo-card-border absolute inset-0 rounded-2xl opacity-70" />
        <div
          className={`relative grid gap-6 rounded-2xl bg-[#060d1a] p-5 sm:p-6 ${
            featuredLayout
              ? "lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
              : "md:grid-cols-[0.9fr_1.1fr] md:items-center"
          }`}
        >
          <div className="relative">
            {cover ? (
              <LazyMount minHeight={frame === "phone" ? 320 : 200} rootMargin="180px 0px">
                <button
                  type="button"
                  className="block w-full text-left"
                  onClick={() => setLightbox(true)}
                  aria-label={`Open ${project.name} gallery`}
                >
                  {frame === "phone" ? (
                    <div className="flex justify-center py-2">
                      <PhoneFrame
                        src={cover}
                        alt={project.name}
                        priority={priorityCover}
                      />
                    </div>
                  ) : (
                    <BrowserFrame
                      src={cover}
                      alt={project.name}
                      priority={priorityCover}
                      urlLabel={
                        project.liveUrl?.replace(/^https?:\/\//, "") ??
                        `${project.name.toLowerCase().replace(/\s+/g, "")}.app`
                      }
                    />
                  )}
                </button>
              </LazyMount>
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-cyan-500/20 bg-cyan-950/20">
                <Sparkles className="h-8 w-8 text-cyan-500/40" />
              </div>
            )}
          </div>

          <div className="relative z-10 flex min-h-0 flex-col">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              {project.featured ? (
                <span className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyan-200">
                  Featured
                </span>
              ) : null}
              {project.categories.slice(0, 2).map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-400"
                >
                  {c}
                </span>
              ))}
            </div>

            <h3 className="font-display text-xl tracking-wide text-slate-50 sm:text-2xl">
              {project.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400 sm:text-[15px]">
              {project.description}
            </p>

            {project.highlights?.length ? (
              <ul className="mt-4 space-y-1.5">
                {project.highlights.slice(0, 3).map((h) => (
                  <li
                    key={h}
                    className="flex gap-2 font-mono text-[11px] text-cyan-100/75"
                  >
                    <span className="text-teal-400">▸</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 6).map((t) => (
                <span
                  key={t}
                  className="rounded border border-cyan-500/20 bg-cyan-500/5 px-2 py-0.5 font-mono text-[10px] text-cyan-200/85"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              {images.length > 0 ? (
                <button
                  type="button"
                  onClick={() => setLightbox(true)}
                  className="btn-holo inline-flex items-center gap-1.5 rounded-full border border-cyan-400/35 bg-cyan-400/10 px-3.5 py-1.5 text-xs font-medium text-cyan-100 hover:bg-cyan-400/20"
                >
                  <Images className="h-3.5 w-3.5" />
                  Gallery ({images.length})
                </button>
              ) : null}
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-teal-300 hover:text-teal-100"
                >
                  Live demo <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : null}
              {project.playStoreUrl ? (
                <a
                  href={project.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-teal-300 hover:text-teal-100"
                >
                  Play Store <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : null}
              {project.appStoreUrl ? (
                <a
                  href={project.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-indigo-300 hover:text-indigo-100"
                >
                  App Store <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </m.article>

      {images.length > 0 && lightbox ? (
        <ImageLightbox
          images={images}
          startIndex={0}
          alt={project.name}
          open={lightbox}
          onClose={() => setLightbox(false)}
        />
      ) : null}
    </>
  );
}

export const ProjectCard = memo(ProjectCardComponent);
