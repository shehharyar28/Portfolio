/**
 * Shared Framer Motion presets — GPU-friendly only (transform / opacity).
 * Avoid layout props: top, left, width, height, margin, filter blur.
 */
export const viewportOnce = {
  once: true,
  amount: 0.12,
  margin: "0px 0px -5% 0px",
} as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

/** Soft rise — translateY only (compositor-friendly). */
export const riseIn = {
  initial: { y: 16, opacity: 0.96 },
  whileInView: { y: 0, opacity: 1 },
  viewport: viewportOnce,
  transition: { duration: 0.4, ease: easeOut },
};

export const riseInX = {
  initial: { x: -12, opacity: 0.96 },
  whileInView: { x: 0, opacity: 1 },
  viewport: viewportOnce,
  transition: { duration: 0.35, ease: easeOut },
};
